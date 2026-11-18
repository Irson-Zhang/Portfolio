import { Router } from 'express';
import Message from '../models/Message.js';
import { isDBConnected } from '../db.js';

const router = Router();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const memoryInbox = [];

export function validateContact(body = {}) {
  const str = (v) => (typeof v === 'string' ? v.trim() : '');
  const data = { name: str(body.name), email: str(body.email), message: str(body.message) };
  const errors = {};
  if (data.name.length < 2 || data.name.length > 80) errors.name = 'Name must be 2–80 characters.';
  if (!EMAIL_RE.test(data.email) || data.email.length > 254) errors.email = 'Enter a valid email address.';
  if (data.message.length < 10 || data.message.length > 2000) errors.message = 'Message must be 10–2000 characters.';
  return { data, errors };
}

// POST /api/contact
router.post('/', async (req, res) => {
  // Honeypot: real users never fill the hidden "company" field.
  if (req.body?.company) return res.status(201).json({ ok: true });

  const { data, errors } = validateContact(req.body);
  if (Object.keys(errors).length) return res.status(400).json({ ok: false, errors });

  if (isDBConnected()) {
    await Message.create(data);
  } else {
    memoryInbox.push({ ...data, createdAt: new Date() });
    console.log('[contact] new message (in-memory):', data.email);
  }
  res.status(201).json({ ok: true });
});

export default router;
