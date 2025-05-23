// model/profile.model.ts
import { model, Schema, Types } from 'mongoose';

export interface IProfile {
  firstName: string;
  lastName?: string;
  bio?: string;
  userId?: Types.ObjectId;
  avatarUrl?: string;
  privacyLastSeen: 'everyone' | 'contacts' | 'nobody';
  privacyPhoto: 'everyone' | 'contacts' | 'nobody';
}

const ProfileSchema = new Schema<IProfile>(
  {
    firstName: { type: String, required: true, trim: true, maxlength: 64 },
    lastName: { type: String, trim: true, maxlength: 64 },
    bio: { type: String, maxlength: 500 },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    avatarUrl: {
        type: String,
        default: '',
        validate: {
          validator: function (v: any) {
            return /^https?:\/\/.+/.test(v);
          },
          message: (props: any) => `${props.value} n'est pas une URL valide !`
        }
      },
    privacyLastSeen: {
      type: String,
      enum: ['everyone', 'contacts', 'nobody'],
      default: 'everyone',
    },
    privacyPhoto: {
      type: String,
      enum: ['everyone', 'contacts', 'nobody'],
      default: 'everyone',
    },
  },
  { _id: true, versionKey: false }
);

export const Profile = model<IProfile>('Profile', ProfileSchema);