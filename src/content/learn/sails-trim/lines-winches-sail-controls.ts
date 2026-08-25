import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'sails-trim-lines-winches-sail-controls',
  moduleId: 'sails-trim',
  order: 1,
  title: 'Lines, Winches & Sail Controls',
  intro: 'Handle the load before you chase the trim: know what each line does, where it leads, and how it can move.',
  concepts: ['line-handling-safety', 'sail-control-equipment'],
  blocks: [
    { kind: 'heading', text: 'Respect every loaded line' },
    { kind: 'text', text: 'A sheet or halyard can load suddenly when a sail fills. Keep fingers away from blocks, fairleads, clutches, cleats, and the winch drum. Never wrap a line around a hand, foot, or body, and never stand in a coil that may run. Before easing, check the line’s path and make sure everyone is clear.' },
    { kind: 'callout', tone: 'warning', title: 'Control the release', text: 'A loaded line should be eased, not dropped. Keep enough friction on the winch or fitting to control its speed, feed the tail smoothly, and stay clear of the moving line and its snap-back path.' },
    { kind: 'heading', text: 'Winches, self-tailers, and clutches' },
    { kind: 'text', text: 'A winch multiplies pulling force and, more importantly, lets the tailer hold or ease a heavy load with friction. Lead the line onto the lower part of the drum in the direction the winch is designed to turn, then add only the wraps needed for control. A wrong lead or wrap direction may not grip correctly; too few wraps can slip, while excess or crossed wraps can jam.' },
    { kind: 'text', text: 'On a self-tailing winch, the line leaves the top wrap and enters the self-tailing jaws so the winch can hold the tail while it is cranked. The jaws are not a reason to ignore the line. Watch the wraps, keep hands away from the drum, and remove the handle when it is not being used.' },
    { kind: 'definition', term: 'Clutch', text: 'A lever-operated line holder, often mounted ahead of a winch. It can hold a halyard or control line after tensioning. Load and release it according to the boat’s hardware; some loads should first be taken on the winch.' },
    { kind: 'heading', text: 'Which control moves what?' },
    { kind: 'list', items: [
      'Halyards raise and lower sails and affect tension along the luff once the sail is set.',
      'Sheets pull a sail in or let it out. Headsail sheets control the jib or genoa; the mainsheet controls the boom and mainsail.',
      'The traveler moves the mainsheet’s lower attachment side to side, changing the boom’s position and mainsail power with less change in sheet tension.',
      'Other controls—such as an outhaul, vang, or headsail lead—adjust particular parts of sail shape. Their layout and safe operating limits vary by boat.',
    ] },
    { kind: 'callout', tone: 'note', title: 'Trace before you pull', text: 'On an unfamiliar boat, follow each line from its working end to the sail or fitting it controls. Confirm its fair lead, clutch, cleat, and winch before adding load.' },
  ],
};
