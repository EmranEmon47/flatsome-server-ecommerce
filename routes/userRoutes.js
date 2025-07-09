// routes/userRoutes.js
import express from 'express';
import verifyToken from '../middleware/verifyFirebaseToken.js';

const router = express.Router();

// Get logged-in user profile
router.get('/me', verifyToken, (req, res) => {
    res.json(req.user);
});

export default router;
