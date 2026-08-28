import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'hands-on-cruising-holding-a-course',
  moduleId: 'hands-on-cruising',
  order: 1,
  title: 'Holding a Course',
  intro:
    'Steering a boat is mostly a matter of noticing that she has wandered before anyone else does, and putting her back with a very small movement of the helm.',
  concepts: ['steering-a-course'],
  blocks: [
    { kind: 'heading', text: 'Steering is a correction habit, not a pointing skill' },
    {
      kind: 'text',
      text: 'Beginners tend to imagine steering as aiming: you point the boat somewhere and she goes there. What actually happens is that the boat wanders — a wave nudges the bow, a gust puts her on her ear for a second, the sails load and unload — and the helmsman’s job is to catch each small wander early and undo it. Somebody who steers well is not making better aims than you. They are simply noticing sooner, and doing less about it.',
    },
    {
      kind: 'text',
      text: 'That word "less" is the whole technique. A rudder is a brake as well as a steering device, and a helm swung hard over slows the boat and starts a swing that then has to be stopped. The classic beginner’s wake is a series of S-bends, and every one of them is the same mistake repeated: too much helm, applied too late, held on too long, so the boat sails past the heading and the next correction has to be bigger than the last.',
    },
    {
      kind: 'callout',
      tone: 'note',
      title: 'Undo the correction before it lands',
      text: 'The trick that breaks the S-bend habit is to start straightening the helm while the boat is still swinging back, not when she arrives. A boat carries her turn for a moment after the rudder is centred, so if you wait until the bow is on the mark before centring, you have already overshot. Put a little helm on, take it off early, and let her coast the last few degrees.',
    },
    { kind: 'heading', text: 'Steer at something, not at the compass' },
    {
      kind: 'text',
      text: 'There is a reason experienced helmsmen barely look at the compass. It is a slow instrument: the card is a physical object swinging in fluid, and by the time it has settled enough to give you a number, the wander it is describing happened several seconds ago. You are steering on stale information. It is also tiring in a way that creeps up on you, and it costs you the thing that actually keeps a boat safe, which is a person looking out of it — at the set of the sails, at what the water is doing, at the ferry that has just altered.',
    },
    {
      kind: 'text',
      text: 'So use the horizon as the instrument and the compass as the check. Once you know the heading you want, find something out there that sits on it — a headland, a chimney, a moored buoy, a distant tower — and steer at that. Your eye will register a shift of a degree or two against a fixed object almost instantly, long before any instrument would. Then glance down every so often to confirm the compass still agrees, because the thing you picked may not stay useful.',
    },
    {
      kind: 'list',
      items: [
        'Objects on land are the best marks: they are genuinely fixed and usually sharp-edged.',
        'A cloud is tempting and moves; use one only as a rough steer for a minute or two.',
        'Another vessel is not a mark at all, however conveniently placed.',
        'In poor visibility, or at night with nothing lit ahead, the compass stops being the check and becomes the instrument again.',
      ],
    },
    { kind: 'heading', text: 'Turning onto a heading' },
    {
      kind: 'text',
      text: 'Changing course is the same discipline with the numbers made explicit, plus one decision beforehand. A compass is a circle, so there are always two ways to any new heading, and only one of them is short. Work out which before your hands move — it is a peculiarly annoying discovery, halfway through, that you have committed the boat to going the long way round. After that it is the correction habit again on a larger scale: a modest amount of helm, and centring it early enough that she arrives on the number under her own momentum instead of sweeping past it.',
    },
    {
      kind: 'text',
      text: 'The same applies to the helm itself. Most wheels carry a mark at top dead centre; find it, and use it. Knowing where straight is, by feel, means your corrections start from a known place instead of from wherever your hands happen to have left the wheel.',
    },
    { kind: 'heading', text: 'Transits: the check that needs no arithmetic' },
    {
      kind: 'definition',
      term: 'Transit',
      text: 'Two fixed objects at different distances that appear, from where you are, to line up one behind the other. The moment they are in line, you are somewhere on the line drawn through both of them — no instrument and no calculation required.',
    },
    {
      kind: 'text',
      text: 'Transits are the most underrated tool on the boat, and you have been reading them all your life without giving them a name — it is how you know, walking along a street, that you have drawn level with a turning you cannot see down yet, and how a driver decides they are far enough past a parked car to pull back in. Afloat they answer questions instantly that would otherwise need chartwork: have I cleared that shoal yet? Am I where I think I am? Am I holding this line, or sliding off it?',
    },
    {
      kind: 'text',
      text: 'When two marks are deliberately placed to be used this way — and in dredged channels they often are — the line they define is called a range, and steering to keep them in line keeps you in the channel. Note what that means: on a range you are not steering at your destination at all. If something is pushing you sideways, holding the two marks in line will have the bow pointing off to one side while the boat still travels straight down the line. That is correct, and it is worth getting comfortable with, because it is the same effect that makes the next section work.',
    },
    { kind: 'heading', text: 'Reading sideways drift off a fixed mark' },
    {
      kind: 'text',
      text: 'A boat does not necessarily go where her bow points, and two separate effects push her off it. Current moves the whole body of water she is floating in, carrying her sideways over the ground without her passing through the water at all. Leeway is different: under sail the wind pushes her bodily to leeward as she goes, so she slips crabwise through the water itself. Both are worst when you can least afford them, and neither registers on the compass — the heading sits rock steady while the boat quietly travels somewhere else.',
    },
    {
      kind: 'text',
      text: 'What does show it is a mark with something fixed behind it. Steer at a buoy and watch the land beyond it. Because the buoy is nearer, any sideways movement of the boat swings your line of sight past it faster than past the distant object, so the far mark appears to creep out from behind the buoy — and it creeps out on the side you are being carried toward. Drifting to starboard, you see the background emerge to starboard of the buoy. The correction is to aim up-set: turn a little toward the side the drift is coming from, and hold that until the two stop separating.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'Steering at the mark is not the same as reaching it',
      text: 'Keeping the bow aimed at a buoy in a cross-current does not take you to the buoy — it takes you down-current of it along a curved path, and whatever lies downstream of the buoy is exactly where you are heading. Aim off, hold the marks in line, and let the bow point somewhere other than your destination.',
    },
    {
      kind: 'text',
      text: 'How the compass is built, why magnetic and true headings differ, and how a course gets drawn on a chart in the first place all belong to Navigation Rules & Tools. What matters here is narrower and more physical: pick a heading, hold it with small early corrections, check it against something real outside the boat, and stay alert to the difference between where you are pointing and where you are actually going.',
    },
  ],
};
