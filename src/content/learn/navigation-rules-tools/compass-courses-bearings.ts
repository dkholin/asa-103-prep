import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'navigation-rules-tools-compass-courses-bearings', moduleId: 'navigation-rules-tools', order: 8,
  title: 'Compass, Courses & Bearings',
  intro: 'Turning a direction on the chart into a heading you can steer, and back again.',
  concepts: ['compass-and-compass-rose', 'compass-variation', 'compass-deviation', 'plotting-a-course'],
  blocks: [
    { kind: 'heading', text: 'The instrument' },
    { kind: 'text', text: 'A magnetic steering compass is a card carrying magnets, floated in fluid so it stays level and damped. The card settles on magnetic north; the boat turns around it. You read the heading where the lubber line — a fixed mark on the boat’s fore-and-aft axis — crosses the card. A hand-bearing compass is the same idea in portable form, with a sight for taking bearings.' },
    { kind: 'figure', assetId: 'custom-binnacle-compass', caption: 'The card and the lubber line are the two things you actually read. The card holds still relative to the earth; the lubber line moves with the boat.' },
    { kind: 'text', text: 'Directions are stated in three digits, 000° to 359°, and it pays to name the reference every time: 090°T is true, 090°M magnetic, 090°C what your own compass card reads.' },
    { kind: 'heading', text: 'True, magnetic, and the compass rose' },
    { kind: 'text', text: 'True north is the geographic pole, and what the chart’s meridians point to. Magnetic north is where the earth’s field actually leads a needle, and it is somewhere else. A chart’s compass rose prints both: an outer ring graduated to true north and an inner ring labelled MAGNETIC, rotated relative to one another by exactly the local variation.' },
    { kind: 'definition', term: 'Variation', text: 'The angular difference between true north and magnetic north at a given place, also called declination. It depends on where you are, not on what boat you are in, and it changes slowly over years.' },
    { kind: 'figure', assetId: 'noaa-compass-rose', caption: 'Two concentric graduated rings offset from one another, with the local variation and its annual rate of change printed at the centre of the rose.' },
    { kind: 'text', text: 'Converting is one addition or subtraction: “true plus west, magnetic best” — add westerly variation going from true to magnetic, subtract easterly. A true course of 090° where variation is 6°W is 096° magnetic; the other way, the signs reverse. If unsure, sanity-check against the rose — lay the course line across it and read both rings.' },
    { kind: 'callout', tone: 'note', title: 'Correct an old chart for annual change', text: 'A rose annotated “VAR 4°15′W (2018), ANNUAL CHANGE 8′E” says the westerly variation is shrinking by 8 minutes of arc a year. Eight years on that is 8 × 8′ = 64′, about 1°04′, so 4°15′W has become roughly 3°11′W. Note the units — the annual change is in minutes, not degrees. Check the edition date and apply the stated rate, or take variation from a current chart or electronic source.' },
    { kind: 'heading', text: 'Deviation' },
    { kind: 'definition', term: 'Deviation', text: 'Compass error caused by the boat’s own magnetic influences — ferrous metal, wiring, engine, electronics. It belongs to that individual vessel and changes with heading, because the onboard sources swing around the card as the boat turns.' },
    { kind: 'text', text: 'That heading dependence is why deviation is recorded as a card of corrections across a range of headings rather than one number. The card is produced by swinging the compass — comparing what it reads against known headings — after installation and whenever the boat’s magnetic environment changes. Variation and deviation are separate corrections, applied separately.' },
    { kind: 'figure', assetId: 'custom-compass-interference', caption: 'Two ordinary items stowed close to the compass, and the needle no longer settles where it should. Deviation is created by what is near the instrument, not by the instrument’s quality.' },
    {
      kind: 'list',
      items: [
        'Keep ferrous metal away — tools, cans, a winch handle, a knife left on the binnacle.',
        'Keep magnets and motors clear: handheld radios, speakers, phones, tablets, portable lights.',
        'Site a fixed compass well away from engine, metal fittings and current-carrying wiring, then swing it in place. Never enclose it in metal.',
        'If the compass suddenly disagrees with a known transit or the plotter, look for something newly stowed nearby before doubting the chart.',
      ],
    },
    { kind: 'heading', text: 'Plotting a course' },
    { kind: 'text', text: 'Draw the intended track between two positions and check it clears charted hazards with a margin. Transfer that line to the nearest compass rose with parallel rules — walked across the chart while staying parallel — and read the direction: the magnetic ring gives a magnetic course directly, the true ring means applying variation yourself. Then apply the boat’s deviation for that heading to get the course to steer, and step off the distance with dividers against the latitude scale.' },
    { kind: 'figure', assetId: 'photo-plotting-tools', caption: 'Chart work is a two-tool craft: one instrument carries a direction across the sheet to the rose, another steps off distance against the border scale.' },
    { kind: 'callout', tone: 'warning', title: 'A plotted course is not yet a track over the ground', text: 'The course you steer is a heading through the water. Current and leeway push the boat off it, so the track made good differs from the line you drew. Correcting for set and drift is ASA 105 material; here the point is knowing the difference exists, checking your position as you go, and not assuming the boat is on the line simply because the compass reads the planned course.' },
  ],
};
