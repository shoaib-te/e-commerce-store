 
import { getUsercart,addcart,updatecart } from "../controllers/cart.controller.js";
import express from "express";
import authuser from "../middleware/auth.js";

const cartRouter=express.Router()

cartRouter.post('/add',authuser,addcart)
// Example in cartRoute.js
cartRouter.post('/update', authuser, updatecart); // Ensure this is '/update'

cartRouter.get('/get',authuser,getUsercart)




export default cartRouter;

//   