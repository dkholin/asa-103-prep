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
      text: 'Staring down into the compass is tiring, it is slow, and it keeps your eyes inside the boat when they should be outside it. The compass is honest but it lags: by the time the card has settled enough to read, the wander it is reporting is already several seconds old. Worse, a helmsman with their head down is not watching the sails, the water, or the traffic.',
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
      text: 'Changing course is the same discipline with the numbers made explicit. Asked for a new heading, work out which way round is shorter before you touch the wheel — it is easy, mid-turn, to find you are taking the boat the long way round through most of the compass. Then start the turn gently, and begin easing the helm back toward centre well before the new number comes up, so the boat settles onto it rather than swinging through and having to be caught.',
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
      text: 'Transits are the most underrated tool on the boat, and you already use them ashore every time you judge when to turn out of a driveway without clipping the kerb. Afloat they answer questions instantly that would otherwise need chartwork: have I cleared that shoal yet? Am I where I think I am? Am I actually holding this line, or sliding off it?',
    },
    {
      kind: 'text',
      text: 'When two marks are deliberately placed to be used this way — and in dredged channels they often are — the line they define is called a range, and steering to keep them in line keeps you in the channel. Note what that means: on a range you are not steering at your destination at all. If something is pushing you sideways, holding the two marks in line will have the bow pointing off to one side while the boat still travels straight down the line. That is correct, and it is worth getting comfortable with, because it is the same effect that makes the next section work.',
    },
    { kind: 'heading', text: 'Reading sideways drift off a fixed mark' },
    {
      kind: 'text',
      text: 'A boat does not necessarily go where her bow points. Current carries her bodily across the ground, and under sail she also slips sideways through the water — leeway — with the slip greatest when she is close-hauled and well heeled. Neither shows up in the compass, because the heading can be rock steady while the boat quietly crabs off to one side of it.',
    },
    {
      kind: 'text',
      text: 'What does show it is a mark with something behind it. Steer at a buoy, then watch the land beyond it. If that background is sliding one way relative to the buoy, you are being set the other way, and you can correct by aiming a little to the side you are being pushed from until the two stop moving against each other. Anchored buoys give the effect away by themselves, too: one with a visible wake trailing from it is standing still while the water goes past, which tells you there is a current here before it has had a chance to do anything to you.',
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
