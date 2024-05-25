import Order from "../models/orderModel.js"


export const newOrder = async (req, res ) => {
    try {
        const { name, userId, destinationId, amount, currency } =req.body
        
         // Sécurité
        if(name.trim() === "" 
        || userId.trim() === "" 
        || destinationId.trim() === ""
        || parseFloat(amount) <= 0
        || currency.trim() === "" )
        
        {
            return res.status(400).json({message:"Veuillez remplir tous les champs"})
        }
        
        const newOrder = new Order ({
            name,
            userId,
            destinationId,
            price: {
                amount,
                currency
            }
        })
        
        await newOrder.save()
        
        res.status(201).json({message: "Payement enregistré avec succès"})
    }catch (e) {
        res.status(400).json({message: "Impossible d'ajouter le payement"})
    }
};

export const getAllOrders = async (req, res) => {
    try {
        
        const orders = await Order.find({})
        
        res.status(200).json(orders)
        
    } catch (e) {
        
        res.status(400).json({message: "Impossible de récupérer les payements"})        
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
       await Order.findByIdAndUpdate(id,{status:accepted})
    
            
        } else if(refused){
       await Order.findByIdAndUpdate(id,{status: refused})
        
        }
        
        res.status(200).json({message: "Status mis à jour avec succès"})
    } catch (e) {
       
        res.status(400).json({message: "Erreur, impossible de changer le status"})
    }
}
 
export const deleteOrder = async (req, res) => {
    try {
        
        const {id} = req.params; 
        
        // await Contact.deleteOne({pseudo: req.params.pseudo})
        await Order.findByIdAndDelete(id)
        
        res.status(200).json({message: "Payement supprimé avec succès"})
    } catch (e) {
        res.status(400).json({message: "Suppression impossible"})
    }
}





