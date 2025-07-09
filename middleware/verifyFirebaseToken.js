import admin from '../config/firebaseAdmin.js';
import User from '../models/User.js';

const verifyFirebaseToken = async (req, res, next) => {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = await admin.auth().verifyIdToken(token);
        req.firebaseUser = decoded;

        // Sync user with MongoDB
        let user = await User.findOne({ uid: decoded.uid });
        if (!user) {
            user = await User.create({
                uid: decoded.uid,
                email: decoded.email,
                name: decoded.name || decoded.displayName || "Unnamed User",
            });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error('Token verification failed:', err);
        res.status(403).json({ message: 'Unauthorized' });
    }
};

export default verifyFirebaseToken;
