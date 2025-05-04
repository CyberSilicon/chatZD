// model/call.model.ts
import { Schema, model, Document, Types } from 'mongoose';

export type CallType = 'audio' | 'video';

export interface ICall extends Document {
  chatId: Types.ObjectId;
  initiatorId: Types.ObjectId;
  participants: Types.ObjectId[];
  callType: CallType;
  startedAt: Date;
  endedAt?: Date;
}

const CallSchema = new Schema<ICall>(
  {
    chatId: { type: Schema.Types.ObjectId, ref: 'Chat', required: true, index: true },
    initiatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    callType: { type: String, enum: ['audio', 'video'], required: true },
    startedAt: { type: Date, default: Date.now, immutable: true },
    endedAt: { type: Date },
  },
  {
    collection: 'calls',
    timestamps: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// index for querying calls by chat
CallSchema.index({ chatId: 1, startedAt: -1 });

export const CallModel = model<ICall>('Call', CallSchema);
