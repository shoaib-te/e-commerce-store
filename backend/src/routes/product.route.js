import { listproudct,removeproudct,addproduct,singleproudct } from "../controllers/product.controller.js";
import express from "express";
import uplod from "../middleware/multer.js";
import { isAdmin } from "../middleware/Admin.middleware.js";

const productRouter=express.Router()



productRouter.post('/add',isAdmin,uplod.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]), addproduct);

productRouter.post('/remove',isAdmin,removeproudct);
productRouter.get('/single',singleproudct);
productRouter.get('/list',listproudct);

export default productRouter