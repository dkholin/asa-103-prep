# Hands-On Cruising lesson research note

Step 2 of the Hands-On Cruising module replaced six lesson skeletons with
finished teaching copy. This note records where the content came from, which
claims were checked against outside sources, and which claims were deliberately
qualified rather than stated flat.

## The ASA chapter was available and was read

ASA Chapter 6, *Hands-on cruising*, pp. 100–125, was supplied as a 13-page PDF
at `~/Desktop/Crusing.pdf`, outside the repository. The file is image-only — no
text layer — and each page is a photograph of a two-page spread, so the 13
images cover pp. 100–125 exactly.

**How it was read.** PyMuPDF (already present in the environment) rendered each
page at 260 dpi. The photographs are rotated a quarter turn, so each render was
rotated 90° counter-clockwise and split down the gutter into two upright single
pages, producing 26 page images that were then read directly. One box — the
"aft, or stopping, spring" panel on pp. 118–119 — straddles the gutter, so that
region was re-rendered at 400 dpi and cropped across the spread to recover it.
No Poppler or other rasteriser was installed; the built-in library was
sufficient. The chapter is not committed to this repository and no part of it is
reproduced here.

**How it was used**: as a curriculum, terminology, sequencing and scope source
only — which topics belong here, what the standard names are, and what a learner
should meet in what order. No prose was copied. Its diagrams were not traced,
its photographs were not reused, and its illustration composition was not
recreated.

On close paraphrase specifically: the Cruising Life & Safety note records that
reading a source page-by-page immediately before drafting produces clause-level
paraphrase by default, and that this was caught only by a separate reader
comparing draft to source. That finding was treated as a standing instruction
here. The chapter was read in full first and set aside; the lessons were then
drafted from a consolidated understanding of the concepts, deliberately
reorganised away from the chapter's own section order and re-exampled. The
chapter's numbered procedures — the eight-step drop, the nine-step weigh, the
eight-step spring-off sequences — were **not** transcribed as numbered steps.
Where an ordered list appears in these lessons it is a compressed, learner-facing
sequence of decisions, not a restatement of the source's steps.

## Only part of the chapter is this module's

| Chapter pages | Section | Disposition |
|---|---|---|
| 100–101 | Chapter opener | Framing only |
| 102–103 | The Compass at Work — steering a compass course, compass as reference, course check, course correction, current, leeway | **L1**, practical helm content only |
| 104–105 | Sailing a Compass Course; Headers and Lifts and Closest Tack; points of sail; tacking angle | **Sails & Trim's** — deferred wholesale by Advisory decision. Only the leeway paragraph was taken into L1 |
| 106–107 | Orientation on the Water — north up, bearings, relative positions, **transits, ranges** | Transits and ranges → **L1** prose. North-up, compass bearings and plotting → **Navigation Rules & Tools'**, deferred |
| 108–109 | Anchoring — anchor types, ground tackle, the anchorage, charted information, scope | **L2** |
| 110–111 | Choosing the Spot to Anchor; swinging room; preparing the anchor; dropping the anchor; power set | **L2** (choosing, swinging room) and **L3** (preparing, dropping, setting) |
| 112–113 | Anchor Watch — ranges, anchoring problems, dragging, raising the anchor, windlass | **L3** |
| 114–115 | Docking Maneuvers Under Power — spring lines, springing off, doubling lines | **L4**, lines-and-fenders execution only |
| 116–117 | Leaving the Dock; wind ahead / wind astern / wind onto the dock; manoeuvring tips; prop walk and wash; pivot point | **Motoring's** — deferred wholesale |
| 118–119 | Setting the Stage for Docking; the aft/stopping spring; fenders and dockline preparation | Stopping spring, fenders, dockline preparation and the fend-off safety rule → **L4**. The propeller factor and current paragraphs → **Motoring's** |
| 120–121 | Docking in Various Situations — upwind, downwind, wind onto/off the dock approaches | **Motoring's** — deferred wholesale |
| 122–123 | Moorings — pendant, pickup buoy and stick, long-term security and chafe, approaching, casting off | **L4** |
| 124–125 | Chapter review questions | Not used |

**The chapter carries no L5 or L6 material at all.** There is no crew-overboard,
cold-water, hypothermia, grounding, steering-failure, propulsion-loss or
fouled-propeller section anywhere in pp. 100–125; those subjects live in a
chapter of the book that was not supplied. Lessons 5 and 6 are therefore written
from the accepted question bank plus the outside sources below, not from the
chapter. This is a scope fact worth recording rather than a gap that was papered
over.

## Claims checked against outside sources

Only claims that actually survive into a lesson are listed.

### Anchoring — scope

The chapter itself teaches scope as rode length over the vertical distance from
the bow chock to the seabed — depth **plus** the height of the bow above the
water — and gives 7:1 as common practice for a rope-and-chain rode, noting that
an all-chain rode's catenary makes 5:1 adequate in normal situations. It also
warns that charted depth is low-water depth and that tide tables are needed to
work out the high-water figure.

Outside sources agree and add the qualifiers this module uses:

- BoatUS Foundation teaches 7:1 as the general recommendation.
- West Marine and other rode-selection guidance treat 5:1 as the usual fair-weather
  figure for an all-chain rode, because chain weight keeps the pull on the anchor
  nearer horizontal at lower ratios; heavier weather, and unattended or overnight
  stays in exposed spots, call for more.
- 10:1 appears widely as the heavy-weather figure rather than as a routine one.

**How this is taught.** The lessons state a *range* tied to conditions and rode
type — roughly 5:1 to 7:1 as a working starting point in settled conditions, more
as weather builds — and explicitly say that a single ratio is not correct
everywhere, that the denominator includes bow height, that the figure must be
worked against the depth expected at high water rather than the depth on
arrival, and that scope trades against swinging room. No ratio is presented as a
rule of law.

### Anchoring — dragging and the response

The chapter's own sequence is: watch ranges, recognise movement past them,
first try more scope if there is room behind you, and if that fails or you are
running out of room, haul up and re-anchor. It also warns to watch boats
anchored upwind of you. This matches the accepted question bank
(`emer-anchor-dragging-response`), which additionally has the crew motor forward
to take the load off the rode before re-anchoring. Both are taught, in that
order of priority: get the boat under control first, then choose between more
scope, resetting, and leaving.

### Anchoring — the windlass

Checked against manufacturers rather than a general seamanship source, because
the claim is a mechanical one:

- **Lewmar** states its windlasses are designed to lift the anchor, not to pull
  the boat along and wrench the anchor out of the bottom, and directs the
  operator to use the engine to drive the boat forward while the windlass
  recovers slack.
- **Maxwell** ("Winch Safety & Maintenance") says to motor up to the anchor while
  retrieving the rode and explicitly warns against using the windlass to pull the
  boat to the anchor; if the anchor is fouled, the load is taken on the chain
  stopper and the anchor is broken out with the engine, not the windlass.

The chapter agrees in effect — its weighing sequence drives the boat forward in
short bursts while the crew recovers the slack — and adds that windlass operating
detail varies between makes and models, so the boat's own instructions govern.
The lesson states the load caution and marks the specifics as boat-specific.

### Crew overboard — recovery method

Sources consistently present **more than one** valid return, not a single
correct manoeuvre: the quick-stop, the figure-eight (sometimes called a quick
turn), a close-reach return, a deep-beam-reach return, and heaving to. The
quick-stop is the most widely taught and is the one associated with the Cruising
Club of America, US Sailing and the RYA, but that is a matter of prevalence, not
exclusivity. The accepted question `emer-mob-recovery-methods` already makes
this point, and the lesson follows it: the manoeuvre is chosen for crew size,
sea state and boat, and the common thread is a controlled return that never
loses sight of the person.

### Crew overboard — which side, and a corrected question

This is the one place where the audit found a factual defect in the existing
question bank, so the reasoning is recorded in full.

The physics is not in dispute: a boat with no way on drifts **downwind**. So a
person alongside the boat's **leeward** side is a person the boat is drifting
gently *toward*; a person on the **windward** side is one the boat is drifting
*away from*.

The mainstream teaching is a leeward pickup, and the reasons given are
consistent across sources: the hull gives the person a lee from wind and waves,
the leeward side is the lower side to the water as the boat heels, and the boat
settles toward them rather than sailing away from them. The Dockwa recovery
guide puts the same fact the other way round — being to windward *of the person*
is best "because the windage will push the boat toward the MOB". The recognised
counter-consideration is sea state: in big waves a hull drifting down on a person
can come down *on top of* them, which is why some sources prefer to keep the
person to windward in those conditions. That is a real trade-off, and the lesson
presents it as one.

`emer-mob-final-approach` had the correct answer (leeward) but an **inverted
rationale**: its `whyWrong` on the windward choice and its explanation both
asserted that leeward is the side "where the boat drifts away from them", and
that windward "risks the boat drifting down onto the victim". Those two
statements are exactly backwards. The correction is recorded in
`practice-concepts.test.ts` alongside the digest; the prompt, the four choice
texts and `correctChoiceId` are unchanged, and only the rationale wording moved.

### Cold water — the 1-10-1 model

Used, but deliberately hedged, because the model is contested.

- **For it**: the Canadian Safe Boating Council, Cold Water Boot Camp USA and US
  Army safety material all teach 1-10-1 — about 1 minute to get cold-shock
  breathing under control, about 10 minutes of meaningful movement before cold
  incapacitation, and roughly 1 hour before hypothermia causes unconsciousness.
  It originates with Gordon Giesbrecht's immersion research at the University of
  Manitoba.
- **Against it**: the National Center for Cold Water Safety publishes a direct
  rebuttal ("The 1-10-1 Myth"). Its objections are that the numbers are not a
  scientific finding and can be much shorter near freezing, that "you have"
  framing implies a guaranteed budget of time and control that does not exist,
  and that it understates thermal protection in favour of flotation alone.

**How this is taught.** As an approximate teaching aid with the direction of
travel as the real lesson — a person's ability to help themselves collapses fast,
and the colder the water the faster — not as a timetable anyone can rely on. The
lesson says the figures are approximate and can be much shorter in very cold
water. The existing question already frames it as "a rough guide" and "a rough
teaching aid", which the audit found appropriately qualified; it was not
changed.

### Cold water — handling a cold casualty

The gentle-handling claim in `emer-hypothermia-handling-caution` was checked and
holds: in significant hypothermia, sudden movement or exertion can circulate
cold, acidotic peripheral blood to the heart and provoke a dangerous rhythm
(rescue collapse), so a deeply cold person is kept horizontal, handled gently
and moved as little as possible. Initial care for a conscious, shivering person
is passive — wet clothing off, dry insulation on, out of the wind, monitored —
and aggressive rewarming, alcohol and vigorous exercise are avoided. The lesson
teaches this and stops there; broader casualty care and distress calling remain
Cruising Life & Safety's.

### Grounding

Sea Tow and the BoatUS Foundation give a consistent immediate sequence: stop
driving the boat further on, check the bilge and the hull — particularly where
running gear penetrates it, and on a sailboat the rudder and shaft stuffing
boxes and the keel bolts — and establish the state of the tide, because a
falling tide means the boat will settle further and a rising one may float it
free. Both caution against reflexively powering off: it can drive the boat
further aground, worsen damage, and pull silt into the raw-water intake.

Reducing draft by heeling the boat, and kedging toward deeper water, are
presented in these sources as *conditional* options that depend on bottom, tide
and damage — not as a standard next step. The lesson marks them that way, and
does not teach a kedging procedure.

### Emergency steering

The consistent message across Practical Boat Owner, Yachting Monthly, Cruising
World and Practical Sailor is that the emergency tiller is **boat-specific**:
access to the rudder-post head, what has to be moved to reach it, how the arm
fits and how much leverage it gives all vary by boat, and the strong
recommendation is to fit and try it at the dock before it is ever needed.
Loading is the practical limit — a short arm on a heavy boat at anything above
bare steerageway takes real force — which is why reducing speed comes first. The
lesson teaches slow down, find the boat's own provision, expect it to be
awkward, and use sail balance to take load off the rudder; it does not describe
mechanical repair or jury rudders.

### Fouled propeller

Practical Boat Owner and Yachting Monthly agree on the immediate response and on
the hazard: shut the engine down rather than trying to shake the line free with
gear changes, which winds it tighter and can damage shaft, coupling and gearbox
or pull the engine on its mounts. Before anyone goes near the propeller the
engine must be secured against restart — key out or starter battery off — so
that everyone aboard knows why. Entering the water is treated as a serious
decision, not a routine fix: a pitching stern above a swimmer with a knife is
described as a second incident waiting to happen, and single-handers are told
not to go in at all but to call for help.

The lesson therefore stops at the immediate response — stop propulsion, prevent
restart, stabilise the boat, then sail, anchor or seek assistance — and
deliberately does **not** give a clearing technique.

## Sources

- BoatUS Foundation — Anchoring & Mooring study guide; If You Run Aground;
  Dealing with an Accident
- Sea Tow — What to Do If You Run Your Boat Aground
- West Marine — Selecting an Anchor Rode
- Lewmar — windlass owner's manual (V700 and family), operating cautions
- Maxwell Marine — Winch Safety & Maintenance
- Canadian Safe Boating Council — the 1-10-1 Principle
- Cold Water Boot Camp USA — 1-10-1 Principle
- National Center for Cold Water Safety — The 1-10-1 Myth (the dissenting view)
- US Army — Tips to Survive a Fall Into Cold Water
- Dockwa — Man Overboard Part 2: Recovery Methods for Sailors
- Sailing World — Recovery Diagrams
- Practical Boat Owner — Using an Emergency Tiller; Fouled Propeller Fix
- Yachting Monthly — How to Cope with Steering Failure; freeing a propeller from
  rope or fishing gear
- Cruising World — Sailboat Emergency Steering; What to Do When You Run Aground
- Practical Sailor — Emergency Repairs at Sea
- ASA, *Cruising Made Easy*, Chapter 6, pp. 100–125 (curriculum, terminology,
  sequencing and scope reference only; not quoted, traced or paraphrased)
