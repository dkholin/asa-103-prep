# ASA 103 Prep

Local study tool for the ASA 103 (Basic Coastal Cruising) exam. Arc 1 covers a
vertical slice: Navigation Rules / Lights practice with real, sourced graphics.

## What it does

- **Dashboard** — overall and per-topic readiness, recommended next practice.
- **Topic practice** — answer, submit, get feedback + explanation, skip, continue.
- **Missed questions** — wrong or skipped questions queue for review; a correct
  answer clears them.
- **Mock exam** — a short exam that withholds all feedback until submission.
- **Account-backed progress** — Google sign-in or a typed email OTP, with
  per-user progress stored in Supabase and protected by Row Level Security.
- **Temporary beta access** — a shipped derived code identifier can unlock
  local-device-only progress when Supabase is unavailable. This convenience
  gate is not authentication and cannot access cloud rows.
- **Optional onboarding** — three questions about exam timing, course status,
  and sailing experience. Every one of them can be skipped.
- **Product analytics** — a small semantic event set and a conservatively masked
  session replay in PostHog, identified only by the Supabase user UUID. Form
  inputs are masked and no email address is sent to analytics. Supabase remains
  the source of truth for learner state; analytics is observational only.

Readiness is deliberately simple: a question is "solid" when your most recent
answer to it was correct.

## Running

```bash
npm install
npm run dev        # dev server
npm run build      # production build (dist/)
npm run preview    # serve the production build on :4173
npm run beta-code  # generate a plaintext code + derived identifier
```

Authentication requires the browser-public Supabase values documented in
`.env.example`; analytics requires the browser-public PostHog values documented
there too, and falls back to a no-op client when they are absent, so the study
flow works without them. Live project setup and verification are described in
`docs/beta-foundation/PHASE2_SETUP.md` and `PHASE3_SETUP.md`.
Authentication reliability rollout and owner acceptance are tracked in
`docs/beta-foundation/AUTH_BETA_ROLLOUT.md`.

## Testing

```bash
npm test           # Vitest: engine logic + content/asset integrity
npm run test:e2e   # Playwright: user flows against the production build
```

## Content & assets

Questions live in `src/content/questions.ts` as data (COLREGS-based, sourced
per question). Visual assets live in `public/assets/`; every asset's
provenance (source, license, attribution) is recorded in
`src/content/asset-manifest.json` and validated by the content tests.
USCG Navigation Rules illustrations are US-government public domain; encounter
diagrams and night scenes are purpose-built project-original SVGs.
