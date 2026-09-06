# DigiSky Portfolio — Redesigned

A fresh, clean redesign of the DigiSky agency portfolio. All 34 projects and their live links are unchanged.

## What changed in this redesign
- New visual identity: Fraunces (headline serif) + Inter (body), a calmer paper background, and the brand green used only as an accent — not everywhere.
- Hero now shows real screenshots from 3 of your own projects instead of a fake illustrated mockup, plus a scrolling strip of all 34 client names as social proof.
- Cleaner project grid, simplified pricing card, a "What we do" section (no fake numbering, since services aren't a sequence), and a redesigned footer with your Instagram link.
- `/admin` is now behind a password screen.

## Admin panel
Open `yourdomain.com/admin`.
- **Password:** `digisky2026` — change this any time by asking your developer to update the `ADMIN_PASSWORD` value in `src/main.jsx`.
- Changes made in `/admin` are saved to the shared Supabase `site_content` row and are loaded by the public website on refresh.

### One-time Supabase setup
1. Open the Supabase project connected in `.env`.
2. Open **SQL Editor** and run the contents of `supabase-schema.sql`.
3. Commit and deploy the app with the commands below.

The app keeps a local browser fallback if the database is temporarily unavailable. The current password gate is client-side only; use Supabase Auth and server-side policies before treating this as a security boundary for sensitive content.

## Run locally
```bash
npm install
npm run dev
```

## Deploy
This project is already set up for Vercel (see `vercel.json`, which routes `/admin` correctly). If you already have this connected to Vercel, just replace the old project files with these and redeploy the same way you did before — no new hosting or account needed.

If you're not sure how, the easiest path:
1. Run `npm run build` (or use the pre-built `dist` folder already included).
2. Upload the contents of `dist/` to your existing host, or drag-and-drop the `dist` folder into Vercel's dashboard.

## Thumbnail note
Live thumbnails use Thum.io's free screenshot service. If a screenshot fails to load, a local fallback image is used instead.
