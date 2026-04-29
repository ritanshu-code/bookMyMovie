import { getUserBookings } from "@/services/bookingService";


export async function GET(request, { params }) {
    const { id } = await params;
    console.log(id);
    
    try {
        const bookings = await getUserBookings(id);
        return new Response(JSON.stringify(bookings), { status: 200 });
    } catch (error) {
        console.error("Error fetching bookings:", error.message);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }   
}