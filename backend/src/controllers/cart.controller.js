import userModel from "../models/user.models.js";

const addcart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userId = req.user.id;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Initialize cartData as object
    if (!user.cartData) {
      user.cartData = {};
    }
    if (!user.cartData[itemId]) {
      user.cartData[itemId] = {};
    }

    // Increment quantity
    user.cartData[itemId][size] = (user.cartData[itemId][size] || 0) + 1;

    // Mark modified for Mongoose subdocument update
    user.markModified("cartData");
    await user.save({ validateBeforeSave: false });

    res.json({
      success: true,
      message: "Item added to cart",
      cartData: user.cartData
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updatecart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId, size, quantity } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Initialize cartData
    if (!user.cartData) user.cartData = {};
    if (!user.cartData[itemId]) user.cartData[itemId] = {};

    // Handle quantity update or removal
    if (quantity <= 0) {
      delete user.cartData[itemId][size];
      // Cleanup empty item
      if (Object.keys(user.cartData[itemId]).length === 0) {
        delete user.cartData[itemId];
      }
    } else {
      user.cartData[itemId][size] = quantity;
    }

    user.markModified("cartData");
    await user.save({ validateBeforeSave: false });

    res.json({
      success: true,
      message: "Cart updated",
      cartData: user.cartData
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUsercart = async (req, res) => {
  try {
    const userId = req.user.id; 

    const user = await userModel.findById(userId).select("cartData");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      cartData: user.cartData || {}
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addcart, updatecart, getUsercart };
