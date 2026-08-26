import type { Lesson } from '../types';

/**
 * Draft skeleton. Structure, ordering and concept tags are final; the teaching
 * copy and any figures are still to be written.
 */
export const lesson: Lesson = {
  id: 'navigation-rules-tools-compass-courses-bearings', moduleId: 'navigation-rules-tools', order: 8,
  title: 'Compass, Courses & Bearings',
  intro: 'Turning a direction on the chart into a heading you can steer, and back again.',
  concepts: ['compass-and-compass-rose', 'compass-variation', 'compass-deviation', 'plotting-a-course'],
  blocks: [
    { kind: 'callout', tone: 'note', title: 'Draft lesson', text: 'This lesson is an outline. The Practice questions below are already mapped to its concepts and work today; the written explanation is still being drafted.' },
    { kind: 'text', text: 'Planned coverage: The two rings of the compass rose, variation and its annual change, vessel-specific deviation and its causes, and using dividers and parallel rules to plot and read a course.' },
  ],
};
