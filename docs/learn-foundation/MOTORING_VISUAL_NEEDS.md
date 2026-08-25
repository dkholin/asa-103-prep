# Step 4A motoring visual-needs report

This assessment was made after writing the finished lesson text and inspecting
the current manifest records, runtime files, canonical primitives, and rendered
lesson figures. No asset or manifest entry was created or changed in Step 4A.

## Per-lesson assessment

| Lesson | Existing visual reused | Sufficiency | Missing visual decision |
|---|---|---|---|
| Before Getting Under Way | None. The earlier cleat-hitch photo was removed from the lesson because tying a cleat hitch is not the lesson’s teaching goal. | Sufficient. A short readiness sequence is clearer as text and lists. | None — **Skip** decorative checklist or safety-gear collage. |
| Engine Basics & Pre-Start Checks | photo-outboard-engine, for recognition of the externally mounted arrangement. | Sufficient for ASA-103-level context when paired with the generic sequence and manual caveat. | custom-engine-prestart-points — **Skip**. A generic engine-bay map could imply that model-specific components always occupy the same location. |
| Controls & Instruments | custom-engine-panel-throttle, for the separation between panel and combined shift/throttle lever. | Sufficient for operator awareness with the compact indication table. The current asset is schematic, not a diagnostic panel. | custom-engine-panel-operator-map — **Useful**, not required. |
| Propeller Effects | custom-prop-walk, for the accepted right-hand-propeller reverse convention. | Sufficient for prop walk but not for the distinct, spatial reason forward rudder response differs from reverse. | custom-prop-wash-rudder-flow — **Required**. |
| Maneuvering Under Power | None. | Text is sufficient for stopping and backing. A diagram would materially improve the stern-swing mental model. | custom-pivot-point-stern-sweep — **Useful**, not required. |
| Docking & Mooring | custom-docking-wind, custom-docking-current, and custom-mooring-approach. | Sufficient. The three figures cover the spatial cases that text handles least well; adding every mirror case would make figures dominate. | custom-docking-wind-off — **Skip** for now. custom-dock-lines-purpose — **Skip** for this lesson’s limited spring-line scope. |
| Outboards, Fueling & Motoring Etiquette | custom-fueling-gas-diesel, for the gasoline-specific enclosed-space ventilation distinction. The outboard photo is not repeated because it does not identify the telltale, cutoff link, or trim/tilt controls. | Sufficient for fueling and etiquette; thin for equipment identification. | custom-outboard-operator-points — **Useful**, not required. |

## Proposed asset briefs

### custom-prop-wash-rudder-flow — Required

- **Lesson / concept:** Propeller Effects / prop-wash.
- **Educational purpose:** Make the forward-versus-reverse water-flow difference
  visible: forward thrust sends accelerated water across a turned rudder, while
  reverse does not provide the same direct wash over the rudder.
- **Must be visually true:** Same single-screw inboard boat and rudder in two
  panels; propeller location ahead of the rudder; forward-flow arrows travel aft
  through the propeller and across the rudder; reverse-flow arrows travel
  forward away from the rudder; labels must not imply that the rudder is
  disabled in reverse or that sternway never makes it effective.
- **Canonical primitives available:** powerboat-top or sailboat-top,
  heading-arrow, and water-surface. There is no approved rudder primitive;
  design/canonical-assets/README.md explicitly says rudder.svg is deferred.
  Step 4B therefore needs an approved rudder/propeller geometry decision before
  production.
- **Why text/current assets are insufficient:** custom-prop-walk shows sideways
  stern motion only. It cannot teach where the water goes or why a forward
  throttle burst can create rudder force at little boat speed.

### custom-engine-panel-operator-map — Useful

- **Lesson / concept:** Controls & Instruments / engine-controls,
  engine-instruments.
- **Educational purpose:** Help a learner recognize the neutral detent and the
  common tachometer, temperature, oil-pressure, and charging/alarm cues without
  turning the lesson into diagnostics.
- **Must be visually true:** Neutral centered between forward and reverse;
  additional lever travel represents increasing throttle; icons/labels clearly
  distinguish rpm, temperature, oil pressure, and charge; a prominent “layouts
  vary” cue; no universal numeric alarm thresholds.
- **Canonical primitives available:** None for marine panels or control levers.
  The current custom-engine-panel-throttle is the closest approved production
  asset and could be redrawn deterministically rather than casually modified.
- **Why text/current assets are insufficient:** The table communicates meaning,
  but the current figure’s two unlabeled gauges and marks do not support
  equipment recognition. This is useful reinforcement, not a prerequisite for
  understanding.

### custom-pivot-point-stern-sweep — Useful

- **Lesson / concept:** Maneuvering Under Power / pivot-point.
- **Educational purpose:** Show why clearing the bow does not guarantee the stern
  will clear during a low-speed turn.
- **Must be visually true:** One vessel shown at successive headings; pivot zone
  shown forward of amidships as approximate, not an exact fixed point; stern arc
  visibly wider than bow arc; no claim of a universal one-third position.
- **Canonical primitives available:** sailboat-top or powerboat-top,
  heading-arrow; dock or a piling can provide a clearance reference.
- **Why text/current assets are insufficient:** Stern swing is spatial and is
  easy to underestimate from prose, though the concise definition is adequate
  for Step 4A.

### custom-outboard-operator-points — Useful

- **Lesson / concept:** Outboards, Fueling & Motoring Etiquette /
  outboard-motors.
- **Educational purpose:** Identify the cooling telltale, engine-cutoff link,
  trim/tilt movement, water-intake area, and propeller hazard region on a generic
  outboard.
- **Must be visually true:** Telltale shown as a cooling indicator rather than
  the cooling intake; intake remains submerged in the operating view; trim/tilt
  arc does not imply safe powered operation at every angle; cutoff link connects
  operator to the switch; propeller hazard is clearly separated from controls.
- **Canonical primitives available:** None for an outboard assembly. The existing
  photo-outboard-engine confirms mounting/recognition but not these small
  operating features. Step 4B would need a reviewed generic outboard primitive
  or a clearly licensed manufacturer diagram whose reuse terms allow adaptation.
- **Why text/current assets are insufficient:** These are recognition and
  relative-position concepts. The current photograph is too distant to identify
  them.

## Deliberately skipped proposals

- **custom-docking-wind-off: Skip.** It is a mirror case with a steeper track;
  the existing wind-on figure plus one short paragraph is adequate, and a
  fourth figure would over-weight this combined lesson.
- **custom-dock-lines-purpose: Skip.** A naming diagram would be justified in
  a fuller docking lesson, but Step 4A requires only spring-line purpose. The
  definition and accepted Practice explanation cover that scope.
- **custom-engine-prestart-points: Skip.** Relative component positions vary
  widely and the boat/manual-specific caveat is more educationally honest.
- **custom-auxiliary-types: Skip.** The existing outboard photo plus concise
  inboard/outboard text provides enough context without adding a taxonomy
  graphic.
