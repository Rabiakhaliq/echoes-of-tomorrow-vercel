import mongoose from 'mongoose';

const timelineEventSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('TimelineEvent', timelineEventSchema);
