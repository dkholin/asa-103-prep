# Sails & Trim lesson research note

Step 2 used the supplied nine-page ASA *Know Your Sails and Trim* chapter as
the curriculum and progression reference. Its review questions were used as a
coverage cross-check, not as a writing template. Lesson prose is original and
intentionally compact; the module remains a review companion rather than a
replacement for the textbook or course.

## ASA chapter-derived coverage

| Lessons | Coverage carried into Learn |
|---|---|
| Lines, Winches & Sail Controls | Loaded-line safety, winch loading and easing, self-tailers, clutches, halyards, sheets, mainsheet, traveler, and basic control relationships. |
| Preparing to Sail / Setting Sail | Preparing sails and running rigging before the maneuver, crew roles, sea room, low-load headings, controlled hoisting or unfurling, and final stowage. Boat-specific sequences are deliberately bounded rather than presented as universal. |
| Sail Trim Fundamentals | Chord, draft depth, draft position, twist, angle of attack, luffing, control effects, heel, and helm response. Advanced aerodynamics and racing optimization are omitted. |
| Trim by Point of Sail | Close-hauled through running, progressively eased sail position as wind moves aft, luff/telltale feedback, over-trim awareness, and accidental-gybe risk. |
| Reefing & Reducing Sail | Early reduction, symptoms of excess sail, conceptual mainsail reefing, headsail furling, and system-specific procedures. |
| Special Situations | Heaving-to, fore-reaching, motorsailing, and lee-shore awareness at ASA 103 level. |

## Existing app and Practice support

All linked Practice prompts, choices, explanations, sources, and figures were
reviewed before writing. The accepted mappings remain unchanged: 5, 2, 1, 4,
0, 21, and 6 questions in lesson order. Learn agrees with the existing app on
loaded-line hazards, winch friction, traveler function, trim responses to heel
and weather helm, early sail reduction, roller-furling limits, reefing,
heaving-to setup and behavior, and motorsailing status. Trim by Point of Sail
has no broad-topic fallback and no Practice action while its mapping is zero.

Existing figures were reused only where their instructional claim matches the
lesson: `custom-heel-trim`, `custom-sail-wind-strength`,
`custom-reefed-mainsail`, `photo-furled-headsail`, `custom-heaving-to`, and
`custom-lee-shore`. The manifest continues to supply the photo's CC BY 2.0
credit and source link. No asset or manifest record was changed.

## Outside factual verification

Outside sources were used narrowly where a legal status or compact sail-shape
mental model benefited from an independent check.

| Claim | Authoritative source | Use |
|---|---|---|
| A sailing boat propelled by machinery is a power-driven vessel for the Rules | U.S. Coast Guard Navigation Center, [Amalgamated Navigation Rules, Rule 3](https://navcen.uscg.gov/navigation-rules-amalgamated) | Confirmed the exact legal classification already taught by `rules-motorsailing`. |
| Angle, depth, and twist are core sail-trim variables; easing and increased twist can reduce power | North Sails, [How to Trim a Genoa](https://www.northsails.com/en-uk/blogs/north-sails-blog/how-to-trim-a-genoa-north-sails-how-to) | Cross-checked the operator-level definitions and response model. Racing-specific advice was not imported. |
| Telltales and progressive easing are useful feedback as the course moves downwind | North Sails, [All About Downwind Sail Trim](https://www.northsails.com/blogs/north-sails-blog/downwind-sail-trim-how-to-north-sails) | Confirmed the general cue; detailed performance trim was omitted. |

## Final visual decisions for Step 3

### Sail Shape Fundamentals — Required

The existing heel figure teaches boat response but cannot show chord, draft
depth, draft position, twist, and angle of attack in one coherent mental model.
Definitions alone require the learner to imagine geometry that should be seen.

Final brief: create one deterministic, project-original SVG with two restrained
views. The first is a clean sail-section view with luff and leech endpoints, a
straight chord, the curved sail section, a perpendicular draft-depth measure,
and a marker locating maximum draft along the chord. The second is a simplified
front/plan relationship showing lower and upper chord directions to demonstrate
twist, plus one apparent-wind arrow and a clearly bounded angle-of-attack arc.
Use labels rather than numeric targets. Do not trace, imitate, or reproduce the
ASA illustration; do not add airflow particles or advanced aerodynamic claims.

### Trim by Point of Sail — Required

No existing asset simultaneously teaches heading relative to wind and the
progressive outward movement of sails from close-hauled through a run. The
Navigation Rules tack diagrams teach collision geometry, not trim, and would
create the wrong association. The lesson is understandable in text but its
central spatial progression remains needlessly abstract without a figure.

Final brief: create one deterministic, project-original radial SVG using the
canonical `sailboat-top`, `wind-arrow`, and `heading-arrow` primitives. Show one
fixed wind direction and five clearly separated boat headings: close-hauled,
close reach, beam reach, broad reach, and run. Keep hull scale constant and draw
the mainsail/boom progressively farther from the centerline as apparent wind
moves aft. Use a simple legend and labels, not polar-performance data. Avoid
Navigation Rules colors or give-way/stand-on cues. Geometry and transforms must
be generated from explicit constants and verified at desktop and mobile sizes.

### Other visuals — Skip

Finished content exposed no additional comprehension gap. Existing reefing,
furling, heaving-to, heel-response, wind-strength, and lee-shore figures already
cover the useful visual claims; new line-handling, setting-sail, or
fore-reaching diagrams would add detail beyond the compact lesson need.
