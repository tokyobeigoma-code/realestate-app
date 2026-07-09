# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the Vite dev server
- `npm run build` — production build (outputs to `dist/`)
- `npm run preview` — preview the production build locally

No lint or test runner is configured yet.

## Architecture

- **Stack**: React + Vite, React Router (`react-router-dom`), Supabase (`@supabase/supabase-js`) for auth.
- **Auth flow**: `src/context/AuthContext.jsx` wraps the app and exposes the current Supabase `session` via `useAuth()`, populated from `supabase.auth.getSession()` and kept in sync with `supabase.auth.onAuthStateChange`. `src/components/ProtectedRoute.jsx` reads that context and redirects to `/login` when there is no session.
- **Routes** (`src/App.jsx`): `/login`, `/signup` (public), `/properties` (wrapped in `ProtectedRoute`, shows dummy property cards). Unknown paths redirect to `/properties`, which then bounces to `/login` if unauthenticated.
- **Supabase client**: `src/supabaseClient.js` creates the client from `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` env vars (see `.env.example`). Real values live in the untracked `.env`.
- **Property data is currently hardcoded** in `src/pages/PropertyList.jsx` (no Supabase table/query behind it yet).

## Git workflow

- This repo's remote is `origin` → https://github.com/tokyobeigoma-code/realestate-app.git
- **Every time code is changed, commit and push to GitHub.** Do not leave changes uncommitted/unpushed at the end of a work session.
- Typical flow after a change:
  ```bash
  git add <changed files>
  git commit -m "<concise message>"
  git push origin <branch>
  ```
- Prefer small, frequent commits over large batched ones so pushes stay incremental.
