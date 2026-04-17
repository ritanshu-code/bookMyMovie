import { connectDB } from "@/lib/connectDB";
import * as userService from "../../../services/userService"
connectDB();

export async function POST(req) {
    try {
        const {name, phone, id} = await req.json();
        if (!name || !phone ) {
            return new Response(JSON.stringify({ error: "Name and phone are required" }), { status: 400 });
        }    
        const userData = { name, phone};
        const user = await userService.activateUser(id, userData);
        
        return new Response(JSON.stringify(user), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

export async function GET() {
    try {
        const users = await userService.getAllUsers();
        return new Response(JSON.stringify(users), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}