import userModel from "../models/user.models.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const Createtoken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET_KEY)
}


//user login 
const loginuser= async(req,res)=>{
 try {
    const{email,password}=req.body;
    const user=await userModel.findOne({email});
    if (!user) {
          return  res.json({success:false,message:"User desesn't  exists"})
    }
    const isMatch= await bcrypt.compare(password,user.password);
    if(isMatch){
        const token = Createtoken(user._id)
        res.send({
          success:true,
          token
        })
    }
    else{
        res.send({
            success:false,
            message:'invalid credentials in login'
        })
    }
 } catch (error) {
     console.log( error);
    res.send({
        success:false,
        message:error.message 
    })
 }
}
// user register 
const registeruser=async (req,res)=>{
   try {
    const {name ,email ,password}=req.body ;

    const exists=await userModel.findOne({email});
    if (exists) {
       return  res.json({success:false,message:'User is already exists'})
    }
    if (!validator.isEmail(email)) {
        return res.json({success:false,message:'Please enter a valid email'})
    }
    if (password.length < 8) {
        return res.json({success:false,message:'Please enter a  Strong password '})
    }
   
    const  salt = await bcrypt.genSalt(10)
    const hashedpassword= await bcrypt.hash(password,salt) 

    const newuser=new  userModel({
        email,
        name,
        password:hashedpassword,
    })
    const User = await newuser.save()

    const token = Createtoken(User._id)
    res.send({
        success:true,
        token
    })
   } catch (error) {
    console.log( error);
    res.send({
        success:false,
        message:error.message 
    })
    
   }
}

//admin register
const registeradmin = async (req, res) => {
   try {
     const { email, password } = req.body;
      console.log(email,password);
      
     if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
       // Sign an object, and don't include the password
       const token = jwt.sign({ role: 'admin' }, process.env.ADMIN_SECRET_KEY, { expiresIn: '1d' });

       return res.json({
         success: true,
         token
       });
     } 

     return res.status(401).json({
       success: false,
       message: 'Invalid credentials'
     });

   } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
   }
};

 
export{
    loginuser,
    registeruser,
    registeradmin,
   

}