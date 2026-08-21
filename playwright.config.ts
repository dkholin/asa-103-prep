import { defineConfig } from '@playwright/test';

const externalBaseURL = process.env.E2E_BASE_URL;
const localPort = process.env.E2E_PORT ?? '4173';
const localBaseURL = `http://127.0.0.1:${localPort}`;

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
    : {
        command: `VITE_E2E_FAKE_CLOUD=true npm run build && npm run preview -- --port ${localPort}`,
        url: localBaseURL,
        reuseExistingServer: true,
        timeout: 120_000,
      },
});
