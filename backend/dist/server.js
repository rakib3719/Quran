// server.ts ba index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import quranRoutes from './routes/quranRoutes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// CORS Configuration - allow both Vercel and localhost
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://quran-yo54.vercel.app',
    process.env.FRONTEND_URL, // optional env variable
].filter(Boolean); // remove undefined values
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            console.log('Blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // if you use cookies/auth headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use('/api', quranRoutes);
// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Quran API is running' });
});
// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map