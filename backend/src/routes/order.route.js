import express from "express";
import  { allorders, placeorder, placeorderstripe, placeorderrezorpay, userorders, orderupdate, verifystripe} from "../controllers/order.controller.js";
import { isAdmin } from "../middleware/Admin.middleware.js";
import authuser from "../middleware/auth.js";


const orderRouter=express.Router()
//Admin route
orderRouter.post('/allorders',isAdmin,allorders)
orderRouter.post('/status',isAdmin,orderupdate)


//user payment
orderRouter.post('/place',authuser,placeorder)
orderRouter.post('/place/stripe',authuser,placeorderstripe)
orderRouter.post('/place/rezorpay',authuser,placeorderrezorpay)

//user route    
orderRouter.post('/user/orders',authuser,userorders)
//verify 
orderRouter.post('/verify',authuser,verifystripe)
export default orderRouter;
//authuser,