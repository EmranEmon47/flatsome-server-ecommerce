// seed/seedProducts.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import Product from "../models/Product.js"; // Make sure this path is correct

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

// Seed Products
const seedProducts = async () => {
    try {
        // Load product data from JSON
        const __dirname = path.resolve();
        const dataPath = path.join(__dirname, "data", "products.json");
        const products = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

        // Clear existing products
        await Product.deleteMany();
        console.log("🗑️ Old products removed");

        // Insert new data
        await Product.insertMany(products);
        console.log(`✅ ${products.length} products inserted successfully`);

        process.exit();
    } catch (error) {
        console.error("❌ Seeding failed:", error.message);
        process.exit(1);
    }
};

await connectDB();
await seedProducts();

// node seed/seedProducts.js  seed script