import express from "express";
import {addNewComment, getAllCommentsByreservation} from "../controllers/commentController.js"
//import {isLogged, isAuthorized} from "../middlewares/auth.js"

const commentRouter = express.Router();


commentRouter.post("/new/:destinationId", addNewComment)

commentRouter.get("/:destinationId", getAllCommentsByreservation)


export default commentRouter;