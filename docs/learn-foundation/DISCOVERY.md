# Learn Foundation + Motoring Module — Discovery Report

Discovery only. No implementation, no Builder/Verifier assigned.
Repo inspected at commit `f34df7b` (branch `main`).

---

## A. Current-state findings

### Shell and navigation
`src/App.tsx` is the whole shell. There is **no router** — navigation is a
discriminated-union React state value:

```ts
type View =
  | { name: 'dashboard' }
  | { name: 'practice'; title; questionIds: string[]; session: PracticeSessionMode }
  | { name: 'missed' }
  | { name: 'mock' };
```

`AuthenticatedApp` renders one header (`.app-shell-header`) containing brand,
`nav.shell-nav` with three buttons (**Dashboard**, **Review (n)**, **Exam**),
account label + sign-out, and a cloud save-status strip. `<main>` renders exactly
one view. This is a deliberate, logged decision:
`docs/beta-foundation/DECISIONS.md` → *"Preserve view-state navigation in Phase 1"*
— one document URL, no deep-linked study screens.

Gating order before the shell renders: config check → session restore → sign-in →
progress load → onboarding (`src/lib/useOnboarding.ts`) → shell.

### Practice
- `src/components/Dashboard.tsx` lists all 13 topics from `src/content/topics.ts`
  with a readiness chip and a **Practice** button, plus a "Recommended next"
  hero card driven by `recommendTopic()`.
- Launching a session is just: filter `QUESTIONS` by topic → pass an **array of
  question ids** + a title + a session mode into `PracticeSession`.
  `App.tsx:180-186`. `MissedQuestions` does the same with the review queue.
- `src/components/PracticeSession.tsx` owns everything: session-stable
  randomization (`prepareAttempt` + `createRng` from `src/lib/shuffle.ts`, run
  once in lazy `useState`, remount forced by `key`), submit/skip, scoring tally,
  feedback, completion screen, analytics.

**This is the key finding for Learn:** Practice already accepts an arbitrary
`questionIds: string[]`. A "Practice this material" action needs *no new
Practice code* — only a new way to compute the id list.

### Question metadata
`src/content/types.ts`:

```ts
interface Question {
  id: string; topic: TopicId; format: 'text' | 'visual';
  prompt: string; assetId?: string; choices: Choice[];
  correctChoiceId: string; explanation: string; source: string;
}
```

`src/content/questions.ts` — **301 questions**, one flat exported array:

| topic | n | | topic | n |
|---|---|---|---|---|
| chart-nav | 44 | | marine-weather | 26 |
| right-of-way | 34 | | **engine-docking** | **25** |
| emergencies | 30 | | anchoring | 24 |
| cruising-systems | 29 | | seamanship-comms | 20 |
| sail-trim | 28 | | nav-lights | 9 |
| safety-equipment | 27 | | sound-signals | 3 |
| | | | flags | 2 |

Ids are already human-readable and prefix-grouped (`eng-`, `safety-`, `sea-`,
`emer-`, `sys-`). Topic is the **only** classification axis today; there is no
sub-topic, tag, or concept field.

`src/content/content.test.ts` enforces bank integrity (unique ids, valid topics,
one correct choice, non-empty prompt/explanation/source, assets exist in the
manifest, mock draw covers every topic). Any new metadata field should be
enforced here too.

### Progress and persistence
`src/lib/progress.ts` — a single versioned snapshot:

```ts
interface Progress { version: 1; stats: Record<string, QuestionStat>;
                     reviewQueue: string[]; mockResults: MockResult[]; }
```

- Stored as one JSONB row per learner: `supabase/migrations/202608210001_*.sql`,
  table `learner_progress(user_id pk, progress jsonb)` with RLS and a check
  constraint that validates **only** `version = '1'` and the typeof of the three
  containers. Extra top-level keys are *not* rejected by the constraint.
- `parseProgress()` is a strict fail-closed parser but returns the parsed object
  as-is, so unknown keys already round-trip intact.
- `src/lib/useCloudProgress.ts` writes the **whole snapshot on every change**
  through a serialized `SaveGate`/`SaveQueue`; the header shows
  saving/saved/error and blocks sign-out until writes drain.
- Onboarding answers deliberately live in a *separate* table
  (`202608210003_*.sql`) so a malformed answer cannot invalidate the progress
  row's v1 shape. That precedent matters for where Learn state should go.

### Reusable content / visual infrastructure
- `src/components/shared.tsx`: `QuestionFigure` (asset lookup + alt text +
  attribution `<figcaption>` + click-to-enlarge `Lightbox`), `QuestionLayout`
  (figure beside/above body), `ChoiceList`, `Feedback`, `ProgressBar`,
  `readinessLabel()` / `readinessChipClass()`.
- `src/lib/assets.ts` + `src/content/asset-manifest.json`: **79 assets** with
  full licensing metadata (`creator`, `license`, `licenseUrl`, `sourcePage`,
  `attributionRequired`, `attributionText`, `modified`, `modificationNote`,
  `usedByQuestions`, optional `theme: 'dark'`). Runtime URL =
  `${BASE_URL}assets/${filename}` from `public/assets/`.
- `design/canonical-assets/` — 20 approved **source primitives** (powerboat-top,
  sailboat-top, dock, wind-arrow, current-arrow, heading-arrow, water-surface,
  shoreline, label-a/b, …). Its README is explicit: production SVGs are
  self-contained, geometry-sensitive diagrams are *composed deterministically*
  from these primitives, never image-generated. `sailboat-top.svg` asserts a
  starboard tack and must be mirrored/pivoted per its header comment.
- `src/styles.css` (1065 lines) — full design-token set and generic primitives
  already suitable for Learn: `.card`, `.hero-card`, `.panel`, `.hairline`,
  `.chip` + `.chip-solid` / `.chip-in-progress` / `.chip-not-started`,
  `.topic-list` / `.topic-row` / `.topic-side`, `.progress-track`, `.actions`,
  `.muted`, `.eyebrow`, `.meta`, `.question-figure`, `.asset-credit`, lightbox.
  There is **no** callout/definition/table styling yet.
- `src/lib/analytics.ts` — closed `AnalyticsEventMap` union; property values are
  restricted to ids, slugs, booleans, counts, durations. New events must be added
  to the map (typed), never ad hoc.
- E2E: `e2e/navigation.spec.ts` asserts the exact set of navigation controls and
  round-trips; adding a nav item will require touching it.

---

## B. Recommended Learn placement

Add **one** nav button and **two** view states. Nothing else in navigation changes.

```
Header nav:  [Dashboard]  [Learn]  [Review (n)]  [Exam]
                             │
                             ▼
        Learn — course outline (modules)
          ├─ "Continue learning" card  → last in-progress lesson
          ├─ Motoring          9 lessons · 3 completed   [outline]
          ├─ Anchoring         Coming soon (disabled)
          └─ …other modules    Coming soon (disabled)
                             │  (click a lesson — always, no locking)
                             ▼
        Lesson page
          ├─ module · lesson n of 9 · Not started/In progress/Completed
          ├─ content blocks (headings, text, figures, definitions, callouts…)
          ├─ [Practice this material]  ──► existing PracticeSession
          └─ [◀ Previous]  [Mark complete]  [Next ▶]
```

Additional entry points (small, additive):
- **Dashboard** hero area gains a single secondary "Continue learning" line when
  a Learn lesson is in progress. No dashboard redesign.
- **Practice session feedback** (`Feedback` in `shared.tsx`) gains an optional
  "Learn this concept" link when the question carries a concept that maps to a
  published lesson. *Recommended for step 3, not step 1.*
- **Mock Exam**: unchanged during the attempt (hard requirement). The *results*
  screen already computes `weakAreas`; a Learn recommendation there is a later
  step and is explicitly out of the initial acceptance criteria.

`View` becomes:

```ts
| { name: 'learn' }
| { name: 'lesson'; lessonId: string }
```

Returning from a Learn-launched Practice session should land back on the lesson,
not the dashboard — so the practice view gains an optional `returnTo?: View`
(or `PracticeSession.onExit` is passed a lesson-returning closure; the latter
needs no type change and is preferred).

---

## C. Recommended reusable Learn architecture

Smallest thing that works, following existing conventions (TS content modules
under `src/content/`, plain React components, no new dependency).

### 1. Content model — `src/content/learn/`

```
src/content/learn/
  types.ts           LearnModule, Lesson, Block union
  modules.ts         MODULES (Motoring published; others "coming soon")
  motoring/*.ts      one file per lesson, exporting a Lesson object
  index.ts           LESSONS array + byId/byModule lookups
```

```ts
export type ConceptId = /* union, see §E */;

export type Block =
  | { kind: 'text'; text: string }              // one paragraph
  | { kind: 'heading'; text: string }
  | { kind: 'list'; ordered?: boolean; items: string[] }
  | { kind: 'definition'; term: string; text: string }
  | { kind: 'callout'; tone: 'note' | 'warning'; title?: string; text: string }
  | { kind: 'table'; caption?: string; headers: string[]; rows: string[][] }
  | { kind: 'figure'; assetId: string; caption?: string }
  | { kind: 'practice'; label?: string; concepts?: ConceptId[] };

export interface Lesson {
  id: string;                 // stable, e.g. 'motoring-prop-effects'
  moduleId: 'motoring';
  order: number;
  title: string;
  intro: string;
  concepts: ConceptId[];      // drives "Practice this material"
  blocks: Block[];
}

export interface LearnModule {
  id: string; title: string; blurb: string;
  status: 'published' | 'coming-soon';
}
```

Adding a normal lesson = one new content file + one line in the module's lesson
list. **No application logic changes.** That is the stated operating model.

Why TS objects and not MDX/Markdown/JSON: `src/content/questions.ts` and
`topics.ts` are already TS object literals with a typed schema and a vitest
integrity suite. TS gives compile-time checking of concept ids, asset ids and
block shapes for free, requires zero new dependencies or Vite plugins, and keeps
one content convention in the repo. MDX would add a plugin, a second authoring
language, and unchecked references.

### 2. Progress — one optional key on the existing snapshot

```ts
interface Progress {
  version: 1; stats; reviewQueue; mockResults;
  learn?: { lessons: Record<string, 'in-progress' | 'completed'>;
            lastLessonId?: string };
}
```

- Not started = absent. In progress = set on first open. Completed = set by
  **Mark complete**. `lastLessonId` powers *Continue learning*.
- **No DB migration required**: the `learner_progress_v1_shape` constraint only
  asserts `version = '1'` and the typeof of the three existing containers; extra
  keys pass. `parseProgress()` must gain fail-closed validation for `learn` that
  treats *absent* as valid, so old rows and rolled-back clients round-trip.
- Reuses `updateProgress()` and the whole save-gate/retry/sign-out-drain path
  unchanged. Marking a lesson complete triggers exactly one snapshot write —
  same cost as answering one question.
- Alternative considered and rejected: a separate `learner_learn` table, matching
  the onboarding precedent. Rejected because unlike onboarding, Learn state *is*
  study progress, must reset with "Reset progress", and adds an auth'd table,
  RLS policies, a second load phase, and a second failure mode for a value that
  is a handful of enum strings. Revisit only if Learn state grows beyond this.

### 3. Concept tags — the one new abstraction

Add `concepts?: ConceptId[]` to `Question` (optional, additive, zero questions
break). `ConceptId` is a string-literal union in `src/content/learn/types.ts` or
`src/content/concepts.ts`.

`practiceIdsForConcepts(concepts)` = `QUESTIONS.filter(q => q.concepts?.some(...))`.
That is the whole "taxonomy system". No database, no join table, no hierarchy.

Fallback rule: if a lesson's concepts resolve to fewer than ~4 questions, fall
back to (or union with) the lesson's topic filter so the Practice button is never
anemic. Enforced by a vitest assertion that every published lesson resolves to
≥1 question.

Justification for the new field: the brief explicitly forbids hard-coded
per-lesson URL/id lists, `topic` is too coarse (one topic = 25 questions across
9 lessons), and this is the smallest metadata that also serves future
Practice-result and Mock-result recommendations.

### 4. Components — `src/components/learn/`

`LearnHome` (module outline + Continue learning), `LessonView` (block renderer +
prev/next + complete + practice), plus a shared `Blocks` renderer.
`QuestionFigure` in `shared.tsx` should be split so the asset/attribution/
lightbox core becomes `AssetFigure({ assetId, caption? })` and `QuestionFigure`
calls it — a small, contained refactor that avoids duplicating the licensing and
lightbox logic. This is the only change to existing shared code.

### 5. Reused as-is
`PracticeSession` (entire testing engine), `Progress`/`useCloudProgress`/
`SaveGate`, `assets.ts` + manifest + attribution, `ProgressBar`,
`readinessLabel`/`readinessChipClass` (its three labels are already exactly
Not started / In progress / Solid → rename-free for chips if we use "Completed"
we add one chip class), the design tokens, and the analytics client seam.

---

## D. Proposed Motoring module

Nine lessons (plus one optional tenth), sequenced dock → underway → dock. Not a
mechanical mirror of textbook subsections: pre-start checks are consolidated into
one lesson, and stopping/backing/turning are consolidated into one handling
lesson, because they are one skill in practice.

| # | Lesson | Purpose | Core concepts | Existing Practice coverage (real ids) | Visual need | Research/input |
|---|--------|---------|---------------|---------------------------------------|-------------|----------------|
| 1 | **Why and When You Motor** | Orient: what the auxiliary is for, inboard vs outboard vs sail-drive, and the legal status of motorsailing | `auxiliary-engine-types`, `motorsailing` | `eng-auxiliary-engine-types` (visual), `rules-motorsailing` | **Reuse** `photo-outboard-engine`. **New (optional):** inboard-shaft vs sail-drive vs outboard schematic | Low — derivable from existing explanations |
| 2 | **Pre-Departure Preparation** | Everything before the key turns: stowage, crew brief, dock lines and fenders ready, readiness check | `pre-departure-checks`, `crew-briefing`, `stowage` | `sea-departure-checklist`, `sea-resp-crew-briefing`, `safety-stow-loose-gear-underway`, `safety-stow-galley-items-passage`, `safety-pfd-fit-check` (5) | None required — list/table lesson | Low |
| 3 | **Pre-Start Checks and Starting** | The pre-start sequence and the first 30 seconds after start | `pre-departure-engine-checks`, `engine-starting-procedure`, `cooling-water-check`, `blower-ventilation` | `eng-prestart-compartment-inspect`, `eng-prestart-fluids-check`, `eng-prestart-ventilation-blower`, `eng-prestart-transmission-neutral`, `eng-prestart-cooling-water-check`, `eng-start-procedure-order`, `safety-fuel-blower-purpose`, `safety-fuel-vapor-density` (8) | **New:** annotated engine-bay checkpoint diagram (oil dipstick, belt, raw-water strainer, seacock, exhaust) | **Yes** — need an agreed, generic check order that is true for both diesel inboards and gas engines |
| 4 | **Engine Controls and Instruments** | Reading the panel and the single-lever control; neutral detent; what the gauges/alarm tell you | `engine-controls`, `engine-instruments` | `eng-control-panel-id` (visual), `sys-compass-purpose`, `sys-rudder-post-location` (3) | **Reuse** `custom-engine-panel-throttle` | Low–medium — gauge/alarm meanings need a short original write-up |
| 5 | **Propeller Effects: Prop Walk and Prop Wash** | The single highest-value motoring concept; why reverse behaves differently | `prop-walk`, `prop-wash`, `right-hand-propeller` | `eng-prop-walk-id` (visual), `eng-prop-wash-rudder`, `eng-prop-forward-vs-reverse-response`, `eng-prop-walk-use-docking` (4) | **Reuse** `custom-prop-walk`. **New:** prop-wash-over-rudder top view (forward burst deflecting the stern vs. reverse, where wash goes forward past the rudder) | **Yes** — concise original prop walk vs prop wash explanation, and the handedness convention we standardise on (right-hand prop → stern walks to port in reverse) |
| 6 | **Handling Under Power: Momentum, Stopping, Backing, Turning** | Boat-handling reality: no brakes, steerage way, pivot point, turning short | `stopping-distance`, `steerage-way`, `pivot-point`, `turning-in-confined-space` | `eng-stopping-distance-momentum`, `eng-backing-steerage-way`, `eng-turning-short-radius-technique`, `eng-pivot-point-location` (4) | **New:** pivot-point / short-radius turn diagram (pivot ~⅓ aft of the bow, alternating ahead-with-rudder / astern-with-rudder-centred) | Medium — needs a clearly worded, non-textbook description of the standing-turn technique |
| 7 | **Docking Under Power** | Plan the approach around wind and current; use lines; know when to abort | `docking-approach`, `docking-wind`, `docking-current`, `spring-line`, `abort-and-go-around` | `eng-dock-wind-onto-approach` (visual), `eng-dock-wind-off-approach`, `eng-dock-current-parallel-approach` (visual), `eng-dock-strongest-force-priority`, `eng-dock-spring-line-use`, `eng-dock-abort-goaround`, `sea-departure-lines-fenders`, `sea-line-standing-clear`, `sea-knot-cleat-hitch` (visual) (9) | **Reuse** `custom-docking-wind`, `custom-docking-current`, `photo-cleat-hitch`. **New:** wind-off-the-dock approach (the mirror case has no asset); **New:** dock-line naming diagram (bow, stern, fore/aft spring) | Medium — spring-line naming and one worked "wind off the dock" approach |
| 8 | **Picking Up a Mooring** | The head-to-wind approach, speed control, pendant pickup | `mooring-approach`, `mooring-pickup` | `eng-mooring-approach-id` (visual), `eng-mooring-speed-control`, `eng-mooring-pendant-pickup` (3) | **Reuse** `custom-mooring-approach` | Low |
| 9 | **Fueling, Outboards and Motoring Etiquette** | Fueling safety, outboard-specific handling, and behaviour around others under power | `fueling-safety`, `outboard-motors`, `motoring-etiquette` | `safety-fuel-gas-diesel-diagram` (visual), `safety-fuel-shutdown-before`, `safety-fuel-spill-response` (3) | **Reuse** `custom-fueling-gas-diesel`, `photo-outboard-engine` | **Yes** — **etiquette has zero existing question coverage** (wake responsibility, no-wake zones, fairway/mooring-field speed, passing anchored boats). Outboard specifics (tilt, cooling telltale, kill lanyard, shift-in-neutral) are also thin. |
| 10 *(optional)* | **When the Engine Quits** | Cross-links Motoring to the Emergencies bank | `engine-failure`, `fouled-propeller`, `engine-fire` | `emer-engine-failure-loss-of-propulsion`, `emer-engine-failure-under-sail-response`, `emer-fouled-prop-response`, `emer-fire-engine-compartment-response`, `emer-steering-failure-response` (5) | **Reuse** `custom-emergency-tiller` | Low — good demonstration that concept tags cross topic boundaries |

Coverage: the 9 core lessons map **all 25** `engine-docking` questions and pull
in ~17 more from `safety-equipment`, `seamanship-comms`, `cruising-systems` and
`right-of-way` — proving the concept mapping is doing real work that `topic`
alone cannot.

**Not proposed:** any lesson that would require content we cannot write
confidently without research (twin-screw handling, transmission internals,
winterising, fuel-system bleeding). Those belong to a later module or a later
pass.

---

## E. Question ↔ concept mapping proposal

Minimum change: **one optional field on `Question`**, populated on ~42 questions
for this module. Nothing else in the question schema moves.

```ts
// src/content/types.ts
export interface Question {
  …existing…
  /** Learn concept tags. Optional: untagged questions behave exactly as today. */
  concepts?: ConceptId[];
}
```

Real examples from the current bank:

```ts
{ id: 'eng-prop-walk-id',                concepts: ['prop-walk'] }
{ id: 'eng-prop-walk-use-docking',       concepts: ['prop-walk', 'docking-approach'] }
{ id: 'eng-prop-wash-rudder',            concepts: ['prop-wash'] }
{ id: 'eng-prestart-ventilation-blower', concepts: ['pre-departure-engine-checks',
                                                    'blower-ventilation'] }
{ id: 'safety-fuel-blower-purpose',      concepts: ['blower-ventilation',
                                                    'fueling-safety'] }
{ id: 'eng-dock-spring-line-use',        concepts: ['spring-line'] }
{ id: 'sea-knot-cleat-hitch',            concepts: ['docking-approach'] }
{ id: 'emer-fouled-prop-response',       concepts: ['fouled-propeller'] }
```

Resolution used by "Practice this material":

```ts
const ids = QUESTIONS.filter(q => q.concepts?.some(c => lesson.concepts.includes(c)))
                     .map(q => q.id);
// existing launcher, unchanged:
setView({ name: 'practice', title: lesson.title, questionIds: ids,
          session: { mode: 'topic', topic: 'engine-docking' } });
```

Note the `session` shape: `PracticeSessionMode` is `{mode:'topic'; topic} | {mode:'review'}`
and analytics events are typed off it. A Learn-launched session is neither, so
step 3 should add a third arm `{ mode: 'concept'; lessonId: string }` plus the
matching `practice_started`/`practice_completed` variants in `AnalyticsEventMap`
rather than mislabelling it as a topic session.

Guardrails to add to `src/content/content.test.ts`:
- every `concepts` entry is a member of the `ConceptId` union (free via TS, but
  assert at runtime too for the manifest-style safety already in that file);
- every published lesson resolves to ≥1 question;
- every `ConceptId` is referenced by at least one lesson *or* one question (dead
  tags fail the build).

---

## F. Content component inventory

### Required now
| Component | Notes |
|---|---|
| `LearnHome` | Module list + per-module lesson outline + "Continue learning" card + "Coming soon" module rows (reuse `.topic-list`/`.topic-row`/`.chip`) |
| `LessonView` | Header (module · lesson n of N · state chip), block renderer, prev/next, Mark complete, Practice this material |
| `Blocks` renderer | Switch over the `Block` union |
| `text` / `heading` / `list` blocks | Plain elements; no new CSS beyond spacing |
| `definition` block | New small CSS (`.definition`), term + description |
| `callout` block | New small CSS (`.callout`, `.callout-warning`) — can lean on `--color-warning-bg` / `--color-accent-subtle`, which already exist |
| `table` block | New CSS; must scroll horizontally on narrow viewports |
| `figure` block | **Reuse** — extract `AssetFigure` out of `QuestionFigure`; attribution + lightbox come free |
| `practice` block / button | Thin wrapper over the existing session launcher |
| Lesson state chip | Reuse `.chip-solid` / `.chip-in-progress` / `.chip-not-started` |

### Possible later (explicitly **not** acceptance criteria)
Learn-link in Practice feedback; Mock-results → Learn recommendations; per-module
progress ring; lesson search; images with hotspots; embedded example questions;
video; any animation, simulation, slider, drag-to-identify, or lesson-specific
React component; a CMS.

---

## G. Visual inventory

### Reusable as-is (all already licensed and in `asset-manifest.json`)
| Asset | Use |
|---|---|
| `custom-prop-walk` (project-original SVG) | Lesson 5 |
| `custom-engine-panel-throttle` (project-original) | Lesson 4 |
| `custom-docking-wind` (project-original) | Lesson 7 |
| `custom-docking-current` (project-original) | Lesson 7 |
| `custom-mooring-approach` (project-original) | Lesson 8 |
| `custom-fueling-gas-diesel` (project-original) | Lesson 9 |
| `photo-outboard-engine` (CC BY-SA 3.0, attribution rendered) | Lessons 1, 9 |
| `photo-cleat-hitch` (CC BY-SA 3.0) | Lesson 7 |
| `custom-emergency-tiller` (project-original) | Lesson 10 (optional) |
| `design/canonical-assets/`: `powerboat-top`, `dock`, `wind-arrow`, `current-arrow`, `heading-arrow`, `water-surface`, `shoreline`, `label-a`, `label-b` | Source primitives for every new diagram below |

### Missing — visual briefs
Each is a **project-original SVG**, composed deterministically from the canonical
primitives per `design/canonical-assets/README.md`, added to
`asset-manifest.json` with `attributionRequired: false`. None may be traced from
or derived from ASA textbook illustrations.

1. **`custom-prop-wash-rudder`** — *Lesson 5, concept `prop-wash`.*
   Must communicate: in forward gear the propeller throws water *aft across the
   rudder*, so a burst of throttle steers the boat even at near-zero speed; in
   reverse the wash goes forward past the rudder and the rudder does almost
   nothing. Text alone fails because the claim is about *where the water goes*
   relative to a specific piece of hardware — a spatial fact.
   Form: two side-by-side top views (`powerboat-top`), flow arrows from the prop,
   rudder deflected the same way in both, resulting stern-swing arrow present in
   panel A and absent in panel B. Adapt from `custom-prop-walk`'s visual language.

2. **`custom-pivot-point-turn`** — *Lesson 6, concepts `pivot-point`,
   `turning-in-confined-space`.*
   Must communicate: the boat rotates about a point roughly one-third aft of the
   bow (so the stern swings wide), and the short-radius "standing turn" is an
   alternation of short bursts ahead with full rudder and astern with rudder
   centred. Text alone fails because the stern-swings-wider consequence is the
   thing students get wrong, and it is geometric.
   Form: one top view with the pivot point marked and bow/stern swing arcs, plus a
   small 3-step strip of the alternating-burst sequence.

3. **`custom-docking-wind-off`** — *Lesson 7, concept `docking-wind`.*
   Must communicate: the mirror case of the existing `custom-docking-wind` — with
   wind blowing *off* the dock, approach at a steeper angle with more way on, and
   get a line ashore promptly. Text alone fails for the same reason the
   wind-onto diagram exists.
   Form: direct adaptation of `custom-docking-wind` (same dock, same boat, wind
   arrow reversed, steeper approach track).

4. **`custom-dock-lines-named`** — *Lesson 7, concept `spring-line`.*
   Must communicate: which line is the bow line, stern line, forward spring and
   after spring, and which direction of movement each restrains. Text alone
   fails: it is a naming diagram, and `eng-dock-spring-line-use` already tests it.
   Form: top view alongside a `dock` primitive with four labelled lines and small
   restraint arrows.

5. **`custom-engine-prestart-points`** — *Lesson 3, concept
   `pre-departure-engine-checks`.* **Lower priority — cut if the schedule bites.**
   Must communicate: where the five checkpoints are relative to each other (oil
   dipstick, belt, raw-water strainer/seacock, coolant, exhaust telltale). A
   simplified generic schematic, deliberately not any specific engine model.
   Form: labelled block schematic, not a realistic engine drawing.

6. **`custom-auxiliary-types`** — *Lesson 1.* **Optional.** Three small side
   profiles: transom outboard, inboard shaft drive, sail-drive leg. Only worth
   producing if lesson 1 needs more than the existing outboard photo.

Total: **4 required + 2 optional** new SVGs. Everything else is reuse.

---

## H. Inputs required from operator

### 1. Content / research
- **The ASA Motoring Fundamentals chapter is not in this repository.** `work/`
  contains only `svg-previews/`, `tmp/` only canonical-asset copies, and `docs/`
  only beta-foundation material. Please supply the chapter (or a coverage
  outline) so §D can be checked against it for gaps before writing.
- **Motoring etiquette** (lesson 9) — zero existing question coverage. Need
  agreed source material: wake responsibility and liability, no-wake zones,
  speed in mooring fields and fairways, passing anchored/working boats, right of
  way while under power in a marina.
- **Outboard specifics** (lesson 9) — thin coverage. Need: tilt/trim handling,
  cooling telltale, kill lanyard, shifting and neutral, fuel handling for
  portable tanks.
- **Prop walk vs prop wash** (lesson 5) — a concise original explanation, plus
  confirmation of the handedness convention we standardise on across text and
  diagrams (proposal: right-hand propeller, stern walks to port in reverse,
  matching the existing `custom-prop-walk` asset and `eng-prop-walk-use-docking`).
- **Short-radius / standing turn** (lesson 6) — an agreed step-by-step wording.
- **Engine gauges and alarms** (lesson 4) — what an ASA-103-level student should
  know each gauge/alarm means.

### 2. Visuals
- Approve or amend the 4 required + 2 optional briefs in §G.
- Confirm the visual-production route (in-repo deterministic composition from
  `design/canonical-assets/`, consistent with the README) and who produces them.
- Confirm the handedness convention above before any diagram is drawn.

### 3. Product decisions
- **Nav slot.** Learn as a fourth header button — accept the added density on
  mobile, or place Learn on the Dashboard only? (Recommendation: fourth button;
  see risk J-1.)
- **"Coming soon" modules.** Which of the other 12 topics appear as coming-soon
  rows, and in what order? (Recommendation: show all 12 mapped from `TOPICS`,
  visibly disabled — it costs nothing and communicates the roadmap.)
- **Reset progress.** Confirm "Reset progress" clears Learn state too.
  (Recommendation: yes — it is study progress.)
- **Practice this material fallback.** Confirm the ≥4-question fallback-to-topic
  rule in §C.3.
- **Lesson count.** Approve 9 lessons (+ optional lesson 10), or cut to a
  smaller first module.

### 4. Nothing needed — derivable from the repo
Content technology (TS objects, per §C.1); progress storage shape and the fact
that no DB migration is needed; the question-launch mechanism for Practice; the
asset/attribution pipeline; design tokens and reusable CSS primitives; which
existing questions cover which lesson (mapped in §D); the analytics event
conventions.

---

## I. Proposed implementation sequence

Four Builder steps, each independently verifiable, each shippable. One Builder
and one independent Verifier per step, sequentially — no parallel agents.

### Step 1 — Learn shell, content model, navigation
- **Scope:** `Block`/`Lesson`/`LearnModule` types; `MODULES` with Motoring
  published and the rest coming-soon; 2–3 *placeholder* Motoring lessons; the
  `learn` + `lesson` view states and the fourth nav button; `LearnHome`,
  `LessonView`, block renderer; extract `AssetFigure` from `QuestionFigure`;
  CSS for callout/definition/table.
- **Files:** `src/content/learn/*` (new), `src/components/learn/*` (new),
  `src/App.tsx`, `src/components/shared.tsx`, `src/styles.css`,
  `e2e/navigation.spec.ts`.
- **Acceptance:** Learn reachable from the header; module outline lists lessons
  and coming-soon modules; every lesson opens and browses freely with working
  prev/next; every block kind renders; figures show attribution and enlarge;
  `npm test`, `npm run build`, `npm run test:e2e` green.
- **Builder:** yes.
- **Verifier checks independently:** that no existing view, dashboard element or
  practice/mock/review flow changed behaviour; that `QuestionFigure`'s
  attribution and lightbox are byte-identical in behaviour after the refactor;
  that nothing was added to `package.json`; mobile layout of the four-button nav
  at 390px.

### Step 2 — Learn progress, Continue learning, Coming soon
- **Scope:** `Progress.learn` + fail-closed `parseProgress` validation treating
  absent as valid; mark in-progress on open and complete on button; state chips;
  Continue-learning card on `LearnHome` and one line on the Dashboard;
  "Reset progress" clears Learn; typed `lesson_started` / `lesson_completed`
  analytics events.
- **Files:** `src/lib/progress.ts` (+ tests), `src/components/learn/*`,
  `src/components/Dashboard.tsx`, `src/lib/analytics.ts` (+ tests),
  `e2e/persistence.spec.ts`.
- **Acceptance:** the three states persist across reload and across devices; a
  pre-existing progress row with no `learn` key loads and saves without error;
  a row with a malformed `learn` fails closed exactly like other invalid rows.
- **Builder:** yes.
- **Verifier checks independently:** **round-trip against the real Supabase
  table** (the v1 check constraint accepts the new key); that a client *without*
  this change still parses and preserves a row written *with* it; that the save
  gate, retry, and sign-out-drain behaviour are unchanged; that no migration was
  added.

### Step 3 — Concept tags and Practice integration
- **Scope:** `ConceptId` union; `concepts?` on `Question`; tag the ~42 questions
  in §D; `practiceIdsForConcepts()` + the fallback rule; the `practice` block and
  "Practice this material" launcher returning to the lesson on exit; third
  `PracticeSessionMode` arm `{ mode: 'concept'; lessonId }` with matching typed
  analytics variants; new `content.test.ts` guardrails.
- **Files:** `src/content/types.ts`, `src/content/questions.ts`,
  `src/content/learn/*`, `src/components/PracticeSession.tsx`, `src/App.tsx`,
  `src/lib/analytics.ts`, `src/content/content.test.ts`, `e2e/practice.spec.ts`.
- **Acceptance:** every published lesson launches a non-empty Practice session
  that scores, explains, and feeds the review queue exactly as a topic session
  does; exiting returns to the originating lesson; dead or unknown tags fail the
  test suite.
- **Builder:** yes.
- **Verifier checks independently:** that **no** question's `prompt`, `choices`,
  `correctChoiceId`, `explanation`, `source` or `topic` changed (diff must be
  additive only); that mock-exam selection and per-topic readiness numbers are
  bit-identical before and after; that a Learn-launched session is not counted as
  a topic session in analytics.

### Step 4 — Motoring content and visuals
- **Scope:** the 9 lessons written in full; the 4 required new SVGs produced,
  added to `public/assets/` and `asset-manifest.json`; placeholder lessons from
  step 1 replaced.
- **Files:** `src/content/learn/motoring/*`, `public/assets/*.svg`,
  `src/content/asset-manifest.json`.
- **Acceptance:** all 9 lessons complete and concise; every figure has alt text
  and correct manifest metadata; the module reads as review, not as a textbook.
- **Builder:** yes (content authoring; visuals per §H.2 routing).
- **Verifier checks independently:** **no ASA prose is reproduced** — spot-check
  passages against the supplied chapter for near-verbatim wording; no textbook
  diagram is used or traced; every new asset is project-original with
  `attributionRequired: false` and correct alt text; every factual claim is
  consistent with the explanation text of the questions the lesson links to
  (contradiction between a lesson and a question is the highest-value bug here);
  full e2e + build.

**Final integrated verification** is folded into step 4 rather than made a fifth
step: there is no integration surface that step 4 does not already exercise, and
a separate step would be a process gate, not a check.

---

## J. Risks and decisions

1. **Navigation density (real, low severity).** The header already carries brand,
   subtitle, three nav buttons, an email label and Sign out on one row; a fourth
   button tightens mobile further. `e2e/navigation.spec.ts` asserts the current
   control set and will need updating. Decision needed in §H.3; mitigation is a
   step-1 check at 390px.

2. **Lesson/question contradiction (real, highest content severity).** 42
   questions already assert specific facts with `explanation` and `source`. A
   lesson that words prop walk or a check order differently creates a study tool
   that argues with itself. Mitigation: lessons are written *after* the concept
   mapping exists (step 3 before step 4), and the step-4 Verifier explicitly
   diffs lesson claims against linked question explanations.

3. **Copyright (real, external consequence).** The Motoring chapter is the
   coverage reference and is the direct input to lesson writing, which is exactly
   the condition under which near-verbatim phrasing creeps in. Mitigation: the
   named Verifier check in step 4; no textbook image ever enters
   `public/assets/`; every new asset composed from `design/canonical-assets/`.

4. **Progress-shape change touching the durable boundary (real, contained).**
   `learn` is additive and the v1 check constraint permits it, so no migration is
   needed — but this is the one change in the project that can corrupt a
   learner's saved state, and `parseProgress` fails *closed*, so a validation bug
   would present as lost progress. Mitigation: the step-2 Verifier's real-table
   round-trip and backward-compat check, listed above.

5. **Concept-tag scope creep (real, cheap to prevent).** `concepts?: string[]` is
   one field today; it becomes a taxonomy the moment someone adds hierarchy,
   weights, or a second axis. Decision: the union stays flat, lives in one file,
   and is bounded by the "every tag is used by a lesson and a question" test. If
   a future module wants hierarchy, that is a separate decision with its own
   justification.

6. **Etiquette content has no question coverage (real, scope).** Lesson 9's
   etiquette section is the one place where Learn would teach material Practice
   cannot test — which weakens the "Learn → Practice" loop for that lesson.
   Options: accept it as read-only material, or add 3–4 etiquette questions to
   the bank in a later step. Recommendation: accept for now, note it, and do not
   expand the question bank inside this project.
