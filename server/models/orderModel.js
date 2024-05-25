import mongoose from "mongoose";
import bcrypt from "bcrypt";

const orderSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        unique: true, 
        lowercase: true,
        trim: true,
        minLength: 3,
        maxLength: 20
    },
     userId: {
        type: mongoose.Types.ObjectId,
        ref: "User", // Pour relier ma collection User avec Order
        required: true
    },
    
    destinationId: {
        type: mongoose.Types.ObjectId,
        ref: "Destination",
        required: true
    },
   price: {
        amount: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
            max: 9999
        }, 
        currency: {
            type: String,
            enum: ["EUR", "USD", "MD", "LEI"],
            required: true,
            default: "EUR"
        }
    },
    
    status: {
        type: String,
        required: true,
        enum: ["payed", "cancelled", "pending"],
        default: "pending"
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "user", "modo"],
        default: "user"
    }
    
    
}, {
    timestamps: true
})


const Order = mongoose.model("Order", orderSchema)
export default Order;