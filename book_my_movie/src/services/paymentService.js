import Razorpay from "razorpay"

export const createOrder = async(paymentData) => {
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    })

    const { amount } = paymentData;

    const options = {
        amount: amount * 100, // Convert to paise
        currency: "INR",
        receipt: `bms-ticket_${Date.now()}`,
    }

    const order =  await razorpay.orders.create(options);

    return order;
}

export const verifyPayment = async(paymentData) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentData;

    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest('hex');
    
    return expectedSignature === razorpay_signature;
}