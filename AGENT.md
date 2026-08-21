# Agent guide

ASA 103 Prep is a React/Vite study application. The app is in `src/`, question
content is in `src/content/`, browser tests are in `e2e/`, and static learning
assets are in `public/assets/`.

## Start here

Read `docs/beta-foundation/PROJECT.md`, `PHASES.md`, `DECISIONS.md`, and
`TESTING.md`. `PHASES.md` is the single source of truth for current status and
blocking findings.

```bash
npm ci
npm run dev
npm test
npm run build
npm run preview
npm run test:e2e
```

Development and preview servers print their local URL. The production build
uses `/asa-103-prep/` unless `VITE_BASE_PATH` overrides it at build time.

## Operating model

Each phase starts in a fresh CONTROL chat. CONTROL owns scope and decisions,
assigns one Builder, reviews the result, then assigns one independent Verifier.
The Builder never certifies their own work. CONTROL resolves material findings,
updates `PHASES.md`, and closes the phase. Do not run parallel Builders or begin
the next phase in the same CONTROL chat.

## Safety and completion

- Stay inside the current phase; classify findings as required now, useful
  later, or irrelevant.
- Do not commit secrets. Browser code may receive only public/publishable keys;
  never use a Supabase service-role key in the frontend.
- Do not add payments, custom auth/backends, invitation administration, or
  unrelated product redesign.
- Preserve user-owned/unrelated working-tree changes.
- Before declaring implementation ready, run `npm ci`, `npm test`,
  `npm run build`, and `npm run test:e2e`, plus the live/external checks required
  by `TESTING.md`. Independent verification is still required.
