import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required: true,
        unique: true, 
        lowercase: true,
        trim: true,
        minLength: 3,
        maxLength: 20
    },
    email: {
        type: String, 
        unique: true,
        lowercase: true,
        required: true,
        trim: true,
        maxLength: 320
    },
    image: {
        type: String,
        required: true,
        default: "default-profil.png"
    },
    password: {
        type: String,
        required: true,
        trim:true,
        minLength: 8,
        maxLength: 55
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

// Hook qui sera exécuté avant la création de l'utilisateur
userSchema.pre("save", async function (next) {
    
    // SI le champ mot de passse n'a pas été modifié
    if(!this.isModified("password")){
        return next();
    }
    
    try {
        
        const salt = await bcrypt.genSalt(10) // 2e10
        this.password = await bcrypt.hash(this.password, salt)
        next();
        
    } catch (e) {
        next(e)
    }
    
})




const User = mongoose.model("User", userSchema)
export default User;