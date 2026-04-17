import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name : { type : String}, 
    email: { type : String, required : true, unique : true },
    role: { type : String, enum : ["user", "admin"], default : "user" },
    phone: { type : Number},
    activeUser: { type : Boolean, default : false },
} , { timestamps : true })

export const UserModel = mongoose.models.User || mongoose.model("User", userSchema);