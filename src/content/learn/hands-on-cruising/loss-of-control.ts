import type { Lesson } from '../types';

/** Step 1 skeleton — see `holding-a-course.ts`. */
export const lesson: Lesson = {
  id: 'hands-on-cruising-loss-of-control',
  moduleId: 'hands-on-cruising',
  order: 6,
  title: 'Grounding, Steering & Propulsion Loss',
  intro:
    'Running aground, losing the rudder and losing the engine are three different failures with one thing in common: the immediate response decides how much worse the situation gets.',
  concepts: ['grounding-response', 'loss-of-steering-or-propulsion'],
  blocks: [
    { kind: 'heading', text: 'Placeholder heading' },
    {
      kind: 'text',
      text: 'Placeholder lesson body. Planned coverage: recognising a grounding and responding to it without compounding the damage, what draft and the state of the tide mean for getting off, steering failure and rigging the emergency tiller, keeping the boat under control without a rudder, and engine failure treated as a loss of propulsion — sailing, anchoring or buying sea room, plus the immediate response to a fouled propeller. Engine and steering-gear diagnosis, clearing a fouled prop, rigging failure and distress radio procedure are out of scope.',
    },
  ],
};
