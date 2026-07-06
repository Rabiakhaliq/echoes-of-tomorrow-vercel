import Letter from './models/Letter.js';
import User from './models/User.js';
import { sendLetterArrivedEmail } from './utils/mailer.js';

export async function checkDueLetters() {
  const dueLetters = await Letter.find({
    status: 'sealed',
    openDate: { $lte: new Date() },
  });

  if (dueLetters.length === 0) return { updated: 0 };

  for (const letter of dueLetters) {
    letter.status = 'ready'; // becomes fully readable; "opened" is set when the user actually views it
    await letter.save();

    const user = await User.findById(letter.user);
    if (user) {
      await sendLetterArrivedEmail(user.email, letter.title);
    }
  }

  return { updated: dueLetters.length };
}
