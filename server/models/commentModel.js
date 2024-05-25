import mongoose from "mongoose";


const commentSchema = mongoose.Schema({
    
    content: {
        type: String, 
        required: true
    },
    
    rating: {
        type: Number,
        required: true,
        max: 5
    },
    
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User", // Pour relier ma collection User avec Comment
        required: true
    },
    
    destinationId: {
        type: mongoose.Types.ObjectId,
        ref: "Destination",
        required: true
    }
    
    
},{
    timestamps: true // createdAt, updatedAt 
})


const Comment = mongoose.model("Comment", commentSchema)

export default Comment