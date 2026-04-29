import * as paymentService from "@/services/paymentService";

export async function POST(request) {
    try {
        const paymentData = await request.json();
        console.log("paymentData in backend", paymentData);
        
        const isVerified = await paymentService.verifyPayment(paymentData);

        if (!isVerified) {
            return new Response(JSON.stringify({ success: false, error: "Payment verification failed" }), { status: 400 });
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}