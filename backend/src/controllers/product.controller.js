import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
import fs from 'fs';
import productModel from "../models/product.models.js"; // Ensure this import exists

const addproduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, bestseller, sizes } = req.body;
    console.log(req.body);
      if (!name || !description || !price) {
        return res.json({ success: false, message: "Missing required fields: name, description, or price" });
    }

    // 1. Extract images from request
    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

    // 2. Upload to Cloudinary & Delete Temp Files immediately
    const imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
        // Clean up local filesystem after upload
        if (fs.existsSync(item.path)) {
            fs.unlinkSync(item.path);
        }
        return result.secure_url;
      })
    );

    // 3. Structure Product Data
    const productData = productModel.create( {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true"?true:false,
      sizes: JSON.parse(sizes) ,
      image: imageUrl,
      date: Date.now()
    });

    // 4. Save to Database
  

    res.json({ success: true, message: "Product Added",productData });

  } catch (error) {
    console.log(error);
    // 5. Emergency Cleanup: If upload fails halfway, try to delete remaining temp files
    if (req.files) {
        const files = [req.files.image1, req.files.image2, req.files.image3, req.files.image4].flat().filter(Boolean);
        files.forEach(file => {
            if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
        });
    }
    res.json({ success: false, message: error.message });
  }
};




// list product

const listproudct = async (req, res) => {
 try {
    const product=await productModel.find({});
    res.json({success:true,product})
 } catch (error) {
  console.log(error);
  res.json({success:false,message:error.message})
  
 }


};
// remove product

const removeproudct = async (req, res) => {
  try {
      
      const id=req.body.id;
      console.log(id);
     const product=await productModel.findByIdAndDelete(id);
    (product);
     res.json({success:true,product})

  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
    
  }
};
// single  product info

const singleproudct = async (req, res) => {
  try {
     console.log(req.body);

     const product = await productModel.findById(req.body.id);

     res.json({success:true,product})

  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
    
  }
    
};

export { addproduct, removeproudct, singleproudct, listproudct };
