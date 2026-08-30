# Testing model

Testing is proportional to this small web application's risk. Builder evidence
does not replace independent Verifier acceptance.

## Permanent automated checks

- `npm test`: Vitest tests for progress logic, shuffle/mock selection, question
  content, asset existence, provenance, and integrity.
- `npm run build`: TypeScript checking plus the production Vite build.
- `npm run test:e2e`: Playwright across three servers, so it runs three builds.
  The preview server covers navigation, practice, review, mock exams,
  persistence/reload, bounded auth/OTP operations, beta/cloud isolation,
  onboarding, the semantic event taxonomy, the hosted base
  path, and static build assets. A dev server exists solely to exercise React
  `StrictMode` double-invocation, which the production build cannot reproduce
  and which is the only thing that catches a lost once-only guard. A separate
  transport build runs the real PostHog client against a stubbed host to cover
  capture transport, session-replay masking, and callback-URL hygiene.
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
prove a hosted deployment, OAuth/SMTP delivery, Supabase RLS/user
isolation, cross-device persistence, PostHog ingestion/identity, or replay
masking. Those claims require live test accounts/services and independent
verification in the phase that introduces them. Phase 1 has no runtime external
service or secret configuration; GitHub Pages itself must be checked live.

## Analytics checks that pass without proving anything

Phase 3 hit the same failure three times: a check that reports success because
it observed nothing. Treat any analytics assertion as suspect until it is shown
to fail when the behavior is broken.

- **The in-page sink replaces the transport.** Sink-based specs prove firing
  logic and say nothing about whether a capture leaves the page. Only
  `e2e/analytics-transport.spec.ts` exercises the real client.
- **posthog-js drops captures from automated browsers**, checking the
  user-agent string, `navigator.userAgentData.brands`, and `navigator.webdriver`
  independently. Neutralize all three in automation, or the run transmits
  nothing and every privacy assertion passes vacuously. Live ingestion is
  confirmed in a real browser.
- **rrweb compresses replay payloads twice**: a full snapshot's `data` is a
  gzip latin1 binary string, and inside uncompressed mutation entries `texts`,
  `attributes`, `adds`, and `removes` are each independently gzipped. Scanning
  the raw wire for a masked value always "passes". Inflate first.
- **Every absence assertion needs a positive control** — something that must be
  present in the same corpus — so an empty, unreadable, or still-compressed
  payload fails loudly instead of satisfying the check.
- **Confirm the server under test is actually running.** A dead preview server
  produces confident green results.
