# ASA 103 Prep

Local study tool for the ASA 103 (Basic Coastal Cruising) exam. Arc 1 covers a
vertical slice: Navigation Rules / Lights practice with real, sourced graphics.

## What it does

- **Dashboard** — overall and per-topic readiness, recommended next practice.
- **Topic practice** — answer, submit, get feedback + explanation, skip, continue.
- **Missed questions** — wrong or skipped questions queue for review; a correct
  answer clears them.
- **Mock exam** — a short exam that withholds all feedback until submission.
- **Progress** persists in browser localStorage; no backend, no accounts.

Readiness is deliberately simple: a question is "solid" when your most recent
answer to it was correct.

## Running

```bash
npm install
npm run dev        # dev server
npm run build      # production build (dist/)
npm run preview    # serve the production build on :4173
```

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
