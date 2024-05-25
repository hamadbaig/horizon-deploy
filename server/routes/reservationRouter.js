import express from "express";
import {newReservation, getAllReservations,getReservation, updateReservation,deleteReservation} from "../controllers/reservationController.js";

const reservationRouter = express.Router();

// CREER UNE NOUVELLE RESERVATIONS
reservationRouter.post("/new", newReservation);

// RECUPERER TOUTES LES RESERVATIONS
reservationRouter.get("/", getAllReservations);

// RECUPERER UNE RESERVATION
reservationRouter.get("/getOneReservation/:id", getReservation);

// METTRE A JOUR UNE RESERVATION
reservationRouter.put("/update/:id", updateReservation);

//SUPPRIMER UNE RESERVATION
reservationRouter.delete("/delete/:id", deleteReservation);



export default reservationRouter;
