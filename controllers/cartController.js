// controllers/cartController.js
import Cart from "../models/Cart.js";

// 🔁 Get Cart by User
export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ uid: req.user.uid });
        res.json(cart || { uid: req.user.uid, items: [] });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch cart", error });
    }
};

// 💾 Save/Update Cart
export const saveCart = async (req, res) => {
    try {
        const { items } = req.body;
        if (!Array.isArray(items)) {
            return res.status(400).json({ message: "Invalid cart format" });
        }

        const updatedCart = await Cart.findOneAndUpdate(
            { uid: req.user.uid },
            { items },
            { new: true, upsert: true }
        );

        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: "Failed to save cart", error });
    }
};

// ❌ Clear Cart
export const clearCart = async (req, res) => {
    try {
        await Cart.findOneAndDelete({ uid: req.user.uid });
        res.json({ message: "Cart cleared" });
    } catch (error) {
        res.status(500).json({ message: "Failed to clear cart", error });
    }
};
