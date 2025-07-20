import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    uid: { type: String, required: true },
    email: { type: String, required: true },
    firstName: String,
    lastName: String,

    cartItems: {
        type: [
            {
                id: String,
                name: String,
                price: Number,
                quantity: Number,
                selectedColor: String,
                selectedSize: String,
                primaryImage: String,
            }
        ],
        validate: v => Array.isArray(v) && v.length > 0,
        required: true
    },

    shippingInfo: {
        address: { type: String, required: true },
        apartment: String,
        postcode: String,
        city: { type: String, required: true },
        phone: { type: String, required: true },
        notes: String,
        termsAccepted: { type: Boolean, required: true },
        alternate: {
            address: String,
            apartment: String,
            postcode: String,
            city: String,
            phone: String,
        },
    },

    totalAmount: { type: Number, required: true },

    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending",
    },

    deliveryStatus: {
        type: String,
        enum: ["Not Shipped", "Shipped", "Delivered"],
        default: "Not Shipped",
    },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
