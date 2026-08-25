import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'motoring-outboards-fueling-etiquette',
  moduleId: 'motoring',
  order: 7,
  title: 'Outboards, Fueling & Motoring Etiquette',
  intro: 'A few outboard-specific habits, a disciplined fueling routine, and considerate speed protect people and boats.',
  concepts: ['outboard-motors', 'fueling-safety', 'motoring-etiquette'],
  blocks: [
    { kind: 'heading', text: 'Outboard operator basics' },
    {
      kind: 'list',
      items: [
        'Confirm neutral before starting. Learn the control’s neutral detent and any separate fast-idle or neutral-throttle feature before leaving the dock.',
        'Attach the engine-cutoff-switch link when the installation and operating conditions call for it. Its purpose is to stop propulsion if the operator is displaced from the helm; on covered U.S. recreational boats, federal law requires use while operating on plane or above displacement speed.',
        'After starting, confirm the cooling-water telltale or other manufacturer-specified cooling indication. A weak or missing stream calls for prompt investigation, not more throttle.',
        'Use tilt to raise the lower unit for trailering, shallow water, or clearance only as the manual permits. Where fitted, trim adjusts the running angle. Before applying power, make sure the water intakes remain submerged and the propeller has clearance.',
        'Shift at low engine speed. Pause in neutral before selecting the opposite gear, and avoid shifting from forward to reverse at excessive rpm.',
        'Where the whole motor steers, turning it aims the propeller stream itself instead of deflecting flow past a fixed rudder. The stern is pushed away from the side the stream is thrown toward, so the same motor angle swings the stern one way in forward and the opposite way in reverse. Learn that difference in open water before relying on it alongside a dock.',
      ],
    },
    { kind: 'callout', tone: 'note', title: 'The outboard manual matters', text: 'Control layout, starting steps, telltale location, trim range, flushing, and alarm responses differ by model. Generic habits never replace the engine’s own operating instructions.' },
    { kind: 'heading', text: 'Fuel without creating an ignition or spill hazard' },
    {
      kind: 'list',
      ordered: true,
      items: [
        'Secure at the fuel dock. Stop the engine and extinguish smoking materials and open flames. Turn off electrical equipment that could create a spark.',
        'Send passengers ashore if the facility requires it, close openings that could admit vapor, identify the correct deck fill, and keep an absorbent pad ready. Hold the nozzle in contact with the fill and do not top off.',
        'If fuel spills, stop immediately. Do not wash it into the water or hide a sheen with detergent; follow the marina and authority response procedure. A discharge that creates a visible sheen on U.S. waters is federally reportable.',
        'Replace the cap, wipe up drips, and inspect for leaks or fuel odor. Ventilate enclosed spaces before restoring ignition sources.',
        'For an enclosed gasoline-engine space, operate the blower for at least the posted or manufacturer-specified time and check the bilge for vapor before starting. This extra vapor-clearing step is not the diesel routine.',
      ],
    },
    { kind: 'figure', assetId: 'custom-fueling-gas-diesel', caption: 'Gasoline vapor in an enclosed engine space requires powered ventilation and a vapor check before restart; diesel does not use that gasoline-specific blower step.' },
    { kind: 'heading', text: 'Leave a small wake and a clear intention' },
    { kind: 'text', text: 'Obey posted speed and no-wake restrictions, and slow before entering a marina, fairway, mooring field, or other confined area. Reduce wake near docks and anchored or moored boats even when no sign provides the reminder. A wake travels after the boat has passed and can throw people, strain lines, and damage property.' },
    { kind: 'text', text: 'Operate predictably: keep a proper lookout, use a safe speed, make early course changes, and give others room. Considerate motoring is not a special marina right-of-way system; the navigation rules and local restrictions still apply. Note the status those rules assign: a sailboat being propelled by its engine is a power-driven vessel rather than a sailing vessel, and that remains true with the sails still set.' },
  ],
};
