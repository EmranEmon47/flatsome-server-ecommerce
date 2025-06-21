import express from "express";

// Import product controller functions

import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/productController.js";


const router = express.Router();

router.get("/", getProducts); // All products
router.get("/:id", getProductById); // Single product
router.post("/", createProduct); // Create product
router.put("/:id", updateProduct); // Update product
router.delete("/:id", deleteProduct); // Delete product



export default router;
