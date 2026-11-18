import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { connectDB, isDBConnected } from './db.js';
import projectsRouter from './routes/projects.js';
import contactRouter from './routes/contact.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 5050;
const isProd = process.env.NODE_ENV === 'production';

const app = express();
app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '10kb' }));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', data: isDBConnected() ? 'mongodb' : 'memory', uptime: process.uptime() });
});
app.use('/api/projects', projectsRouter);
app.use(
  '/api/contact',
  rateLimit({ windowMs: 15 * 60 * 1000, limit: 5, standardHeaders: 'draft-7', legacyHeaders: false }),
  contactRouter
);
app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found' }));

// In production, one Node process serves both the API and the built React app.
if (isProd) {
  const dist = path.resolve(__dirname, '../../client/dist');
  app.use(express.static(dist, { maxAge: '1y', index: false }));
  app.get(/^(?!\/api).*/, (_req, res) => res.sendFile(path.join(dist, 'index.html')));
}

// Express 5 forwards rejected async handlers here automatically.
app.use((err, _req, res, _next) => {
  console.error(err);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({ error: status < 500 ? err.message : 'Internal server error' });
});

await connectDB();
const server = app.listen(PORT, () => console.log(`[api] listening on http://localhost:${PORT}`));
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`[api] port ${PORT} is already in use. Set PORT in server/.env to a free port.`);
  } else {
    console.error(err);
  }
  process.exit(1);
});
