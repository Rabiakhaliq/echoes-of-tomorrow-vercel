import MoodEntry from '../models/MoodEntry.js';

export async function addMoodEntry(req, res, next) {
  try {
    const { mood, label, letter } = req.body;

    if (!mood) {
      return res.status(400).json({ message: 'A mood value (1-5) is required' });
    }

    const entry = await MoodEntry.create({ user: req.user._id, mood, label, letter });
    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
}

export async function getMoodHistory(req, res, next) {
  try {
    const entries = await MoodEntry.find({ user: req.user._id }).sort({ createdAt: 1 });
    res.json(entries);
  } catch (err) {
    next(err);
  }
}
