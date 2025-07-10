import express from 'express';
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} from '../controllers/productController.js';

import verifyToken from '../middleware/verifyFirebaseToken.js';
import requireAdmin from '../middleware/requireAdmin.js';

const router = express.Router();

router.get('/', getProducts); // public
router.get('/:id', getProductById); // public

router.post('/', verifyToken, requireAdmin, createProduct); // admin
router.put('/:id', verifyToken, requireAdmin, updateProduct); // admin
router.delete('/:id', verifyToken, requireAdmin, deleteProduct); // admin

export default router;
