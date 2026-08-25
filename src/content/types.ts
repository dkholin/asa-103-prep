import type { ConceptId } from './concepts';

export type TopicId =
  | 'nav-lights'
  | 'right-of-way'
  | 'sound-signals'
  | 'flags'
  | 'chart-nav'
  | 'anchoring'
  | 'cruising-systems'
  | 'safety-equipment'
  | 'engine-docking'
  | 'marine-weather'
  | 'sail-trim'
  | 'seamanship-comms'
  | 'emergencies';

export interface Choice {
  id: string;
  text: string;
  /** Optional note shown when the user picked this (wrong) choice. */
  whyWrong?: string;
}

export interface Question {
  id: string;
  topic: TopicId;
  /** Neutral domain tags shared with Learn lessons. */
  concepts?: ConceptId[];
  /** 'visual' questions render the asset above the prompt. */
  format: 'text' | 'visual';
  prompt: string;
  assetId?: string;
  choices: Choice[];
  correctChoiceId: string;
  explanation: string;
  /** Rule / reference the question is drawn from. */
  source: string;
}
