import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
// import router from "./routes/userRoutes";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", router);

// Connexion à MongoDB
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("✅ MongoDB connecté");

        app.listen(5000, () => {
            console.log("🚀 Serveur en cours d'exécution sur http://localhost:5000");
        });
    } catch (error) {
        console.error("❌ Erreur de connexion MongoDB :", error);
    }
};

startServer();
