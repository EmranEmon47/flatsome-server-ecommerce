// routes/paymentRoutes.js
import express from "express";
import { createPaymentIntent } from "../controllers/paymentController.js";
import verifyToken from "../middleware/verifyFirebaseToken.js";

const router = express.Router();

// Route to create Stripe payment intent
router.post("/create-payment-intent/:orderId", verifyToken, createPaymentIntent);


export default router;
