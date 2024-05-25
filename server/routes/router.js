import express from "express";
import destinationRouter from "./destinationRouter.js"
import orderRouter from "./orderRouter.js"
import userRouter from "./userRouter.js"
import commentRouter from "./commentRouter.js"
import contactRouter from "./contactRouter.js"
import reservationRouter from "./reservationRouter.js"
 
const router = express.Router();


// J'appelle mes route   rs
router.use("/destinations", destinationRouter)
router.use("/orders", orderRouter)
router.use("/users", userRouter)
router.use("/reservations", reservationRouter)
router.use("/comment", commentRouter)
router.use("/contact", contactRouter)



export default router;