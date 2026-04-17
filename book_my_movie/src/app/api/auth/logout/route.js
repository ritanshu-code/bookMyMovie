import * as tokenService from "@/services/auth/tokenService";
import { cookies } from "next/headers";


export async function DELETE() {
  try {
    const cookieStore = cookies();

    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return new Response(
        JSON.stringify({ error: "No refresh token found" }),
        { status: 400 }
      );
    }

    await tokenService.deleteRefreshToken(refreshToken);

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    return new Response(
      JSON.stringify({ message: "Logged out successfully" }),
      { status: 200 }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}