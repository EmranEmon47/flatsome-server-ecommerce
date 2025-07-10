import Product from '../models/Product.js';

// @desc    Get all products (public)
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

// @desc    Get single product by ID (public)
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

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

// @desc    Create new product (admin only)
// @route   POST /api/products
// @access  Admin
export const createProduct = async (req, res) => {
    try {
        if (req.user?.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error("❌ Error creating product:", error.message);
        res.status(500).json({ message: "Server error creating product" });
    }
};

// @desc    Update product (admin only)
// @route   PUT /api/products/:id
// @access  Admin
export const updateProduct = async (req, res) => {
    try {
        if (req.user?.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

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

// @desc    Delete product (admin only)
// @route   DELETE /api/products/:id
// @access  Admin
export const deleteProduct = async (req, res) => {
    try {
        if (req.user?.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

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
