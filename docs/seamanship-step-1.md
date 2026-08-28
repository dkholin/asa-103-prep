# Seamanship Step 1 — local foundation

This packet creates lesson skeletons and Practice mappings only. Step 2 must
replace the skeletons; Step 3 owns the approved visual corrections. The local
`published` status exercises the existing catalogue/resolver contract. These
skeletons must not be merged or deployed.

## Released starting baseline

Before any Seamanship writes, CONTROL checked `main`, `origin/main`, HEAD and
the GitHub main API: all were `803cda94d93d109b38422c88aee3029954cc7bda`.
The GitHub Pages deployment for that commit completed successfully. Hands-On
Cruising was published with finished prose, six lessons, the resolver
`1 / 22 / 8 / 1 / 10 / 7`, and 49 unique questions.

The bank contained 301 questions, 92 concepts, 267 tagged questions and 34
untagged questions. The concept-stripped SHA-256 was:

`e749bfcb7b538ec090d8b1535faa905b07edfc1a4a5ffc6a684633b958c87a4c`

The pre-existing untracked `docs/ux-visual-refresh-audit.md` and `undefined/`
were left untouched. Work is on local branch `seamanship/step-1`.

## Rigging evidence and Advisory ruling

The question concerns sailing close-hauled when a **windward shroud** parts.
The immediate objective is to unload the failed support. For that specific
scenario, a tack puts the failed side to leeward and loads the intact side.
Simply bearing away and easing does not establish that transfer of lateral
support. Controlled reduction of sail/load and stabilization follow; this
question does not teach jury-rigging procedures.

Sources directly inspected:

1. Supplied **ASA Chapter 7 — Seamanship**, printed p.140, left half of PDF
   page 8. CONTROL visually inspected the photographed page, rather than
   relying on OCR or the earlier Discovery report. It distinguishes a failed
   windward shroud from fore-and-aft stay failures and supports tacking for
   the former. No ASA prose was copied into the lesson skeletons.
2. [Storm Trysail Hands-On Safety-at-Sea seminar, sanctioned by US Sailing](https://stormtrysail.org/wp-content/uploads/2021/10/Safety-at-Sea-2021-Leave-Behind-Final.pdf),
   damage-control table on printed pp.10–11 (PDF page 6): tack immediately
   for a broken/loose windward shroud or spreader and maintain pressure on the
   new windward side. It separately prescribes keeping the present tack for
   a failed leeward shroud, and different actions for headstay/backstay failure.
   The seminar is the source; this is not represented as a standalone US
   Sailing publication.
3. [Annapolis Sailing School, “What to do if a shroud breaks,” August 6, 2024](https://www.annapolissailing.com/2024/08/06/monday-night-race-8-5-what-to-do-if-a-shroud-breaks/):
   first position the boat to unload the compromised support; its port-shroud
   example calls for starboard tack, followed by lowering sail and securing
   the mast. It also distinguishes forestay and backstay failures.
4. [Peerless Marine, “What to Do If You Lose a Shroud or Stay While Sailing,” April 12, 2025](https://www.peerlessmarine.co.uk/post/what-to-do-if-you-lose-a-shroud-or-stay-while-sailing):
   a generic, undifferentiated sequence says to head into wind and reduce
   sail. CONTROL initially stopped for Advisory rather than hiding this
   discrepancy. Advisory explicitly authorized proceeding: the more specific
   windward-shroud evidence governs this bank question; Peerless's generic
   sequence does not override it.

The correction must not become “always tack after any rigging failure” or
“always bear away after a shroud failure.” It preserves the question id,
topic, close-hauled scenario, choice ids, and correct choice `a`.

## Scope protection

Exactly four new concepts map exactly nine previously untagged questions.
No existing concept is reused. Hands-On lessons, concepts and mappings are
unchanged. All existing published-module resolutions are unchanged.
Weather, `wx-implication-lee-shore`, `flags-alpha`, `flags-diver-down`, and
`sys-compass-interference-note` remain untouched. The bowline wording remains
unchanged for later knot research. No figures, assets, shared components,
styles, routing, engines, progress, analytics or account code are changed.

The tests pin concept-to-question sets, the reverse mapping, lesson sets,
`2 / 4 / 2 / 1`, nine unique questions and no published-module spillover.
The Learn guard is explicitly temporary: **STEP 2 MUST REPLACE/TIGHTEN THIS
SKELETON GUARD**.

## Exact foundation and measured mappings

### Loops & Stoppers

- Lesson: `seamanship-loops-and-stoppers`
- New concept: `fixed-loops-and-stoppers`
- Questions:
  - `sea-knot-bowline`
  - `sea-knot-figure8-stopper`

### Fastening & Gripping Hitches

- Lesson: `seamanship-fastening-and-gripping-hitches`
- New concept: `fastening-and-gripping-hitches`
- Questions:
  - `sea-knot-cleat-hitch`
  - `sea-knot-clove-hitch`
  - `sea-knot-round-turn-two-half-hitches`
  - `sea-knot-rolling-hitch`

### Routine VHF Communication

- Lesson: `seamanship-routine-vhf`
- New concept: `routine-vhf-communication`
- Questions:
  - `sea-vhf-concise-comms`
  - `sea-vhf-working-channel-switch`

### Rigging Trouble & Assistance

- Lesson: `seamanship-rigging-trouble-and-assistance`
- New concept: `rigging-failure-response`
- Questions:
  - `emer-rigging-failure-response`

The real application resolver returns **2 / 4 / 2 / 1**, with **9 unique**
questions and no cross-lesson duplicates or overlap with any previously
published module. All nine were untagged on the released baseline.

Measured movement: **267 → 276 tagged**, **34 → 25 untagged**, **92 → 96
concepts**, with the total unchanged at **301 questions**. No mapping surprises.

## Deliberate question-content change

A field-level comparison of all 301 questions, removing only `concepts`,
found exactly one changed question: `emer-rigging-failure-response`.
All other question content is identical to the released baseline. All mappings
for the previous 92 concepts remain identical, including Hands-On.

Old SHA-256: `e749bfcb7b538ec090d8b1535faa905b07edfc1a4a5ffc6a684633b958c87a4c`

New SHA-256: `24489ac656da5350febef44cdb2feeeeb94c7c9c070552f485c93addcc623349`

The pinned digest rolls only for this Advisory-authorized factual correction.
The regression guard tests the unloading/side-transfer principle, controlled
follow-up and scenario limitation, and rejects the former bear-away answer.

### Before correction

```json
{
  "id": "emer-rigging-failure-response",
  "topic": "emergencies",
  "format": "text",
  "prompt": "While sailing close-hauled, a windward shroud suddenly parts. What is the correct immediate response to protect the mast?",
  "choices": [
    {
      "id": "a",
      "text": "Bear away and ease sail to reduce the load on the rig, keeping the boat off the point of sail that stressed the failed shroud"
    },
    {
      "id": "b",
      "text": "Head up closer to the wind to reduce heel",
      "whyWrong": "Heading up closer to the wind on the point of sail where the shroud failed increases rig load on that side rather than reducing it; bearing away and easing sail is the correct way to unload the rig."
    },
    {
      "id": "c",
      "text": "Immediately drop all sail with no attention to boat control, letting the boat go beam-on to the waves",
      "whyWrong": "An uncontrolled sail drop that leaves the boat wallowing beam-on to the waves adds risk from rolling and loss of control; the priority is bearing away and easing sail in a controlled way, reducing rig load, with dousing sail as appropriate from there."
    },
    {
      "id": "d",
      "text": "Continue on the same course since a single shroud failure doesn't affect the rig",
      "whyWrong": "A parted shroud significantly weakens the mast's lateral support on that side; continuing to load the rig on the same point of sail risks losing the mast entirely."
    }
  ],
  "correctChoiceId": "a",
  "explanation": "A parted shroud removes lateral support for the mast on that side. Bearing away and easing sheets reduces the sideways loading on the rig immediately, buying time to assess the damage, rig a temporary support if available, and get the sail plan under control before the mast is put at further risk.",
  "source": "ASA 103 standard curriculum — rigging failure response"
}
```

### After correction

```json
{
  "id": "emer-rigging-failure-response",
  "topic": "emergencies",
  "format": "text",
  "prompt": "While sailing close-hauled, a windward shroud suddenly parts. What is the correct immediate response to protect the mast?",
  "choices": [
    {
      "id": "a",
      "text": "Tack promptly so the failed windward shroud becomes leeward and unloaded, then reduce sail and stabilize the rig while assessing the damage"
    },
    {
      "id": "b",
      "text": "Head up closer to the wind to reduce heel",
      "whyWrong": "Heading up alone does not transfer the load to the intact shrouds on the other side. In this windward-shroud failure, complete the tack to put the damaged side to leeward, then reduce sail in a controlled way."
    },
    {
      "id": "c",
      "text": "Immediately drop all sail with no attention to boat control, letting the boat go beam-on to the waves",
      "whyWrong": "An uncontrolled sail drop adds risk from rolling and loss of control. First tack to unload this failed windward shroud, then reduce sail and stabilize the rig while maintaining boat control."
    },
    {
      "id": "d",
      "text": "Continue on the same course since a single shroud failure doesn't affect the rig",
      "whyWrong": "A parted shroud significantly weakens the mast's lateral support on that side; continuing to load the rig on the same point of sail risks losing the mast entirely."
    }
  ],
  "correctChoiceId": "a",
  "explanation": "The immediate goal is to unload the failed support. Because this shroud was windward while sailing close-hauled, tack promptly: the damaged side becomes leeward and the intact shrouds on the new windward side carry the load. Then reduce sail in a controlled way and stabilize the rig while assessing the damage. This is not a universal instruction to tack after every shroud or stay failure; the response depends on which support failed and how it is loaded.",
  "source": "ASA Chapter 7, p. 140; Storm Trysail Safety-at-Sea 2021 (US Sailing-sanctioned), damage-control guidance; Annapolis Sailing School, What to do if a shroud breaks (2024-08-06)"
}
```

## Verification evidence

- `npm ci`: passed; 131 packages installed.
- `npm test`: 13 files, **176 tests passed**.
- `npm run build`: TypeScript and production build passed. The existing
  >500 kB chunk warning remains non-blocking; no bundling/architecture change
  was made for this content packet.
- Full `npx playwright test`: **80 tests passed**, including four new
  Seamanship lesson/Practice flows and the corrected rigging answer/reveal.
  Ports 4273/5274/4274 were selected after confirming they were unused.
  The first sandbox attempt could not bind localhost (`EPERM`), so no tests
  ran in that attempt. The approved rerun outside the sandbox passed.
- `git diff --check`: passed.
- CONTROL's separate baseline comparison: all 301 ids/order preserved; only
  one stripped question differs; precisely nine mapping changes; all 92 old
  concept question sets unchanged; Hands-On still `1/22/8/1/10/7`, unique 49;
  no cross-module overlap; assets and architecture untouched.
- Privileged-secret marker scan: no matches in tracked content outside the
  workflow's own scan expression.

### Mutation checks

Five temporary changes were tested independently; each triggered the expected
assertion failure. The question file was restored byte-for-byte in a `finally`
block, then the semantic/digest audit passed again:

1. Restore the old bear-away correct answer — mechanical regression rejects.
2. Substitute an always-tack answer — mechanical regression rejects.
3. Remove the scenario limitation and assert universal tacking — regression rejects.
4. Give `wx-implication-lee-shore` a Seamanship concept — exact forward and
   reverse mappings reject.
5. Add a legacy concept to the bowline question — reverse mapping rejects
   the published-module spillover even though Seamanship's own set stays right.

### Course-order test retargets

No production course-order logic changed. Only these existing test fixtures
needed retargeting after local publication:

- `src/lib/learn-progress.test.ts`: the zero-of-zero coming-soon example now
  uses exact module id `cruise-planning-independence`; the two stale stored
  lesson fixtures use `cruise-planning-independence-weather` (an intentionally
  nonexistent lesson, not a new Planning lesson).
- `e2e/navigation.spec.ts`: the non-openable coming-soon card is now
  Cruise Planning & Independence.
- `e2e/shell.spec.ts`: the compact/non-expandable coming-soon card is now
  Cruise Planning & Independence.

All original assertions remain. Continue Learning terminal behavior and
accordion behavior passed the full suite. Separately, four added tests in
`e2e/learn-practice.spec.ts` cover exact Seamanship lesson ids/titles/counts,
rendering, concept-session events and returning to the originating lesson.

## Independent Verifier and closeout

One fresh independent Verifier returned **PASS** with **no BLOCKER findings**
before the local commit. The Verifier independently inspected the actual ASA
PDF page, opened Storm Trysail and Annapolis sources, checked the released
baseline/deployment, reviewed every scoped change, and recalculated the
question-content digests. Its separate audit confirmed all 92 existing concept
mappings and all 41 existing lesson objects/resolvers were unchanged. Its own
unit suite passed 176/176 and its own whitespace check passed. It also reviewed
CONTROL's full browser/build/install/mutation evidence and independently read
Playwright's passed last-run status with no failed tests.

- **BLOCKER:** none.
- **NON-BLOCKING:** existing build chunk-size warning.
- **DEFER:** finished prose and tighter Learn guards to Step 2; the approved
  figure-eight and round-turn/two-half-hitches visual repairs to Step 3;
  bowline wording and reserved curriculum gaps to their later research.

The factual defect fixed is the windward-shroud question's former bear-away
answer and its supporting b/c rationales/explanation. No other question-content
defects were changed. The source discrepancy is resolved under the explicit
Advisory ruling above. There were no further implementation blockers.

The packet is accepted for a **local commit only**. Seamanship remains locally
published with skeletons; no merge, push or deployment is authorized or performed.
Assets and Hands-On remain untouched. Step 2 has not begun.
