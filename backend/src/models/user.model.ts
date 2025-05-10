import { applyUserHooks } from '../triggers/user.trigger';
import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  username?: string;
  password: string;
  lastSeen: Date;
  isOnline: boolean;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 50,
    },
    username: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      maxlength: 32,
    },
    password: {
      type: String,
      required: true,
    },
    lastSeen: {
      type: Date,
      default: Date.now,
      index: true,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
  },
  {
    collection: 'users',
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.password;
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.password;
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
  }
);

// Appliquer les hooks personnalisés
applyUserHooks(UserSchema);

// Export du modèle
export const User = model<IUser>('User', UserSchema);
