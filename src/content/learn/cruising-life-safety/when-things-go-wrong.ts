import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'cruising-life-safety-when-things-go-wrong',
  moduleId: 'cruising-life-safety',
  order: 6,
  title: 'Fire, Flooding & Calling for Help',
  intro:
    'Fire and flooding both give a crew very little time, so the response has to be decided before it is needed rather than worked out on the spot.',
  concepts: ['fire-and-flooding-response', 'distress-communications', 'crew-injury-response'],
  blocks: [
    { kind: 'heading', text: 'Why these three sit together' },
    {
      kind: 'text',
      text: 'A fire, a serious leak and a badly injured crew member have almost nothing in common except the two things that matter: each takes a boat from normal to critical in minutes, and each goes far better for a crew who decided what to do while it was still hypothetical. What follows is the shape of the decision rather than a procedure to recite, so that on the day you are choosing between options you have already thought about.',
    },
    { kind: 'heading', text: 'Fire: classes and agents' },
    {
      kind: 'text',
      text: 'Fires are classified by what is burning, and the classification decides what you can safely put on them. Three classes matter aboard.',
    },
    {
      kind: 'table',
      caption: 'The marine classification. The right-hand column is the reason the letters are worth knowing.',
      headers: ['Class', 'What is burning', 'Why it matters'],
      rows: [
        [
          'A',
          'Ordinary combustibles — cushions, bedding, timber, paper, cloth',
          'Water works well on these, and there is a lot of water outside',
        ],
        [
          'B',
          'Flammable liquids — gasoline, diesel, lubricating oil, cooking oil',
          'Water spreads them. Burning liquid floats on water and goes wherever the water goes',
        ],
        [
          'C',
          'Energised electrical equipment — a panel, a loom, a motor',
          'Water conducts. The agent must be non-conductive, and the first fix is to remove the power',
        ],
      ],
    },
    {
      kind: 'text',
      text: 'Nearly every fire a cruising boat is likely to have is Class B or C: fuel, oil or wiring. That is why marine extinguishers carry a B rating, and why the reflex of throwing a bucket of seawater at a fire is a bad one aboard.',
    },
    {
      kind: 'figure',
      assetId: 'photo-fire-extinguisher-use',
      caption:
        'Discharging a hand-portable extinguisher in a training exercise. Note where the operator is aiming: at the base of the flames, from a stand-off distance, sweeping across — not into the middle of the fire, which achieves nothing.',
    },
    {
      kind: 'text',
      text: 'Aim low and sweep. Stand far enough back that the discharge does not blast burning liquid out of its container, and keep your exit behind you rather than putting the fire between you and the companionway.',
    },
    { kind: 'heading', text: 'The first thirty seconds' },
    {
      kind: 'text',
      text: 'Whatever is burning, the same three things want doing at once, and any crew member can start them.',
    },
    {
      kind: 'list',
      ordered: true,
      items: [
        'Shout. Everyone aboard needs to know now, not when the smoke reaches them.',
        'Cut the fuel and the heat. Gas off at the cylinder, engine and fuel supply shut down, the electrical source isolated — whichever applies to what is burning.',
        'Get the extinguisher, and get people who are not fighting it clear of the smoke and into life jackets.',
      ],
    },
    {
      kind: 'text',
      text: 'A galley fire is the common case: a pan of cooking oil alight is a Class B fire in a confined space with people around it. Shut off the stove’s fuel if you can reach the control safely, then smother it — a lid dropped on the pan starves it of oxygen and is often quicker and cleaner than an extinguisher — or use a marine-rated extinguisher if it is beyond a lid. Do not pour water on it, and do not pick the pan up: carrying burning oil across a moving cabin is how a contained fire becomes a spread one and a burned crew member.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'An engine-compartment fire wants the hatch kept shut',
      text: 'The instinct is to throw the hatch open and see what is happening. Do not. That admits a rush of air to a fire that has been running short of it and can produce a violent flare-up in your face. Shut the engine down and close the fuel supply, keep the compartment closed so the fire stays starved, and discharge the extinguisher through an existing fire port or the smallest opening that will admit the nozzle. Then keep it closed and keep watching it — hot metal re-ignites.',
    },
    {
      kind: 'text',
      text: 'And there is a point at which fighting stops being the right activity. If the fire is plainly outpacing the extinguishers aboard, the priority shifts completely: everyone in life jackets, clear of the smoke and up on deck, a distress call out with the boat’s position, and preparations to abandon. The mistake is not calling too early — it is spending the last of the time on the fire and then calling for help from a boat nobody can reach in time.',
    },
    { kind: 'heading', text: 'Flooding' },
    {
      kind: 'text',
      text: 'Water in the bilge that is sloshing, and was not there an hour ago, is a problem until proved otherwise. It is not condensation. The first job is not to pump but to find where it is coming from, because until the inflow stops, pumping is a race you may not be winning.',
    },
    {
      kind: 'list',
      items: [
        'Get the crew safe and into life jackets while somebody looks — a boat that may be sinking is not the place to be casual about flotation.',
        'Look at the through-hulls and their hoses first. A failed hose, a hose that has come off its barb, or a corroded fitting is the most common source and the easiest to stop.',
        'Then the stuffing box, the rudder stock, the cockpit drains, and anything that penetrates the hull below the waterline.',
        'Start the pumps, and keep somebody on the manual pump. Pumping buys you the time to work on the source; it is not the solution.',
      ],
    },
    {
      kind: 'figure',
      assetId: 'custom-flooding-seacock',
      caption:
        'A below-waterline through-hull with water spraying in past a clamp that has let go, and beside it the two things a boat carries for exactly this: a tapered softwood bung and a bucket. The pressure at the fitting is a function of depth, so a small hole low down delivers a great deal of water.',
    },
    {
      kind: 'text',
      text: 'At a through-hull, the fastest fix is almost always to close the seacock, which stops the flow at its source and takes seconds if you can reach it — which is why seacocks want exercising rather than leaving to seize, and why everyone aboard should have been shown where they are. If one cannot be reached or closed, or the fitting itself has failed, the softwood plug is what you have: drive the tapered bung in with the hammer stowed beside it. That is why plugs are tied next to the fittings they match rather than kept in a drawer.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'The pumps are damage control, not a solution',
      text: 'A bilge pump has a fixed capacity, and its rated output is measured under conditions your boat is not in — no head, no hose, a fresh battery. A hole of modest size below the waterline will out-produce it comfortably. Pumps buy time to stop the water. If they are not gaining and the source is not controlled, call for help while you still have freeboard and a working radio, not after.',
    },
    { kind: 'heading', text: 'Calling for help' },
    {
      kind: 'text',
      text: 'VHF Channel 16 is the international distress, safety and calling channel, monitored by the Coast Guard and by every vessel within range with a radio on. That last part is what makes it valuable: a call on 16 may be answered by a boat two miles away long before a rescue unit could arrive. A recreational boat need not carry VHF at all, but one that has a set should keep a listening watch on 16 when under way and not otherwise using it.',
    },
    {
      kind: 'definition',
      term: 'MAYDAY',
      text: 'The spoken distress signal, reserved for grave and imminent danger to a vessel or a person requiring immediate assistance — sinking, fire, a person overboard in danger of dying, a life-threatening injury. Below it, PAN-PAN signals urgency without immediate danger to life. Using MAYDAY for anything less is a serious matter; hesitating to use it when it applies is worse.',
    },
    {
      kind: 'text',
      text: 'A distress call is the one place where normal radio etiquette is set aside. You do not wait for a gap, you do not call a specific station, and you do not move to a working channel. You transmit on 16, slowly and clearly, because the person writing it down has only what they hear.',
    },
    {
      kind: 'list',
      ordered: true,
      items: [
        '"MAYDAY, MAYDAY, MAYDAY."',
        '"This is" — then the vessel’s name three times, and her call sign or registration number once.',
        '"MAYDAY" and the vessel’s name once more.',
        'Your position — latitude and longitude, or a bearing and distance from something a responder can find. This is the single most important line in the call.',
        'The nature of the distress: what is happening to the boat.',
        'What assistance you need.',
        'How many people are aboard, and the condition of anyone injured.',
        'Anything else useful — the boat’s description, course and speed, what you are doing about it.',
      ],
    },
    {
      kind: 'text',
      text: 'Then release the transmit key and listen. If nobody answers, repeat the call, and keep a watch on 16 for as long as you have the boat and the power, because the units coming to find you will be trying to talk to you. If the boat carries DSC connected to a position source, the red distress button sends your identity and position digitally in a moment — but it does not replace the voice call that says what is actually wrong.',
    },
    {
      kind: 'callout',
      tone: 'note',
      title: 'Position first, always',
      text: 'If a call is going to be cut short — by the batteries, by the water, by losing the antenna — the piece of it that matters most is where you are. Read the position before you press the key rather than hunting for it mid-transmission, and get it out early.',
    },
    { kind: 'heading', text: 'A crew member is hurt' },
    {
      kind: 'text',
      text: 'The instinct when somebody is injured is to go straight to them. Under sail, that instinct produces the second casualty. The first move is to make the platform safe: ease sheets, reduce sail, take the way off, and make sure the boat is not about to gybe or broach while everyone’s attention is elsewhere. It takes half a minute and it is what makes the next twenty possible.',
    },
    {
      kind: 'list',
      ordered: true,
      items: [
        'Make the boat and the rest of the crew safe — settle the motion, secure the helm, get people clipped or seated.',
        'Stop major bleeding. Direct pressure, and keep it on.',
        'Check airway and breathing, and keep checking.',
        'Call for help early if the injury is serious — advice on the radio is free, and a rescue that is already moving is worth a great deal.',
        'Then use the first-aid kit and the manual, keep the casualty warm and still, and head for where help is.',
      ],
    },
    {
      kind: 'text',
      text: 'That is deliberately as far as this goes. Marine first aid is a course of its own and worth taking; what belongs here is the ordering — boat first, bleeding and breathing next, radio early, treatment with what you actually have aboard.',
    },
    {
      kind: 'callout',
      tone: 'note',
      title: 'What is not in this lesson',
      text: 'Recovering a person from the water, cold-water immersion and hypothermia, running aground, an anchor that will not hold and a steering failure are all handled in Hands-On Cruising, where there is room to work through the manoeuvres properly. They are emergencies, but they are boat-handling emergencies, and they are taught with a hand on the tiller.',
    },
  ],
};
