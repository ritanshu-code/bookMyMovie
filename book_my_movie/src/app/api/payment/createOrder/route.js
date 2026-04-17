import * as paymentService from "../../../../services/paymentService";

export async function POST(request) {
    try {
        const paymentData = await request.json();
        console.log("Received payment data:", paymentData);

        const order = await paymentService.createOrder(paymentData);

        return new Response(JSON.stringify(order), { status: 201 });
        
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}