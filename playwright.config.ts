import { defineConfig } from '@playwright/test';

const externalBaseURL = process.env.E2E_BASE_URL;
const localPort = process.env.E2E_PORT ?? '4173';
const localBaseURL = `http://127.0.0.1:${localPort}`;
// React only double-invokes StrictMode effects in development, so the
// once-only firing invariants need a development server as well as the
// production preview the rest of the suite runs against.
const devPort = process.env.E2E_DEV_PORT ?? '5174';
// A third build keeps the fake cloud but wires up the real PostHog client
// against a stubbed host, because the sink the rest of the suite asserts
// against replaces the transport and so can never catch a transport failure.
const transportPort = process.env.E2E_TRANSPORT_PORT ?? '4174';
export const TRANSPORT_HOST = 'https://analytics.e2e.test';
export const TRANSPORT_KEY = 'phc_e2etransportkeyabcdefghijk';

export const transportBaseURL = `http://127.0.0.1:${transportPort}/asa-103-prep/`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: externalBaseURL ?? localBaseURL,
    trace: 'retain-on-failure',
  },
  webServer: externalBaseURL
    ? undefined
    : [
        {
          command: `VITE_E2E_FAKE_CLOUD=true npm run build && npm run preview -- --port ${localPort}`,
          url: localBaseURL,
          reuseExistingServer: true,
          timeout: 120_000,
        },
        {
          command: `VITE_E2E_FAKE_CLOUD=true npm run dev -- --port ${devPort} --strictPort`,
          url: `http://127.0.0.1:${devPort}/asa-103-prep/`,
          reuseExistingServer: true,
          timeout: 120_000,
        },
        {
          command:
            `VITE_E2E_FAKE_CLOUD=true VITE_E2E_REAL_ANALYTICS=true ` +
            `VITE_POSTHOG_KEY=${TRANSPORT_KEY} VITE_POSTHOG_HOST=${TRANSPORT_HOST} ` +
            `npx vite build --outDir dist-transport && ` +
            `npx vite preview --outDir dist-transport --host 127.0.0.1 --strictPort --port ${transportPort}`,
          url: `http://127.0.0.1:${transportPort}/asa-103-prep/`,
          reuseExistingServer: true,
          timeout: 120_000,
        },
      ],
});
