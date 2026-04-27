import { getAllMovies } from "@/services/movieService";

// to get all movies
export async function GET() {
    try {
        console.log("API HIT");
        const movies = await getAllMovies();
        console.log("Movies fetched:", movies.length);
        return new Response(JSON.stringify(movies), { status: 200 });
    } catch (error) {
        console.error("API Error:", error.message);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}