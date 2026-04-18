import { connectDB } from "@/lib/connectDB";
import { getShowById } from "@/services/showService";

export async function GET(req, { params }) {
   await connectDB();
  try {
    const { showId } = await params;

    const showData = await getShowById(showId);
    console.log(showData);
    

    return new Response(JSON.stringify(showData), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}