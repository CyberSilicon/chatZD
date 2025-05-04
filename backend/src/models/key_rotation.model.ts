import { Schema, model, Document, Types } from 'mongoose';

export interface IKeyRotation extends Document {
  chatId: Types.ObjectId;
  userId: Types.ObjectId;
  rotatedAt: Date;
}

const KeyRotationSchema = new Schema<IKeyRotation>(
  {
    chatId: { type: Schema.Types.ObjectId, ref: 'Chat', required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rotatedAt: { type: Date, default: Date.now, immutable: true },
  },
  {
    collection: 'key_rotations',
    timestamps: false,
  }
);

KeyRotationSchema.index({ chatId: 1, userId: 1, rotatedAt: 1 });

export const KeyRotationModel = model<IKeyRotation>('KeyRotation', KeyRotationSchema);