import express from 'express';
import cors from 'cors';
import routes from './routes/index.routes';
import connectDB from './config/db';
import { handleGlobalErrors } from './middlewares/handleErrors.middleware';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware
app.use(
    cors({
      origin: "http://localhost:3000", // ← ne jamais utiliser "*"
      credentials: true,               // ← permet l'envoi de cookies
    })
  );
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/', routes);

// Middleware global
app.use(handleGlobalErrors);

// Connexion à MongoDB
connectDB();

export default app;