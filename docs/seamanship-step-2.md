# Seamanship Step 2 closeout

**Scope:** content and research only, on `seamanship/step-1`. No merge, push,
deployment, Step 3 execution or Cruise Planning work.

## Baseline and content

- Starting Step-1 commit: `ae049ad1831722f7543a8c8f7764af5757800054`.
- Confirmed production ancestor: `803cda94d93d109b38422c88aee3029954cc7bda`.
- Source gate: all 12 image-only Chapter 7 spreads rendered with Poppler,
  rotated in a scratch PDF with pypdf, directly viewed before authoring.
  Verifier independently viewed all 12. No ASA images copied into the app.
- Research: current USCG/NAVCEN, FCC/current federal rules for routine VHF;
  Grog and Samson for knots; Storm Trysail/Annapolis for rig failures;
  USCG/BoatUS/Samson for towing limits. Findings, links and nine-question
  audit: `docs/learn-foundation/SEAMANSHIP_RESEARCH.md`.

| Lesson | Prose words | Blocks | Figures |
| --- | ---: | ---: | --- |
| Loops & Stoppers | 531 | 13 | `photo-bowline` |
| Fastening & Gripping Hitches | 625 | 16 | `photo-rolling-hitch` |
| Routine VHF Communication | 614 | 15 | None |
| Rigging Trouble & Assistance | 707 | 18 | None |

Counts include intro, text/definition/callout bodies, list items, table cells and
captions; exclude heading labels, table headers, definition terms and callout titles.

## Nine-question audit

All prompts, choices, wrong-answer rationales, explanations and sources reviewed.
Five factual corrections; every correct-answer id and concept mapping preserved:

- `sea-knot-bowline`: “won't slip or jam” was too absolute. Fixed loop, usually
  releasable after unloading; dressing/tail/cyclic loosening stated. Removed
  general harness/tether endorsement and non-slipping rationale.
- `sea-knot-figure8-stopper`: removed bowline-for-harness advice in one wrong-answer
  rationale; use equipment manufacturer's instructions. Stopper answer unchanged.
- `sea-knot-cleat-hitch`: disputed photo no longer presented as correct. Existing
  question is text-only; farther-horn lead, orderly crossings and ordinary dockline
  locking context replace blanket easy-release/base-turn wording.
- `sea-knot-round-turn-two-half-hitches`: replaced chafe-tolerance rationale with
  initial friction/strain and securing around standing part; still inspect/protect chafe.
- `sea-knot-rolling-hitch`: removed unconditional “without slipping”; qualified by
  material/diameter, direction, dressing and testing.

Unchanged after full review: clove hitch, concise VHF, working-channel switch,
and the Step-1 windward-shroud response (specific tack, then reduce/stabilize;
not “always tack” for every stay/shroud failure).

## Preserved scope and mapping

301 questions; **96 concepts; 276 tagged; Practice 2/4/2/1; nine unique**.
Exact forward and reverse concept guards remain. A separate baseline comparison
confirms every question id/concept array unchanged, including all prior modules;
**Hands-On remains 49**. Zero towing questions; no bank expansion.

No weather lesson, `wx-*` concept, forecast/advisory teaching or Cruise Planning.
No duplicate emergency-radio, MOB, docking, grounding, steering-loss, winch or
hardware-identification curriculum. No architecture, styling or new asset changes.

## Findings and deferrals

- BLOCKER fixed: source-disputed cleat photo omitted from L2 and its question.
  Image file untouched; unused manifest registration removed to keep exact asset
  guards valid. Provenance retained in research. No replacement visual requested.
- DEFER: the two known-defective SVGs remain byte-for-byte unchanged and excluded
  from Learn. Their inherited Practice references await the two approved Step-3
  replacements. Step 2 is not a release and must not be deployed as final visuals.
- Existing large-bundle build warning is non-blocking. No unrelated polish.
- Unrelated `docs/ux-visual-refresh-audit.md` and `undefined/` remain untouched.

## Acceptance gates and independent review

- `npm test`: **177/177 PASS** after the final cleat/manifest correction.
- `npm run build`: **PASS** (existing bundle-size warning only).
- Full `npx playwright test`: **80/80 PASS**, 21.6 seconds, with isolated ports
  4273/5274/4274. Includes complete 2/4/2/1 sessions and return-to-lesson checks.
- `git diff --check`: **PASS**.
- Independent Verifier: **PASS after closing the sole blocker**. One fresh
  full-pass review covered all source pages, finished prose, facts, nine complete
  questions, visuals, mapping guards and UX; only the identified blocker and its
  metadata consequences were rechecked afterward. No editorial polish cycle.
  Verifier independently reran 63 focused final content/mapping/lesson tests.
- UX at **1280/390/320**: no page-level horizontal overflow observed; tables fit
  or scroll internally, definition blocks readable, figures scale and credits
  wrap. Lightboxes, accordion, previous/next, Continue Learning, completion,
  answered 2/4/1 sessions and return from Practice verified in the browser.
  Existing fake-account development mode used; no real account changes.

The local commit containing this report is Step 2. Its full SHA is provided in
the external closeout; a commit cannot contain its own final hash. No push,
merge or deployment is authorized by this acceptance.

## Digest

Concept-stripped question-bank SHA-256, deliberately changed for the five
documented corrections only:

- Before: `24489ac656da5350febef44cdb2feeeeb94c7c9c070552f485c93addcc623349`
- After: `f680667228d3578534005ad96dabdaac4a85c80383c5195e3eac70c3e98b6e29`

## Step 3 — exactly two replacements, not started

Replace the existing asset files under the existing IDs; keep question IDs,
concepts and 2/4/2/1 mapping unchanged. Verify geometry against authoritative knot
references and actual rope before approval. Keep strokes/crossings readable at
320 px and in the existing lightbox. Use neutral alt text and provenance. Do not
embed answer choices or functional quiz-answer text into either image.

1. **`custom-figure8-stopper`:** show a single continuous rope forming a true
   figure-eight stopper, with unambiguous over/under crossings, a traceable
   standing part and free end, and adequate visible tail. A loose-to-dressed
   pair is acceptable if needed to reveal the path. The dressed result must be
   a stopper rather than an attachment loop, bight knot or bowline. If a fitting
   is shown, its opening must be smaller than the dressed knot; do not imply
   that any stopper blocks every opening. No harness/hoisting application.
2. **`custom-round-turn-two-half-hitches`:** show the initial round turn around
   a post/ring (two passes around the object), followed by two half hitches in
   the same direction around the standing part, not around the post. Make the
   continuous path, loaded standing part, free tail and all crossings clear.
   The two half hitches have a clove-hitch structure on the rope; the complete
   arrangement must be visibly different from a clove hitch directly on a post.
   A minimal staged view is acceptable to distinguish initial friction from
   the securing hitches. No chafe-proof or universal towing claim.

No replacement cleat visual is requested: the disputed candidate is omitted and
its existing question uses text. No new rigging/towing diagram or other artwork.
