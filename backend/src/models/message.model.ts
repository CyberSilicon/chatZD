import { Schema, model, Document, Types } from 'mongoose';

export interface IMessage extends Document {
  chatId: Types.ObjectId;
  senderId: Types.ObjectId;
  text?: string;
  mediaIds?: Types.ObjectId[];
  replyTo?: Types.ObjectId;
  isForwarded: boolean;
  forwardedFrom?: Types.ObjectId;
  createdAt: Date;
  editedAt?: Date;
  deletedAt?: Date;
  ephemeralUntil?: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    chatId: { type: Schema.Types.ObjectId, ref: 'Chat', required: true, index: true },
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, trim: true },
    mediaIds: [{ type: Schema.Types.ObjectId, ref: 'Media' }],
    replyTo: { type: Schema.Types.ObjectId, ref: 'Message' },
    isForwarded: { type: Boolean, default: false },
    forwardedFrom: { type: Schema.Types.ObjectId, ref: 'Chat' },
    ephemeralUntil: { type: Date },
    createdAt: { type: Date, default: Date.now, immutable: true },
    editedAt: { type: Date },
    deletedAt: { type: Date },
  },
  {
    collection: 'messages',
    timestamps: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// compound index for pagination and retrieval
MessageSchema.index({ chatId: 1, createdAt: -1 });

export const MessageModel = model<IMessage>('Message', MessageSchema);
