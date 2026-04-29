import { BookingModel } from "@/models/bookingModel";
import { generateBookingRef } from "@/utils/constants";
import mongoose from "mongoose";
import Razorpay from "razorpay";
import { updateSeatStatus } from "./showService";


export const createBooking = async (bookingData, userId) => {

    // 1 basic validation
    if (!bookingData.showId || !bookingData.seats || bookingData.seats.length === 0 || !bookingData.paymentId || !bookingData.bookingFee) {
        throw new Error("Invalid booking data. Required fields: showId, seats, paymentId, bookingFee");
    }
    if(!userId){
        throw new Error("User not authenticated");
    }

    // 2. Destructure all properties from body
    let { showId, seats, paymentId, bookingFee } = bookingData;

    // Convert showId to ObjectId if it's a string
    if (typeof showId === 'string') {
        showId = new mongoose.Types.ObjectId(showId);
    }

    // Convert userId to ObjectId if it's a string
    let userIdObj = userId;
    if (typeof userIdObj === 'string') {
        userIdObj = new mongoose.Types.ObjectId(userIdObj);
    }

    // 3. Generate unique booking reference
    const bookingRef = generateBookingRef();

    // 4. Start Transactios - protects against race conditions and ensures atomicity
    // by doing this , multiple operations will be performed and either all of them will succeed or none of them will be applied, maintaining data integrity. (ACID properties of transactions)
    const session = await mongoose.startSession();
    console.log("Session started");
    session.startTransaction();
    console.log("Transaction started");

    try {
        // 5. critical query - check if any of the requested seats are already booked.
        console.log("Checking existing bookings for showId:", showId);
        const existingBookings = await BookingModel.find({
            showId,
            status: "CONFIRMED",
            seats: { $in: seats }
        }).session(session);

        if (existingBookings.length > 0) {
            throw new Error("Some of the requested seats are already booked.");
        }
        console.log("No conflicting bookings found");

        //6. Verify payment
        // fetch payment details and validate
        console.log("Verifying payment with ID:", paymentId);
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });

        const paymentDetails = await razorpay.payments.fetch(paymentId);
        console.log("Payment details fetched:", paymentDetails.status);

        if (paymentDetails.status !== "captured") {
            throw new Error("Payment not successful");
        }
        console.log("Payment verified successfully");

        // 7. Create booking
        console.log("Creating booking with ref:", bookingRef);
        const [booking] = await BookingModel.create([{
            bookingRef,
            userId: userIdObj,
            showId,
            seats,
            status: "CONFIRMED",
            paymentId,
            paymentMethod: paymentDetails.method,
            bookingFee
        }], { session });

        console.log("Booking", booking);
        
        // 8. Update seat Availability in Show document
        console.log("Updating seat status for seats:", seats);
        await updateSeatStatus(showId, seats, "BOOKED", session);
        console.log("Seat status updated");

        // 9. Commit transaction
        console.log("Committing transaction");
        await session.commitTransaction();
        session.endSession();
        console.log("Transaction committed");

        // 10. Return booking data
        return booking;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }

}

export const getUserBookings = async (userId) => {
    return await BookingModel.find({ userId }).populate({
        path: "showId",
        select: "startTime date audioType format location",
        populate: [
            {
                path: "movie",
                select: "title poster_path"
            },
            {
                path: "theatre",
                select: "name location city state"
            }
        ]
    }).sort({ createdAt: -1 }); // latest bookings first
}
           