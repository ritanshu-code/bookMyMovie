import * as paymentService from "@/services/paymentService";

export async function POST(request) {
    try {
        const paymentData = await request.json();
        const isVerified = await paymentService.verifyPayment(paymentData);

        if (!isVerified) {
            return new Response(JSON.stringify({ error: "Payment verification failed" }), { status: 400 });
        }

        return new Response(JSON.stringify({ verified: isVerified }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}