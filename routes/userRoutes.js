import express from 'express';
import verifyToken from '../middleware/verifyFirebaseToken.js';
import User from '../models/User.js';

const router = express.Router();

// Create user after signup (no auth required)
router.post('/', async (req, res) => {
    try {
        const { uid, email, firstName, lastName } = req.body;
        if (!uid || !email) {
            return res.status(400).json({ message: 'UID and email are required' });
        }

        let user = await User.findOne({ uid });
        if (user) {
            return res.status(200).json(user);
        }

        user = new User({ uid, email, firstName, lastName });
        await user.save();

        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user profile (protected)
router.get('/me', verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({ uid: req.user.uid });
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            email: user.email,
            profileImage: user.profileImage,
            role: user.role,
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update user profile (protected)
router.put('/me', verifyToken, async (req, res) => {
    try {
        const { firstName, lastName, address, profileImage } = req.body;

        const user = await User.findOne({ uid: req.user.uid });
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (firstName !== undefined) user.firstName = firstName;
        if (lastName !== undefined) user.lastName = lastName;
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
