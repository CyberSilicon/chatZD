import express from 'express';
import cors from 'cors';
import routes from './routes/index.routes';
import connectDB from './config/db';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', routes);

// Connexion à MongoDB
connectDB();

export default app;