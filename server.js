import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import uploadRoutes from './routes/uploadRoute.js';

dotenv.config();
connectDB(); // ⬅️ Connect to MongoDB

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Test API is running...');
});

app.use('/api/upload', uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
);
