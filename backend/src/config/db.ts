import mongoose from 'mongoose';
import { ENV } from './env';

const connectDB = async (): Promise<void> => {
  try {
    const MONGO_URI: string = ENV.MONGO_URI;
    
    if (!MONGO_URI) {
      throw new Error("La variable d'environnement MONGO_URI est manquante !");
    }
    
    await mongoose.connect(MONGO_URI);

    console.log('✅ Connecté à MongoDB');
  } catch (err: any) {
    console.error('❌ Erreur de connexion à MongoDB:', err.message);
    process.exit(1);
  }
};

export default connectDB;
