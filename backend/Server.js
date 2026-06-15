import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/database.js";
import connectCloudinary from "./src/config/cloudnery.js";
import userRouter from "./src/routes/user.route.js";
import productrouter from "./src/routes/product.route.js";
import cartRouter from "./src/routes/cart.route.js";
import orderRouter from "./src/routes/order.route.js";

dotenv.config({});

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use('/api/user',userRouter)
app.use('/api/product',productrouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.get("/", (req, res) => {
  res.send("Hello World!");
});
 connectCloudinary()
 connectDB();
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
