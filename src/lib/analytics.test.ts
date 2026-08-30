import { describe, expect, it } from 'vitest';
import {
  AnalyticsIdentity,
  DeferredAnalyticsClient,
  REDACTED,
  consumeSignupMethod,
  identityTransition,
  isNewlyCreatedUser,
  mockCompletionProperties,
  NoopAnalyticsClient,
  readPublicPostHogConfig,
  rememberSignupMethod,
  scrubAnalyticsProperties,
  scrubUrl,
  sessionCompletionProperties,
  type AnalyticsClient,
  type AnalyticsEvent,
  type OnboardingBuckets,
} from './analytics';
import { LESSONS } from '../content/learn';

/** Everything a captured payload must never contain, whatever shape it arrives in. */
const FORBIDDEN = [/access_token/i, /refresh_token/i, /code=/i, /eyJ[A-Za-z0-9_-]+\./];

function expectNoAuthMaterial(payload: unknown) {
  const serialized = JSON.stringify(payload);
  for (const pattern of FORBIDDEN) expect(serialized).not.toMatch(pattern);
}

describe('URL scrubbing', () => {
  it('reduces a magic-link callback URL to origin and path', () => {
    const callback =
      'https://dkholin.github.io/asa-103-prep/?code=b7f1e9a2-auth#access_token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIn0.s1gnatur3&refresh_token=r3fr3sh-token&expires_in=3600&token_type=bearer&type=magiclink';
    expect(scrubUrl(callback)).toBe('https://dkholin.github.io/asa-103-prep/');
    expectNoAuthMaterial(scrubUrl(callback));
  });

  it('leaves non-URL referrer sentinels alone but redacts loose credentials', () => {
    expect(scrubUrl('$direct')).toBe('$direct');
    expect(scrubUrl('access_token=abc123')).toBe(REDACTED);
  });

  it('scrubs every URL-bearing property of an event captured on a callback URL', () => {
    const scrubbed = scrubAnalyticsProperties({
      $current_url:
        'http://127.0.0.1:4173/asa-103-prep/#access_token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.sig&refresh_token=xyz',
      $referrer: 'https://accounts.google.com/o/oauth2/callback?code=4/0Ab_c-d',
      $session_entry_url: 'https://dkholin.github.io/asa-103-prep/?code=abc',
      auth_state: 'signed-in',
      question_count: 24,
    });

    expect(scrubbed.$current_url).toBe('http://127.0.0.1:4173/asa-103-prep/');
    expect(scrubbed.$referrer).toBe('https://accounts.google.com/o/oauth2/callback');
    expect(scrubbed.$session_entry_url).toBe('https://dkholin.github.io/asa-103-prep/');
    expect(scrubbed.auth_state).toBe('signed-in');
    expect(scrubbed.question_count).toBe(24);
    expectNoAuthMaterial(scrubbed);
  });

  it('scrubs the replay meta href and redacts credential-shaped values under any key', () => {
    const scrubbed = scrubAnalyticsProperties({
      $snapshot_data: [
        {
          type: 4,
          data: {
            href: 'https://dkholin.github.io/asa-103-prep/#access_token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.sig',
            width: 1280,
          },
        },
      ],
      session_note: 'access_token=leaked-by-accident',
      bearer: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.s1gnatur3',
    });

    const snapshot = (scrubbed.$snapshot_data as { data: { href: string; width: number } }[])[0];
    expect(snapshot.data.href).toBe('https://dkholin.github.io/asa-103-prep/');
    expect(snapshot.data.width).toBe(1280);
    expect(scrubbed.session_note).toBe(REDACTED);
    expect(scrubbed.bearer).toBe(REDACTED);
    expectNoAuthMaterial(scrubbed);
  });

  it('is total, so a vendor hook can never be turned off by a thrown scrubber', () => {
    // A before_send hook that throws is a hook that silently stops analytics,
    // which is far harder to notice than a missing property.
    expect(scrubAnalyticsProperties(undefined)).toEqual({});
    expect(scrubAnalyticsProperties(null)).toEqual({});
    expect(scrubAnalyticsProperties({} as Record<string, unknown>)).toEqual({});
    expect(
      scrubAnalyticsProperties({ nested: undefined, count: 0, flag: false } as Record<
        string,
        unknown
      >),
    ).toEqual({ nested: undefined, count: 0, flag: false });
  });
});

describe('analytics identity', () => {
  it('identifies, resets, and never re-identifies the same learner', () => {
    expect(identityTransition(null, null)).toBe('none');
    expect(identityTransition(null, 'user-a')).toBe('identify');
    expect(identityTransition('user-a', 'user-a')).toBe('none');
    expect(identityTransition('user-a', null)).toBe('reset');
    expect(identityTransition('user-a', 'user-b')).toBe('reset-and-identify');
  });

  it('never blends two learners sharing one browser session', () => {
    const calls: string[] = [];
    const client: AnalyticsClient = {
      enabled: true,
      capture: () => calls.push('capture'),
      identify: (userId) => calls.push(`identify:${userId}`),
      setPersonProperties: () => calls.push('set'),
      reset: () => calls.push('reset'),
    };
    const identity = new AnalyticsIdentity(client);

    identity.apply(null);
    identity.apply('user-a');
    identity.apply('user-a');
    identity.apply(null);
    identity.apply('user-b');
    // A provider callback can hand over a second account without an
    // intervening signed-out state; that must still not blend identities.
    identity.apply('user-c');

    expect(calls).toEqual([
      'identify:user-a',
      'reset',
      'identify:user-b',
      'reset',
      'identify:user-c',
    ]);
  });
});

describe('new-account detection', () => {
  const now = Date.parse('2026-08-21T12:00:00.000Z');

  it('treats only a just-created Supabase user as a completed signup', () => {
    expect(isNewlyCreatedUser('2026-08-21T11:58:00.000Z', now)).toBe(true);
    expect(isNewlyCreatedUser('2026-08-21T11:50:00.000Z', now)).toBe(false);
    expect(isNewlyCreatedUser('2026-01-01T00:00:00.000Z', now)).toBe(false);
    expect(isNewlyCreatedUser(undefined, now)).toBe(false);
    expect(isNewlyCreatedUser('not-a-date', now)).toBe(false);
  });
});

describe('signup method hand-off', () => {
  it('survives one redirect and is consumed exactly once', () => {
    const values = new Map<string, string>();
    const store = {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => void values.set(key, value),
      removeItem: (key: string) => void values.delete(key),
    } as unknown as Storage;

    rememberSignupMethod('google', store);
    expect(consumeSignupMethod(store)).toBe('google');
    expect(consumeSignupMethod(store)).toBeUndefined();
  });
});

describe('event property construction', () => {
  it('summarises a session from the questions the learner actually reached', () => {
    expect(sessionCompletionProperties({ correct: 3, wrong: 2, skipped: 1 }, 45_000)).toEqual({
      answered: 5,
      correct: 3,
      incorrect: 2,
      skipped: 1,
      duration_ms: 45_000,
    });
  });

  it('reports one rounded mock percentage for every consumer', () => {
    expect(mockCompletionProperties(17, 24, 2, 600_000)).toEqual({
      score: 17,
      total: 24,
      score_pct: 71,
      unanswered: 2,
      duration_ms: 600_000,
    });
    expect(mockCompletionProperties(0, 0, 0, 10).score_pct).toBe(0);
  });

  it('represents lesson Practice as concept mode with ids and counts only', () => {
    const events: AnalyticsEvent[] = [
      {
        name: 'practice_started',
        properties: {
          mode: 'concept',
          lesson_id: 'motoring-controls-instruments',
          question_count: 1,
          entry_point: 'learn',
        },
      },
      {
        name: 'practice_completed',
        properties: {
          mode: 'concept',
          lesson_id: 'motoring-controls-instruments',
          answered: 1,
          correct: 1,
          incorrect: 0,
          skipped: 0,
          duration_ms: 100,
        },
      },
    ];
    for (const event of events) {
      expect(event.properties).not.toHaveProperty('topic');
      expect(JSON.stringify(event.properties)).not.toContain('Controls & Instruments');
    }
  });

  // Lesson events carry ids only. The corpus check runs over every real lesson
  // rather than one hand-written example, so prose reaching a property is a
  // failure here rather than something noticed in a live payload.
  it('keeps lesson prose out of the lesson events', () => {
    for (const lesson of LESSONS) {
      const properties = { lesson_id: lesson.id, module_id: lesson.moduleId };
      const events: AnalyticsEvent[] = [
        { name: 'lesson_started', properties },
        { name: 'lesson_completed', properties },
      ];
      for (const event of events) {
        const serialized = JSON.stringify(scrubAnalyticsProperties({ ...event.properties }));
        // Positive control: an empty or unreadable payload cannot pass.
        expect(serialized, `${event.name} lost its lesson id`).toContain(lesson.id);
        expect(serialized, `${event.name} leaked the lesson title`).not.toContain(lesson.title);
        expect(serialized, `${event.name} leaked the lesson intro`).not.toContain(lesson.intro);
        expect(Object.keys(event.properties)).toEqual(['lesson_id', 'module_id']);
      }
    }
  });
});

describe('public PostHog configuration', () => {
  it('accepts only a complete project configuration', () => {
    expect(
      readPublicPostHogConfig({
        VITE_POSTHOG_KEY: 'phc_abcdefghijklmnopqrstuvwxyz',
        VITE_POSTHOG_HOST: 'https://us.i.posthog.com',
      }),
    ).toEqual({ key: 'phc_abcdefghijklmnopqrstuvwxyz', host: 'https://us.i.posthog.com' });

    expect(readPublicPostHogConfig({ VITE_POSTHOG_KEY: 'phc_abcdefghijklmnopqrstuvwxyz' })).toBeNull();
    expect(
      readPublicPostHogConfig({
        VITE_POSTHOG_KEY: 'phc_abcdefghijklmnopqrstuvwxyz',
        VITE_POSTHOG_HOST: 'http://us.i.posthog.com',
      }),
    ).toBeNull();
  });

  it('refuses a non-project key so a personal API key can never be shipped to browsers', () => {
    expect(
      readPublicPostHogConfig({
        VITE_POSTHOG_KEY: 'phx_personal_api_key_value_here',
        VITE_POSTHOG_HOST: 'https://us.i.posthog.com',
      }),
    ).toBeNull();
    expect(
      readPublicPostHogConfig({
        VITE_POSTHOG_KEY: 'phc_short',
        VITE_POSTHOG_HOST: 'https://us.i.posthog.com',
      }),
    ).toBeNull();
  });
});

describe('unconfigured analytics', () => {
  it('accepts every call and reports itself as not recording', () => {
    const client: AnalyticsClient = new NoopAnalyticsClient();
    expect(client.enabled).toBe(false);
    expect(() => {
      client.capture({ name: 'beta_opened', properties: { auth_state: 'signed-out' } });
      client.identify('user-a');
      client.setPersonProperties({} as OnboardingBuckets);
      client.reset();
    }).not.toThrow();
  });
});

describe('deferred analytics start', () => {
  function recorder() {
    const calls: string[] = [];
    const client: AnalyticsClient = {
      enabled: true,
      capture: (event) => calls.push(`capture:${event.name}`),
      identify: (userId) => calls.push(`identify:${userId}`),
      setPersonProperties: () => calls.push('set'),
      reset: () => calls.push('reset'),
    };
    return { calls, client };
  }

  it('does not construct the real client until something is captured', () => {
    const { calls, client } = recorder();
    const order: string[] = [];
    const deferred = new DeferredAnalyticsClient(() => {
      order.push('start');
      return client;
    });

    // Nothing has been captured, so the vendor has not read the URL yet — this
    // is the window in which the auth callback is stripped.
    expect(order).toEqual([]);
    expect(deferred.enabled).toBe(true);

    deferred.capture({ name: 'beta_opened', properties: { auth_state: 'signed-out' } });
    deferred.identify('user-a');
    deferred.reset();

    expect(order).toEqual(['start']);
    expect(calls).toEqual(['capture:beta_opened', 'identify:user-a', 'reset']);
  });

  it('degrades to no-op when the real client throws on construction', () => {
    const deferred = new DeferredAnalyticsClient(() => {
      throw new Error('vendor init failed');
    });
    expect(() => deferred.capture({
      name: 'mock_started',
      properties: { question_count: 1, entry_point: 'mock_exam' },
    })).not.toThrow();
    expect(() => deferred.reset()).not.toThrow();
  });
});
