// controllers/paymentController.js
import Stripe from "stripe";
import Order from "../models/Order.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
    try {
        const { orderId } = req.params;

        console.log("➡️ Received orderId:", orderId);

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const amount = order.totalAmount;

        if (!amount || amount <= 0) {
            return res.status(400).json({ message: "Invalid order amount" });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency: "usd",
            payment_method_types: ["card"],
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("🔥 Error creating payment intent:", error);
        res.status(500).json({ message: "Failed to create payment intent" });
    }
};
