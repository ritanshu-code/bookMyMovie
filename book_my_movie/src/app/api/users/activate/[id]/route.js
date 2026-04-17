import * as userService from "@/services/userService";
import { connectDB } from "@/lib/connectDB";
connectDB();

export async function PUT(req, { params }) {
    try {
        const updateData = await req.json();
        const userId = params.id;
        updateData.activateUser = true; // Ensure the user is activated
        const updatedUser = await userService.activateUser(userId, updateData); 
        if (!updatedUser) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }
        return new Response(JSON.stringify(updatedUser), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}