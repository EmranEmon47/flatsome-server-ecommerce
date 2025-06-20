import mongoose from "mongoose";

// Variant Schema for each size+color variant
const variantSchema = new mongoose.Schema({
    size: String, // Shoe: '8', '9', '10' | T-shirt: 'S', 'M', 'L'
    color: {
        name: String,   // e.g., 'Black', 'Red'
        hex: String,    // e.g., '#000000'
    },
    stock: {
        type: Number,
        default: 0,
    },
});

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: String,
        price: {
            type: Number,
            required: true,
        },
        mainCategory: {
            type: String,
            enum: ["Men", "Women", "Child"],
            required: true,
        },
        subCategory: {
            type: String,
            enum: ["Tops", "T-Shirts", "Jackets", "Shoes", "Sweaters", "Others"],
            required: true,
        },
        materialInfo: String, // e.g., "100% cotton", "Leather upper"

        variants: [variantSchema], // List of size+color+stock combos

        primaryImage: {
            type: String,
            required: true,
        },
        additionalImages: [String],

        availability: {
            type: String,
            enum: ["In Stock", "Out of Stock"],
            default: "In Stock",
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

// Optional: virtual property to compute availability from stock
productSchema.virtual("totalStock").get(function () {
    return this.variants.reduce((sum, v) => sum + v.stock, 0);
});

productSchema.pre("save", function (next) {
    const total = this.variants.reduce((sum, v) => sum + v.stock, 0);
    this.availability = total > 0 ? "In Stock" : "Out of Stock";
    next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;
