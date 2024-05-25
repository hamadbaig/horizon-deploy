import Comment from "../models/commentModel.js";


export const addNewComment = async (req, res) => {
    try {
        const {content, rating} = req.body // Pour récupérer les champs d'un formulaire
        
        // req.userId, permet de savoir l'utilisateur connecté
        
        const {reservationId } = req.params
        
        // Sécurité
        if(content.trim() === "" || rating <= 0 || rating > 5){
            return res.status(400).json({message: "Veuillez remplir correctement les champs"})
        }
        
        const newComment = new Comment({
            content,
            rating,
            reservationId,
            userId: req.userId // L'auteur du commentaire connecté.
        })
        
        await newComment.save();
        
        res.status(200).json({messsage: "Commentaire ajouté avec succès"})
        
    } catch (e) {
        res.status(400).json({message: "Impossible d'ajouter un nouveau commentaire"})
    }
}

export const getAllCommentsByreservation = async (req, res) => {
    try {
        const {reservationId} = req.params
        
        const comments = await Comment.find({reservationId: req.params.reservationId}).populate("userId", "-password").populate("reservationId")
        
        res.status(200).json(comments)
    } catch (e) {
        res.status(400).json({message: "Impossible de récupérer les commentaires de cet reservation"})
    }
}