import express from "express";
import {newOrder, getAllOrders, changeStatus, deleteOrder} from "../controllers/orderController.js"

const orderRouter = express.Router();

//POUR CREER UNE NOUVELLE COMMANDE

orderRouter.post("/new", newOrder);

//POUR RECUPERER TOUTES LES COMMANDES
orderRouter.get("/", getAllOrders);

//POUR METTRE A JOUR
orderRouter.put("/change-status/:id", changeStatus);

//SUPPRIMER UNE COMMANDE
orderRouter.delete("/:id", deleteOrder);



export default orderRouter;