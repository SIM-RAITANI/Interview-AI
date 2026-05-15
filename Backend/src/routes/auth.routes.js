import { Router } from "express";
import { registerUser , loginUser , logoutUser , getMe} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter=Router();  

/**   
 * @route POST /api/auth/register
 * @description Register User with username email and password
 * @access PUBLIC
 */
authRouter.post("/register",registerUser)

/**   
 * @route POST /api/auth/login
 * @description Login User with email and password
 * @access PUBLIC
 */
authRouter.post("/login",loginUser)

/**   
 * @route GET /api/auth/logout
 * @description Logout User
 * @access PUBLIC
 */
authRouter.get("/logout",logoutUser)

/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access private
 */
authRouter.get("/get-me",authMiddleware,getMe)

export default authRouter