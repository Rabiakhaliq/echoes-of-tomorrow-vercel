import 'dotenv/config';
import http from 'http';
import app from './api/_lib/app.js';
import { connectDB } from './api/_lib/config/db.js';

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB();
  http.createServer(app).listen(PORT, () => {
    console.log(`Local API server running on http://localhost:${PORT}`);
    console.log('(This is the same Express app that runs as a Vercel serverless function in production.)');
  });
}

start().catch((err) => {
  console.error('Failed to start local API server:', err.message);
  process.exit(1);
});
