import Letter from '../models/Letter.js';

// Letters that are still "sealed" and not yet due don't return their full body —
// this is enforced server-side, not just hidden in the UI, so the rule can't be bypassed.
function serializeLetter(letter) {
  const obj = letter.toObject();
  const isDue = new Date(obj.openDate) <= new Date();

  if (obj.status === 'sealed' && !isDue) {
    obj.body = null;
    obj.locked = true;
  } else {
    obj.locked = false;
  }

  return obj;
}

export async function createLetter(req, res, next) {
  try {
    const { title, body, mood, media, location, openDate } = req.body;

    if (!title || !body || !openDate) {
      return res.status(400).json({ message: 'Title, body, and openDate are required' });
    }

    const letter = await Letter.create({
      user: req.user._id,
      title,
      body,
      mood,
      media,
      location,
      openDate,
    });

    res.status(201).json(letter);
  } catch (err) {
    next(err);
  }
}

export async function getLetters(req, res, next) {
  try {
    const letters = await Letter.find({ user: req.user._id }).sort({ openDate: 1 });
    res.json(letters.map(serializeLetter));
  } catch (err) {
    next(err);
  }
}

export async function getLetterById(req, res, next) {
  try {
    const letter = await Letter.findOne({ _id: req.params.id, user: req.user._id });

    if (!letter) {
      return res.status(404).json({ message: 'Letter not found' });
    }

    res.json(serializeLetter(letter));
  } catch (err) {
    next(err);
  }
}

export async function updateLetter(req, res, next) {
  try {
    const letter = await Letter.findOne({ _id: req.params.id, user: req.user._id });

    if (!letter) {
      return res.status(404).json({ message: 'Letter not found' });
    }

    if (letter.status !== 'sealed') {
      return res.status(400).json({ message: 'Cannot edit a letter that has already opened' });
    }

    Object.assign(letter, req.body);
    await letter.save();

    res.json(letter);
  } catch (err) {
    next(err);
  }
}

export async function deleteLetter(req, res, next) {
  try {
    const letter = await Letter.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!letter) {
      return res.status(404).json({ message: 'Letter not found' });
    }

    res.json({ message: 'Letter deleted' });
  } catch (err) {
    next(err);
  }
}
