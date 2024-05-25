import express from "express";
import {getAllUsers, register, login, resetPassword, updateOneUser, deleteOneUser, getOneUser, checkUser, sendForgotPassword} from "../controllers/userController.js"
//import {isLogged, isAuthorized } from "../middlewares/auth.js"
import upload from "../middlewares/multer.js"


const userRouter = express.Router();

// Ma routes commence par http://alinarusnac.ide.3wa.io:9000/api/users

userRouter.get("/check",  checkUser)
userRouter.delete("/delete/:id",  deleteOneUser)
userRouter.put("/edit/:id",  upload.single("image"), updateOneUser)
userRouter.put("/reset-password", resetPassword)
userRouter.post("/login", login)
userRouter.post("/register", register)
userRouter.get("/:id", getOneUser )
userRouter.get("/",  getAllUsers)
userRouter.post('/send-forgot-password',sendForgotPassword)

export default userRouter;