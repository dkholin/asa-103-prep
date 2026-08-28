# Seamanship Step 3 closeout

**Scope:** two instructional SVG replacements and their integration, on
`seamanship/step-1`. No question-bank change, no bank expansion, no new
curriculum, no Cruise Planning work.

## Baseline

- Starting Step-2 commit: `1908c60073b3e54484ee0eee2f511ce1923b7917`, clean
  tracked tree, Step-1 `ae049ad` and production `main` `803cda9` both in ancestry.
- Baseline gates before any edit: `npm test` **177/177 PASS**.
- Question digest recorded before visual work and unchanged after it —
  see **Digest** below.

## The two replacements

Both asset ids, filenames and question mappings are preserved; only the SVG
files and their manifest metadata changed.

### `custom-figure8-stopper`

The rejected drawing was not a knot. It was one open S-curve plus a separate
closed teardrop path, with no over/under anywhere, the tail running off the
canvas, and the words "Figure-eight stopper knot" baked into the image.

The replacement is a single continuous rope. Its geometry was generated from
the tying sequence — tail over itself to form a loop, on under and around the
standing part, then back down through that loop — and then checked numerically
rather than by eye. The drawn curve has exactly **four self-crossings**, is
**strictly alternating**, and no crossing occupies two consecutive positions
along the strand, so the diagram is **reduced** — it carries no removable kink.
Its Gauss code is `O1 U2 O3 U4 O2 U1 O4 U3`. A reduced alternating diagram is
minimal, and the only knot of crossing number 4 is the figure-eight, 4₁; an
overhand knot would reduce to three crossings. Because the base point and
labelling differ from the usual textbook presentation of 4₁, the generator also
checks the invariant that settles it: the interlacement graph of the chord
diagram is a 4-cycle, every crossing interleaving exactly two of the other
three. All four assertions run before the file is written, so a geometry edit
that broke the knot could not be emitted. The reasoning is recorded in a
comment inside the SVG, and the same four properties are re-derived from the
drawn path by a test rather than read off that comment.

Presentation: a finished knot with two interlocking lobes, drawn deliberately
loose rather than pulled up hard so the whole rope path stays traceable — which
Step 2 explicitly permitted — with a standing part running off the left edge
toward the load and a long free tail, long enough not to suggest an unsafe
minimal tail. No fitting is drawn, so the image
makes no claim about what any stopper will or will not block.

### `custom-round-turn-two-half-hitches`

The rejected drawing was two free-standing ellipses floating on a post plus two
disconnected hook curves; there was no continuous rope path at all, and it
carried the caption "Two half hitches finish the bend".

The replacement is again one continuous rope. The round turn is generated as a
wrap from θ = −90° to 630°, i.e. **two complete passes** around the piling, at a
radius slightly larger than the post so the rope stays visible where it curls
round the silhouette edges; the passes that fall behind the piling are hidden by
the piling itself. Nothing is drawn as a free-standing ellipse.

Both half hitches are tied round the **standing part**, not round the piling,
and both the same way round, so the pair forms a clove hitch on the standing
part. Each hitch crosses the standing part in front, passes round behind it, and
tucks under its own incoming leg. The generator finds the six resulting
crossings and asserts that the declared front/back strand at each one is
self-consistent. Because the piling carries a plain two-pass wrap with no
locking diagonal of its own, the arrangement is visibly not a clove hitch tied
on the piling.

## Topology references

Checked independently, per knot, against sources fetched for this step:

- Animated Knots by Grog, [Figure 8 Knot](https://www.animatedknots.com/figure-8-knot):
  "Pass the tail over itself to form a loop", "continue under and around the
  standing end", "passing the tail down through the loop".
- [Sailboat Cruising, Figure of 8 Knot](https://www.sailboat-cruising.com/Figure-of-8-Knot.html):
  same path in marine terms; finished knot shows the two legs of the "8" neat
  and untwisted.
- USCG Boat Crew Handbook — Seamanship Fundamentals
  ([BCH4](https://higherlogicdownload.s3.amazonaws.com/NASBLA/76594a34-f3a1-4916-95ac-1e9c872170cc/UploadedImages/training/Handbook/bch4.pdf)),
  p. 2-23: "A round turn is a complete turn or encircling of a line about an
  object, as opposed to a single turn"; p. 2-25: a half hitch brings "the working
  end 'a' around the standing part and back under itself"; p. 2-26: "A round turn
  or two, secured with a couple of half hitches, is a quick way to secure a line
  to a pole or spar."
- Animated Knots by Grog, [Round Turn & Two Half Hitches](https://www.animatedknots.com/round-turn-two-half-hitches-knot)
  and [Two Half Hitches](https://www.animatedknots.com/two-half-hitches-knot):
  two complete passes around the object; the half hitches are tied round the
  standing end and "actually form a clove hitch round the standing end"; both
  must be made in the same direction.

**Variant chosen.** Sources differ on whether a "round turn" is one encirclement
or two passes: Wikipedia describes it as wrapping the rope around the object
"completely encircling it", while Grog and the USCG handbook describe the
working form as two passes ("a round turn or two"). The drawing uses **two
complete passes**, which is the standard marine instructional form and is what
the finished L2 prose already teaches ("Take the end around the post or through
the ring twice to establish the round turn").

No external illustration was used as a template. Both files are generated
geometry, constructed from the written tying sequences; no ASA composition,
copyrighted step diagram or source-specific styling is reproduced.

## Manifest, alt text and captions

Only the two entries changed; no unrelated manifest entry was touched.

- Both `altText` values were rewritten from the old placeholder wording ("Line
  drawing of the knot named in the question") to a description of the actual
  instructional geometry — continuous rope, crossings, standing part, tail; for
  the hitch, the two passes round the piling and the two hitches round the
  standing part. Each matches its SVG `aria-label` exactly.
- Both `description` values now say what is drawn rather than what the knot is for.
- Both entries are marked `modified: true` with a `modificationNote` recording
  the Step-3 redraw and naming the specific defect in the earlier geometry.
  Neither asset requires attribution, so no credit line is rendered.
- New captions, one per figure, are purely path-tracing instructions. Neither
  states the fastening's purpose.

## Integration

Step 2 reserved no figure slots, so one `figure` block was added to each lesson
at the point the prose describes the rope path:

- `seamanship-loops-and-stoppers` — after the paragraph describing the
  figure-eight path; figures are now `photo-bowline`, `custom-figure8-stopper`.
- `seamanship-fastening-and-gripping-hitches` — after the three-step round-turn
  list and before the clove-hitch contrast paragraph; figures are now
  `custom-round-turn-two-half-hitches`, `photo-rolling-hitch`.

No other lesson text changed. L3 and L4 remain figureless. No decorative
duplicates; no third replacement visual, consistent with Step 2 omitting the
source-disputed cleat photo.

## Answer neutrality

Visible label text is `Standing part` / `Tail` on the figure-eight and
`Standing part` / `Working end` / `Round turn` on the hitch — geometry only. A
test asserts neither image's visible text contains `stopper`, `block`,
`fairlead`, `halyard`, `sheet`, `runs out`, `initial strain`, `friction`,
`securely fasten`, `non-slip` or `bowline`, and caps the visible word count at
six and eight respectively. The correct answers to `sea-knot-figure8-stopper`
and `sea-knot-round-turn-two-half-hitches` therefore appear nowhere in either
image. Lesson captions teach the rope path only; captions are not injected into
Practice.

## Responsive results

Measured in the running app, Learn lesson column:

| Viewport | figure-eight | round turn | page overflow |
| --- | --- | --- | ---: |
| 1280 | 683 × 580 | 683 × 424 | 0 |
| 390 | 322 × 273 | 322 × 200 | 0 |
| 320 | 252 × 214 | 252 × 156 | 0 |

Crossings, over/under gaps and labels remain readable at 320 px; no clipping and
no page-level horizontal overflow at any width. Lightbox opens, closes on
Escape and returns focus to its trigger at 320 px.

## Guards

- `src/content/content.test.ts` gains one test that pins the finished visual
  contract structurally, never by pixels. It parses the rope centreline out of
  each SVG's path data and **re-derives the topology**, so a comment cannot
  stand in for a drawing:
  - figure-eight — exactly four self-crossings; no crossing at two consecutive
    positions along the strand (reduced, no removable kink); an interlacement
    graph in which every crossing interleaves exactly two of the other three;
    and a strictly alternating front/behind sequence read off the redrawn
    over-slices, with each crossing having one front pass and one behind pass;
  - round turn — the wrap reaches past the piling's far edge exactly twice (two
    complete passes), both rope ends leave on the same side, there are exactly
    six free-rope crossings (three per half hitch), and every one of them lies
    well clear of the piling, so the hitches are on the standing part;
  - both — absence of the rejected geometry (`<ellipse>`/`<circle>`, the old
    palette, the old baked-in captions), rope stroked rather than filled, and
    the answer-leak word list above.
  Near-parallel grazes where the rope turns back at a silhouette edge are
  filtered out, so the crossing counts are the real ones.
- `src/content/learn/learn.test.ts` now pins the exact figure list and order per
  Seamanship lesson, and still forbids the asset ids from appearing in prose.
- `e2e/seamanship-visual.spec.ts` (new) checks both figures at 1280/390/320:
  visible, no page overflow, not collapsed, caption present, no credit line on a
  project original, substantive alt text, lightbox open/Escape/focus return, and
  that the served SVG is the corrected geometry.
- The guards were mutation-tested, not merely observed to pass. Each of these
  fails the suite with a legible message: restoring the two rejected SVGs;
  replacing the rope with a straight line; deleting a single over-slice so the
  diagram stops alternating; and truncating the wrap to one pass. An earlier
  draft of this guard asserted comment strings and would have accepted a
  straight line — the independent Verifier demonstrated that, and it was
  rewritten to derive the topology instead.

## Acceptance gates

- `npm test`: **178/178 PASS** (177 at Step 2, plus one new content guard; the
  Learn figure guard was widened in place rather than added).
- `npm run build`: **PASS** (pre-existing bundle-size warning only).
- Full `npx playwright test`: **85/85 PASS** (80 at Step 2, plus five new
  Seamanship visual checks).
- `git diff --check`: **PASS**.

## Frozen contract, re-measured after the change

- 301 questions; **276 tagged; 96 concepts**.
- Seamanship Practice resolver **2 / 4 / 2 / 1**, **9 unique**.
- Hands-On Cruising **49 unique**, unchanged.
- `src/content/questions.ts` is byte-identical to Step 2 — Step 3 changed no
  question content.

## Step-2 and Step-1 corrections, reconfirmed present

- `sea-knot-bowline` — fixed loop, "usually easy to untie after the load is
  removed"; dressing, adequate tail, "can work loose under cyclic loading"; no
  harness or life-safety endorsement.
- `sea-knot-figure8-stopper` — the harness wrong-answer rationale defers to the
  equipment manufacturer's instructions; purpose and answer id unchanged.
- `sea-knot-cleat-hitch` — text-only, no disputed photo; farther-horn lead,
  orderly crossings, locking turn limited to an ordinary dock line.
- `sea-knot-round-turn-two-half-hitches` — initial strain at the object,
  hitches around the standing part, chafe still inspected and protected.
- `sea-knot-rolling-hitch` — no unconditional "without slipping".
- `emer-rigging-failure-response` — Step-1 windward-shroud correction intact.

## Digest

Concept-stripped question-bank SHA-256, **unchanged from Step 2**:

`f680667228d3578534005ad96dabdaac4a85c80383c5195e3eac70c3e98b6e29`

## Independent Verifier

One fresh independent Verifier reviewed the whole finished module, not just the
two SVGs. **Verdict: PASS, no blockers.**

It re-derived both topologies from the path data with its own tools rather than
trusting this report. For the figure-eight it computed the crossing set, the
signed Gauss code, writhe 0, and the **knot determinant = 5** via Fox colouring
— which with four alternating crossings identifies 4₁ and excludes the unknot
(1) and the overhand/trefoil (3). For the round turn it confirmed the wrap is a
real helix with front/back/front/back sweeps against a post half-width of 30,
six real crossings after discarding two degenerate tangencies at the helix
turnaround, both hitches encircling the standing part the same way round, and no
locking diagonal on the piling. It re-downloaded the 313-page USCG handbook and
confirmed all three quoted passages verbatim, and independently re-measured the
counts, the digest, the resolver and the responsive table.

Findings it raised, and what was done:

- **Fixed — the topology guard only guarded a comment.** It showed that
  replacing every rope path with a single straight line still passed. The guard
  now parses the path data and re-derives the topology; the straight-line attack
  and three other mutations were each confirmed to fail it.
- **Fixed — a test comment overstated that guard** (`e2e/seamanship-visual.spec.ts`).
- **Fixed — the manifest described the figure-eight as "dressed"** when it is
  deliberately drawn loose so the path stays traceable. Description and this
  report corrected; the alt text never made the claim.
- **Fixed — the lightbox assertion compared against a fixed 240 px** that the
  in-flow figure already exceeded, so it would have passed on a lightbox
  *smaller* than the figure. It now compares against the measured in-flow width.
- **Fixed — the "Round turn" leader line ended in a gap**, touching no rope. It
  now lands on the upper front pass of the wrap.
- **Kept deliberately — `modified: true` on project originals.** The field
  drives CC change-indication next to a credit line, and neither asset carries
  one, so nothing renders either way. It is literally true of these files and
  the accompanying `modificationNote` is what records the Step-3 provenance the
  brief asked for.
- **Deferred — the SVG lightbox is barely an enlargement** (below).
- Noted: this closeout document was written while the review was in progress.
  No asset or source file changed during it; the Verifier re-checked every asset
  hash afterwards.

It flagged two things it could not check: it did not compare the drawings
against ASA textbook artwork (none is in the repo, and none was fetched), so
originality is assessed from construction method and shared house palette rather
than from a negative match; and the digest has no standalone script, so it
relied on the passing assertion plus the byte-identity of `questions.ts`.

## Deferred, non-blocking

- The SVG lightbox is only a marginal enlargement at every width, because
  `.lightbox-img[src$='.svg']` is capped at `min(760px, 90vw)` while the in-flow
  figure already fills the lesson column: 288 px versus 252 px at a 320 px
  viewport. This is pre-existing app-wide behaviour affecting every SVG figure
  in every module, not something these two assets introduced, and changing it
  would restyle unrelated modules. Deferred rather than fixed here.
- Existing large-bundle build warning is non-blocking.
- Pre-existing untracked `docs/ux-visual-refresh-audit.md` and `undefined/` (the
  latter an artefact of an earlier step's screenshot path) are left untouched.
