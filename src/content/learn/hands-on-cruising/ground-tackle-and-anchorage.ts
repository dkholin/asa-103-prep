import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'hands-on-cruising-ground-tackle-and-anchorage',
  moduleId: 'hands-on-cruising',
  order: 2,
  title: 'Ground Tackle & Choosing the Spot',
  intro:
    'An anchor holds because of what it is, what it is attached to, and where it is put down; the choice of spot decides most of the outcome before any gear goes over the bow.',
  concepts: ['ground-tackle-and-anchor-types', 'choosing-an-anchorage', 'anchor-scope'],
  blocks: [
    { kind: 'heading', text: 'What is actually holding the boat' },
    {
      kind: 'definition',
      term: 'Ground tackle',
      text: 'The whole anchoring system taken together — the anchor, the rode that connects it to the boat, and the shackles and swivels joining them. You deploy and recover the entire assembly every time, and it is only as good as its weakest link.',
    },
    {
      kind: 'text',
      text: 'A very old anchor held by being heavy. That works on a dinghy and stops working on a cruising boat, because the weight needed to resist the pull of a hull, rig and superstructure in a blow is more than anyone can lift over a bow roller. Modern anchors are shaped instead: they are designed to be dragged a short distance, bite, and then bury themselves deeper the harder they are pulled. Weight still matters, but mostly as the thing that gets the shape into the seabed in the first place.',
    },
    {
      kind: 'text',
      text: 'That shift explains why bottom type dominates everything else. A shape that digs needs something it can dig into. Sand and mud are the friendly bottoms and clay is usually good; weed and grass are treacherous because the anchor skates over the mat without ever reaching what is underneath; rock is worst of all, since most designs cannot penetrate it and the ones that hook something often hook it permanently.',
    },
    {
      kind: 'table',
      caption: 'The common working anchors and what each is really for.',
      headers: ['Type', 'Recognisable by', 'Strong points', 'Weak points'],
      rows: [
        ['Plow (CQR and similar)', 'A single plough-shaped fluke, usually on a hinged shank', 'Dependable general-purpose holding in sand and mud; the hinge lets it re-orient and re-dig as the boat swings', 'Bulky; can be slow to set on a hard bottom'],
        ['Claw (Bruce type)', 'One rigid casting shaped like a scoop, no moving parts', 'Resets quickly and smoothly after a wind or tide shift; nothing to jam', 'Modest holding for its weight compared with the best of the others'],
        ['Fluke (Danforth type)', 'Two flat, sharp triangular flukes pivoting on a stock', 'Outstanding holding for its weight in sand and soft mud, and stows flat', 'Poor in rock, grass and kelp, where the thin flukes cannot get a bite'],
        ['Mushroom', 'A heavy inverted bowl', 'Settles and buries over weeks into soft mud; excellent for a permanent mooring', 'Almost useless as a working anchor — it needs time, and will not take a sudden load'],
      ],
    },
    {
      kind: 'text',
      text: 'Most cruisers carry more than one, and not out of indecision. A boat that stays in home waters usually has a primary anchor chosen for the bottom it will actually meet, plus a second of a different pattern for the day the first one will not bite.',
    },
    {
      kind: 'figure',
      assetId: 'photo-cqr-anchor',
      caption:
        'A plow-pattern anchor. Note the hinge between shank and fluke: when the boat swings to a new wind, the shank can change angle while the buried fluke stays where it is, so the anchor is far less likely to be levered out of the bottom.',
    },
    {
      kind: 'figure',
      assetId: 'photo-danforth-anchor',
      caption:
        'A fluke-pattern anchor, here stowed on deck with its rode attached. The two broad plates bury deeply in sand and mud, which is why this design holds so well for its weight — and why it is the wrong choice over rock or thick weed, where those same thin plates just skid.',
    },
    { kind: 'heading', text: 'The rode: rope, chain, and what each contributes' },
    {
      kind: 'text',
      text: 'The line between anchor and boat is doing more than connecting them. Chain is heavy, and that weight is useful twice over: it lies along the seabed so the pull arrives at the anchor almost horizontally, and it hangs in a curve that has to be straightened before any load reaches the anchor at all. In moderate conditions much of what is holding you is simply the chain, and every gust spends itself lifting it rather than snatching at the bottom.',
    },
    {
      kind: 'text',
      text: 'Rope does the same job by a different route. It cannot lie along the bottom, but it stretches, and stretch absorbs the shock loads that a rigid connection would deliver straight to the anchor. Nylon is the usual choice precisely because it is elastic. Rope is also far lighter and easier to handle by hand, which matters on a boat with no windlass — but it chafes where it crosses rock or a rough chock, and it will part there long before it parts anywhere else.',
    },
    {
      kind: 'callout',
      tone: 'note',
      title: 'Why most rodes are both',
      text: 'The usual compromise is a length of chain shackled to the anchor with rope beyond it. The chain takes the abrasion down where the rode drags on the bottom, adds weight exactly where the pull angle is decided, and the rope gives the springiness and the easy handling. Wherever the rode passes over an edge on deck, protect it — chafe is the failure nobody watches happening.',
    },
    { kind: 'heading', text: 'Choosing the spot' },
    {
      kind: 'text',
      text: 'Almost all of the outcome is decided here, before any gear leaves the deck. You are looking for four things at once, and a spot that is wonderful on three of them and bad on the fourth is not a good anchorage.',
    },
    {
      kind: 'list',
      items: [
        'Shelter, judged against the wind you are forecast to get rather than the wind you have. A cove that is a haven now can be a trap after a shift.',
        'Holding, which is bottom character — the chart tells you, in abbreviations like S for sand, M for mud, Cl for clay and Rk for rock.',
        'Depth, which has to work at both ends of the tide: enough beneath the keel when the water is at its lowest, without being so deep at the top of the tide that the rode required becomes unreasonable.',
        'Room to swing, cleanly, without reaching another boat, a shoal or the shore.',
      ],
    },
    {
      kind: 'figure',
      assetId: 'custom-anchorage-selection',
      caption:
        'The same bay offers very different anchorages. Wind crossing open water builds waves in proportion to the distance it blows over, so a spot tucked behind a point of land gets both a wind shadow and a much shorter fetch than one out near the bay mouth — a real difference in how the night goes, not a marginal one.',
    },
    {
      kind: 'text',
      text: 'The chart also tells you where not to anchor at all: marked channels, cable and pipeline crossings, and areas charted as prohibited or restricted. In busy harbours there may be designated anchorages you are expected to use.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'The lee shore',
      text: 'A shore the wind is blowing onto is a lee shore, and it is the one to be most careful of. Everything that can go wrong at anchor — a dragging anchor, an engine that will not start, a wind that builds beyond the forecast — pushes you the same direction, toward the beach, with the sea building against you and nothing in reserve. If a forecast shift will turn your anchorage into a lee shore overnight, move before it arrives rather than after. More scope is a good answer to many anchoring problems and is not an answer to this one.',
    },
    { kind: 'heading', text: 'Swinging room and the boats already there' },
    {
      kind: 'text',
      text: 'A boat at anchor lies downwind — or down-current, in a tidal area — of her anchor, and when the wind shifts she goes round. So your footprint is not where you stop; it is a circle centred on the anchor with a radius of your rode plus your own length plus a margin. Everything inside that circle is something you may eventually touch.',
    },
    {
      kind: 'figure',
      assetId: 'custom-swing-circle',
      caption:
        'The dashed circle, not the boat’s current position, is the real question. A hazard outside it is not a problem tonight; a neighbour inside it is, and stays one no matter how well the anchor is holding — because holding is exactly what lets the boat sweep the whole circle.',
    },
    {
      kind: 'text',
      text: 'That is why arriving late in a full anchorage takes some thought. Motor around first and watch how the boats already there are lying: it shows you what the wind and tide are doing and roughly how each of them will swing. Then find a gap where your circle and theirs do not overlap. Do not assume everyone swings alike — a boat on a short all-chain rode and a light boat on a long rope rode behave quite differently in the same gust. The custom, and the fair reading of it, is that whoever anchors last is the one who has to move.',
    },
    { kind: 'heading', text: 'Scope' },
    {
      kind: 'text',
      text: 'Everything above is about where. Scope is about how much, and it is the number that decides whether the anchor gets to work as designed.',
    },
    {
      kind: 'definition',
      term: 'Scope',
      text: 'The ratio of rode paid out to the vertical distance from the bow down to the seabed. That distance is the water depth plus the height of your bow above the water — not the depth alone, which is the single most common way of getting this wrong.',
    },
    {
      kind: 'figure',
      assetId: 'custom-scope-geometry',
      caption:
        'The measurement runs from the bow chock, not the waterline. Freeboard at the bow can easily be several feet, and in shallow water it is a large fraction of the total — leave it out and you will pay out noticeably less rode than you meant to.',
    },
    {
      kind: 'text',
      text: 'The reason the ratio matters is angle. An anchor buries under a pull that is close to horizontal and comes out under a pull that is close to vertical — that is by design, and it is how you retrieve it. Long rode means a flat pull and an anchor that digs deeper as it loads. Short rode means a steep pull that tries to lift the anchor out of the ground exactly when the wind is doing its worst.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'There is no single correct ratio',
      text: 'You will hear 7:1 quoted as though it were law. It is a reasonable starting point for a rope-and-chain rode in settled conditions, and something like 5:1 is commonly accepted for an all-chain rode, whose weight already flattens the pull. As weather builds, more is better, and 10:1 is a heavy-weather figure rather than a routine one. Treat all of these as a place to start thinking, not a place to stop: the right answer depends on rode type, bottom, forecast, how much room you have, and whether anyone will be awake.',
    },
    {
      kind: 'text',
      text: 'Two practical corrections to whatever number you choose. First, tide: charted depths are low-water figures, and if the tide rises four feet under you, the rode you paid out is now a smaller multiple of a larger depth. Your scope quietly shrinks overnight unless you worked it against the depth you expect at high water. Second, room: scope and swinging room pull in opposite directions, and in a crowded anchorage you may have to accept less scope than you want. That is a legitimate compromise, but it is a compromise — you have traded holding power for space, and the price is paid in vigilance.',
    },
  ],
};
