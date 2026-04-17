const { default: mongoose } = require("mongoose");


const refreshTokenSchema = new mongoose.Schema({
    token : { type : String, required : true },
    userId: { type : mongoose.Schema.Types.ObjectId, ref : "User", required : true },
}, { timestamps : true })

export const RefreshTokenModel = mongoose.models.RefreshToken || mongoose.model("RefreshToken", refreshTokenSchema);