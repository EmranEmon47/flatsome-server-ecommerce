import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// GET /api/products - Get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error fetching products" });
    }
});

// GET /api/products/:id - Get a product by ID
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error fetching product" });
    }
});

export default router;
