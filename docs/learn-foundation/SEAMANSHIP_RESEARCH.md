# Seamanship Step 2 research

Checked 2026-08-28. Scope: four finished lessons, nine existing questions; no release.

## Chapter 7 disposition and originality

CONTROL rendered every spread of the supplied image-only `Seamanship.pdf` with
Poppler, rotated a scratch PDF with pypdf for readability, and visually inspected
all 12 upright PNGs before authoring. Source: `Documents/Documents scans/Temp/Seamanship.pdf`.
No OCR or Discovery-only authoring. The scans and derived images are not repository assets.

| PDF spread / printed pages | Disposition |
| --- | --- |
| 1 / chapter opening | Context only; do not adopt the chapter's broad ownership |
| 2–4 / 128–133 | Weather, forecasts and tides excluded entirely |
| 5 / 134–135 | Routine VHF only; current rules checked separately; distress examples excluded |
| 6 / 136–137 | Bounded assistance/towing; grounding excluded |
| 7 / 138–139 | Flooding, steering loss and fouled prop excluded |
| 8 / 140–141 | Rigging/dismasting only; fire excluded |
| 9–12 / 142–149 | MOB and hypothermia excluded; incidental bowline uses are not a knot curriculum |

L1/L2 are independently researched. L3 uses a new fictional exchange and a
channel-choice table. L4 organizes around lost function, a specific scenario,
and the limits of intervention rather than following ASA's hardware-by-hardware
repair recipes. No ASA prose, close sentence imitation or artwork is intended.
Independent full-pass comparison is a separate acceptance gate.

## VHF: U.S. voluntary recreational operation

- [NAVCEN channel table](https://navcen.uscg.gov/us-vhf-channel-information): 16 is distress/safety/calling; 9 supplements recreational calling. 68/69/71 are noncommercial choices subject to restrictions; 72 is intership, not a marina channel. Use the marina's published authorized channel, not a universal 16-first rule. Move routine exchanges off calling channels.
- [NAVCEN boater guidance](https://navcen.uscg.gov/radio-information-for-boaters) and [watchkeeping guidance](https://navcen.uscg.gov/radio-watchkeeping-regulations): monitor 16 as normal practice. The boater summary's “radio turned on” wording is narrower than the rule and is not adopted.
- [47 CFR 80.310, current rule text reproduced by Cornell](https://www.law.cornell.edu/cfr/text/47/80.310), reconciled with [FCC 06-129, paragraphs 13–14](https://docs.fcc.gov/public/attachments/FCC-06-129A1.pdf): non-DSC voluntary vessels underway watch 16 when not communicating; recreational 9 call/reply alternative. VHF-DSC permits a digital 70 watch or aural 16. Lesson distinguishes this legal alternative from recommended listening on 16; no voice on 70. Direct eCFR access to this section failed; the FCC order confirms the deliberate underway wording.
- [47 CFR 80.13(c), eCFR](https://www.ecfr.gov/current/title-47/chapter-I/subchapter-D/part-80/subpart-B/section-80.13): individual station-license exemption depends on voluntary carriage, no foreign ports or international communications and authorized equipment, not just boat length. [47 CFR 80.177(a)(5), official 2025 CFR](https://www.govinfo.gov/content/pkg/CFR-2025-title47-vol5/pdf/CFR-2025-title47-vol5-sec80-177.pdf): domestic voluntary VHF operator exemption. Current Cornell text agrees. No international exemption inferred.
- [Garmin VHF manual, power selection](https://www8.garmin.com/manuals/webhelp/vhf115215/EN-US/GUID-365E1850-A273-4885-A7B8-EA048519521C.html): nearby 1 W / permitted 25 W as needed, to manage interference; channel restrictions and radio capability matter. No universal high-power rule or guaranteed range.
- [USCG Radiotelephone Handbook CGTTP 6-01.1B](https://wow.uscgaux.info/Uploads_wowII/R-DEPT/CGTTP_6_01_1B_Radiotelephone_Handbook.pdf), message fundamentals and proword appendix: OVER requests reply, OUT ends without reply. These remain useful conventions, not claimed as mandatory recreational syntax. No emergency script or DSC-distress instruction is imported.

## Knot facts and limits

Sources: Animated Knots by Grog's [bowline](https://www.animatedknots.com/bowline-knot),
[figure-eight](https://www.animatedknots.com/figure-8-knot),
[cleat](https://www.animatedknots.com/cleat-hitch-knot-dock-line),
[clove](https://www.animatedknots.com/clove-hitch-knot-rope-end),
[round turn/two half hitches](https://www.animatedknots.com/round-turn-two-half-hitches-knot),
[rolling hitch](https://www.animatedknots.com/rolling-hitch-knot);
[Samson's knot guidance](https://www.samsonrope.com/resources/arborist/how-to-tie-arborist-knots)
and [rope-use warnings](https://www.samsonrope.com/docs/default-source/default-document-library/warning-insert.pdf).
Samson's arborist applications are not imported as recreational life-safety advice.

Bowline: fixed eye, ordinarily releasable after unloading; cyclic/slack loosening
requires dressing, tail and reinspection. No universal tail multiplier is taught.
Figure-eight: end stopper, large enough for the actual opening; can loosen.
Cleat: base lead and crossings; locking finish is contextual. Grog specifically
warns against repeated base turns trapping the lead and locking a towline.
Clove: temporary attachment; can slip or bind. Round turn: friction at the object,
then two same-direction half hitches around the standing part. No knot makes
chafe protection unnecessary. Rolling: directional grip; rope and pole variants
differ; the reused image is ABOK 1735, not the pole variant. Modern slippery
materials can defeat it. No live load-transfer procedure is taught.

## Rigging and towing reconciliation

[Storm Trysail's US Sailing-sanctioned seminar](https://stormtrysail.org/wp-content/uploads/2021/10/Safety-at-Sea-2021-Leave-Behind-Final.pdf),
PDF p.6 damage table, and [Annapolis Sailing School](https://www.annapolissailing.com/2024/08/06/monday-night-race-8-5-what-to-do-if-a-shroud-breaks/)
agree with ASA p.140 for the specific windward-shroud case: transfer support by
tacking, then controlled reduction/stabilization. Step-1 reconciliation remains
binding: Peerless's generic head-to-wind sequence does not override this case.
Different failures need different responses; do not indiscriminately remove a
sail temporarily supporting a failed stay. Dismasting: crew, hull and secondary
hazards before salvage; no automatic engine start or cut-everything-free rule.

[USCG Boat Operations handbook BCH16114.1B, chapter 3](https://www.uscgaux-ocnj.org/Training/Crew%20Manuals/BOAT%20CREW%20HANDBOOK%20-%2016114.1B_Boat%20Operations.pdf)
(indexed towing briefing and shock-load guidance),
[BoatUS Foundation cleat tests](https://boatus.org/gear-tests-safety-guides/cleat-tests/)
and Samson's warnings support communication, suitable structural attachments,
chafe checks, gradual loading and keeping clear. A bridle can distribute load
but requires suitable points and geometry. ASA's general mast-base/winch advice
is not repeated. Professional help is the threshold when control, competence or
equipment is inadequate. No towing rig, speed or length is prescribed; zero towing questions.

## Full nine-question audit

Every prompt, choice, whyWrong, explanation and source was read. All answer ids
stay unchanged. Only the following five questions change factual content/source:

| Question | Old factual meaning | Correction / evidence |
| --- | --- | --- |
| `sea-knot-bowline` | Guaranteed no slip/jam; harness tether suggested; one rationale called loop non-slipping | Fixed loop, usually untied after unloading; dressing/tail/cyclic loosening; no life-safety recommendation. Grog + Samson. |
| `sea-knot-figure8-stopper` | Wrong-answer rationale recommended bowline for harness | Stopper is not attachment loop; follow equipment manufacturer's instructions. Grog's bowline cautions. Purpose/answer unchanged. |
| `sea-knot-round-turn-two-half-hitches` | Chafe tolerance part of selection; turn said to reduce chafe on standing part without qualification | Initial friction/strain function, hitches around standing part; chafe still inspected/protected. Grog + Samson. |
| `sea-knot-rolling-hitch` | Secure grip “without slipping” | Conditional grip with dressing, direction, materials/diameters and testing. Grog. |
| `sea-knot-cleat-hitch` | Disputed photo asserted correct; full base turn and easy release presented without lead cautions | Text-only question, farther-horn lead, orderly crossings, trapping/jam caution, locking limited to ordinary dockline context. Grog; source photo dispute below. Answer id unchanged. |
| `sea-knot-clove-hitch` | Temporary use and variable-load limitations | Retained; “relatively easy” is not a guarantee against binding. |
| `sea-vhf-concise-comms` | Shared airtime requires brief purposeful calls | Retained; equipment distractor concerns routine transmissions, not continuous-transmit thermal testing. |
| `sea-vhf-working-channel-switch` | After contact on 16, move to working channel | Retained: prompt explicitly assumes contact already made on 16; does not mandate calling everyone there. |
| `emer-rigging-failure-response` | Step-1 specific tack/unload correction | Reverified unchanged, including all rationales and source. |

Focused regression coverage is in `content.test.ts`. Existing exact forward and
reverse concept guards are unchanged. Concept-stripped SHA-256 deliberately rolls:

- Before: `24489ac656da5350febef44cdb2feeeeb94c7c9c070552f485c93addcc623349`
- After: `f680667228d3578534005ad96dabdaac4a85c80383c5195e3eac70c3e98b6e29`

301 questions, 276 tagged, 96 concepts; Practice 2/4/2/1, nine unique.
All question mappings are byte-equivalent to Step 1; Hands-On remains 49 unique.

## Visuals and boundaries

L1 reuses `photo-bowline`; L2 reuses `photo-rolling-hitch` only.
CONTROL inspected all four candidate photos; clove omitted to avoid redundant
images. L3/L4 need no figures. Commons source pages confirm existing credits:
USCG PTC Developer / CC BY-SA 4.0;
David J. Fred / CC BY-SA 2.5. Existing resized notes and license links remain.
Photos contain geometry (rolling has step numbers), no functional quiz-answer
text. Neutral alt text is unchanged; lesson captions are not injected into Practice.

[The cleat source page](https://commons.wikimedia.org/wiki/File:Tied_cleat.jpg)
explicitly disputes the pictured lead and warns about jamming. Independent
Verifier identified the positive endorsement as a blocker. The image is omitted
from both L2 and its existing question; Grog supports the text correction. No
image file change and no third replacement visual is needed. The now-unused
manifest entry is removed to preserve the exact bidirectional asset guards and
no-orphan check. Original provenance retained here: `photo-cleat-hitch.jpg`,
BenFrantzDale, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/),
resized only, [original](https://upload.wikimedia.org/wikipedia/commons/9/9c/Tied_cleat.jpg).

Neither defective custom SVG is used in a lesson or modified. Their inherited
Practice references remain explicitly deferred to Step 3; Step 2 is not a release.
No new assets or architecture. Weather, emergency radio scripts, MOB, grounding,
steering/propulsion recovery, docking execution, winch operation and hardware
identification remain outside this module.
