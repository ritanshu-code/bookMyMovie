import { connectDB } from "@/lib/connectDB";
import { getTheaterById } from "@/services/theaterService";

export async function GET(request, { params }) {
     await connectDB();
    const theaterId = params.id;
    try {
        const theater = await getTheaterById(theaterId);
        if (!theater) {
            return new Response(JSON.stringify({ error: "Theater not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }
        return new Response(JSON.stringify(theater), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}