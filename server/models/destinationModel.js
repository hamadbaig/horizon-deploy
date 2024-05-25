import mongoose from "mongoose"; 

// Il te faut une gallery d'images pour en stocker +sieurs
// ex: galleryImg : [{src: String, description: String}] Tu rajoutes les contraintes ensuite. 



const destinationSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true, 
        minLength: 5,
        maxLength: 255,
        },
    
    summary: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 3000
    },
    content: {
        type: String, 
        required: true,
        minLength: 5,
        maxLength: 30000
        },
        
    location: {
        type: String,
        required: true
    },
     activities: [ {
         
             activity: {
        type: String,
        required: true
    },
            imageUrl: {
        type: String,
        required: true,
        default: "default-profil.png"
    },
        
} ] ,
    price: {
        amount: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
            max: 99999
        }, 
        currency: {
            type: String,
            enum: ["EUR", "USD", "CAD", "LEI"],
            required: true,
            default: "EUR"
        }
    },
   
}, {
    timestamps: true // createdAt, updatedAt
})

const Destination = mongoose.model("destination", destinationSchema)

export default Destination

