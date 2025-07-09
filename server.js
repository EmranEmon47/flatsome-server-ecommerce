import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';

// ROUTES
import uploadRoutes from './routes/uploadRoute.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js'; // ✅ NEW

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// ROUTES
app.get('/', (req, res) => {
    res.send('Test API is running...');
});

app.use('/api/upload', uploadRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);      // ✅ User profile
app.use('/api/admin', adminRoutes);     // ✅ Admin-only access

const PORT = process.env.PORT || 7000;
app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
);
