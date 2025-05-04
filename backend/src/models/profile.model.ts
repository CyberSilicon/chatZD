const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      maxlength: 64,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 64,
      trim: true,
    },
    bio: {
      type: String,
      default: '',
      trim: true,
    },
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
      required: true,
      default: 'everyone',
    },
    privacyPhoto: {
      type: String,
      enum: ['everyone', 'contacts', 'nobody'],
      required: true,
      default: 'everyone',
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('profile', profileSchema);
