# Canonical source primitives

Approved source SVG primitives for the deterministic instructional diagrams used in
the question set. This is design source, not runtime content.

- Production question SVGs under `public/assets/` are **self-contained**. Nothing here
  is fetched or referenced at runtime; consumers inline the geometry they need.
- Geometry-sensitive diagrams should be **composed deterministically** from these
  primitives — not produced by image generation. The geometry carries the technical
  claim being tested, so it has to be exact and reviewable.

## `sailboat-top.svg`

Read its header comment before using it. It is not a drop-in shape:

- **Tack convention** — both sails are trimmed to port, which asserts a **starboard
  tack**. Any panel that also draws wind must agree with that.
- **Port tack** — mirror the whole primitive with `scale(-S S)` about the centreline
  `x = 44`. Never mirror the sails or the hull alone.
- **Pivot** — rotate about `(44, 123)`, not the viewBox centre.
- **Aspect ratio changed** from the older traced asset (0.4606 → 0.3306).

**Do not naïvely swap the old embedded sailboat into the new primitive.** Eight
existing diagrams inline the legacy top-view geometry under `<symbol id="sailboat-top">`.
They differ in aspect ratio and pivot, and — unlike the legacy shape — the new primitive
asserts a tack, so a direct substitution can turn a currently-correct diagram into a
self-contradicting one. Retrofits are deferred and must be done per-diagram.

## `rudder.svg`

Plan-view rudder blade and stock, for steering and low-speed handling diagrams.
Read its header comment before using it.

- **Orientation** — at rotation 0 the blade points straight aft, so it composes
  with a bow-up vessel. Positive rotation swings the **trailing edge to port**,
  negative to starboard. A starboard helm order (trailing edge to starboard)
  pushes the stern to port; make the rest of the panel agree.
- **Pivot** — rotate about the **stock** at `(14, 10)`, not the viewBox centre.
  The documented `<use x="-14" y="-10" width="28" height="56">` viewport puts the
  stock on the group origin so the transform pattern works as written.
- **Thickness is exaggerated** — 29% of chord, not a real foil section, for the
  same reason the mainsail in `sailboat-top.svg` carries exaggerated camber: at
  render size a true section collapses to a hairline and the deflection angle
  stops being readable.

This supersedes the traced `rudder.svg` that was previously deferred. That file
is a tiller-and-pivot side view with a foreign viewBox, is not a plan-view
blade, and remains unapproved and excluded.
