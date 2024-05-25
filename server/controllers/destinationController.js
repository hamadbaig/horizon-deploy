import Destination from "../models/destinationModel.js";
import mongoose from "mongoose"
// import { STATUS_CODE_OK} from "../utils/statusCode.js"
export const addDestination = async (req, res) => {
    try {
        
        const {title, content, summary, description, location, activity, amount, currency } = req.body; // ça récupère que des string, une image se trouve dans la req.file c'est pourquoi on ne l'insère pas ici
        
        // Sécurité
        if(title.trim() === "" 
        || summary.trim() === ""
        || content === ""
        || location === ""
        || activity === ""
        || parseFloat(amount) <= 0
        || currency.trim() === ""
        ){
            return res.status(400).json({message: "Veuillez remplir correctement les champs"})
        }
        
        
        // J'instancie mon model "destination", je créé un nouvel objet
        const newdestination = new Destination({
            
            title: req.body.title,
            summary: summary,
            content,
            location,
            activity,
            price: {
                amount: parseFloat(amount).toFixed(2), // 10 => 10,00
                currency
            }, 
            description,
            imageUrl: req.file && req.file.filename // Si l'utilisateur insère une image, 
            
        })
        
        await newdestination.save(); 
        
        res.status(200).json({message: "Produit créé avec succès."})
        
    } catch (e) {
        console.log(e)
       res.status(400).json({messsage: "Impossible de créer un produit"})
    }
}

export const getAllDestinations = async (req, res) => {
    try {
        
        const destinations = await Destination.find({})
        
        res.status(200).json(destinations)
        
    } catch (e) {
        res.status(400).json({message: "Impossible de récupérer les articles"})
    }
}

export const getOneDestination = async (req,res) => {
    try {
        
        // QQUAND VOUS RECUPEREZ UN SEUL ELEMENT
        // PARAMETRE DYNAMIQUE = REQ.PARAMS
        
        const {id} = req.params;
        // ezhruzer
        // const convertId = mongoose.Types.ObjectId(id)
        
        const destination = await Destination.findById(id) // findOne({_id: id})
        
        res.status(200).json(destination)
    } catch (e) {
        res.status(400).json({message: "Impossible de récupérer la destination"})
    }
}

export const editOneDestination = async (req, res) => {
    try {
        
        // PARAMETRE DYNAMIQUE pour récupérer un seul élément
        
        const {id} = req.params // req.params = DANS L'URL la partie dynamique
        
           const {title, summary, content, description, location, activity,  amount, currency } = req.body; // ça récupère que des string, une image se trouve dans la req.file c'est pourquoi on ne l'insère pas ici
        
       // Sécurité
        if(title || summary || content || description || location ||activity || amount || currency  ){ 
            if(title && title.trim() === "" 
            || summary && summary.trim() === ""
            || location && location.trim() === ""
            ||content && content <= 0 
            || activity && activity.trim() === ""
            || amount  && amount <= 0
            || description && description.trim() === ""
            || currency && currency.trim() === ""){
                return res.status(400).json({message: "Veuillez remplir tous les champs !"})
            }
        }
        
        // On va stocker les champs du formulaire, celui que l'utilisateur a mis à jour.
        const updatedestination = {
            title, 
            summary,
            content,
            description,
            location,
            activity,
            amount,
            currency,
            image: req.file && req.file.filename
        }
        
        await Destination.findByIdAndUpdate(id, updatedestination)
        
        res.status(200).json({message: "Modification effectuée"})
        
    } catch (e) {
        res.status(400).json({message: "Edition impossible"})
    }
}

export const deleteOneDestination = async (req, res) => {
    try {
        
        const {id} = req.params
        
        await Destination.findByIdAndDelete(id)
        
        res.status(200).json({message: "Article supprimé avec succès"})
        
    } catch (e) {
        res.status(400).json({message: "Impossible d'effectuer la suppression"})
    }
}

export const addLike = async (req, res) => {
    try {
        
        const {id} = req.params; // l'ID du produit sélectionné 
        
        // L'ID de l'utilisateur connecté.
        // const {userId} = req
        const connectedUser = req.userId // req.userId vient du middleware auth.js et de isLogged
        
        // Je récupère le produit pour mes vérifications
        const destination = await Destination.findById(id)
        
        // Permet de vérifier que l'argument est présent dans le tableau ou non
        // ça renvoie un Booléen
       const isLiked = destination.likes.includes(connectedUser)
       
       
       // Si l'utilisateur connecté a déjà liké le produit, il ne peut plus le "re-liké" de nouveau
       if (isLiked){
           return res.status(401).json({message: "Vous avez déjà liké ce produit", totalLike: destination.likes.length})
       }
        
        // Le new: true permet de remettre automatiquement à jour le document 
      const destinationWithLike =  await Destination.findByIdAndUpdate(id, {$push: { likes: connectedUser}}, {new: true})
       
        res.status(200).json({message: "Like ajouté avec succès!", totalLike: destinationWithLike.likes.length})
        
        
    } catch (e) {
        res.status(200).json({message: "Impossible d'ajouter un like à ce produit"})
    }
}