import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'sails-trim-trim-by-point-of-sail', moduleId: 'sails-trim', order: 5,
  title: 'Trim by Point of Sail',
  intro: 'As apparent wind moves aft, sails generally move outward—but the correct position comes from the sail and boat, not a memorized mark.',
  concepts: ['trim-by-point-of-sail'],
  blocks: [
    { kind: 'heading', text: 'One progression, not five fixed settings' },
    { kind: 'text', text: 'A point of sail describes the boat’s heading relative to the wind. Close to the wind, sails must stay nearer the centerline. As the boat bears away and the apparent wind moves aft, sheets are eased and the sails move progressively outward. Wind strength, waves, sail type, and rig geometry change the exact position.' },
    { kind: 'figure', assetId: 'custom-trim-by-point-of-sail', caption: 'With one consistent true-wind-flow reference, the boats bear away and their sails move progressively outward. Exact sheet angles vary.' },
    { kind: 'table', caption: 'Starting trim by point of sail', headers: ['Point of sail', 'Starting picture', 'What to watch'], rows: [
      ['Close-hauled', 'Sails trimmed closest to the centerline', 'Luff and telltales; pointing with steady flow'],
      ['Close reach', 'Sails eased slightly from close-hauled', 'Keep flow attached without carrying unnecessary sheet tension'],
      ['Beam reach', 'Sails farther out, roughly matching wind across the beam', 'Ease to the edge of luffing, then trim just enough'],
      ['Broad reach', 'Sails well eased as wind moves aft', 'Boom clearance, upper-sail twist, and gybe risk'],
      ['Running', 'Sails near their practical outward limit', 'Boom restraint, unstable airflow, and accidental gybe risk'],
    ] },
    { kind: 'heading', text: 'Use feedback instead of sheet marks' },
    { kind: 'text', text: 'After turning away from the wind, ease the sheet until the luff just begins to flutter, then trim in only enough to make it steady. After turning toward the wind, trim as needed to maintain flow. Telltales, when fitted, add detail: streaming telltales generally indicate attached flow, while a lifting or stalled telltale points to a needed course or trim correction.' },
    { kind: 'callout', tone: 'note', title: 'Avoid the quiet-sail trap', text: 'A sail can be over-trimmed without luffing. If it is held farther in than the course requires, the boat may heel more, develop heavier helm, and slow. Ease experimentally and judge the boat’s response.' },
    { kind: 'heading', text: 'Broad reach and run awareness' },
    { kind: 'text', text: 'As the boom moves out, its sweep crosses more of the cockpit and the mainsheet spans a larger working area. Keep people and gear clear. Near a run, small heading or wind shifts can move the apparent wind across the stern and drive the boom violently to the other side in an accidental gybe.' },
    { kind: 'callout', tone: 'warning', title: 'Control the downwind side', text: 'Maintain a deliberate course, watch wind indicators and the boom, and use the boat’s approved preventer or other boom-control procedure when appropriate. Do not improvise a restraint without understanding its loads and release.' },
  ],
};
