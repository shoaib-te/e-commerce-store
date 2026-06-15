import express from "express";

import { loginuser,registeradmin,registeruser } from "../controllers/user.controller.js";

const userRouter=express.Router()


userRouter.post('/register',registeruser)
userRouter.post('/login',loginuser)
userRouter.post('/admin',registeradmin)

export default userRouter