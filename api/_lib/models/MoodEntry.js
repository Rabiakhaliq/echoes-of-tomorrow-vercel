import mongoose from 'mongoose';

const moodEntrySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    mood: { type: Number, min: 1, max: 5, required: true }, // 1 = lowest, 5 = happiest
    label: { type: String, trim: true },
    letter: { type: mongoose.Schema.Types.ObjectId, ref: 'Letter' }, // optional, if derived from a letter
  },
  { timestamps: true }
);

export default mongoose.model('MoodEntry', moodEntrySchema);
