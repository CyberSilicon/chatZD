// Point d'entrée principal pour configurer Express.
import express from 'express';

const app = express();

// Middlewares globaux
app.use(express.json());

export default app;
