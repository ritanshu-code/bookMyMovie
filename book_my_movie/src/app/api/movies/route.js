import { getAllMovies } from "@/services/movieService";


// to get all movies
export async function GET() {
    try {
        const movies = await getAllMovies();
        return new Response(JSON.stringify(movies), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}