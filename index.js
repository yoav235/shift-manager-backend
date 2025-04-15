const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load .env variables

const app = express();

// Middleware to parse JSON
app.use(express.json());

// // Example route import (optional)
// const userRoutes = require('./routes/userRoutes');
// app.use('/users', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
