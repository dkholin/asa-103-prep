import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'motoring-before-getting-under-way',
  moduleId: 'motoring',
  order: 1,
  title: 'Before Getting Under Way',
  intro: 'Settle the boat and the crew while there is still time and space to correct a problem.',
  concepts: ['pre-departure-checks', 'crew-briefing', 'stowage'],
  blocks: [
    { kind: 'text', text: 'Departure is a maneuver, not the time to discover a loose cabin sole, an unreachable PFD, or a line that was never assigned. A short, repeatable readiness check protects the quiet margin you have at the dock.' },
    { kind: 'heading', text: 'Make the boat ready' },
    {
      kind: 'list',
      items: [
        'Check the current weather and the plan, then confirm enough fuel and basic engine readiness for the outing.',
        'Verify required safety gear is aboard, serviceable, and reachable. Confirm each person has an appropriate PFD and knows where it is; wear it whenever conditions or the skipper call for it.',
        'Secure loose gear below and on deck. Latch lockers, keep heavy items low, and clear anything that could fall, jam access, or become a trip hazard.',
        'Scan the deck and rig at a practical level: obvious damage, fouled running rigging, unsecured hatches, and anything near the propeller or over the side.',
      ],
    },
    { kind: 'heading', text: 'Brief the crew' },
    { kind: 'text', text: 'Keep the briefing proportionate to the trip and the crew. Point out PFDs and key safety gear, give the essentials of the person-overboard response, and assign departure jobs. Name who handles each line and fender, who watches traffic, and who gives the final call. Remind line handlers to keep hands and feet out of pinch points and never wrap a line around a hand.' },
    { kind: 'heading', text: 'Stage the departure' },
    {
      kind: 'list',
      ordered: true,
      items: [
        'Place fenders where the hull needs protection and lead dock lines so they can be released without snagging.',
        'Start and check the engine before committing to leave; the next lesson covers that routine.',
        'Look around the slip, agree on the sequence, and release only the lines the skipper calls for.',
        'Once clear in open water, bring fenders aboard and coil and stow the dock lines so the deck is safe and the gear is ready for the next landing.',
      ],
    },
    { kind: 'callout', tone: 'note', title: 'The point of preparation', text: 'Do the work that can be done at rest before wind, current, traffic, and momentum begin competing for attention. A missed item is easier to fix with the boat still secured.' },
  ],
};
