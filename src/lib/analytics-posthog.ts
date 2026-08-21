import posthog from 'posthog-js';
import {
  DeferredAnalyticsClient,
  NoopAnalyticsClient,
  readPublicPostHogConfig,
  scrubAnalyticsProperties,
  type AnalyticsClient,
  type AnalyticsEvent,
  type OnboardingBuckets,
  type PublicPostHogConfig,
} from './analytics';
import { stripAuthCallbackParams } from './cloud';

/**
 * The one module that touches posthog-js.
 *
 * Keeping the vendor client behind this boundary means the event taxonomy, the
 * scrubbing rules, and the identity rules in `analytics.ts` stay free of the
 * browser-only SDK and can be unit tested directly.
 */

export class PostHogAnalyticsClient implements AnalyticsClient {
  readonly enabled = true;

  constructor(private readonly client: typeof posthog) {}

  capture(event: AnalyticsEvent) {
    this.client.capture(event.name, event.properties);
  }

  identify(userId: string) {
    this.client.identify(userId);
  }

  setPersonProperties(buckets: OnboardingBuckets) {
    this.client.setPersonProperties({ ...buckets });
  }

  reset() {
    this.client.reset();
  }
}

export function createPostHogAnalytics(config: PublicPostHogConfig): AnalyticsClient {
  posthog.init(config.key, {
    api_host: config.host,
    // The taxonomy is semantic and the app has one URL and no router, so
    // click-level capture and pageviews would only add noise.
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: false,
    // Network capture records request URLs, which is exactly where callback
    // tokens live; replay keeps neither headers nor bodies either.
    capture_performance: false,
    mask_personal_data_properties: true,
    disable_capture_url_hashes: true,
    // Surveys and web experiments are out of scope and each adds a request
    // that never passes through before_send. Flags must stay ON: posthog-js
    // learns from the flags/remote-config response that session replay is
    // enabled, so disabling them silently disables recording too. The flags
    // request carries the entry URL, so the URL itself is cleaned before this
    // client is ever constructed — see createAnalyticsClient below.
    disable_surveys: true,
    disable_web_experiments: true,
    // Applied to every outgoing event, replay frames included. `$set` and
    // `$set_once` are scrubbed separately because they travel beside
    // `properties`, and `$initial_current_url` lives in `$set_once`.
    before_send: (event) =>
      event && {
        ...event,
        properties: scrubAnalyticsProperties(event.properties),
        ...(event.$set ? { $set: scrubAnalyticsProperties(event.$set) } : {}),
        // PostHog stores $initial_person_info in localStorage unscrubbed, so
        // this hook is the only thing standing between a callback URL's query
        // string and the wire.
        ...(event.$set_once ? { $set_once: scrubAnalyticsProperties(event.$set_once) } : {}),
      },
    session_recording: {
      // Masks the sign-in card's email field along with every other input.
      maskAllInputs: true,
      // The opt-out hook for anything sensitive that is rendered rather than
      // typed — the signed-in header carries the learner's email address.
      blockSelector: '[data-ph-no-capture]',
      maskTextSelector: '[data-ph-no-capture]',
      recordHeaders: false,
      recordBody: false,
      recordCrossOriginIframes: false,
    },
  });
  return new PostHogAnalyticsClient(posthog);
}

/**
 * Analytics failure is never fatal: an unconfigured deployment, or a client
 * that throws while initialising, falls back to the no-op client and the study
 * flow continues untouched.
 *
 * Construction is deferred to the first capture, which happens once the auth
 * state has resolved. Supabase has consumed the callback params by then, so
 * `prepare` can strip them from the address bar before posthog-js reads it —
 * and every request the SDK makes, including the ones that never reach
 * `before_send`, is clean at the source rather than scrubbed on the way out.
 */
export function createAnalyticsClient(
  config: PublicPostHogConfig | null = readPublicPostHogConfig(),
  prepare: () => void = stripAuthCallbackParams,
): AnalyticsClient {
  if (!config) return new NoopAnalyticsClient();
  return new DeferredAnalyticsClient(() => {
    prepare();
    return createPostHogAnalytics(config);
  });
}
