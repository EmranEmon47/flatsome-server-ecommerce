import express from 'express';
import verifyToken from '../middleware/verifyFirebaseToken.js';
import User from '../models/User.js';

const router = express.Router();

// GET user profile
router.get('/me', verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({ uid: req.user.uid }).select('-__v');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT update user profile
router.put('/me', verifyToken, async (req, res) => {
    try {
        const { name, address, profileImage } = req.body;

        // Find user by uid
        const user = await User.findOne({ uid: req.user.uid });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Update fields if provided
        if (name !== undefined) user.name = name;
        if (address !== undefined) user.address = address;
        if (profileImage !== undefined) user.profileImage = profileImage;

        await user.save();

        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
