// routes/adminRoutes.js
import express from 'express';
import User from '../models/User.js';
import verifyToken from '../middleware/verifyFirebaseToken.js';
import requireAdmin from '../middleware/requireAdmin.js';

const router = express.Router();

// Admin: Get all users
router.get('/users', verifyToken, requireAdmin, async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// Admin: Change user role
router.put('/users/:id/role', verifyToken, requireAdmin, async (req, res) => {
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { role },
        { new: true }
    );

    if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
});

// DELETE any user (admin only)
router.delete('/users/:id', verifyToken, requireAdmin, async (req, res) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted by admin successfully.' });
    } catch (err) {
        console.error('Admin delete error:', err);
        res.status(500).json({ message: 'Failed to delete user' });
    }
});

export default router;
