import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    uid: { type: String, required: true }, // Firebase UID
    email: { type: String, required: true },
    firstName: String,
    lastName: String,
    cartItems: [
        {
            id: String,
            name: String,
            price: Number,
            quantity: Number,
            selectedColor: String,
            selectedSize: String,
        },
    ],
    shippingInfo: {
        address: String,
        apartment: String,
        postcode: String,
        city: String,
        phone: String,
        notes: String,
        alternate: {
            address: String,
            apartment: String,
            postcode: String,
            city: String,
            phone: String,
        },
    },
    totalAmount: Number,
    status: {
        type: String,
        enum: ["Pending", "Shipped", "Delivered"],
        default: "Pending",
    },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
