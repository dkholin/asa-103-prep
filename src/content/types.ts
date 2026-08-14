export type TopicId = 'nav-lights' | 'right-of-way' | 'sound-signals';

export interface Choice {
  id: string;
  text: string;
  /** Optional note shown when the user picked this (wrong) choice. */
  whyWrong?: string;
}

export interface Question {
  id: string;
  topic: TopicId;
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
