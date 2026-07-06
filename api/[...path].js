import app from './_lib/app.js';
import { connectDB } from './_lib/config/db.js';

// Every request under /api/* lands here (Vercel's catch-all file routing).
// We ensure the (cached) DB connection is ready, then hand off to Express,
// which handles routing/controllers exactly like the standalone server did.
export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}
