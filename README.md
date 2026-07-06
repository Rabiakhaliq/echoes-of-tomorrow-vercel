# Echoes of Tomorrow — Vercel (frontend + backend, one project, no card required)

This version combines the frontend and backend into **one Vercel project**: the React
app builds as a static site, and the Express backend runs as Vercel serverless
functions under `/api`. One deploy, one URL, and Vercel's free Hobby tier never asks
for a credit card.

## Why this version exists

Render (a common free host for Node backends) sometimes asks for card verification
as a fraud-prevention measure, even on its free tier — this is a known, long-standing
quirk, not something wrong with your account specifically. Vercel's model is different:
since the backend runs as short-lived serverless functions rather than an
always-on server, it fits Vercel's genuinely-free Hobby tier with no card, ever.

## Project structure

```
├── src/               # React frontend (Vite)
├── api/
│   ├── [...path].js    # Catch-all — every /api/* request lands here, delegates to Express
│   ├── cron/
│   │   └── check-letters.js  # Runs daily (see vercel.json) — flips due letters to "ready"
│   └── _lib/
│       ├── app.js       # The Express app itself (routes, middleware) — same as before
│       ├── config/db.js # MongoDB connection, cached across warm serverless invocations
│       ├── models/      # Mongoose schemas
│       ├── controllers/ # Route handlers
│       ├── routes/      # Express routers
│       ├── middleware/  # Auth + error handling
│       └── utils/       # JWT signing, email sending
├── dev-server.js       # Runs api/_lib/app.js as a normal Express server, for local dev
└── vercel.json         # Declares the cron schedule for check-letters
```

## Local development

**Terminal 1 — backend:**
```bash
cp .env.example .env   # fill in MONGO_URI and JWT_SECRET
npm install
npm run dev:api
```
This starts the same Express app that runs on Vercel, as a normal local server on
`http://localhost:5000` — so local dev feels identical to before.

**Terminal 2 — frontend:**
```bash
npm run dev
```
Open `http://localhost:5173`. It automatically points at `http://localhost:5000/api`
in dev, and a relative `/api` path in production — no config needed either way.

## Deploying (free, no credit card)

### 1. Get a MongoDB Atlas connection string
If you don't already have one: free account at
[mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register), a
free M0 cluster, a database user, Network Access set to `0.0.0.0/0`, then copy the
connection string from **Connect → Drivers**.

### 2. Push this project to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
# create a new repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/echoes-of-tomorrow.git
git push -u origin main
```

### 3. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → sign up with GitHub (no card required for Hobby)
2. **Add New** → **Project** → select your repo (Vite is auto-detected)
3. Under **Environment Variables**, add:
   - `MONGO_URI` — your Atlas connection string
   - `JWT_SECRET` — any long random string
   - `CRON_SECRET` — any other long random string (protects the cron endpoint)
   - `EMAIL_USER` / `EMAIL_PASS` — optional, for real "letter arrived" emails
4. Click **Deploy**

You'll get one live URL, e.g. `https://echoes-of-tomorrow.vercel.app`, serving both
the app and its API.

### 4. Verify it
- Visit `https://your-url.vercel.app/api/health` → should show `{"status":"ok"}`
- Visit the site itself, sign up, write a letter — should all work end-to-end

## About the daily letter check

Instead of a constantly-running background process (which serverless functions can't
do), `vercel.json` schedules Vercel to call `/api/cron/check-letters` once a day. That
endpoint checks for letters whose `openDate` has passed and flips them to `ready`,
sending the arrival email if configured. Vercel Cron Jobs are included free on the
Hobby plan.

## Notes / limitations of this approach

- **Cold starts**: serverless functions "spin up" on request if idle — usually under a
  second on Vercel, much faster than a sleeping Render service, but still worth knowing.
- **MongoDB connections**: the connection is cached across warm invocations
  (`api/_lib/config/db.js`), which keeps this well within Atlas's free-tier connection
  limits under normal portfolio-project traffic.
- If you'd rather run the backend as a traditional always-on server instead (e.g. once
  Render's card issue is sorted, or on Railway/another host), the standalone
  `echoes-of-tomorrow-server` project (a plain Express + MongoDB app, no Vercel-specific
  code) is the one to use instead of this combined version.
