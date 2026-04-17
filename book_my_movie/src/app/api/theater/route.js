import { getAllTheaters, getTheatersByState } from "@/services/theaterService";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const state = searchParams.get("state");
    try {
        if (state) {
            const theaters = await getTheatersByState(state);
            return new Response(JSON.stringify(theaters), {
                headers: { "Content-Type": "application/json" },
            });
        } else {
            const theaters = await getAllTheaters();
            return new Response(JSON.stringify(theaters), {
                headers: { "Content-Type": "application/json" },
            });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}