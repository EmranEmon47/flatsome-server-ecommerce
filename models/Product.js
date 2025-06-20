import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
    size: String, // e.g., 'S', 'M', 'L' or '8', '9', '10'
    color: String, // e.g., 'Red'
    hexCode: String, // e.g., '#FF0000'
    stock: { type: Number, default: 0 },
});

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

        material: {
            type: String,
            default: "Cotton",
        },

        availability: {
            type: String,
            enum: ["In Stock", "Out of Stock"],
            default: "In Stock",
        },

        totalStock: {
            type: Number,
            required: true,
        },

        primaryImage: {
            type: String,
            required: true,
        },

        extraImages: {
            type: [String],
            validate: [(val) => val.length <= 3, "Maximum of 3 extra images allowed"],
        },

        variants: [variantSchema],
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
