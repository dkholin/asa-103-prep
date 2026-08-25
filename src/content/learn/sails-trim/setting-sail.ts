import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'sails-trim-setting-sail', moduleId: 'sails-trim', order: 3,
  title: 'Setting Sail',
  intro: 'Use open water and a low-load heading to transfer control from engine to sails without losing track of the boat.',
  concepts: ['setting-sail', 'stowage'],
  blocks: [
    { kind: 'heading', text: 'Choose room before the sequence' },
    { kind: 'text', text: 'Move to an area with enough depth, traffic clearance, and maneuvering room to solve a snag without approaching a hazard. Plan a heading that keeps the sail from filling hard while it is being raised or unfurled. For a mainsail this is commonly close to head-to-wind, but waves, traffic, rig design, and the boat’s written procedure may change the safest heading.' },
    { kind: 'heading', text: 'Hoist or unfurl under control' },
    { kind: 'list', ordered: true, items: [
      'Settle on the planned heading and speed. Check the full path of the halyard, sheets, and furling line one last time.',
      'Raise or unfurl the selected sail smoothly while another crew member watches the sail, mast, and line leads. Stop rather than forcing a line that binds.',
      'Secure the halyard or furling system, then trim only enough for the sail to work on the intended course. Keep the engine available until the sails provide reliable control.',
      'Set the remaining sail when appropriate for this boat and conditions, using the same clear-line and controlled-load checks.',
    ] },
    { kind: 'callout', tone: 'note', title: 'Sequence is boat-specific', text: 'Many cruising boats commonly hoist the mainsail before unfurling the headsail. Other rigs and procedures differ. Follow the boat’s established sequence rather than treating one order as universal.' },
    { kind: 'heading', text: 'Finish the transition' },
    { kind: 'text', text: 'When the sails are drawing and the boat is responding, check that halyards and sheets are secured, no line is overboard, and sail corners and battens look normal. Confirm the engine is in the state required by the boat’s procedure and that navigation lights or day shapes match the vessel’s actual status.' },
    { kind: 'text', text: 'Coil and stow dock lines, bring fenders aboard, replace the winch handle, and organize running rigging so it can be eased quickly. A clear cockpit and deck are part of the final check—not housekeeping postponed until the next maneuver.' },
    { kind: 'callout', tone: 'warning', title: 'A fouled line is a stop signal', text: 'Do not keep hauling against unexpected resistance. Hold or lower the sail under control, maintain a safe heading and position, identify the foul, and restart only when the line can run safely.' },
  ],
};
