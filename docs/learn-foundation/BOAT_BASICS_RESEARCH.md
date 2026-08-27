# Boat & Cruising Basics lesson research note

Step 2 of the Boat & Cruising Basics module replaced six lesson skeletons with
finished teaching copy.

## The ASA chapter was available this time

Unlike the Motoring and Navigation steps — whose research notes record that no
ASA chapter could be found — the supplied ASA Chapter 1 excerpt **was** available
for this step, as a seven-page scan at `Basics.pdf` outside the repository. It
covers *The Cruising Sailboat*, *A Cruising Sailboat's Cabin*, and *A Sailboat's
Equipment and Systems*.

It has no text layer, so it was read by rendering each page to an image. It is
not committed to this repository and no part of it is reproduced here.

**How it was used**: as a curriculum and terminology source only — which concepts
belong in this module, what the standard names are, what order they are best met
in, and which relationships need explaining. Its prose was not copied or closely
paraphrased, its diagrams were not reproduced or traced, its photographs were not
reused, and its page structure was not imitated. The lesson copy is written fresh
for the app and reads as a study guide rather than a digitised textbook.

Two things in the chapter were deliberately **not** carried over:

- Its ~33-foot reference boat is used as this module's working example, but is
  explicitly framed as an example rather than a definition. The chapter's "between
  30 and 35 feet" phrasing is not repeated as a definition of a cruising sailboat.
- Its safety-equipment section (fire-extinguisher B-I/B-II carriage requirements,
  distress-signal and life-jacket requirements) is omitted entirely. That material
  belongs to the future Cruising Life & Safety module, and the chapter's
  terminology for it is stale. `learn.test.ts` asserts it has not crept in.

The accepted Practice question bank was the second authority: all 24 questions
mapped to the six lessons' concepts — every prompt, choice, `whyWrong`,
explanation and figure — were read before the lessons were written, so the copy
and the bank agree.

## Claims verified against outside sources

The brief flagged a small number of claims as most likely to be wrong from
memory. Only these were researched; no broad research project was run, and no
regulatory safety research belonging to the future Safety module was undertaken.

| # | Claim as written | Result |
|---|---|---|
| 1 | Keel-hung / skeg-hung / spade rudder naming and description | Confirmed. Keel-hung hangs on the trailing edge of a full or long keel; skeg-hung hangs on a fixed fin integral with the hull, which gives it protection and support a bare stock does not; spade is free-standing on its stock in hull bearings, and is what the majority of modern production boats carry. Written as a three-row table on that pattern. |
| 2 | Wheel-steering arrangements | Confirmed as a **family**, not one mechanism. Cable/quadrant is the most common; radial drive substitutes a disc the cables wrap; rack-and-pinion and hydraulic are also in use. Copy says "A very common arrangement…" and adds "Do not assume any one of these on a boat you are stepping aboard." |
| 3 | How to frame the emergency tiller | Sources disagree between "every wheel-steered boat" and "many". Written as **"most wheel-steered cruising boats carry"** — the conservative reading, and consistent with the existing question bank, whose `sys-emergency-tiller-id` explanation already says "Most wheel-steered cruising boats carry an emergency tiller". |
| 4 | Self-bailing cockpit wording | Confirmed: a sealed cockpit sole above the waterline draining overboard by gravity through drains/scuppers, with no pump involved. Written as a `definition` block on exactly that basis. |
| 5 | House and start battery arrangement | Confirmed and consistent with `sys-battery-basics`. Written as a two-row table: house bank for domestic loads that draw down over hours, start battery held in reserve. |
| 6 | Battery selector switch | The alternator claim is **real but qualified**. Disconnecting the alternator's load while it is charging can produce a voltage spike that damages its diodes or regulator; severity depends on how hard the alternator is working. Many modern switches include an **alternator field disconnect** designed to prevent exactly this. The callout states the risk, names the AFD mitigation and the variability, and lands on the habit rather than a broad technical claim: do not move the selector with the engine running. |

Sources consulted for the above: Practical Sailor, Cruising World, Practical Boat
Owner, Good Old Boat, West Marine's steering advisor, Marine How To, and
Fisheries Supply. These are marine-trade and manufacturer sources rather than
standards documents; where they disagreed (claim 3), the conservative wording was
taken and cross-checked against this project's own question bank.

## Figures

No new visual was created. Seven already-approved manifest assets were reused:

| Lesson | Assets |
|---|---|
| L3 A Tour of the Deck | `photo-chainplate`, `custom-stemhead-bow-roller` |
| L4 Steering & the Rudder | `custom-binnacle-compass`, `custom-emergency-tiller` |
| L5 Belowdecks | `custom-cabin-layout` |
| L6 Onboard Systems | `custom-seacock-throughhull`, `custom-bilge-pump` |

Every asset was rendered and inspected before its caption was written, and three
first-draft captions were corrected because they named components the artwork
does not actually show — a forestay on the stemhead diagram, a turnbuckle on the
chainplate photo, and a companionway position on the cabin plan. Captions now
describe what is drawn.

`photo-turnbuckle` was deliberately **not** used. It is approved and available,
but the chainplate photo already sits at the same place on the boat, and a second
close-up of adjacent hardware would make a gallery out of what should be one
illustration. The turnbuckle is taught as a `definition` block instead.

## Visual recommendations for Step 3

Recommendations only — Step 3 decides and builds.

- **`custom-boat-anatomy-profile` — still REQUIRED.** Writing L1 confirmed rather
  than removed the need. That lesson is the module's spatial index and is the only
  one with no figure; it currently carries a dense set of positional terms in
  prose alone. It is authored so a labelled profile drops in naturally after the
  bow-to-stern explanation and before the deck section.
- **`custom-rudder-types` — BUILD.** L4's three-row comparison table is written to
  stand on its own and does, but the distinction is purely geometric and a small
  side-by-side profile would land it instantly.
- **`custom-deck-plan-labelled` — BUILD, after the anatomy profile.** L3 is the
  most spatial lesson in the module and has only two close-ups, no orientation
  view. Sequence matters: build the anatomy profile first, then scope the deck
  plan to deck hardware so the two do not label the same landmarks twice.
