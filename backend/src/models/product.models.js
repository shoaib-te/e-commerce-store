import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    // Ensure images are stored as an array of strings (URLs)
    image: { type: [String], required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    // Ensure sizes are stored as an array of strings
    sizes: { type: [String], required: true },
    bestseller: { type: Boolean, default: false },
    date: { type: Number, required: true },
  },
  {
    // This adds createdAt and updatedAt automatically
    timestamps: true,
  },
);

// The check for mongoose.models.product prevents errors during hot-reloads (common in Next.js/Node)
const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
