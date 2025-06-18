import express from 'express';
import multer from 'multer';
import { storage } from '../config/cloudinary.js';

const router = express.Router();
const upload = multer({ storage });

// Upload multiple files (e.g. 4 images per product)
router.post('/images', upload.array('images', 4), (req, res) => {
    const imageUrls = req.files.map(file => file.path); // Cloudinary URLs
    res.json({ imageUrls });
});

export default router;
