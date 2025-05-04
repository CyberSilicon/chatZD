import { Schema, model, Document, Types } from 'mongoose';

export type ChatType = 'private' | 'group' | 'channel';

export interface IChat extends Document {
  type: ChatType;
  title?: string;
  participants: Types.ObjectId[];
  admins?: Types.ObjectId[];
  createdBy: Types.ObjectId;
  lastMessage?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}


const ChatSchema = new Schema<IChat>(
  {
    type: { type: String, enum: ['private', 'group', 'channel'], required: true },
    title: { type: String, trim: true, maxlength: 128 },
    participants: [
      { type: Schema.Types.ObjectId, ref: 'User', required: true }
    ],
    admins: [
      { type: Schema.Types.ObjectId, ref: 'User' }
    ],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
  },
  {
    timestamps: true,
    collection: 'chats',
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index to quickly find chats for a user
ChatSchema.index({ participants: 1, updatedAt: -1 });

// Virtual for populated participants
ChatSchema.virtual('participantUsers', {
  ref: 'User',
  localField: 'participants',
  foreignField: '_id',
});

export const ChatModel = model<IChat>('Chat', ChatSchema);