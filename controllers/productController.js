import Product from '../models/Product.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.error("❌ Error fetching products:", error.message);
        res.status(500).json({ message: "Server error fetching products" });
    }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        // Check for valid MongoDB ObjectId
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid product ID format" });
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error("❌ Error fetching product:", error.message);
        res.status(500).json({ message: "Server error fetching product" });
    }
};


// Update a product
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid product ID format" });
        }

        const updated = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updated) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updated);
    } catch (error) {
        console.error("❌ Error updating product:", error.message);
        res.status(500).json({ message: "Server error updating product" });
    }
};

// ✅ POST route to create new product
export const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error("❌ Error creating product:", error.message);
        res.status(500).json({ message: "Server error creating product" });
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid product ID format" });
        }

        const deleted = await Product.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting product:", error.message);
        res.status(500).json({ message: "Server error deleting product" });
    }
};

