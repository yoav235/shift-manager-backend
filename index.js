const express = require('express');
const mongoose = require('mongoose');
import userRoutes from "./users/UserRoutes";

// cors
require('dotenv').config({path: "./environments/.env.dev" }); // Load .env.prod variables

const app = express();

// Middleware to parse JSON
app.use(express.json({limit: '10mb'}) ); // Adjust as needed
app.use(express.urlencoded({ limit: '10mb', extended: true }));



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));


app.use("/api/users", userRoutes)


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});


