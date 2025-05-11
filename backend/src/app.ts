import express from 'express';
import cors from 'cors';
import routes from './routes/index.routes';
import connectDB from './config/db';
import { handleGlobalErrors } from './middlewares/handleErrors.middleware';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', routes);

// Middleware global
app.use(handleGlobalErrors);

// Connexion à MongoDB
connectDB();

export default app;