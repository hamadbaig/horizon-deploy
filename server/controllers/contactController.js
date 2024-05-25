import Contact from "../models/contactModel.js"


export const getAllContacts = async (req, res) => {
    try {
        
        const contacts = await Contact.find({})
        
        res.status(200).json(contacts)
        
    } catch (e) {
        
        res.status(400).json({message: "Impossible de récupérer les articles"})        
    }

}


export const addContact = async (req, res) => {
    try {
        
        const {name, email, numberPhone, message} = req.body
        
        // Sécurité
        if(name.trim() === "" 
        || email.trim() === "" 
        || numberPhone.trim() === "" 
        || message.trim() === "" ){
            return res.status(400).json({message:"Veuillez remplir tous les champs"})
        }
        
        const newContact = new Contact({
            name, 
            email, 
            numberPhone,
            message
        })
        
        await newContact.save()
        
        res.status(200).json({message: "Contact enregistré avec succès"})
        
    } catch (e) {
        res.status(400).json({message: "Impossible d'ajouter un contact"})
    }
}


export const changeStatus = async (req, res) => {
    try {
        
        const {id} = req.params
        const {accepted, refused} = req.body;
        
        if(!accepted && !refused || accepted && accepted.trim() === "" || refused && refused.trim() === "" ){
            return res.status(400).json({message: "Choix invalide"})
        }
        
        // Condition si l'administrateur appuie sur le bouton pour valider ou refuser 
        
        if(accepted){
       await Contact.findByIdAndUpdate(id,{status:accepted})
    
            
        } else if(refused){
       await Contact.findByIdAndUpdate(id,{status: refused})
        
        }
        
        res.status(200).json({message: "Status mis à jour avec succès"})
    } catch (e) {
       
        res.status(400).json({message: "Erreur, impossible de changer le status"})
    }
}
 


export const deleteContact = async (req, res) => {
    try {
        
        const {id} = req.params; 
        
        // await Contact.deleteOne({pseudo: req.params.pseudo})
        await Contact.findByIdAndDelete(id)
        
        res.status(200).json({message: "Contact supprimé avec succès"})
    } catch (e) {
        res.status(400).json({message: "Suppression impossible"})
    }
}