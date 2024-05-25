import Reservation from "../models/reservationModel.js";


export const newReservation = async (req, res) => {
     try {
        const {userId, destinationId, numberPeople, startDate, endDate} = req.body // Pour récupérer les champs d'un formulaire
        
        // req.userId, permet de savoir l'utilisateur connecté
        
        const {reservationId } = req.params
        
        // Sécurité
        if(userId.trim() === "" 
        || destinationId.trim() ===""
        || numberPeople <= 0 || numberPeople > 15)
        
        {
            return res.status(400).json({message: "Veuillez remplir correctement les champs"})
        }
        
        const newReservation = new Reservation({
            userId: req.userId, // L'auteur du reservations connecté.
            destinationId: req.destinationId,
            numberPeople,
            startDate,
            endDate
        })
        
        await newReservation.save();
        
        res.status(200).json({messsage: "Reservation ajouté avec succès"})
        
    } catch (e) {
        res.status(400).json({message: "Impossible d'ajouter une nouvelle reservation"})
   console.log(e)
    }
}


export const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: "Réservation introuvable" });
        }
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateReservation = async (req, res) => {
    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedReservation) {
            return res.status(404).json({ message: "Réservation introuvable" });
        }
        res.status(200).json(updatedReservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteReservation = async (req, res) => {
    try {
        const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!deletedReservation) {
            return res.status(404).json({ message: "Réservation introuvable" });
        }
        res.status(200).json({ message: "Reservation suprimee avec succes" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

