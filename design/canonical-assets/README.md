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

## Not approved

`rudder.svg` is deferred and deliberately not included here.
