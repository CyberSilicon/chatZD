import { Schema, model, Document, Types } from 'mongoose';

export interface IChatEncryptionKey extends Document {
  chatId: Types.ObjectId;
  userId: Types.ObjectId;
  publicKey: string;
  privateKeyEnc: string;
  rotatedAt: Date;
}

const ChatEncryptionKeySchema = new Schema<IChatEncryptionKey>(
  {
    chatId: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    publicKey: { type: String, required: true },
    privateKeyEnc: { type: String, required: true },
    rotatedAt: { type: Date, default: Date.now, immutable: true },
  },
  {
    collection: 'chat_encryption_keys',
    timestamps: false,
  }
);

ChatEncryptionKeySchema.index({ chatId: 1, userId: 1 }, { unique: true });

export const ChatEncryptionKeyModel = model<IChatEncryptionKey>('ChatEncryptionKey', ChatEncryptionKeySchema);
