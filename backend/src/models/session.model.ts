import mongoose, { Schema, Document } from 'mongoose';
import { randomUUID } from 'crypto';

export interface ISession extends Document {
  sessionId: string;      // UUID
  userId: mongoose.Types.ObjectId;
  deviceInfo: string;
  ipAddress: string;
  createdAt: Date;
  lastActiveAt: Date;
}

const sessionSchema = new Schema<ISession>({
  sessionId: {
    type: String,
    default: () => randomUUID(),  // génère un UUID par défaut
    required: true,
  },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  deviceInfo: { type: String, required: true },
  ipAddress: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  lastActiveAt: { type: Date, default: Date.now },
});

export const SessionModel = mongoose.model<ISession>('Session', sessionSchema);
