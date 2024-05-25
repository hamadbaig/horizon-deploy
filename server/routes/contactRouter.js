import express from "express";
import {getAllContacts, addContact, deleteContact, changeStatus} from "../controllers/contactController.js"
//import {isLogged, isAuthorized} from "../middlewares/auth.js"
const contactRouter = express.Router();


contactRouter.put("/change-status/:id",  changeStatus)

contactRouter.delete("/delete/:id",  deleteContact)

// Pour ajouter une demande de contact
contactRouter.post("/new", addContact)

// Route qui permet d'avoir la liste des contacts
contactRouter.get("/",  getAllContacts)


export default contactRouter