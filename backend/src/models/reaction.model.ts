import { Schema, model, Document, Types } from 'mongoose';

export interface IReaction extends Document {
  messageId: Types.ObjectId;
  userId: Types.ObjectId;
  emoji: string;
  createdAt: Date;
}

const ReactionSchema = new Schema<IReaction>(
  {
    messageId: { type: Schema.Types.ObjectId, ref: 'Message', required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    emoji: { type: String, required: true, maxlength: 10 },
    createdAt: { type: Date, default: Date.now, immutable: true },
  },
  {
    collection: 'reactions',
    timestamps: false,
  }
);

ReactionSchema.index({ messageId: 1, emoji: 1 });

export const ReactionModel = model<IReaction>('Reaction', ReactionSchema);
