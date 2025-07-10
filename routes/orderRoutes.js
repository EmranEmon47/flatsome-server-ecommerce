import express from "express";
import verifyToken from "../middleware/verifyFirebaseToken.js";
import requireAdmin from "../middleware/requireAdmin.js";
import Order from "../models/Order.js";

const router = express.Router();

// ✅ Save a new order
router.post("/", verifyToken, async (req, res) => {
    try {
        const order = new Order({
            uid: req.user.uid,
            email: req.user.email,
            ...req.body,
        });
        const saved = await order.save();
        res.status(201).json(saved);
    } catch (err) {
        console.error("Error saving order:", err);
        res.status(500).json({ message: "Order creation failed." });
    }
});

// ✅ Get orders for logged-in user
router.get("/my-orders", verifyToken, async (req, res) => {
    try {
        const orders = await Order.find({ uid: req.user.uid }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error("Error fetching user orders:", err);
        res.status(500).json({ message: "Failed to fetch orders." });
    }
});

// ✅ Admin: Get all orders
router.get("/", verifyToken, requireAdmin, async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error("Admin order fetch error:", err);
        res.status(500).json({ message: "Server error." });
    }
});

export default router;
