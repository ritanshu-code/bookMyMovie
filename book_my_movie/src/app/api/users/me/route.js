import * as userService from "../../../../services/userService"
import { connectDB } from "@/lib/connectDB";
import { cookies } from "next/headers";
import * as tokenService from "@/services/auth/tokenService";

connectDB();


export async function GET() {
  try {
    const cookieStore = await cookies(); //  FIX
    const accessToken = cookieStore.get("accessToken")?.value;

    console.log("Accesstoken hit:::::::", accessToken);

    if (!accessToken) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401 }
      );
    }

    const decoded = await tokenService.verifyAccessToken(accessToken);
    const { userId } = decoded;


    const user = await userService.getUserById(userId);


    return new Response(JSON.stringify(user), { status: 200 });

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}

