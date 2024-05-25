import express from "express";
import {getAllDestinations, addDestination, deleteOneDestination, getOneDestination } from "../controllers/destinationController.js"
//import {isLogged, isAuthorized} from "../middlewares/auth.js"
import upload from "../middlewares/multer.js"
const destinationRouter = express.Router();



destinationRouter.delete("/delete/:id", deleteOneDestination)

// Pour ajouter une demande de destination
destinationRouter.post("/new", upload.single("imageUrl"), addDestination)

destinationRouter.get("/:id", getOneDestination);
// Route qui permet d'avoir la liste des destinations
destinationRouter.get("/",  getAllDestinations)


export default destinationRouter