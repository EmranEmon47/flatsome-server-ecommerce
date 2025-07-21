// models/Cart.js
import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    id: String,
    name: String,
    price: Number,
    quantity: Number,
    selectedColor: String,
    selectedSize: String,
    primaryImage: String,
});

const cartSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    items: [cartItemSchema],
}, { timestamps: true });

export default mongoose.model("Cart", cartSchema);
