// routes/userRoutes.js
import express from 'express';
import verifyToken from '../middleware/verifyFirebaseToken.js';
import User from '../models/User.js';

const router = express.Router();

// ✅ Get logged-in user profile from MongoDB
router.get('/me', verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({ uid: req.user.uid }).select('-__v');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
