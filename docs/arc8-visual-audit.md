# Arc 8 visual audit

This audit is based on all 79 asset records present in `src/content/asset-manifest.json` at the start of Arc 8, cross-checked against every visual question reference and the rendered whole-library gallery. The classifications describe the starting visual, even where the final asset ID changed.

## Counts

| Classification | Count |
| --- | ---: |
| KEEP | 38 |
| SOURCE BETTER | 1 |
| STANDARDIZE | 34 |
| REDESIGN | 6 |
| REMOVE | 0 |

Final library: 79 assets total; 35 externally sourced and 44 project-original. Arc 8 introduces one attributed licensed asset and no new public-domain assets.

## SOURCE BETTER (1)

- `custom-turnbuckle` → `photo-turnbuckle`: replaced the labeled identification sketch with a real photograph of two open-body turnbuckles attached to chainplates on a sailboat.

## STANDARDIZE (34)

- `custom-crossing`
- `custom-crossing-standon`
- `custom-overtaking`
- `custom-lee-shore`
- `custom-scope-geometry`
- `custom-swing-circle`
- `custom-anchorage-selection`
- `custom-prop-walk`
- `custom-docking-wind`
- `custom-docking-current`
- `custom-mooring-approach`
- `custom-heaving-to`
- `custom-dragging-anchor`
- `custom-alpha-flag`
- `custom-diver-down-flag`
- `custom-distance-scale`
- `custom-compass-interference`
- `custom-stemhead-bow-roller`
- `custom-windlass-deck`
- `custom-binnacle-compass`
- `custom-seacock-throughhull`
- `custom-bilge-pump`
- `custom-emergency-tiller`
- `custom-cabin-layout`
- `custom-pfd-wearable-throwable`
- `custom-visual-distress-flare`
- `custom-harness-tether-jackline`
- `custom-engine-panel-throttle`
- `custom-sea-state-diagram`
- `custom-reefed-mainsail`
- `custom-sail-wind-strength`
- `custom-heel-trim`
- `custom-figure8-stopper`
- `custom-flooding-seacock`

## REDESIGN (6)

- `custom-headon-bowview`: rebuilt to remove an overflowing sentence and show reciprocal-course geometry cleanly.
- `custom-sail-opposite-tacks`: rebuilt with shared sailboat, wind, heading, and label conventions; fixed clipped labels.
- `custom-sail-same-tack`: rebuilt with the same shared conventions and unclipped labels.
- `custom-mob-recovery-approach`: rebuilt to remove direct final-approach answer text while retaining a controlled return track, victim location, and wind reference.
- `custom-fueling-gas-diesel`: replaced an answer-text comparison table with a visual two-fuel scenario and a neutral prompt marker.
- `custom-cold-water-1101`: replaced answer-bearing stage descriptions with a neutral three-point timeline.

## KEEP (38)

- Authoritative USCG/NWS/NOAA: `uscg-rule23a-power-under-50m`, `uscg-rule25a-sailing`, `uscg-rule26b-trawling`, `uscg-rule30b-anchored`, `nws-smcraft-pennant`, `nws-gale-pennant`, `noaa-compass-rose`, `noaa-soundings-basic`, `noaa-depth-contours`, `noaa-rocks-general`, `noaa-rock-covers`, `noaa-wreck-symbols`, `noaa-obstruction-foul`, `noaa-buoy-beacon-basic`, `noaa-iala-region-b`, `noaa-chart-schematic`, `noaa-light-characters`.
- Existing sourced photographs: `photo-plotting-tools`, `photo-parallel-rule`, `photo-cqr-anchor`, `photo-bruce-anchor`, `photo-danforth-anchor`, `photo-mushroom-anchor`, `photo-chainplate`, `photo-outboard-engine`, `photo-fire-extinguisher-use`, `photo-cumulonimbus`, `photo-furled-headsail`, `photo-bowline`, `photo-clove-hitch`, `photo-cleat-hitch`, `photo-rolling-hitch`, `photo-grounded-boat`, `photo-fire-extinguisher-marine`.
- Existing project visuals: `custom-night-green-only`, `custom-night-headon`, `custom-lat-long-grid`, `custom-round-turn-two-half-hitches`.

## Shared vocabulary actually used

- Top-view powerboat: blue for the learner's vessel; amber for the other vessel.
- Top-view sailboat: the same hull, mast, and two-sail silhouette across encounter, anchoring, and emergency diagrams.
- Heading/course: solid blue or amber arrow, matching the vessel identity.
- Wind: neutral slate, solid parallel arrows, uppercase `WIND` label.
- Current: teal, dashed/wave-form arrows, uppercase `CURRENT` label.
- Labels: compact white rounded labels with consistent 11–13 px sans-serif type.
- Anchoring: consistent dark anchor mark, blue dashed swing limit, tan bottom/shore, and restrained blue water.

Each final SVG remains a self-contained deterministic asset. The repeated primitives are deliberately simple inline SVG definitions; no graphics library, diagramming framework, canvas system, or runtime drawing code was added.

## Sourcing record

Discovery covered USCG/NOAA/NWS, Wikimedia Commons, Openverse, Flickr, federal archives, educational/technical references, sailing organizations, and manufacturer/media-permission searches. Openverse was used for discovery only; canonical source pages were checked before adoption.

### Adopted

1. **Turnbuckles and chainplates on a wooden sailboat**
   - Canonical page: https://commons.wikimedia.org/wiki/File:P%C3%BCtting_(Boot).jpg
   - Original: https://upload.wikimedia.org/wikipedia/commons/7/76/P%C3%BCtting_%28Boot%29.jpg
   - Creator/source: Sastognuti, own work
   - License: CC BY-SA 3.0, https://creativecommons.org/licenses/by-sa/3.0/
   - Reuse: commercial reuse and modification allowed with attribution and ShareAlike for adaptations
   - Use here: original image is unmodified; only the local filename changed
   - Attribution shown in app: `Pütting (Boot) · Sastognuti · Wikimedia Commons`, with source and license links in normal and enlarged views

### Major rejected candidates

- Flickr/Openverse seacock candidates: cluttered or ambiguous views, hands obscuring the fitting, or Public Domain Mark metadata that did not provide a sufficiently strong creator/rights chain for this use.
- Yacht windlass candidates: sales text embedded in imagery, unclear hardware visibility, or large-ship/heritage equipment unlike an ASA 103 cruising sailboat installation.
- Binnacle candidates: historically authoritative but large-ship/museum binnacles, not representative of a modern cruising sailboat cockpit.
- Engine-control and emergency-tiller candidates: weak identification value, unclear reuse terms, or no advantage over the existing purpose-built diagram.
- Manual bilge-pump photograph by Jbasic (CC BY-SA 4.0): clear and legally reusable, but rejected after live-context review because the question compares electric and manual backup systems while the photo depicts only the manual pump.
- Manufacturer and technical-reference imagery: useful for factual comparison but rejected when the page did not state reusable media rights clearly.

## Answer-leak corrections

The standardized/redesigned assets remove direct captions such as `sheltered lee of the point`, `approach at a shallow angle`, `bow into the current`, `head to wind`, `jib backed`, and `slow, victim to leeward side` when those phrases supplied all or part of the tested answer. The correction-round scan also removed labels that named tested hardware, controls, procedures, stage outcomes, or performance effects from retained visuals. Scenario geometry, neutral identities, and required direction references remain.

All 79 manifest records now carry a deliberately neutral `altText`. Question rendering never falls back to the provenance `description`, so the normal image alternative and enlarge-button accessible label cannot expose an answer. Every project SVG's internal accessible label is synchronized to the same neutral text. Manifest integrity tests require a non-empty neutral alternative for every record and reject the known answer-bearing visible phrases.

## Correction-round factual geometry

- Heaving-to drift now runs downwind/leeward relative to the displayed wind arrows.
- The lee-shore boat points toward its upwind anchor and away from the rocky shore.
- The scope rode begins at the elevated bow chock; the D and H measures span seabed-to-waterline and waterline-to-chock without printing the formula.
- The original dragging-anchor boat position and both shore transit marks are collinear; the later position is visibly off the transit.
- The wind-on-dock diagram now uses the standard top-view powerboat primitive rather than a placeholder circle.

## Live verification round

The static Arc 8 round could not bind a production preview, so acceptance was deferred. The
preview binds normally in the current environment, and every Arc 8 visual was re-checked inside its
own question in the built production app (`npm run build` + `npm run preview`, port 4173).

Coverage: all 91 visual questions across all 12 topics were stepped through in real practice
sessions, covering all 79 assets. Every figure loaded (no broken or zero-dimension images), every
rendered figure matched its source aspect ratio within 2%, and no question produced horizontal page
overflow at 1280px or 800px.

Four defects were found live and fixed:

- `custom-sail-wind-strength`: the LIGHT and MODERATE panels carried an identical mainsail path and
  differed only by heel angle, and neither panel showed a headsail. The graphic therefore did not
  depict the progressive sail reduction its explanation describes. All three panels now show a main
  plus a headsail with strictly decreasing area from light to strong.
- `custom-heaving-to`: an unlabeled tick bar sat to leeward of the boat with no legend or referent.
  Removed; the wind arrows and drift track carry the diagram on their own.
- Twelve attributed photographs recorded no `licenseUrl`, so their CC BY / BY-SA license was printed
  as plain text while only the Arc 8 turnbuckle linked its license. All 13 attributed assets now
  render both a source link and a license link.
- The credit line used the tertiary text token (#7c93a4, ~3.2:1 on white at 11.5px), below the WCAG
  AA floor for text that exists to satisfy a license. It now uses the secondary token (~5.7:1).

Known remaining issues:

- `noaa-iala-region-b.png` is a source-side crop that cuts its final table row. The rows the question
  depends on are intact and the figure is enlargeable, so it was left as sourced.

An earlier revision of this section reported nineteen records carrying `modified: true` with an empty
`modificationNote`. That gap was closed by the Arc 8 closeout commit but the note was left behind; it
is removed here. Every record that sets `modified: true` now carries a non-empty note.

## Addendum — Arc 8 defect-remediation pass

A follow-up pass corrected four defects found after the audit above was written. The classifications
in this document describe the library as Arc 8 left it; the following records changed afterwards.

- **Answer leak, four navigation-light questions.** `uscg-rule23a-power-under-50m`,
  `uscg-rule25a-sailing`, `uscg-rule26b-trawling`, and `uscg-rule30b-anchored` each depicted the exact
  light combination the learner was asked to name. All four records and their `Nr_Rule*.gif` files
  were removed and replaced with daylight photographs of the same vessel type in the same situation
  (`photo-power-vessel-underway`, `photo-sailing-vessel-underway`, `photo-vessel-at-anchor`,
  `photo-trawler-gear-out`). The prompts now name the pictured vessel so the figure carries the
  scenario rather than the answer. The KEEP list above is stale for those four ids.
- **Unusable Danforth photograph.** `photo-danforth-anchor` was a wide marina scene in which the
  flukes could not be identified. It was re-sourced to a deck-level photograph of a Danforth-pattern
  fluke anchor with both flukes, the crown stock, the shank, and the chain rode visible.
- **Under-carrying heaving-to diagram.** `custom-heaving-to` was redesigned: the rudder is now a
  readable blade set against a dashed centreline reference, the backed headsail and the trimmed
  mainsail sit on opposite sides of the hull, and the leeward drift is labelled. No label names any
  part of the answer.
- **Anchorage-selection palette.** `custom-anchorage-selection` drew its two candidate spots in the
  vessel-identity colours (amber "other vessel", blue "your vessel") even though neither marker is a
  vessel, and blue marked the correct answer. Both markers are now neutral slate. An unexplained
  dashed arc with no legend or referent was removed.

The mirrored north arrows on `crossing-give-way.svg` and `crossing-stand-on.svg` were re-checked and
left unchanged: both arrows point up with the `N` label below in identical style, and only the corner
placement differs, mirroring the scene itself.
