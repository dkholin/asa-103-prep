import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'navigation-rules-tools-distance-speed-time-electronics', moduleId: 'navigation-rules-tools', order: 9,
  title: 'Distance, Speed, Time & Electronic Navigation',
  intro: 'Measuring how far and how long, and where the electronics fit alongside the paper.',
  concepts: ['distance-speed-time', 'electronic-navigation'],
  blocks: [
    { kind: 'heading', text: 'The nautical mile' },
    { kind: 'definition', term: 'Nautical mile', text: 'One minute of latitude — internationally fixed at 1,852 metres, about 6,076 feet, roughly 1.15 statute miles. A knot is one nautical mile per hour.' },
    { kind: 'text', text: 'That makes the chart self-measuring. Meridians converge toward the poles, so a minute of longitude spans a full mile only at the equator; parallels do not converge, so a minute of latitude is a nautical mile everywhere. Read distance from the latitude scale on the side border, never from the longitude scale.' },
    { kind: 'text', text: 'Span the two points with dividers, carry the span to the side border, and read the minutes of latitude it covers — at roughly the latitude of your track. For a leg longer than the dividers open, set them to a round number of miles, walk them end over end, and measure the remainder separately.' },
    { kind: 'figure', assetId: 'custom-distance-scale', caption: 'The measuring loop: span the distance on the chart, carry the span unchanged to the latitude border, and read the number of minutes it covers.' },
    { kind: 'heading', text: 'Distance, speed and time' },
    { kind: 'text', text: 'One relationship covers the arithmetic at this level: distance equals speed times time — miles, knots, hours.' },
    { kind: 'table', caption: 'The same relationship, three ways', headers: ['You want', 'Formula', 'Worked example'], rows: [
      ['Distance', 'D = S × T', '5 kn for 2.5 h → 12.5 nm'],
      ['Time', 'T = D ÷ S', '18 nm at 6 kn → 3 h'],
      ['Speed', 'S = D ÷ T', '15 nm in 2.5 h → 6 kn'],
    ] },
    { kind: 'text', text: 'Estimating arrival is the practical use: 21 miles at an honest 5.5 knots is about 3 h 50 m, so a 0900 departure puts you in around 1250 — before a foul tide or a reef. Convert minutes to decimal hours before dividing, and use the speed you will average, not your best ever.' },
    { kind: 'definition', term: 'Ship’s log', text: 'The instrument measuring speed through the water and totalising distance run. It measures water, not ground, so in a current the log and the GPS disagree — and that disagreement is itself useful.' },
    { kind: 'heading', text: 'GPS, waypoints and plotters' },
    { kind: 'text', text: 'A GPS receiver reports position as latitude and longitude, with speed and course over the ground. A waypoint is a stored position, a route an ordered series of them, and a chart plotter draws the lot over an electronic chart with the boat shown continuously.' },
    { kind: 'callout', tone: 'note', title: 'What the accuracy figures actually mean', text: 'The published figure — a daily global average user range error of 2.0 m or better, 95% of the time (GPS.gov) — describes the signal in space, not the position on your screen; actual accuracy also depends on satellite geometry, blockage, atmosphere, and the receiver. Either way the fix is far more precise than the chart data it is plotted onto.' },
    { kind: 'heading', text: 'Why an exact position is not a safe route' },
    { kind: 'text', text: 'The position is usually the most reliable part of the picture; the chart underneath it is not. Depths come from the latest hydrographic survey, which in many areas may be decades old — hence NOAA’s source and Zone of Confidence diagrams. A perfectly accurate fix on a poorly surveyed area is a perfectly accurate way of arriving at an uncharted rock.' },
    {
      kind: 'list',
      items: [
        'Zooming in does not add detail. A plotter magnifies a small-scale chart until it looks precise; the survey underneath has not improved.',
        'Check the datum. U.S. charts use NAD 83 or WGS 84, which agree for charting purposes; positions from an older chart or publication may not, and charts note the shift where it applies.',
        'A route between waypoints is a set of straight lines. Nothing guarantees they clear the ground — inspect each leg at a sensible scale.',
        'Electronics fail — power, antenna, water, a dropped unit. Keep a paper chart or backup, and know roughly where you are without the screen.',
        'Cross-check against depth under the keel, a visual bearing, a transit ashore, or distance run. Two independent sources agreeing beats one being precise.',
      ],
    },
    { kind: 'callout', tone: 'warning', title: 'Keep navigating, not just monitoring', text: 'The failure mode is rarely the equipment breaking; it is the crew watching a boat icon and no longer thinking about the water. Keep a running sense of where you are, what the next hazard is, and what you would do if the screen went blank.' },
  ],
};
