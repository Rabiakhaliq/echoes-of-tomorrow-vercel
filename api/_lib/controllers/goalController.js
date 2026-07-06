import Goal from '../models/Goal.js';

export async function createGoal(req, res, next) {
  try {
    const { text, progress } = req.body;

    if (!text) {
      return res.status(400).json({ message: 'Goal text is required' });
    }

    const goal = await Goal.create({ user: req.user._id, text, progress });
    res.status(201).json(goal);
  } catch (err) {
    next(err);
  }
}

export async function getGoals(req, res, next) {
  try {
    const goals = await Goal.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(goals);
  } catch (err) {
    next(err);
  }
}

export async function updateGoal(req, res, next) {
  try {
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    res.json(goal);
  } catch (err) {
    next(err);
  }
}

export async function deleteGoal(req, res, next) {
  try {
    const goal = await Goal.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    res.json({ message: 'Goal deleted' });
  } catch (err) {
    next(err);
  }
}
