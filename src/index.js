import express from 'express';
import mongoose from 'mongoose';
import userRoutes from "./users/UserRoutes.js";
import shiftRouter from "./shifts/ShiftsRoutes.js";
import scheduleRouter from "./schedule/ScheduleRoutes.js";
import migrationRouter from "./migrations/migrationRoutes.js";
import dotenv from 'dotenv';
import cors from 'cors';

// cors
dotenv.config({ path: `./environment/.env.${process.env.NODE_ENV || 'prod'}` }); // Load environment variables dynamically
const app = express();

// Middleware to parse JSON
app.use(express.json({limit: '10mb'}) ); // Adjust as needed
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Use the CORS middleware
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'], // Specify allowed methods
    allowedHeaders: ['Content-Type'], // Specify allowed headers
}));

app.options('/{*any}', cors());

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));


app.use("/api/users", userRoutes)
app.use("/api/shifts", shiftRouter)
app.use("/api/migrations", migrationRouter)
app.use("/api/schedule", scheduleRouter)


// Start server
const PORT = process.env.PORT || 27017;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});


