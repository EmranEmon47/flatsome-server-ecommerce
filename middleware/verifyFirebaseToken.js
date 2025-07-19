import admin from '../config/firebaseAdmin.js';
import User from '../models/User.js';

const verifyFirebaseToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = await admin.auth().verifyIdToken(token);
        req.firebaseUser = decoded;

        let user = await User.findOne({ uid: decoded.uid });

        if (!user) {
            user = await User.create({
                uid: decoded.uid,
                email: decoded.email,
                name: decoded.name || decoded.displayName || "Unnamed User",
            });
        } else {
            // Only update email if changed, and name ONLY IF it's missing
            let updated = false;

            if (user.email !== decoded.email) {
                user.email = decoded.email;
                updated = true;
            }

            if (!user.name || user.name === "Unnamed User") {
                user.name = decoded.name || decoded.displayName || user.name;
                updated = true;
            }

            if (updated) await user.save();
        }

        req.user = user;
        next();
    } catch (err) {
        console.error('Token verification failed:', err);
        res.status(403).json({ message: 'Unauthorized' });
    }
};

export default verifyFirebaseToken;
