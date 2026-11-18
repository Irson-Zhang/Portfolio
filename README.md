# Irson's Portfolio: MERN Stack

A personal portfolio that covers every level of web development: semantic **HTML**, modern **CSS**, vanilla **JavaScript** APIs, **React**, and a **Node + Express + MongoDB** backend.

## Quick start

```bash
npm install          # installs client + server (npm workspaces)
npm run dev          # API on :5050, React on http://localhost:5173
```

MongoDB is optional. Without it, the API serves `shared/projects.json` from memory and keeps contact messages in memory.

To use a real database:

```bash
cp server/.env.example server/.env   # add your MongoDB Atlas URI
npm run seed                         # load projects into MongoDB
```

Production (a single Node process serves the API and the built React app):

```bash
npm run build && npm start           # http://localhost:5050
```

## Make it yours

| What | Where |
| --- | --- |
| Name, roles, tagline, email, socials, skills, timeline | `client/src/data/site.js` |
| Projects (shared by the API and the frontend fallback) | `shared/projects.json` |
| Colors, theme and spacing tokens | top of `client/src/styles/index.css` |

## What each level demonstrates

| Level | Where to look |
| --- | --- |
| **HTML** | Semantic landmarks, skip link, `dl` stats, labelled form, ARIA only where needed |
| **CSS** | Custom-property themes, `clamp()` fluid type, Grid `auto-fit`, `color-mix()`, scroll-driven progress bar (`animation-timeline`), 3D card tilt, `prefers-reduced-motion` |
| **JavaScript** | Canvas particle field, IntersectionObserver, ResizeObserver, MutationObserver, AbortController fetch |
| **React** | Custom hooks (`useTheme`, `useTypewriter`, `useReducedMotion`), reusable `Reveal`, controlled form with validation |
| **Node / Express** | Express 5 REST API, Helmet, CORS, rate limiting, honeypot, input validation, central error handler |
| **MongoDB** | Mongoose models, seed script, graceful in-memory fallback |

## API

| Method | Route | Notes |
| --- | --- | --- |
| GET | `/api/health` | status, plus whether data comes from MongoDB or memory |
| GET | `/api/projects?category=frontend` | `fundamentals`, `frontend` or `fullstack` |
| POST | `/api/contact` | `{ name, email, message }`, limited to 5 per 15 minutes |

## Deploy

- **Single service (simplest):** Render or Railway. Build command `npm install && npm run build`, start command `npm start`. Set `MONGODB_URI` and `NODE_ENV=production`.
- **Split:** frontend on Vercel or Netlify (`client/`), API on Render. Set `CLIENT_ORIGIN` to the frontend URL and point the client's `/api` calls at the API host.

## Next upgrades

1. Add real project screenshots and live/repo links in `shared/projects.json`.
2. Add an admin page (JWT auth) to read contact messages and manage projects through the API.
3. Send yourself an email when a message arrives (Resend or Nodemailer).
4. Add tests (Vitest + React Testing Library on the client, Supertest on the API) and a GitHub Actions CI workflow.
5. Move to TypeScript once you're comfortable with it.
