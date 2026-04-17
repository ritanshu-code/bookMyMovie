import * as otpService from "@/services/auth/otpService";


export async function POST(req) {
    try {
        const { email } = await req.json();

        if (!email) {
            return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
        }
        // validate email format here

        // create otp
        const otp = otpService.generateOTP();

        // hash otp with email

        const ttl = 1000 * 60 * 2; // 2min
        const expires = Date.now() + ttl;
        const data = `${email}.${otp}.${expires}`;
        const hashedOTP = otpService.hashOTP(data);

        // send otp to email
        try {
            await otpService.sendOTPtoEmail(email, otp);
        } catch (error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        // return response
        const responseData = {
            email,
            hash: `${hashedOTP}.${expires}`
        }

        return new Response(
            JSON.stringify({ message: "OTP sent successfully", ...responseData }),
            { status: 200 }
        );

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}