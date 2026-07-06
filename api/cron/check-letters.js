import { connectDB } from '../_lib/config/db.js';
import { checkDueLetters } from '../_lib/checkDueLetters.js';

// Vercel Cron calls this endpoint on the schedule defined in vercel.json.
// It authenticates the request using CRON_SECRET so random visitors can't
// trigger it by just hitting the URL.
export default async function handler(req, res) {
  const authHeader = req.headers.authorization;
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    await connectDB();
    const result = await checkDueLetters();
    res.status(200).json({ message: 'Checked for due letters', ...result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
