import { connectDB } from "@/lib/connectDB";
import * as otpService from "@/services/auth/otpService";
import * as userService from "@/services/userService";
import * as tokenService from "@/services/auth/tokenService";
import { cookies } from "next/headers";

connectDB();


export async function POST(req) {
    const { email, otp, hash } = await req.json();
    if (!email || !otp || !hash) {
        return new Response(JSON.stringify({ error: "Email, OTP, and hash are required" }), { status: 400 });
    }
    const [hashedOTP, expires] = hash.split(".");
    if (Date.now() > parseInt(expires)) {
        return new Response(JSON.stringify({ error: "OTP has expired" }), { status: 400 });
    }
    const data = `${email}.${otp}.${expires}`;
    console.log("data.....", data);

    const isValid = otpService.verifyOTP(data, hashedOTP);
    if (!isValid) {
        return new Response(JSON.stringify({ error: "Invalid OTP" }), { status: 400 });
    }

    let user;

    try {
        user = await userService.getUserByEmail(email);
        if (!user) {
            user = await userService.createUser({ email });
        }

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
    console.log("user::::::", user);

    // generate JWT token
    const { accessToken, refreshToken } = tokenService.generateToken({ userId: user._id, email: user.email });

    console.log("Tokens:", accessToken);
    console.log("Tokens....:", refreshToken);

    // store refresh token in db
    await tokenService.storeRefreshToken(user._id, refreshToken);

    // send token in cookie
    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 60 * 60,
    });

    cookieStore.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 60 * 60,
    });

    return new Response(JSON.stringify({ message: "OTP verified successfully", user }), { status: 200 });
}