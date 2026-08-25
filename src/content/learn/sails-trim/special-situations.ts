import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'sails-trim-special-situations', moduleId: 'sails-trim', order: 7,
  title: 'Special Situations',
  intro: 'Slow the boat deliberately, combine propulsion when useful, and recognize when wind is carrying you toward danger.',
  concepts: ['heaving-to', 'fore-reaching', 'motorsailing'],
  blocks: [
    { kind: 'heading', text: 'Heaving-to: balance opposing forces' },
    { kind: 'text', text: 'Heaving-to is a way to slow and settle a sailing boat so the crew can pause, reef, navigate, rest briefly, or manage a problem. A common setup uses a backed headsail pushing the bow away from the wind, a trimmed mainsail tending to turn the boat toward the wind, and rudder held to oppose the backed sail. The balanced forces leave the boat making little headway while it drifts slowly.' },
    { kind: 'figure', assetId: 'custom-heaving-to', caption: 'A backed headsail and opposing rudder can balance the boat in a slow, stable hove-to attitude.' },
    { kind: 'callout', tone: 'note', title: 'Test the result', text: 'Exact sheet, rudder, and mainsail positions vary by boat and conditions. Confirm heading, drift, nearby traffic, and available sea room; heaving-to does not make the vessel anchored or unattended.' },
    { kind: 'heading', text: 'Fore-reaching is still progress' },
    { kind: 'text', text: 'A fore-reaching boat remains close to the wind and makes slow, controlled forward progress. It may be used to ease motion or buy time, but it is not as fully settled as a boat hove-to. The distinction is practical: watch the track over the ground. If the boat continues advancing, plan for the sea room it will consume.' },
    { kind: 'heading', text: 'Motorsailing' },
    { kind: 'text', text: 'Using engine and sails together can steady the boat in waves, help maintain speed or heading, or add a margin while maneuvering. Trim the sails for the actual apparent wind, monitor engine cooling and loads, and avoid allowing lines near the propeller. The combination does not remove the need to choose a safe sail plan.' },
    { kind: 'callout', tone: 'warning', title: 'Navigation Rules status', text: 'When machinery is propelling the boat, it is a power-driven vessel under the Navigation Rules even if sails are set. Apply the lights, shapes, and steering responsibilities for that status.' },
    { kind: 'heading', text: 'Lee-shore awareness' },
    { kind: 'text', text: 'A lee shore is a shore toward which the wind is blowing the vessel. If propulsion, steering, or sail control is lost, wind and waves may reduce the remaining sea room quickly. Notice the hazard early and preserve an escape route rather than waiting until the shoreline is close.' },
    { kind: 'figure', assetId: 'custom-lee-shore', caption: 'Wind toward an anchored boat’s nearby shore shows why a lee-shore position can lose its safety margin quickly.' },
    { kind: 'callout', tone: 'warning', title: 'Distance is time', text: 'Near a lee shore, keep enough room to turn, reduce sail, start the engine, or choose another safe action before drift becomes an emergency.' },
  ],
};
