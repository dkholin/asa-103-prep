import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'sails-trim-reefing-reducing-sail', moduleId: 'sails-trim', order: 6,
  title: 'Reefing & Reducing Sail',
  intro: 'Reduce sail while the boat and crew are still comfortably under control, not after the maneuver has become urgent.',
  concepts: ['sail-area-selection', 'roller-furling', 'reefing'],
  blocks: [
    { kind: 'heading', text: 'Match area to the conditions' },
    { kind: 'text', text: 'Wind pressure rises quickly as wind strength increases. Plan for gusts and sea state as well as the sustained forecast, then keep comparing the forecast with what is actually happening. A conservative sail plan leaves room to respond before the boat is overpowered.' },
    { kind: 'figure', assetId: 'custom-sail-wind-strength', caption: 'A reduced sail plan helps keep the boat balanced as wind strength increases.' },
    { kind: 'text', text: 'Repeated heavy heel, strong weather helm, frequent rounding up, poor speed for the effort, and crew or gear no longer staying secure can all mean the boat is carrying too much sail. Easing a sheet or traveler may handle a brief gust. If the problem continues, reduce sail area.' },
    { kind: 'callout', tone: 'warning', title: 'Reef early', text: 'The best time to reef is while the thought still feels optional. Waiting until control is poor makes every line load, deck movement, and crew task harder.' },
    { kind: 'heading', text: 'Reefing the mainsail' },
    { kind: 'figure', assetId: 'custom-reefed-mainsail', caption: 'A reef lowers the working head of the mainsail and reduces exposed sail area.' },
    { kind: 'text', text: 'A reef reduces mainsail area by securing a lower portion of the sail and establishing new working corners. The sail must remain supported at the tack and clew and tensioned well enough to avoid uncontrolled flogging. The exact sequence—traditional slab reefing, in-mast furling, in-boom furling, or another system—is boat-specific.' },
    { kind: 'list', items: [
      'Brief the crew, choose sea room and a manageable heading, and keep steering control throughout.',
      'Unload the sail only as much as the system requires; control the halyard and reefing lines rather than letting them run.',
      'Secure and tension the new reef points using the boat’s marked controls and written procedure.',
      'Retrim, check that no line or sail is chafing or fouled, and reassess balance before declaring the maneuver complete.',
    ] },
    { kind: 'heading', text: 'Reducing the headsail' },
    { kind: 'figure', assetId: 'photo-furled-headsail', caption: 'Roller-furling gear controls a headsail around the headstay; identify the drum, furling line, and sheet leads on the boat you sail.' },
    { kind: 'text', text: 'A roller-furling system can roll the headsail away or expose less area. Keep slight opposing tension between the sheet and furling line so the sail rolls smoothly, and keep fingers, loose clothing, and extra wraps clear of the drum and winch. A partly furled sail usually changes shape as well as area, so expect to retrim and reassess balance.' },
    { kind: 'callout', tone: 'note', title: 'Know this boat’s system', text: 'Reefing and furling hardware, limits, and safe load paths vary. Practice in moderate conditions and follow the vessel’s procedure; never force a jammed control with more winch power.' },
  ],
};
