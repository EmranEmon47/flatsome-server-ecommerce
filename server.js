import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import uploadRoutes from './routes/uploadRoute.js';
import productRoutes from './routes/productRoutes.js'; // Import product routes

dotenv.config();
connectDB(); // ⬅️ Connect to MongoDB

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Test API is running...');
});

app.use('/api/upload', uploadRoutes);
app.use('/api/products', productRoutes); // Use product routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
);
