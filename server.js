import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';

// ROUTES
import uploadRoutes from './routes/uploadRoute.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// TEST ROUTE
app.get('/', (req, res) => {
    res.send('✅ API is running...');
});

// ROUTES
app.use('/api/upload', uploadRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);       // 🔐 User profile routes
app.use('/api/admin', adminRoutes);      // 🔐 Admin-only
app.use('/api/cart', cartRoutes);        // 🛒 User cart routes
app.use('/api/orders', orderRoutes);
app.use("/api/payments", paymentRoutes);
// 📦 Order placement & tracking

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
);
