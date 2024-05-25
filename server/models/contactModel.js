import mongoose from "mongoose";


const contactSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        minLength:4,
        maxLength: 20,
        trim: true
    },
    message: {
        type: String, 
        required: true,
        minLength: 5,
        maxLength: 3000
    },
    email: {
        type: String, 
        unique: true,
        lowercase: true,
        required: true,
        trim: true,
        maxLength: 320
    },
     numberPhone: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true, 
        enum: ["pending", "accepted", "refused"], 
        default: "pending"
    }
    
}, {
    timestamps: true 
})

const Contact = mongoose.model("Contact", contactSchema)

export default Contact;