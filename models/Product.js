import mongoose from "mongoose";

// Define the nested color schema
const colorSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },      // e.g., 'Red'
        hex: { type: String, required: true },       // e.g., '#FF0000'
        stock: { type: Number, default: 0 },         // stock per color per size
    },
    { _id: false } // Don't auto-generate _id for nested subdocs
);

// Define variant schema with size and nested colors
const variantSchema = new mongoose.Schema(
    {
        size: { type: String, required: true },       // e.g., '7', '8', etc.
        colors: { type: [colorSchema], required: true },
    },
    { _id: false }
);

// Final product schema
const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },

        category: {
            type: String,
            required: true,
            enum: ["Men", "Women", "Child"],
        },

        subcategory: {
            type: String,
            required: true,
            enum: ["T-Shirts", "Jeans", "Shoes", "Jackets", "Tops"],
        },

        materialInfo: { type: String, default: "Cotton" },

        availability: {
            type: String,
            enum: ["In Stock", "Out of Stock"],
            default: "In Stock",
        },

        totalStock: { type: Number, required: true },

        primaryImage: { type: String, required: true },

        additionalImages: {
            type: [String],
            validate: [
                (val) => val.length <= 3,
                "Maximum of 3 extra images allowed",
            ],
        },

        variants: { type: [variantSchema], required: true },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
