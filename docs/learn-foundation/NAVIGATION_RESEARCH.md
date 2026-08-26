# Navigation Rules & Tools lesson research note

Step 2 of the Navigation Rules & Tools module replaced nine draft skeletons with
finished teaching copy.

## The ASA Navigation chapter was not available

The project brief refers to a supplied ASA Navigation chapter for curriculum
coverage, terminology, emphasis and sequence. **It is not present in this
repository or in any available attachment.** The following were searched and
contain no ASA chapter text, PDF, or extract:

- `docs/`, `docs/learn-foundation/`, `docs/beta-foundation/`
- `work/`, `tmp/`, `design/`, `public/`, `scripts/`, `supabase/`
- A repository-wide search for `*.pdf`, `*.epub`, `*.docx` returned nothing.

This matches what `MOTORING_RESEARCH.md` recorded for the Motoring module. No
chapter-derived coverage is claimed anywhere in this note or in the lesson copy.

**What was used instead**, in order of authority:

1. The accepted Practice question bank — every prompt, choice, `whyWrong`,
   explanation, `source` and figure mapped to each lesson's concepts was read
   before that lesson was written. The 89 questions across the nine lessons set
   the coverage floor and the consistency constraint.
2. The U.S. Coast Guard *Navigation Rules, International—Inland* (amalgamated),
   read in full text for every rule the copy relies on.
3. NOAA (Office of Coast Survey, Coast Pilot, Chart No. 1, Tides & Currents),
   33 CFR Part 62 for the U.S. Aids to Navigation System, and GPS.gov.

Lesson prose is original and intentionally compact. No ASA prose was copied or
paraphrased and no ASA illustration was traced or reproduced.

## The five highest-risk claims

These were flagged in the brief as the claims most likely to be wrong from
memory. All five were verified against primary sources; one came back different
from the widely repeated figure.

| # | Claim as written in the lessons | Primary source | Result |
|---|---|---|---|
| 1 | Sidelights 112.5° each (right ahead to 22.5° abaft the beam), sternlight 135° (67.5° from right aft each side), masthead light 225°, all-round 360° | USCG *Navigation Rules* [Rule 21(a)–(e)](https://www.navcen.uscg.gov/sites/default/files/pdf/navRules/navrules.pdf), p. 40 (International) and p. 41 (Inland) | Confirmed verbatim, identical in both rule sets. The arithmetic claim in the lesson (112.5 × 2 + 135 = 360, and 225 = 112.5 × 2) follows from the rule text. |
| 2 | International Rule 34(a) states an action being taken; U.S. Inland Rule 34(a) proposes a passing arrangement and expects the same signal back in agreement | USCG *Navigation Rules* Rule 34(a), pp. 116 (Intl) / 117 (Inland); cross-checked against [33 CFR 83.34](https://www.law.cornell.edu/cfr/text/33/83.34) | Confirmed. Inland adds two limits the lesson states: it applies to power-driven vessels *in sight of one another and meeting or crossing within half a mile*, and Inland 34(h) lets a bridge-to-bridge radiotelephone agreement replace the whistle signals — but whistle signals prevail if no agreement is reached. |
| 3 | Rule 35 fog signals at intervals of not more than 2 minutes; one prolonged (power making way), two prolonged ~2 s apart (power stopped), one prolonged + two short (sail/fishing/towing/NUC/RAM/constrained by draught), one prolonged + three short (vessel towed), anchored: rapid bell ~5 s at intervals of not more than 1 minute | USCG *Navigation Rules* Rule 35(a)–(k), pp. 120–123 | Confirmed. Under-12 m exemption verified against the current official text at Rule 35(j) in **both** rule sets (International Rule 35(j); Inland 33 CFR 83.35(j)). In each, 35(i) is the separate 12–20 m bell exemption and 35(k) the pilot-vessel identity signal. Note for future maintainers: the printed USCG amalgamated book letters the *Inland* under-12 m rule as 35(h), because that edition predates the paragraph current 33 CFR 83.35 inserts — cite the CFR, not the booklet, for Inland paragraph letters: not obliged to give these signals, but must make some other efficient sound signal at intervals of not more than 2 minutes. |
| 4 | Chart datum on NOAA charts is Mean Lower Low Water (except Great Lakes and non-tidal inland waterways); because MLLW is an average of the lower low waters, actual depth can be **less** than charted | NOAA [Coast Pilot 2, Ch. 1](https://nauticalcharts.noaa.gov/publications/coast-pilot/files/cp2/CPB2_C01_WEB.pdf) §“Chart Datum, Tidal Waters” (¶90) and §“Depths” (¶25, ¶29); NOAA [Tides & Currents datum definitions](https://tidesandcurrents.noaa.gov/datum_options.html) | Confirmed, and made more precise than the usual textbook line. Coast Pilot ¶29: even charts based on modern surveys may not show all seabed obstructions or the shoalest depths, and actual tide levels may be appreciably lower than predicted. The lesson therefore says charted depth is a *reference*, not a floor. |
| 5 | GPS: the U.S. government commits to a daily global average signal-in-space user range error of ≤2.0 m, 95% probability; URE is *not* user accuracy; a GPS-enabled smartphone is typically accurate to ~4.9 m under open sky | [GPS.gov — GPS Accuracy](https://www.gps.gov/gps-accuracy) | **Corrected against memory.** The widely quoted ≤7.8 m figure is the older 2008 SPS Performance Standard commitment; the current GPS.gov page states ≤2.0 m. The lesson uses 2.0 m, attributes it to GPS.gov, and explicitly separates the signal-in-space commitment from user accuracy (satellite geometry, blockage, atmosphere, receiver). |

## Per-lesson source register

Enough identification is retained here for a future maintainer to re-audit each
precise claim.

### L1 — Lookout, Risk & Safe Speed

| Claim | Source |
|---|---|
| Proper lookout at all times by sight and hearing and by all available means, to make a full appraisal of the situation and of the risk of collision | Rule 5 (identical Intl/Inland), p. 12–13 |
| Safe speed definition and the Rule 6(a) factor list (visibility, traffic density, manoeuvrability/stopping distance and turning ability, background light at night, wind/sea/current and proximity of hazards, draft vs available depth); Rule 6(b) radar factors | Rule 6, p. 14–15 |
| Risk deemed to exist on a compass bearing that does not appreciably change; doubt resolves toward risk existing; risk may exist despite an appreciable bearing change with a very large vessel, a tow, or at close range; no assumptions on scanty information | Rule 7(a), 7(c), 7(d)(i)–(ii), p. 16 |
| Action positive, in ample time, good seamanship; large enough to be readily apparent; avoid a succession of small alterations; course alone may suffice with sea room; slacken/stop/reverse; check effectiveness until finally past and clear | Rule 8(a)–(e), p. 18 |
| Give-way takes early and substantial action to keep well clear; stand-on keeps course and speed, may act when the give-way vessel evidently is not, must act when collision cannot be avoided by the give-way vessel alone; no port alteration for a vessel on her own port side in a power-driven crossing; give-way duty not relieved | Rules 16, 17(a)–(d), p. 32 |
| Rule 2 framing (no exoneration for neglect of good seamanship; departure permitted where necessary to avoid immediate danger) | Rule 2(a)–(b), p. 6 |

### L2 — Meeting Situations

| Claim | Source |
|---|---|
| Overtaking: more than 22.5° abaft the beam, i.e. only the sternlight visible at night; overtaking vessel keeps clear notwithstanding the other rules; doubt means assume overtaking; a later bearing change does not convert her into a crossing vessel; duty runs until finally past and clear | Rule 13(a)–(d), p. 28 |
| Head-on: two power-driven vessels, reciprocal or nearly reciprocal courses, each alters to starboard to pass port to port; recognition by masthead lights in line and/or both sidelights, or the corresponding day aspect; doubt means assume it exists | Rule 14(a)–(c), p. 30 |
| Crossing: the vessel with the other on her own starboard side keeps out of the way and avoids crossing ahead where circumstances admit | Rule 15, p. 30 |
| No stand-on vessel in a true head-on situation | Follows from Rule 14(a) placing the same duty on both; consistent with accepted question `rules-headon-standon` |
| Sail-on-sail bow-to-bow is Rule 12, not Rule 14 | Rule 14 text is limited to power-driven vessels; Rule 12 governs sailing vessels — consistent with `rules-headon-sail-not-power` |

### L3 — Sailing Vessels & Special Rules

| Claim | Source |
|---|---|
| Different tacks → port-tack vessel keeps clear; same tack → windward keeps clear; port tack unable to determine the windward vessel's tack → keeps clear | Rule 12(a)(i)–(iii), p. 26 |
| Windward side is the side opposite the one on which the mainsail is carried | Rule 12(b), p. 26 |
| Machinery propulsion makes a sailing vessel a power-driven vessel; conical day shape apex downwards; Inland exempts vessels under 12 m from the shape | Rule 3(b); Rule 25(e), p. 78 (Intl) / 79 (Inland) |
| Rule 18 responsibilities table, and the opening qualifier "Except where Rules 9, 10 and 13 otherwise require" | Rule 18(a)–(d), p. 34–35 |
| Constrained by draught is International only; Inland Rule 28 is reserved; the duty is worded "avoid impeding" | Rule 18(d)(i); Rule 28, p. 102 (Intl) / 103 (Inland, `[Reserved]`) |
| Narrow channels: keep to the starboard outer limit; <20 m or sailing shall not impede a vessel that can navigate safely only within the channel; do not cross so as to impede; one prolonged blast at a blind bend; avoid anchoring | Rule 9(a)–(g), p. 20 |
| TSS: proceed in the lane's direction of flow; keep clear of the separation zone; join/leave at the ends or a small angle; cross as nearly at right angles as practicable; inshore traffic zone available to <20 m, sailing, fishing; <20 m or sailing shall not impede a power-driven vessel following a lane | Rule 10(b)–(d), (j), p. 22 |
| "Not impede" means early action to allow sea room, and does not relieve either vessel of the steering rules if risk of collision develops | Rule 8(f)(i)–(iii), p. 18 |

### L4 — Navigation Lights

| Claim | Source |
|---|---|
| Lights from sunset to sunrise, and in restricted visibility by day | Rule 20(b)–(c), p. 38 |
| Light arcs (see high-risk claim 1); sidelights may be combined in one lantern on a vessel under 20 m | Rule 21(a)–(e), p. 40 |
| Power-driven underway: masthead forward, sidelights, sternlight; second masthead light abaft and higher required at 50 m or more, optional below; <12 m may use an all-round white light and sidelights | Rule 23(a), p. 44; Rule 23(d)(i) Intl / 23(c) Inland, p. 48–49 |
| Sailing underway: sidelights and sternlight; <20 m may combine in one lantern at or near the masthead; optional red-over-green all-round at the masthead, not with the combined lantern; <7 m torch/lantern fallback | Rule 25(a)–(d), p. 72–77 |
| NUC: two all-round red; RAM: red-white-red; sidelights and sternlight added only when making way | Rule 27(a)–(b), p. 88–91 |
| Trawling green over white; fishing other than trawling red over white | Rule 26(b), p. 80; Rule 26(c), p. 84 |
| Constrained by draught: three all-round red (International) | Rule 28, p. 102 |
| At anchor: vessel under 50 m may show a single all-round white light where best seen; black ball by day | Rule 30(a)–(b), p. 106 |
| Minimum visibility ranges deliberately not made a memorisation target | Rule 22, p. 42 — treated as a fitting-out requirement |

### L5 — Reduced Visibility & Sound Signals

| Claim | Source |
|---|---|
| Rule 19 applies to vessels *not in sight of one another* in or near restricted visibility; safe speed adapted to conditions; power-driven engines ready for immediate manoeuvre | Rule 19(a)–(b), p. 36 |
| Radar-alone contacts: avoid altering to port for a vessel forward of the beam other than one being overtaken; avoid altering toward a vessel abeam or abaft the beam | Rule 19(d)(i)–(ii), p. 36 |
| Fog signal apparently forward of the beam → reduce to minimum steerage speed, take all way off if necessary, navigate with extreme caution | Rule 19(e), p. 36 |
| Short blast ≈ 1 s; prolonged blast 4–6 s | Rule 32(b)–(c), p. 114 |
| Rule 34 International vs Inland meanings (see high-risk claim 2) | Rule 34(a), p. 116–117 |
| Danger/doubt signal: at least five short and rapid blasts, identical in both rule sets | Rule 34(d), p. 118–119 |
| One prolonged blast nearing a bend or obstructed area, answered by any vessel within hearing | Rule 34(e), p. 118–119 |
| Rule 35 fog signals (see high-risk claim 3) | Rule 35, p. 120–123 |
| COLREGS Demarcation Lines divide the two rule sets | USCG *Navigation Rules*, COLREGS Demarcation Lines section; 33 CFR Part 80 |

### L6 — Aids to Navigation

| Claim | Source |
|---|---|
| Beacon is permanently fixed; buoy floats and is moored, so its position is less absolutely reliable | [33 CFR 62.23](https://www.law.cornell.edu/cfr/text/33/62.23) (general characteristics, including the reliability caution) |
| IALA Region B lateral marks: starboard-hand red nun/pillar with red triangular daymark; port-hand green can/pillar with green square daymark; conventional direction of buoyage; preferred-channel marks with the topmost band indicating the preferred route | [33 CFR 62.25](https://www.law.cornell.edu/cfr/text/33/62.25) |
| Red aids even-numbered, green aids odd-numbered, increasing in the conventional direction of buoyage | [33 CFR 62.43](https://www.law.cornell.edu/cfr/text/33/62.43) |
| Information and regulatory marks: open diamond = danger; diamond with cross = vessels excluded; circle = operating restrictions; square/rectangle = information; buoy white with two horizontal orange bands | [33 CFR 62.33](https://www.law.cornell.edu/cfr/text/33/62.33) |
| Special marks are solid yellow and have no lateral meaning | [33 CFR 62.31](https://www.law.cornell.edu/cfr/text/33/62.31) |
| ICW: yellow triangle → keep to starboard; yellow square → keep to port; plain yellow horizontal band identifies an ICW aid with no lateral meaning | [33 CFR 62.49](https://www.law.cornell.edu/cfr/text/33/62.49) |
| Light characters F / Fl / Oc / Iso / Q / Fl(2+1); Quick ≈ 50–79 flashes per minute | NOAA/NGA [U.S. Chart No. 1](https://nauticalcharts.noaa.gov/publications/us-chart-1.html), Section P (Lights). The USCG boating brochure's looser "more than 60 a minute" was not used; Chart No. 1 is the chart-abbreviation authority and agrees with accepted question `chart-nav-aton-light-quick`. |
| "Red, right, returning" reverses outbound and is wrong in IALA Region A | 33 CFR 62.25 note on Region A colour reversal |

### L7 — Reading a Nautical Chart

| Claim | Source |
|---|---|
| Chart datum = MLLW on NOAA charts, except Great Lakes and non-tidal inland waterways (see high-risk claim 4) | Coast Pilot 2 Ch. 1 ¶90 |
| Depth is the vertical distance from chart datum to the bottom; controlling depth is the least known depth of a channel | Coast Pilot 2 Ch. 1 ¶25, ¶25.001 |
| Even modern surveys may miss obstructions and shoalest depths; actual tide levels may be appreciably lower than predicted | Coast Pilot 2 Ch. 1 ¶29 |
| Chart accuracy depends on the surveys behind it; charts show conditions at the time of survey or report; "reported" information warrants caution; source and Zone of Confidence diagrams exist to convey survey age and quality | Coast Pilot 2 Ch. 1 ¶97–¶102 |
| Symbol and abbreviation meanings (Wk, Rk, Obstn, seabed letters, danger line, foul ground, covers/uncovers, isolated danger, sounding placement conventions, depth-contour shading) | NOAA U.S. Chart No. 1 — Sections I (Depths), J (Nature of the Seabed), K (Rocks, Wrecks, Obstructions), plus the Index of Abbreviations; cross-checked against the accepted questions that already cite those sections |
| One minute of latitude = one nautical mile | Coast Pilot 2 Ch. 1 ¶35 |

### L8 — Compass, Courses & Bearings

| Claim | Source |
|---|---|
| Each compass rose shows the date, magnetic variation and annual change in variation | Coast Pilot 2 Ch. 1 ¶135 |
| Variation is the true-vs-magnetic angular offset at a location; deviation is vessel-specific and heading-dependent | Consistent with accepted questions `chart-nav-compass-true-vs-magnetic` and `chart-nav-compass-deviation-vs-variation`; the vessel-specific/heading-dependent framing is standard piloting practice, not a rule claim |
| "True plus west, magnetic best" — 090°T with 6°W variation is 096°M | Matches accepted question `chart-nav-compass-variation-defn` and its explanation |
| Annual-change worked example: 4°15′W (2018) with 8′E annual change → about 3°11′W by 2026 | Matches accepted question `chart-nav-compass-apply-variation` **as corrected in commit 5d44e6d**. The lesson reproduces the corrected value 3°11′W and the arithmetic (8 × 8′ = 64′ ≈ 1°04′). |
| Local magnetic disturbance notes are printed on charts where measured variation differs from expected by several degrees | Coast Pilot 2 Ch. 1 ¶133 — used as background support for the deviation/interference discussion; the lesson does not teach disturbance notes as a separate topic |

### L9 — Distance, Speed, Time & Electronic Navigation

| Claim | Source |
|---|---|
| A nautical mile is one minute of latitude, about 1.15 statute miles | Coast Pilot 2 Ch. 1 ¶35 |
| 1,852 metres / 6,076.12 feet | Coast Pilot 2 Ch. 1, glossary entry "nautical mile" |
| GPS accuracy figures (see high-risk claim 5) | GPS.gov |
| U.S. charts referenced primarily to NAD 83 and WGS 84, equivalent for charting purposes; charts carry notes giving the shift for positions on older datums | Coast Pilot 2 Ch. 1 ¶93–¶94 |
| Depth data comes from the latest available survey, which may be quite old; ZOC/source diagrams exist to convey that | Coast Pilot 2 Ch. 1 ¶102 |

## Consistency with the accepted Practice bank

All 89 questions mapped to the nine lessons were read before writing. **No
conflict was found between an accepted question and an authoritative source.**
Two places came close enough to record:

- `lights-anchored` asks what a vessel under 50 m at anchor "must exhibit" and
  answers "an all-round white light where it can best be seen". Rule 30(b) is
  permissive in form ("may exhibit ... instead of" the two-light configuration
  of 30(a)). The answer is correct — a vessel at anchor must exhibit anchor
  lights, and under 50 m one all-round white where best seen satisfies the rule.
  The lesson states it in the rule's own permissive form so the two agree
  without contradicting either.
- `chart-nav-sym-chart-datum-abbrev` explains chart datum as giving a depth you
  "can generally expect or exceed". That is true and appropriately hedged, but a
  learner can read it as a floor. The lesson keeps the same substance and adds
  the Coast Pilot caution that on a negative tide the actual depth is less than
  charted.

Three tagged concepts currently map to zero Practice questions:
`narrow-channels-traffic-separation` (L3), `regulatory-markers` (L6), and
`electronic-navigation` (L9). Their per-lesson counts are unaffected because
other concepts in the same lessons carry questions. This is a mapping
observation, not an error — the concept tags are final per the brief, and the
same pattern already exists in Sails & Trim. Flagged for a future
question-authoring pass, not acted on here.

Practice counts confirmed unchanged: **11 / 12 / 8 / 9 / 7 / 9 / 20 / 9 / 4.**

## Reused visual assets

Every figure in the module is an existing, already-approved entry in
`src/content/asset-manifest.json`. **No asset was created, and the manifest was
not modified.** Captions were written to state the teaching point rather than
the answer to any Practice question rendered below the lesson.

| Lesson | Assets in document order |
|---|---|
| L1 | *(none — the material is conceptual and no existing asset teaches it)* |
| L2 | `custom-overtaking`, `custom-headon-bowview`, `custom-crossing`, `custom-crossing-standon` |
| L3 | `custom-sail-opposite-tacks`, `custom-sail-same-tack` |
| L4 | `custom-night-headon`, `custom-night-green-only`, `photo-trawler-gear-out` |
| L5 | *(none — the two tables carry the signal material)* |
| L6 | `noaa-buoy-beacon-basic`, `noaa-iala-region-b`, `noaa-light-characters` |
| L7 | `noaa-chart-schematic`, `custom-lat-long-grid`, `noaa-soundings-basic`, `noaa-depth-contours`, `noaa-wreck-symbols` |
| L8 | `custom-binnacle-compass`, `noaa-compass-rose`, `custom-compass-interference`, `photo-plotting-tools` |
| L9 | `custom-distance-scale` |

L7 deliberately uses five of the eight candidate chart assets. `noaa-rocks-general`,
`noaa-rock-covers` and `noaa-obstruction-foul` were left out and their content
carried in prose and the abbreviation table, to keep the lesson from becoming an
asset gallery. The three daylight vessel photos other than the trawler
(`photo-power-vessel-underway`, `photo-sailing-vessel-underway`,
`photo-vessel-at-anchor`) were rejected for L4: a daylight photo does not teach
light recognition, so they would have been decoration. `photo-parallel-rule` was
dropped in favour of `photo-plotting-tools`, which shows both tools in use and is
a public-domain U.S. Government work.

`learn.test.ts` now pins the exact `assetId` list above in document order, so a
new figure cannot enter the module without a deliberate change to that
expectation.

## Claims intentionally bounded

- **No rule-by-rule legal commentary.** The lessons teach the operator-level
  model. Rule numbers are cited so a learner can look the text up; the Rules
  themselves remain the authority.
- **International vs Inland differences are taught only where they change the
  answer** — Rule 34(a) meanings, the Inland half-mile/in-sight scope, the
  Inland Rule 28 reservation, the Rule 25(e) under-12 m day-shape exemption, and
  the Great Lakes/Western Rivers carve-outs are named but not developed.
- **No universal Rule 18 pecking order is taught.** The Rule 18 table is
  explicitly captioned "subject to Rules 9, 10 and 13", and a warning callout
  states that Rule 18 is a default which yields to the situational rules and
  says nothing about two vessels of the same category.
- **Minimum light visibility ranges (Rule 22) are not a memorisation target**,
  and are described as a fitting-out concern.
- **Chart datum is stated as a reference level, never as a guaranteed minimum
  depth.** The lesson explicitly says actual depth can be less than charted.
- **GPS numbers are attributed and scoped.** The 2.0 m figure is labelled a
  signal-in-space commitment, distinguished from user accuracy, and attributed to
  GPS.gov in the visible copy, because that figure has changed before and may
  change again.
- **No set-and-drift arithmetic.** L8 names the difference between course
  steered and track made good and defers the calculation to ASA 105.
- **No tidal-height calculation, no ded-reckoning plot, no radar plotting.**
  These are beyond ASA 103 review scope.
- **Regulatory-marker shapes are described from 33 CFR 62.33 in text and a
  table.** No stylised replacement graphic was invented, per the brief.

## Density note for the reviewer

The nine finished lessons average about 670 prose words each (L2 is the shortest
at 534; L7 the longest at 837), against roughly 315–380 for the Sails & Trim and
Motoring lessons. Prose economy per teaching point is comparable — the
difference is that each Navigation lesson carries roughly twice as many mandated
teaching points, and the module as a whole backs 89 Practice questions against
Sails & Trim's 39. Two trimming passes were made. Reducing further would have
required dropping coverage the brief specifies, so this is flagged as a
judgement call rather than resolved silently.
