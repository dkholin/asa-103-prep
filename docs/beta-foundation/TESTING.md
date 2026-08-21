# Testing model

Testing is proportional to this small web application's risk. Builder evidence
does not replace independent Verifier acceptance.

## Permanent automated checks

- `npm test`: Vitest tests for progress logic, shuffle/mock selection, question
  content, asset existence, provenance, and integrity.
- `npm run build`: TypeScript checking plus the production Vite build.
- `npm run test:e2e`: Playwright against `npm run preview`; covers navigation,
  practice, review, mock exams, persistence/reload, the hosted base path, and
  static build assets.
- `.github/workflows/deploy.yml`: clean-installs, tests, builds, installs Chromium,
  scans tracked files for common privileged-secret material, and runs browser
  tests before a `main` deployment can proceed.

Every phase must run `npm ci`, `npm test`, `npm run build`, and
`npm run test:e2e`. Keep targeted tests for changed behavior rather than adding
redundant frameworks.

## Browser and live checks

For Phase 1, smoke-check `npm run dev`; serve the built application with
`npm run preview`; open `/asa-103-prep/` directly; reload it; exercise dashboard,
practice, review, and mock flows; and confirm representative JS, CSS, SVG, and
raster assets return successfully. After deployment, repeat the URL/reload and
representative flow checks at `https://dkholin.github.io/asa-103-prep/` and
confirm the GitHub Actions run succeeded.

The repeatable hosted smoke command is below. Since browser-test contexts have
no existing Supabase session, the hosted deployment check expects the signed-out
authentication entry, verifies the Pages base-path assets, and reloads it. The
normal local E2E suite uses its compile-time cloud double and still requires the
authenticated dashboard; neither smoke substitutes for live provider login or
cross-device checks.

```bash
E2E_BASE_URL=https://dkholin.github.io npm run test:e2e -- e2e/deployment.spec.ts
```

Later phases require real supported-browser checks for redirects, signed-out and
signed-in states, cross-browser/device progress recovery, analytics duplication,
and mobile/desktop beta flows.

## Security and external-service evidence

Before every phase closes, inspect tracked changes and scan tracked files for
private-key markers and privileged tokens (including Supabase service-role and
analytics personal API keys). Environment files are ignored by default. Vite
`VITE_*` values are browser-public and must never contain secrets.

Unit tests may mock storage and service clients for edge cases. Mocks cannot
prove a hosted deployment, OAuth/magic-link redirects, Supabase RLS/user
isolation, cross-device persistence, PostHog ingestion/identity, or replay
masking. Those claims require live test accounts/services and independent
verification in the phase that introduces them. Phase 1 has no runtime external
service or secret configuration; GitHub Pages itself must be checked live.
