import mongoose from 'mongoose';

const letterSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true },
    mood: {
      type: String,
      enum: ['happy', 'sad', 'excited', 'confused', 'hopeful', 'proud', 'calm', 'stressed'],
      default: 'hopeful',
    },
    media: [
      {
        type: { type: String, enum: ['photo', 'video', 'voice'] },
        url: String, // Cloudinary URL, added in the media upload phase
      },
    ],
    location: { type: String },
    openDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['sealed', 'ready', 'opened'],
      default: 'sealed',
    },
    aiReflection: { type: String }, // filled in by the scheduler/AI job once opened
  },
  { timestamps: true }
);

letterSchema.index({ user: 1, openDate: 1 });

export default mongoose.model('Letter', letterSchema);
