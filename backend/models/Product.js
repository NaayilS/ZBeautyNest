const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true },
    ingredients: { type: [String], required: true },
    reviews: [
        {
            user: { type: String, required: true },
            rating: { type: Number, required: true },
            comment: { type: String, required: true },
        },
    ],
}, { timestamps: true });
