import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import { cryptoRoutes } from './routes/crypto.routes.js';
import { favoriteRoutes } from './routes/favorites.routes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { connectDatabase } from './config/database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDatabase();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100 
});
app.use(limiter);

// Routes
app.use('/api/crypto', cryptoRoutes);
app.use('/api/favorites', favoriteRoutes);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
