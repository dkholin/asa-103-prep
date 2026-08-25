import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'motoring-controls-instruments',
  moduleId: 'motoring',
  order: 3,
  title: 'Controls & Instruments',
  intro: 'Use the lever deliberately and learn what “normal” looks and sounds like on this boat.',
  concepts: ['engine-controls', 'engine-instruments'],
  blocks: [
    { kind: 'text', text: 'Many cruising boats combine shift and throttle in one lever. The center detent is neutral. Moving past the forward or reverse detent engages the transmission; moving farther increases engine speed. Some controls have a separate neutral-throttle function for starting or warm-up, so learn the exact control before using it.' },
    { kind: 'figure', assetId: 'custom-engine-panel-throttle', caption: 'A typical engine station separates the instrument panel from a single-lever shift/throttle control. Layouts vary.' },
    { kind: 'callout', tone: 'note', title: 'Pause in neutral', text: 'At low engine speed, move firmly into neutral, allow the transmission and propeller to stop loading, then select the other gear. Avoid slamming directly from forward to reverse or shifting at excessive rpm.' },
    { kind: 'heading', text: 'The panel at a glance' },
    {
      kind: 'table',
      caption: 'Not every panel has every gauge; some use warning lamps or a digital display.',
      headers: ['Indication', 'What it tells the operator'],
      rows: [
        ['Tachometer', 'Engine speed in rpm; use it to set a repeatable operating speed and avoid exceeding the engine’s rated range.'],
        ['Temperature', 'Coolant temperature or a high-temperature warning. A rising or alarm-level reading can mean the engine is overheating.'],
        ['Oil pressure', 'Lubricating-oil pressure or a low-pressure warning. Low pressure while running can quickly damage the engine.'],
        ['Charging', 'Whether the alternator is charging. A warning may indicate a charging-system or drive-belt problem.'],
      ],
    },
    { kind: 'text', text: 'Before leaving, observe the normal start-up sequence: which lamps and buzzer test with the panel on, which clear after the engine starts, and the usual idle readings. Scan again while motoring. A change from the boat’s normal pattern is often the first useful clue.' },
    { kind: 'callout', tone: 'warning', title: 'An alarm is a prompt to act', text: 'Reduce load and follow the boat’s procedure. For low oil pressure, high temperature, loss of cooling water, or another potentially damaging condition, stop the engine as soon as it is safe to do so. Do not silence a buzzer and continue without identifying the warning.' },
  ],
};
