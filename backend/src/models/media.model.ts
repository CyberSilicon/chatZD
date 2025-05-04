import { model, Schema, Types } from "mongoose";

// model/media.model.ts
export interface IMedia extends Document {
    url: string;
    type: 'image' | 'video' | 'audio' | 'file';
    uploadedBy: Types.ObjectId;
    uploadedAt: Date;
    size: number;
  }
  
  const MediaSchema = new Schema<IMedia>(
    {
      url: { type: String, required: true },
      type: { type: String, enum: ['image', 'video', 'audio', 'file'], required: true },
      uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      uploadedAt: { type: Date, default: Date.now },
      size: { type: Number, required: true },
    },
    {
      collection: 'media',
      timestamps: false,
    }
  );
  
  export const MediaModel = model<IMedia>('Media', MediaSchema);
  