import express from "express";
import verifyToken from "../middleware/verifyFirebaseToken.js";
import requireAdmin from "../middleware/requireAdmin.js";
import Order from "../models/Order.js";

const router = express.Router();

// Save a new order (user/admin)
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

// Get orders of logged-in user
router.get("/my-orders", verifyToken, async (req, res) => {
    try {
        const orders = await Order.find({ uid: req.user.uid }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error("Error fetching user orders:", err);
        res.status(500).json({ message: "Failed to fetch orders." });
    }
});

// Get a specific order by ID (only owner or admin can access)
router.get("/:id", verifyToken, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }

        // Only allow if user is the owner or an admin
        if (order.uid !== req.user.uid && req.user.role !== "admin") {
            return res.status(403).json({ message: "Unauthorized access." });
        }

        res.json(order);
    } catch (err) {
        console.error("Error fetching order:", err);
        res.status(500).json({ message: "Failed to fetch order." });
    }
});


// Admin: Get all orders
router.get("/", verifyToken, requireAdmin, async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error("Admin order fetch error:", err);
        res.status(500).json({ message: "Server error." });
    }
});

// Update payment status of an order (user or admin)
router.patch("/:id/payment-status", verifyToken, async (req, res) => {
    try {
        const { status } = req.body;

        if (!["Paid", "Failed"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value." });
        }

        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }

        // Only order owner or admin can update payment status
        if (order.uid !== req.user.uid && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized." });
        }

        order.paymentStatus = status;
        await order.save();

        res.json({ message: "Payment status updated", order });
    } catch (err) {
        console.error("Failed to update payment status:", err);
        res.status(500).json({ message: "Server error." });
    }
});

// Update delivery status of an order (admin only)
router.patch("/:id/delivery-status", verifyToken, requireAdmin, async (req, res) => {
    try {
        const { status } = req.body;

        if (!["Not Shipped", "Shipped", "Delivered"].includes(status)) {
            return res.status(400).json({ message: "Invalid delivery status value." });
        }

        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }

        order.deliveryStatus = status;
        await order.save();

        res.json({ message: "Delivery status updated", order });
    } catch (err) {
        console.error("Failed to update delivery status:", err);
        res.status(500).json({ message: "Server error." });
    }
});

export default router;
