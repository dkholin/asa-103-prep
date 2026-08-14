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
];

export const TOPIC_IDS: TopicId[] = TOPICS.map((t) => t.id);
