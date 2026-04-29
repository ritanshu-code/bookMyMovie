import mongoose from "mongoose";


const bookingSchema = new mongoose.Schema({
    bookingRef: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    showId: { type: mongoose.Schema.Types.ObjectId, ref: "Show", required: true },
    seats: [{
        type: String,
        required: true
    }],
    status: { type: String, enum: ["CONFIRMED", "FAILED", "CANCELLED"], default: "CONFIRMED", required: true },
    bookingDateTime: { type: Date, default: Date.now, required: true },
    paymentId: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    bookingFee: {
        ticketPrice: { type: Number, required: true },
        total: { type: Number, required: true },
        convenience: { type: Number, required: true }
    }
}, { timestamps: true });

bookingSchema.pre("save", async function () {
    console.log("PRE SAVE RUNNING");
    this.seats.sort()
})

export const BookingModel = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);