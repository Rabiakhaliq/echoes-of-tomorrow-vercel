import TimelineEvent from '../models/TimelineEvent.js';

export async function createEvent(req, res, next) {
  try {
    const { title, description, date } = req.body;

    if (!title || !date) {
      return res.status(400).json({ message: 'Title and date are required' });
    }

    const event = await TimelineEvent.create({ user: req.user._id, title, description, date });
    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
}

export async function getEvents(req, res, next) {
  try {
    const events = await TimelineEvent.find({ user: req.user._id }).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    next(err);
  }
}

export async function deleteEvent(req, res, next) {
  try {
    const event = await TimelineEvent.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ message: 'Event deleted' });
  } catch (err) {
    next(err);
  }
}
