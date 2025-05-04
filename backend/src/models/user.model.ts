import { Schema, model, Document, Types } from 'mongoose';


export interface IUser extends Document {
  email: string;
  username?: string;
  password: string;
  profile: Types.ObjectId;
  lastSeen: Date;
  isOnline: boolean;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, trim: true, maxlength: 50 },
    username: { type: String, unique: true, sparse: true, trim: true, maxlength: 32 },
    password: { type: String, required: true },
    profile: { type: Schema.Types.ObjectId, ref: 'Profile', required: false },
    lastSeen: { type: Date, default: Date.now, index: true },
    isOnline: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now, immutable: true },
  },
  {
    collection: 'users',
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.index({ lastSeen: 1 });

export const User = model<IUser>('User', UserSchema);
