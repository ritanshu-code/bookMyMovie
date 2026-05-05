import { createBooking } from "@/services/bookingService";
import { connectDB } from "@/lib/connectDB";
import { io as ioClient } from "socket.io-client";

export async function POST(request) {
    try {
        await connectDB();
        const bookingData = await request.json();
        console.log("Received booking data:", bookingData);

        const userId = request.headers.get("userId");
        console.log("User ID from headers:", userId);

        const booking = await createBooking(bookingData, userId);
        console.log("booking in api:", booking);
        
        // Emit event to backend socket server to permanently lock the booked seats
        try {
            const socket = ioClient(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001", {
                reconnection: false,
                transports: ["websocket"]
            });

            socket.emit("booking-confirmed", {
                showId: booking.showId.toString(),
                seatIds: booking.seats,
                userId: booking.userId.toString()
            });

            // Close socket immediately after emitting
            socket.disconnect();
        } catch (socketError) {
            console.warn("Socket notification failed (non-blocking):", socketError.message);
            // Don't fail the booking API call if socket notification fails
        }

        return new Response(JSON.stringify({ success: true, booking }), { status: 200 });
    } catch (error) {
        console.error("Booking API error:", error);
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}