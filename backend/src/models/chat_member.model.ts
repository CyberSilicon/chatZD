import { model, Schema, Types } from "mongoose";

export interface IChatMember extends Document {
    chatId: Types.ObjectId;
    userId: Types.ObjectId;
    role: 'member' | 'admin' | 'owner';
    joinedAt: Date;
    isMuted: boolean;
    muteExpiresAt?: Date;
  }
  
  const ChatMemberSchema = new Schema<IChatMember>(
    {
      chatId: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      role: { type: String, enum: ['member', 'admin', 'owner'], default: 'member' },
      joinedAt: { type: Date, default: Date.now },
      isMuted: { type: Boolean, default: false },
      muteExpiresAt: { type: Date },
    },
    {
      collection: 'chat_members',
      timestamps: false,
    }
  );
  
  ChatMemberSchema.index({ chatId: 1, userId: 1 }, { unique: true });
  
  export const ChatMemberModel = model<IChatMember>('ChatMember', ChatMemberSchema);
  