import mongoose from 'mongoose';

// Serverless functions can be reused ("warm") between requests, but each cold
// start runs this module fresh. Caching the connection on `global` means a
// warm invocation reuses the existing connection instead of opening a new one
// every time — without this, you can exhaust MongoDB Atlas's connection limit
// very quickly under any real traffic.
let cached = global._mongooseConn;

if (!cached) {
  cached = global._mongooseConn = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error('MONGO_URI is not set. Add it in your Vercel project environment variables.');

    cached.promise = mongoose.connect(uri).then((mongooseInstance) => mongooseInstance);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
