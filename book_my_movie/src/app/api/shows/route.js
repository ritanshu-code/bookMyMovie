import { getShowsByMovieDateLocation } from "@/services/showService"
import { connectDB } from "@/lib/connectDB"

export async function GET(req) {
    try {
        await connectDB()

        const { searchParams } = new URL(req.url)
        const movieId = searchParams.get("movieId")
        const date = searchParams.get("date")
        const location = searchParams.get("location")

        console.log("movieId", movieId);
        console.log("date", date);
        console.log("location", location);


        const shows = await getShowsByMovieDateLocation(movieId, date, location)



        return Response.json(shows)
    } catch (error) {
        console.error("Error fetching shows:", error);
        return Response.json({ error: "Failed to fetch shows" }, { status: 500 });
    }

}