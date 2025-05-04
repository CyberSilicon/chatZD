import { Schema, model, Document, Types } from 'mongoose';

export interface ICallParticipant extends Document {
  callId: Types.ObjectId;
  userId: Types.ObjectId;
  joinedAt: Date;
  leftAt?: Date;
}

const CallParticipantSchema = new Schema<ICallParticipant>(
  {
    callId: { type: Schema.Types.ObjectId, ref: 'Call', required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    joinedAt: { type: Date, default: Date.now, immutable: true },
    leftAt: { type: Date },
  },
  {
    collection: 'call_participants',
    timestamps: false,
  }
);

CallParticipantSchema.index({ callId: 1, userId: 1 }, { unique: true });

export const CallParticipantModel = model<ICallParticipant>('CallParticipant', CallParticipantSchema);