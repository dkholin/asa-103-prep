import type { TopicId } from './types';

export const TOPICS: { id: TopicId; title: string; blurb: string }[] = [
  {
    id: 'nav-lights',
    title: 'Navigation Lights',
    blurb: 'Required lights and identifying vessels at night',
  },
  {
    id: 'right-of-way',
    title: 'Right of Way',
    blurb: 'Crossing, overtaking, and sailing-vessel rules',
  },
  {
    id: 'sound-signals',
    title: 'Sound Signals',
    blurb: 'Maneuvering, warning, and restricted-visibility signals',
  },
  {
    id: 'flags',
    title: 'Signal Flags',
    blurb: 'Alpha and diver-down flags you will meet on the water',
  },
  {
    id: 'chart-nav',
    title: 'Coastal Navigation & Charts',
    blurb: 'Chart symbols, ATONs, soundings, lat/long, and basic piloting',
  },
  {
    id: 'anchoring',
    title: 'Anchoring & Mooring',
    blurb: 'Anchor types, anchorage selection, scope, and ground tackle',
  },
];

export const TOPIC_IDS: TopicId[] = TOPICS.map((t) => t.id);
