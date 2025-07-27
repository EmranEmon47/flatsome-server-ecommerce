import Stripe from "stripe";
import Order from "../models/Order.js";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
    console.error("❌ STRIPE_SECRET_KEY is not set in environment variables!");
}

const stripe = new Stripe(stripeSecretKey);

export const createPaymentIntent = async (req, res) => {
    try {
        const { orderId } = req.params;

        console.log("➡️ Received orderId:", orderId);
        console.log("🔐 Stripe Secret Key Present:", !!stripeSecretKey);

        if (!orderId) {
            return res.status(400).json({ message: "Order ID is required" });
        }

        const order = await Order.findById(orderId);

        if (!order) {
            console.error("❌ Order not found for ID:", orderId);
            return res.status(404).json({ message: "Order not found" });
        }

        const amount = order.totalAmount;

        console.log("💰 Order totalAmount:", amount);

        if (!amount || isNaN(amount) || amount <= 0) {
            console.error("❌ Invalid amount for order:", amount);
            return res.status(400).json({ message: "Invalid order amount" });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Stripe uses cents
            currency: "usd",
            payment_method_types: ["card"],
        });

        console.log("✅ PaymentIntent created successfully");

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("🔥 Error creating payment intent:", error);
        res.status(500).json({ message: "Failed to create payment intent" });
    }
};
