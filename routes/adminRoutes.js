// routes/adminRoutes.js
import express from 'express';
import User from '../models/User.js';
import verifyToken from '../middleware/verifyFirebaseToken.js';
import requireAdmin from '../middleware/requireAdmin.js';

const router = express.Router();

// ✅ Get current user's MongoDB data (used for frontend admin route protection)
router.get('/users/me', verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({ uid: req.user.uid }).select('-__v');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error checking admin user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ✅ Admin: Get all users
router.get('/users', verifyToken, requireAdmin, async (req, res) => {
    try {
        const users = await User.find().select('-__v');
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ✅ Admin: Change user role
router.put('/users/:id/role', verifyToken, requireAdmin, async (req, res) => {
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        ).select('-__v');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error('Role update error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ✅ Admin: Delete user
router.delete('/users/:id', verifyToken, requireAdmin, async (req, res) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted by admin successfully.' });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ message: 'Failed to delete user' });
    }
});

export default router;
