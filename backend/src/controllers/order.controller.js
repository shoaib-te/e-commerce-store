import orderModel from "../models/order.models.js";
import userModel from "../models/user.models.js";
import Stripe from "stripe";
d
const currency = "inr";
const deliveryCharges = 60; // Increased to meet Stripe min amount requirement (~$0.50 USD equiv for INR)

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  timeout: 120000,
  maxNetworkRetries: 3,
});
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('STRIPE_SECRET_KEY environment variable is missing. Please set it in your .env file.');
  throw new Error('STRIPE_SECRET_KEY missing');
}

const placeorder = async (req, res) => {
  try {
    // 1. Use req.user.id from your auth middleware
    const userId = req.user.id;
    const { items, amount, address } = req.body; // Check if 'item' should be 'items'

    const orderData = {
      userId, // Ensure this matches the 'Path userId' in your schema
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: true,
      date: Date.now(),
    };

    const orders = await orderModel.create(orderData);

    // 2. Clear the cart using the same userId
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed", orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//
const placeorderstripe = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, amount, address } = req.body;
    const { origin } = req.headers;

    // 1. Create and save order in DB
    // Ensure orderModel is imported at the top of your file
    const orderData = await orderModel.create({
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false, 
      date: Date.now(),
    });

    // 2. Build line items for Stripe
    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100), // Use Math.round to avoid decimal errors
      },
      quantity: item.quantity,
    }));

    // 3. Add delivery charges
    line_items.push({
      price_data: {
        currency: currency,
        product_data: { name: "Delivery Charges" },
        unit_amount: deliveryCharges * 100, 
      },
      quantity: 1,
    });

    // 4. Create Stripe Session
    // Use || "http://localhost:5173" as a fallback if origin is undefined
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: "payment",
      success_url: `${origin || 'http://localhost:5173'}/verify?success=true&order_id=${orderData._id}`,
      cancel_url: `${origin || 'http://localhost:5173'}/verify?success=false&order_id=${orderData._id}`,
    });

    // 5. Return success and the session URL for frontend redirect
    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.error("Stripe Session Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// verify stripe
const verifystripe = async (req, res) => {
  try {
    const userId = req.user.id;
    const { order_id, success } = req.body;
    console.log(userId ,order_id ,success,"verify line 108");
    

    if (!order_id || success === undefined) {
      return res.status(400).json({ success: false, message: "Missing order_id or success parameter" });
    }

    const order = await orderModel.findById(order_id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Not authorized for this order" });
    }

    if (order.payment) {
      return res.json({ success: false, message: "Order already paid" });
    }

    if (success === true || success === "true") {
      await orderModel.findByIdAndUpdate(order_id, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      await orderModel.findByIdAndDelete(order_id);
      res.json({ success: false, message: "Payment cancelled, order deleted" });
    }
  } catch (error) {
    console.error("Stripe verification error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


//
const placeorderrezorpay = async (req, res) => {};
// all product in admin panal
const allorders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//user order data for frontend
const userorders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// order update in admin panal
const orderupdate = async (req, res) => {
  try {
    const { orderid, status } = req.body;
    await orderModel.findByIdAndUpdate({ _id: orderid }, { status });
    res.json({ success: true, message: "Order Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  allorders,
  placeorder,
  placeorderstripe,
  placeorderrezorpay,
  userorders,
  orderupdate,
  verifystripe,
};
