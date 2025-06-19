import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    sizes: [String],
    colors: [String],
    availability: String,
    images: {
        primary: String,
        others: [String],
    },
});

export default mongoose.model('Product', productSchema);
