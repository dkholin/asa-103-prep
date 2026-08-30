import { expect, test, type Page, type Request } from '@playwright/test';
import fs from 'node:fs';
import zlib from 'node:zlib';
import { TRANSPORT_HOST, TRANSPORT_KEY, transportBaseURL } from '../playwright.config';
import { AUTH_MATERIAL } from './helpers';

/**
 * Transport and session-replay cover for the real PostHog client.
 *
 * The rest of the suite asserts against an in-page sink, which replaces the
 * transport entirely — so it can prove what the application *decides* to
 * capture but never that a byte leaves the page, and never that replay is
 * running at all. This spec runs the actual `PostHogAnalyticsClient` against a
 * stubbed analytics host, serving posthog-js's own recorder bundle from
 * `node_modules` so rrweb genuinely records, and asserts on what is on the
 * wire.
 */

// posthog-js drops every capture from a viewer it classifies as a bot, and it
// checks three independent signals: `navigator.userAgent`, the brands in
// `navigator.userAgentData`, and `navigator.webdriver`. Playwright's userAgent
// option overrides only the first — `userAgentData.brands` still announces
// "HeadlessChrome" — so all three have to be presented as an ordinary desktop
// browser or this spec would pass vacuously by observing zero requests.
const REAL_USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36';

test.use({ userAgent: REAL_USER_AGENT });

test.skip(
  !!process.env.E2E_BASE_URL,
  'the stubbed analytics host is not part of a hosted deployment smoke check',
);

/** A magic-link callback in its real shape: a JWT and the refresh token in the hash. */
const CALLBACK_QUERY =
  '?signedOut=1&code=b7f1e9a2-auth' +
  '#access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLTEiLCJlbWFpbCI6ImxlYXJuZXJAZXhhbXBsZS50ZXN0In0.s1gnatur3' +
  '&expires_at=1787340000&expires_in=3600&refresh_token=r3fr3sh-t0ken&token_type=bearer&type=magiclink';

const ORIGIN_AND_PATH = transportBaseURL;

interface TransmittedEvent {
  event: string;
  properties: Record<string, unknown>;
  $set?: Record<string, unknown>;
  $set_once?: Record<string, unknown>;
}

interface Hit {
  path: string;
  body: string;
}

function decodeBody(request: Request): string {
  const buffer = request.postDataBuffer();
  let body = request.postData() ?? '';
  if (buffer) {
    try {
      body = zlib.gunzipSync(buffer).toString('utf8');
    } catch {
      body = buffer.toString('utf8');
    }
  }
  const form = /(?:^|&)data=([^&]+)/.exec(body);
  if (!form) return body;
  try {
    return Buffer.from(decodeURIComponent(form[1]), 'base64').toString('utf8');
  } catch {
    return body;
  }
}

/**
 * Remote config as PostHog returns it with replay switched on. Serving this,
 * rather than blanket-stubbing the host, is what lets recording actually
 * start: posthog-js learns replay is enabled from this response, and a stub
 * that also swallows the recorder bundle would silently keep replay off.
 */
const remoteConfig = JSON.stringify({
  token: TRANSPORT_KEY,
  supportedCompression: [],
  autocapture_opt_out: true,
  surveys: false,
  heatmaps: false,
  defaultIdentifiedOnly: false,
  flags: {},
  featureFlags: {},
  capturePerformance: false,
  errorTracking: { autocaptureExceptions: false },
  sessionRecording: { endpoint: '/s/', consoleLogRecordingEnabled: false, recorderVersion: 'v2' },
  analytics: { endpoint: '/i/v0/e/' },
  status: 1,
});

/**
 * rrweb payloads hide their text behind two layers of gzip: posthog compresses
 * a full snapshot's `data`, and inside an uncompressed mutation entry it
 * compresses `texts`, `attributes`, `adds`, and `removes` individually. Both
 * layers arrive as latin1 binary strings, not base64. Scanning the raw wire for
 * a masked value therefore always "passes" — it is reading compressed bytes —
 * so every replay assertion below runs against this inflated corpus, and pairs
 * the absence checks with a positive control that proves the corpus really
 * contains the screen under test.
 */
function inflateInto(value: unknown, out: string[], depth = 0) {
  if (depth > 12) return;
  if (typeof value === 'string') {
    out.push(value);
    const buffer = Buffer.from(value, 'latin1');
    if (buffer.length > 2 && buffer[0] === 0x1f && buffer[1] === 0x8b) {
      try {
        inflateInto(zlib.gunzipSync(buffer).toString('utf8'), out, depth + 1);
      } catch {
        // A string that merely starts like a gzip header. Already recorded.
      }
      return;
    }
    if (/^[[{]/.test(value.trimStart())) {
      try {
        inflateInto(JSON.parse(value), out, depth + 1);
      } catch {
        // Ordinary text, not a nested payload.
      }
    }
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) inflateInto(item, out, depth + 1);
    return;
  }
  if (value && typeof value === 'object') {
    for (const item of Object.values(value)) inflateInto(item, out, depth + 1);
    return;
  }
  if (value !== undefined && value !== null) out.push(String(value));
}

function replayCorpus(hits: Hit[]): string {
  const out: string[] = [];
  for (const hit of hits) inflateInto(hit.body, out);
  return out.join('\n');
}

async function interceptAnalytics(page: Page) {
  const hits: Hit[] = [];

  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false });
    Object.defineProperty(navigator, 'userAgentData', {
      get: () => ({
        brands: [
          { brand: 'Chromium', version: '140' },
          { brand: 'Google Chrome', version: '140' },
        ],
        mobile: false,
        platform: 'macOS',
      }),
    });
  });

  await page.route(`${TRANSPORT_HOST}/**`, async (route) => {
    const url = new URL(route.request().url());
    hits.push({ path: url.pathname + url.search, body: decodeBody(route.request()) });
    const headers = { 'access-control-allow-origin': '*' };

    // Serve posthog-js's own bundles from node_modules so the recorder is the
    // real one rather than an empty file.
    const asset = /\/static\/[^/]+\/(.+\.js)$/.exec(url.pathname);
    if (asset) {
      const local = `node_modules/posthog-js/dist/${asset[1]}`;
      const body = fs.existsSync(local) ? fs.readFileSync(local, 'utf8') : '';
      return route.fulfill({ status: 200, contentType: 'application/javascript', headers, body });
    }
    if (url.pathname.endsWith('.js')) {
      return route.fulfill({ status: 200, contentType: 'application/javascript', headers, body: '' });
    }
    return route.fulfill({ status: 200, contentType: 'application/json', headers, body: remoteConfig });
  });

  // Event, batch, and replay endpoints each use a different envelope.
  const events = (): TransmittedEvent[] =>
    hits.flatMap((hit) => {
      try {
        const parsed: unknown = JSON.parse(hit.body);
        const list = Array.isArray(parsed)
          ? parsed
          : ((parsed as { batch?: unknown[] }).batch ?? [parsed]);
        return (list as TransmittedEvent[]).filter((entry) => typeof entry?.event === 'string');
      } catch {
        return [];
      }
    });

  return {
    hits,
    events,
    names: () => events().map((event) => event.event),
    wire: () => hits.map((hit) => hit.body).join('\n'),
    corpus: () => replayCorpus(hits),
    paths: () => hits.map((hit) => hit.path),
  };
}

/** Asserts the automation is hidden, so a fingerprint regression fails loudly rather than silently. */
async function expectNonBotFingerprint(page: Page) {
  expect(await page.evaluate(() => navigator.webdriver)).toBe(false);
  expect(
    await page.evaluate(
      () =>
        (
          navigator as unknown as { userAgentData?: { brands: { brand: string }[] } }
        ).userAgentData?.brands.map((b) => b.brand),
    ),
  ).not.toContain('HeadlessChrome');
}

test('a captured event actually reaches the wire', async ({ page }) => {
  const analytics = await interceptAnalytics(page);
  await page.goto(transportBaseURL);
  await expect(page.getByRole('heading', { name: /Learn the material/ })).toBeVisible();
  await expectNonBotFingerprint(page);

  await expect.poll(analytics.names, { timeout: 20_000 }).toContain('beta_opened');
  const opened = analytics.events().find((e) => e.event === 'beta_opened')!;
  expect(opened.properties.auth_state).toBe('signed-in');
  expect(analytics.wire()).toContain('"api_key"');
});

test('session replay records, and no email reaches the wire', async ({ page }) => {
  const analytics = await interceptAnalytics(page);
  await page.goto(`${transportBaseURL}?signedOut=1`);
  await expect(page.getByRole('heading', { name: 'Sign in to study' })).toBeVisible();
  await expectNonBotFingerprint(page);

  await page.getByLabel('Email address').fill('secret-learner@example.test');
  await page.getByRole('button', { name: 'Send code' }).click();
  await page.getByLabel('Enter the code we sent to your email').fill('12345678');
  await page.getByRole('button', { name: 'Verify', exact: true }).click();
  // The signed-in header no longer renders the account's email address at all,
  // so there is nothing on screen for the recorder to have to mask.
  await expect(page.getByRole('heading', { name: /Learn the material/ })).toBeVisible();
  await expect(page.getByText('learner@example.test')).toHaveCount(0);
  await page.getByRole('button', { name: 'Practice', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Overall progress' })).toBeVisible();
  await page
    .locator('li.topic-row', { hasText: 'Signal Flags' })
    .getByRole('button', { name: 'Practice' })
    .click();
  await expect(page.getByRole('region', { name: 'Practice question' })).toBeVisible();

  // Replay is enabled by the remote-config response, so disabling the request
  // that carries it — as an earlier revision did to close a URL leak — turns
  // recording off entirely. This is the assertion that catches that.
  await expect.poll(() => analytics.paths().filter((p) => p.startsWith('/s/')), {
    timeout: 30_000,
  }).not.toHaveLength(0);
  expect(analytics.names()).toContain('$snapshot');

  // Flush the recording buffer the way a real page exit would, so the
  // dashboard mutations are on the wire and not still queued in the page.
  await page.evaluate(() => {
    window.dispatchEvent(new Event('pagehide'));
    document.dispatchEvent(new Event('visibilitychange'));
  });

  // Positive control first: without it, an empty or still-compressed corpus
  // would satisfy every absence check below for the wrong reason.
  await expect.poll(() => analytics.corpus(), { timeout: 30_000 }).toContain('Overall progress');
  const corpus = analytics.corpus();
  expect(corpus).toContain('Sign in to study');
  expect(corpus.length).toBeGreaterThan(50_000);

  // maskAllInputs covers what the learner types — the promise made on the
  // sign-in card. The account address is no longer rendered anywhere in the
  // authenticated shell, so it cannot reach the recording by that route either;
  // the `[data-ph-no-capture]` block selector stays configured as the guard for
  // anything that renders PII in future.
  expect(corpus).not.toContain('secret-learner');
  expect(corpus).not.toContain('learner@example.test');
  expect(corpus).not.toContain('@example.test');
});

test('nothing transmitted from a magic-link callback carries authentication material', async ({ page }) => {
  const analytics = await interceptAnalytics(page);
  await page.goto(`${transportBaseURL}${CALLBACK_QUERY}`);
  await expect(page.getByRole('heading', { name: 'Sign in to study' })).toBeVisible();
  await expectNonBotFingerprint(page);

  await page.getByRole('button', { name: 'Continue with Google' }).click();
  await expect(page.getByRole('heading', { name: /Learn the material/ })).toBeVisible();

  await expect
    .poll(analytics.names, { timeout: 20_000 })
    .toEqual(expect.arrayContaining(['$identify', 'beta_opened']));
  await expect.poll(() => analytics.paths().filter((p) => p.startsWith('/flags/')), {
    timeout: 20_000,
  }).not.toHaveLength(0);

  // The callback fields are removed from the address bar before the client is
  // constructed, so the requests that never pass through before_send — the
  // flags request, and the stored initial-person info it carries — are clean
  // at the source rather than scrubbed on the way out.
  expect(page.url()).not.toContain('access_token');
  expect(page.url()).not.toContain('code=');

  const identify = analytics.events().find((e) => e.event === '$identify')!;
  expect(identify.$set_once?.$initial_current_url).toBe(ORIGIN_AND_PATH);
  const entry = analytics.events().find((e) => e.event === 'beta_opened')!;
  expect(entry.properties.$current_url).toBe(ORIGIN_AND_PATH);
  expect(entry.properties.$session_entry_url).toBe(ORIGIN_AND_PATH);

  // Every request to the analytics host, flags and replay snapshots included,
  // read after decompression — compressed bytes would satisfy any absence
  // check. The control proves the corpus holds the recorded screen.
  const corpus = analytics.corpus();
  expect(corpus).toContain('Learn the material');
  for (const pattern of AUTH_MATERIAL) expect(corpus).not.toMatch(pattern);
});
