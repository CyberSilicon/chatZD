import { Schema, model, Document, Types } from 'mongoose';

export interface ISession extends Document {
  sessionId: string;
  userId: Types.ObjectId;
  deviceInfo: string;
  ipAddress: string;
  createdAt: Date;
  lastActiveAt: Date;
}

const SessionSchema = new Schema<ISession>(
  {
    sessionId: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    deviceInfo: { type: String, required: true },
    ipAddress: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, immutable: true },
    lastActiveAt: { type: Date, default: Date.now, index: { expires: '30d' } },
  },
  {
    timestamps: false,
    collection: 'sessions',
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index to auto-remove expired sessions after 30 days
SessionSchema.index({ lastActiveAt: 1 }, { expireAfterSeconds: 2592000 });

export const SessionModel = model<ISession>('Session', SessionSchema);
