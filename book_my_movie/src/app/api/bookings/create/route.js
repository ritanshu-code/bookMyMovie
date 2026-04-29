import { createBooking } from "@/services/bookingService";
import { connectDB } from "@/lib/connectDB";

export async function POST(request) {
    try {
        await connectDB();
        const bookingData = await request.json();
        console.log("Received booking data:", bookingData);

        const userId = request.headers.get("userId");
        console.log("User ID from headers:", userId);

        const booking = await createBooking(bookingData, userId);
        console.log("booking in api:", booking);
        

        return new Response(JSON.stringify({ success: true, booking }), { status: 200 });
    } catch (error) {
        console.error("Booking API error:", error);
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}