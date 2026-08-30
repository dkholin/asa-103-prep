import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { SinkAnalyticsClient, type AnalyticsRecord } from './lib/analytics';
import { createAnalyticsClient } from './lib/analytics-posthog';
import {
  consumeAuthCallbackError,
  createSupabaseGateway,
  readPublicSupabaseConfig,
  UnavailableCloudGateway,
} from './lib/cloud';
import { FakeCloudGateway } from './lib/fake-cloud';
import './styles.css';

declare global {
  interface Window {
    /** Present only in E2E builds; the sink browser tests assert against. */
    __analyticsEvents?: AnalyticsRecord[];
  }
}

const config = readPublicSupabaseConfig();
const authCallbackMessage = consumeAuthCallbackError();
const isE2E = import.meta.env.VITE_E2E_FAKE_CLOUD === 'true';
const gateway = isE2E
  ? new FakeCloudGateway()
  : config
    ? createSupabaseGateway(config)
    : new UnavailableCloudGateway();

// The E2E code has no relationship to the shipped beta code. Its plaintext is
// committed only in browser tests; production builds never accept it.
const E2E_BETA_CODE_ID = 'W_vhusj391YPFO2gKX967au9zrTQO-XOuHGP5Oke3Xc';

// E2E builds never reach the real PostHog project. Routing them to an in-page
// sink is what lets browser tests assert exact firing, ordering, and property
// values — but a sink also replaces the transport, so it can never catch a
// transport regression. The transport build keeps the fake cloud and points
// the real client at a stubbed host instead.
const useRealAnalytics = import.meta.env.VITE_E2E_REAL_ANALYTICS === 'true';
const analytics = isE2E && !useRealAnalytics
  ? new SinkAnalyticsClient((window.__analyticsEvents = []))
  : createAnalyticsClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App
      gateway={gateway}
      analytics={analytics}
      authCallbackMessage={authCallbackMessage}
      allowedBetaCodeIds={isE2E ? [E2E_BETA_CODE_ID] : undefined}
    />
  </StrictMode>,
);
