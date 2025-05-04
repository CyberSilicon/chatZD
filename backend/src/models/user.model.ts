
import { Schema, model, Document } from 'mongoose';
import { IProfile, Profile } from './profile.model';

export interface IUser extends Document {
  phoneNumber: string;
  username?: string;
  password: string;
  profile: IProfile;
  lastSeen: Date;
  isOnline: boolean;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    phoneNumber: { type: String, required: true, unique: true, trim: true, maxlength: 20 },
    username: { type: String, unique: true, sparse: true, trim: true, maxlength: 32 },
    password: { type: String, required: true },
    profile: { type: Profile, required: false },
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
