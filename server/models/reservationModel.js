import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
    
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User", // Pour relier ma collection User avec Reservation
        required: true
    },
    
    destinationId: {
        type: mongoose.Types.ObjectId,
        ref: "Destination",
        required: true
    },
    
    numberPeople: {
        type: Number,
        required: true,
    },
    
   paymentStatus: {
       type: String,
        required: true,
        enum: ["payed", "cancelled", "pending"],
        default: "pending"
   },
   
   startDate: {
       type: Date,
        required: true
   },
   endDate: {
       type: Date,
        required: true
   }
    
},{
    timestamps: true //  Il va vous créer 2 nouveaux champs : createdAt et updatedAt
})


const Reservation = mongoose.model("reservation", reservationSchema)

export default Reservation;
