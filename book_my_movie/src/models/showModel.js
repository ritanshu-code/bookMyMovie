import mongoose from "mongoose";

const showSchema = new mongoose.Schema({
    movie : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Movie",
        required : true
    },
    theatre : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Theater",    
        required : true
    },
    location : {
        type : String,
        required : true
    },
    format : {
        type : String,
        enum : ["2D", "3D", "IMAX", "PVR PXL", "4DX"],
        required : true
    },
    audioType : {
        type : String,
        enum : ["Dolby Atmos", "DTS:X", "Auro 3D", "SDDS"],
        default : "Dolby Atmos"
    },
    startTime :{ type: String, required : true },
    date :{ type: String, required : true },
    priceMap : {type : Map, of : Number, required : true, default : {}},
    seatLayout: []

}, { timestamps : true })

export const ShowModel = mongoose.models.Show || mongoose.model("Show", showSchema);