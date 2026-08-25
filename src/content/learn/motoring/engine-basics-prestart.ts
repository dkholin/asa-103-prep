import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'motoring-engine-basics-prestart',
  moduleId: 'motoring',
  order: 2,
  title: 'Engine Basics & Pre-Start Checks',
  intro: 'Know the installation in front of you, inspect before it runs, and verify cooling as soon as it starts.',
  concepts: [
    'auxiliary-engine-types',
    'pre-departure-engine-checks',
    'engine-starting-procedure',
    'cooling-water-check',
    'blower-ventilation',
  ],
  blocks: [
    { kind: 'text', text: 'A sailboat’s auxiliary engine provides control when sail power is unavailable or unsuitable: leaving and entering a harbor, maneuvering in close quarters, or maintaining safety when conditions change. It may be an outboard on the transom or an inboard driving a shaft or sail-drive leg. The arrangement changes what you inspect and where you look.' },
    { kind: 'figure', assetId: 'photo-outboard-engine', caption: 'Outboards mount outside the hull; an inboard installation puts the engine inside and drives a separate underwater propeller.' },
    { kind: 'callout', tone: 'note', title: 'The manual controls', text: 'This is a generic operating pattern, not a universal checklist. Use the boat’s posted procedure and the engine manufacturer’s manual for valve positions, preheating, starting limits, alarms, and shutdown.' },
    { kind: 'heading', text: 'Look, smell, and check' },
    {
      kind: 'list',
      items: [
        'Open the inboard compartment before starting. Look for fresh fuel, oil, coolant, or water; loose or damaged belts; unsecured clamps or wiring; and anything that could contact moving parts.',
        'Treat an unfamiliar fuel or burning odor as a stop sign. Find the source rather than starting and hoping it clears.',
        'Check engine oil and, on a freshwater-cooled engine, coolant at the locations and conditions specified by the manual. Confirm the fuel supply is available.',
        'If the engine uses raw water, confirm the intake seacock is open and the strainer appears ready for service. Never run a raw-water-cooled engine with its intake shut.',
      ],
    },
    { kind: 'heading', text: 'Ventilation depends on the fuel system' },
    { kind: 'text', text: 'An enclosed gasoline-engine space can collect explosive vapor low in the bilge. Before starting, operate the powered blower for the posted or manufacturer-specified time and check for gasoline odor. The federal warning label on applicable boats specifies at least four minutes. Diesel engine spaces still need fresh air and an inspection, but the gasoline-vapor blower rule is not a diesel starting step. Outboards are outside the enclosed bilge, so this particular blower procedure does not apply to them.' },
    { kind: 'heading', text: 'A generic start sequence' },
    {
      kind: 'list',
      ordered: true,
      items: [
        'Confirm the shift control is in neutral. An engine may have a neutral-start interlock, but the operator still verifies neutral before touching the starter.',
        'Confirm the required cooling-water intake, fuel supply, battery, and stop controls are in their operating positions.',
        'Turn on the panel and note its normal pre-start indications. Preheat only if the specific engine procedure calls for it.',
        'Start without exceeding the manufacturer’s cranking limit. If it does not start, pause and diagnose instead of grinding the starter continuously.',
        'As soon as it catches, settle at the specified idle and check oil-pressure/charging indications and alarms.',
        'Immediately confirm raw-water discharge at the wet exhaust on an inboard, or the cooling telltale on an outboard. If expected water flow is absent, shut down promptly and investigate.',
      ],
    },
    { kind: 'heading', text: 'Shutting down is a fuel question' },
    { kind: 'text', text: 'A diesel lights its charge with the heat of compression rather than with a spark, so there is no ignition spark to take away when you want it to stop. It keeps running as long as fuel keeps arriving, which is why the installation has a stop control that interrupts fuel delivery, and why turning the key off is not by itself a dependable way to shut the engine down. That stop control is the same one you confirmed in its running position before starting; the boat’s posted procedure and the manufacturer’s manual give its location and the order of steps.' },
    { kind: 'callout', tone: 'warning', title: 'Do not leave the dock on an unexplained warning', text: 'An abnormal smell, leak, alarm, gauge reading, or missing cooling-water flow is information, not an inconvenience. Keep the boat secured and resolve it before relying on the engine.' },
  ],
};
