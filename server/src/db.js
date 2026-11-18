import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn('[db] MONGODB_URI not set: serving in-memory data');
    return false;
  }
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('[db] MongoDB connected');
    return true;
  } catch (err) {
    console.error('[db] connection failed, falling back to in-memory data:', err.message);
    return false;
  }
}

export const isDBConnected = () => mongoose.connection.readyState === 1;
