import React, { useContext, useState } from "react";
import Title from "../components/Title";
import TotalCart from "../components/TotalCart";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/Shopcontext";
import axios from "axios";
import { toast } from "react-toastify";
function PlaceOrder() {
  const [method, setMethod] = useState("cod");
  const {
    updateQuantity,
    products,
    currncy,
    delvery_fee,
    showserch,
    setshowserch,
    serch,
    setserch,
    addItem,
    cartitem,
    getCartCount,
    getCartAmount,
    navigate,
    settoken,
    token,
    setCartitem,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // ... other imports

  // Inside PlaceOrder function
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let orderItems = [];
      for (const items in cartitem) {
        for (const item in cartitem[items]) {
          if (cartitem[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items),
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartitem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delvery_fee,
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            "http://localhost:4000/api/order/place",
            orderData,
            { headers: { token } }, // Most setups use 'token' or 'Authorization'
          );
          if (response.data.success) {
            setCartitem({}); // Clear cart on success
            navigate("/orders");
            toast.success("Order Placed Successfully!");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "stripe":
          const stripeResponse = await axios.post(
            "http://localhost:4000/api/order/place/stripe",
            orderData,
            { headers: { token } },
          );
          if (stripeResponse.data.success){
            const {session_url}=stripeResponse.data
            window.location.replace(session_url)
          }else{
            toast.error(stripeResponse.data.message)
          }


          break;

        default:
          break;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Reusable input style for a clean, consistent look
  const inputStyle =
    "border border-gray-300 rounded py-2 px-4 w-full focus:border-black outline-none transition-all";

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-center gap-20 pt-8 sm:pt-16 min-h-[80vh] border-t px-4 sm:px-[5vw]"
    >
      {/* ------------- Left Side: Delivery Information ------------- */}
      <div className="flex flex-col gap-5 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl mb-4">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3">
          <input
            name="firstName"
            className={inputStyle}
            onChange={handleChange}
            value={formData.firstName}
            type="text"
            placeholder="First name"
            required
          />
          <input
            name="lastName"
            className={inputStyle}
            onChange={handleChange}
            value={formData.lastName}
            type="text"
            placeholder="Last name"
            required
          />
        </div>
        <input
          name="email"
          onChange={handleChange}
          value={formData.email}
          className={inputStyle}
          type="email"
          placeholder="Email address"
          required
        />
        <input
          name="street"
          className={inputStyle}
          onChange={handleChange}
          value={formData.street}
          type="text"
          placeholder="Street"
          required
        />

        <div className="flex gap-3">
          <input
            name="city"
            className={inputStyle}
            onChange={handleChange}
            value={formData.city}
            type="text"
            placeholder="City"
            required
          />
          <input
            name="state"
            className={inputStyle}
            onChange={handleChange}
            value={formData.state}
            type="text"
            placeholder="State"
            required
          />
        </div>

        <div className="flex gap-3">
          <input
            name="zipcode"
            className={inputStyle}
            onChange={handleChange}
            value={formData.zipcode}
            type="number"
            placeholder="Zipcode"
            required
          />
          <input
            name="country"
            className={inputStyle}
            onChange={handleChange}
            value={formData.country}
            type="text"
            placeholder="Country"
            required
          />
        </div>
        <input
          name="phone"
          className={inputStyle}
          onChange={handleChange}
          value={formData.phone}
          type="number"
          placeholder="Phone"
          required
        />
      </div>

      {/* ------------- Right Side: Order Summary & Payment ------------- */}
      <div className="mt-8 flex-1 sm:max-w-[450px]">
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
          <TotalCart />
        </div>

        <div className="mt-12">
          <div className="mb-6">
            <Title text1={"PAYMENT"} text2={"METHOD"} />
          </div>

          {/* Payment Method Selection */}
          <div className="flex gap-4 flex-col xl:flex-row mt-4">
            {/* Stripe */}
            <div
              onClick={() => setMethod("stripe")}
              className={`group flex items-center justify-between border rounded-xl p-4 cursor-pointer transition-all duration-300 
    ${method === "stripe" ? "border-black bg-slate-50 shadow-md scale-[1.02]" : "border-gray-100 hover:border-gray-300 bg-white"}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-colors 
        ${method === "stripe" ? "border-black" : "border-gray-300 group-hover:border-gray-400"}`}
                >
                  <div
                    className={`w-2.5 h-2.5 rounded-full bg-black transition-transform duration-200 ${method === "stripe" ? "scale-100" : "scale-0"}`}
                  ></div>
                </div>
                <img
                  className="h-4 sm:h-5"
                  src={assets.stripe_logo}
                  alt="Stripe"
                />
              </div>
            </div>

            {/* Razorpay */}
            <div
              onClick={() => setMethod("razorpay")}
              className={`group flex items-center justify-between border rounded-xl p-4 cursor-pointer transition-all duration-300 
    ${method === "razorpay" ? "border-black bg-slate-50 shadow-md scale-[1.02]" : "border-gray-100 hover:border-gray-300 bg-white"}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-colors 
        ${method === "razorpay" ? "border-black" : "border-gray-300 group-hover:border-gray-400"}`}
                >
                  <div
                    className={`w-2.5 h-2.5 rounded-full bg-black transition-transform duration-200 ${method === "razorpay" ? "scale-100" : "scale-0"}`}
                  ></div>
                </div>
                <img
                  className="h-4 sm:h-5"
                  src={assets.razorpay_logo}
                  alt="Razorpay"
                />
              </div>
            </div>

            {/* Cash on Delivery */}
            <div
              onClick={() => setMethod("cod")}
              className={`group flex items-center justify-between border rounded-xl p-4 cursor-pointer transition-all duration-300 
    ${method === "cod" ? "border-black bg-slate-50 shadow-md scale-[1.02]" : "border-gray-100 hover:border-gray-300 bg-white"}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-colors 
        ${method === "cod" ? "border-black" : "border-gray-300 group-hover:border-gray-400"}`}
                >
                  <div
                    className={`w-2.5 h-2.5 rounded-full bg-black transition-transform duration-200 ${method === "cod" ? "scale-100" : "scale-0"}`}
                  ></div>
                </div>
                <p className="text-gray-600 text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                  Cash on Delivery
                </p>
              </div>
            </div>
          </div>

          <div className="w-full text-end mt-10">
            <button
              type="submit"
              className="bg-black text-white px-12 py-3.5 text-xs font-bold rounded-sm hover:bg-gray-800 transition-colors uppercase tracking-widest active:scale-95"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
