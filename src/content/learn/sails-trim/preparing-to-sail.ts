import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'sails-trim-preparing-to-sail', moduleId: 'sails-trim', order: 2,
  title: 'Preparing to Sail',
  intro: 'Make the boat ready while time, space, and engine control are still on your side.',
  concepts: ['pre-departure-checks', 'crew-briefing'],
  blocks: [
    { kind: 'heading', text: 'Prepare before the maneuver' },
    { kind: 'text', text: 'The transition to sailing is easier when it is organized before the boat reaches the hoisting area. Check the current wind and traffic, choose open water with room to hold a useful heading, and decide which sails will be set. Continue to monitor the boat’s position while the crew prepares.' },
    { kind: 'heading', text: 'Make sails and lines ready to run' },
    { kind: 'list', items: [
      'Remove the mainsail cover and release sail ties as the boat’s procedure requires, while keeping the sail secured until the crew is ready to hoist.',
      'Attach or confirm halyards, then trace them aloft and back to the correct clutch, cleat, or winch. Clear twists and wraps before loading them.',
      'Lead sheets through the correct blocks and keep both the working side and lazy side free to run. Confirm furling lines and reefing controls are not tangled.',
      'Clear loose gear from the foredeck and cockpit. Keep dock lines and fenders available until they are no longer needed, then stow them rather than creating trip hazards.',
    ] },
    { kind: 'callout', tone: 'warning', title: 'Ready does not mean released', text: 'A cover, tie, halyard, or furling line may be the last restraint keeping a sail under control. Remove restraints in the boat’s planned sequence, not all at once.' },
    { kind: 'heading', text: 'Brief the transition' },
    { kind: 'text', text: 'Assign a helmsperson and name who will handle each halyard, sheet, and furling line. Review the intended heading, the order of actions, the command words, and what will stop the maneuver. Everyone should know where to sit or stand and which loaded-line areas to avoid.' },
    { kind: 'text', text: 'Before beginning, confirm that the engine is available if needed, there is adequate sea room, and the boat can turn toward a low-load heading without conflicting with traffic or hazards. The aim is not to rush away from motoring; it is to hand control from engine to sails deliberately.' },
    { kind: 'callout', tone: 'note', title: 'Pause is a valid command', text: 'If a line is fouled, a crew member is not ready, or the available room has changed, keep or regain control under power and reset the plan.' },
  ],
};
