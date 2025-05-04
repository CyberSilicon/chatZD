import { Schema, model, Document, Types } from 'mongoose';

export type ReceiptStatus = 'sent' | 'delivered' | 'read';

export interface IMessageReceipt extends Document {
  messageId: Types.ObjectId;
  userId: Types.ObjectId;
  status: ReceiptStatus;
  timestamp: Date;
}

const MessageReceiptSchema = new Schema<IMessageReceipt>(
  {
    messageId: { type: Schema.Types.ObjectId, ref: 'Message', required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    status: { type: String, enum: ['sent', 'delivered', 'read'], required: true },
    timestamp: { type: Date, default: Date.now, immutable: true },
  },
  {
    collection: 'message_receipts',
    timestamps: false,
  }
);

MessageReceiptSchema.index({ messageId: 1, userId: 1 }, { unique: true });

export const MessageReceiptModel = model<IMessageReceipt>('MessageReceipt', MessageReceiptSchema)