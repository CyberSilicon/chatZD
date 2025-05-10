import { applyUserHooks } from '../hooks/user.hook';
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
      required: [true, "L'adresse email est obligatoire."],
      unique: true,
      trim: true,
      maxlength: [50, "L'adresse email ne peut pas dépasser 50 caractères."],
    },
    username: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      maxlength: [32, "Le nom d'utilisateur ne peut pas dépasser 32 caractères."],
      minlength: [3, "Le nom d'utilisateur doit contenir au moins 3 caractères."],
    },
    password: {
      type: String,
      required: [true, "Le mot de passe est requis."],
      minlength: [8, "Le mot de passe doit contenir au moins 8 caractères."],
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
