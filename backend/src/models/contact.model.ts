import { model, Schema, Types } from "mongoose";

export interface IContact extends Document {
    userId: Types.ObjectId;
    contactId: Types.ObjectId;
    alias?: string;
    createdAt: Date;
  }
  
  const ContactSchema = new Schema<IContact>(
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      contactId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      alias: { type: String, trim: true, maxlength: 64 },
      createdAt: { type: Date, default: Date.now },
    },
    {
      collection: 'contacts',
      timestamps: false,
    }
  );
  
  ContactSchema.index({ userId: 1, contactId: 1 }, { unique: true });
  
  export const ContactModel = model<IContact>('Contact', ContactSchema);