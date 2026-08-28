import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'hands-on-cruising-setting-watching-weighing',
  moduleId: 'hands-on-cruising',
  order: 3,
  title: 'Setting, Watching & Weighing',
  intro:
    'Anchoring is a sequence carried out by two people who cannot easily hear each other, and it is not finished when the anchor lands on the bottom.',
  concepts: ['setting-and-weighing-anchor', 'anchor-watch-and-dragging'],
  blocks: [
    { kind: 'heading', text: 'Two people, thirty feet apart, with the engine running' },
    {
      kind: 'text',
      text: 'Everything in this lesson is a two-station job. Somebody is at the helm, watching depth and position and working the throttle; somebody else is on the foredeck, handling gear they cannot let go of and looking at a bow the helm cannot see past. Between them is the length of the boat, an engine, and often a wind that removes the top half of every sentence.',
    },
    {
      kind: 'text',
      text: 'So agree on hand signals before you need them, not while it is going wrong. They do not have to be anybody’s official set — they have to be the same in both heads. At a minimum you want a way to say which direction the anchor lies, how far off it is, stop, go slow ahead, go slow astern, and it is made fast. Point with your whole arm; a hand held near the body is invisible from aft.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'The foredeck is the dangerous end',
      text: 'Chain and rope under load are unforgiving, and the specific thing to be frightened of is the bight. A rode flaked or coiled on deck is a set of open loops, and every one of them will close hard the moment the rode runs — with whatever happens to be inside it. So keep your feet outside the loops, not merely near them. The same reasoning covers the rest of the foredeck: fingers away from the bow roller and from the gypsy, hands off a windlass while it is turning, and nothing of yours anywhere the rode could trap it against something solid.',
    },
    { kind: 'heading', text: 'Getting ready before you get there' },
    {
      kind: 'text',
      text: 'The unhurried anchoring is the one where everything was prepared while there was still nothing to do. Whatever is currently stopping the anchor from moving — a strap, a pin, a bit of line somebody added after it rattled once — needs to be off, so that lowering it is a single unhurried action rather than a search. If the rode is rope, lay it out on deck in loose figures that will pull away cleanly instead of tightening on themselves. And confirm the far end of it is attached to the boat: it is the one check nobody makes twice, and the day it has not been done you lose the lot over the bow.',
    },
    {
      kind: 'text',
      text: 'Work out your rode length now, too, from the depth you expect at high water rather than the depth you can see. You also need some way of knowing how much has gone over the bow once it starts running, because nobody can judge it by eye. Many rodes come with markings already; if yours has none, put your own on, or at least establish a repeatable arm-span or boat-length measure the foredeck can count out loud.',
    },
    { kind: 'heading', text: 'Putting it down' },
    {
      kind: 'text',
      text: 'The order surprises people the first time. You do not steer to where the anchor should go — you steer to where the boat should end up, then place the anchor so that she ends up there. Since a boat at anchor lies downwind of her gear, that means motoring upwind of your chosen spot by about the length of rode you intend to use, and dropping there.',
    },
    {
      kind: 'list',
      ordered: true,
      items: [
        'Motor slowly through the anchorage first, watching the depth and confirming there is room to swing.',
        'Come up to your drop position and take all the way off the boat. Stopped means stopped — an anchor lowered while still moving lands in a heap or gets dragged before it can bite.',
        'Lower the anchor to the bottom rather than throwing it, and let the rode go out under control as the wind takes the bow and the boat falls back.',
        'Keep paying out as she drifts, snubbing occasionally, until the planned scope is out. Piling rode on top of the anchor is the one thing that reliably stops it setting.',
      ],
    },
    { kind: 'heading', text: 'Setting it, and knowing that it set' },
    {
      kind: 'text',
      text: 'An anchor lying on the bottom is not an anchor that is holding, and the difference matters most on the night you find out. Setting means deliberately dragging it a short distance under a controlled load so it digs in, and then proving to yourself that it has.',
    },
    {
      kind: 'text',
      text: 'With the rode made fast and the boat lying back on it, put the engine gently astern and let the load build slowly. Gradually is the operative word: a sudden hard pull on an anchor that has not yet buried will simply skate it across the bottom, and it shock-loads the rode and deck fittings as a bonus. Increase to a firm, steady pull, then hold it.',
    },
    {
      kind: 'text',
      text: 'Now look for evidence rather than hoping, and take it from three places. The rode itself: it should come up hard and stay hard, and a hand laid on it should feel dead. Vibration travelling up it means the anchor is still bumping along rather than buried. The boat: with the load on she should end up pointing at her own anchor and sitting there. And best of all, something outside the boat — line up any two fixed objects ashore that happen to overlap and keep your eye on them while the engine pulls. Two things that stay locked together mean you are not moving; two that come apart mean you are, regardless of what the rode felt like.',
    },
    {
      kind: 'callout',
      tone: 'note',
      title: 'It is normal for it not to work first time',
      text: 'Anchors fail to set for ordinary reasons: a patch of weed, an old bit of debris, a harder bottom than the chart suggested. The right response is unglamorous — haul it back up, look at what came up with it, move a little, and do it again. Anchoring is one of the places where a second attempt costs ten minutes and skipping it can cost the boat.',
    },
    { kind: 'heading', text: 'Anchor watch' },
    {
      kind: 'text',
      text: 'A set anchor is not a permanent arrangement. Wind shifts, the tide turns and pulls from a new direction, a squall arrives — and the anchor that was well dug in for one direction of pull has to bite again in another. Keeping an anchor watch is the habit of periodically confirming that the boat is still where she was.',
    },
    {
      kind: 'text',
      text: 'The most reliable low-tech method is the one you just used to set the anchor. When you are settled, find transits on both sides of the boat and remember them. Checking takes three seconds and needs no instrument, no power and no night vision. A GPS anchor alarm does the same job while you sleep and is worth setting, but give it a radius that reflects your real swing circle, or it will either cry wolf all night or let you drift a long way before it notices. Depth is a useful third check: a boat that has wandered off into deeper or shallower water has usually moved for a reason.',
    },
    {
      kind: 'text',
      text: 'What you are really distinguishing is movement that returns from movement that accumulates. A boat lying to her anchor is hardly ever still: in any breeze she ranges about, wandering out to one side until the rode gathers her up, drifting across to the other, and doing it again — all of it around an anchor that has not shifted at all. That is ordinary, and worth watching on your own boat on a quiet evening, because it gives you a baseline to judge against. Dragging is a different kind of motion, not a larger amount of the same one: the whole pattern relocates downwind. Transits that had been opening and closing again start opening and staying open.',
    },
    {
      kind: 'figure',
      assetId: 'custom-dragging-anchor',
      caption:
        'Two shore marks that lined up when the anchor was set, and a boat now well outside the swing limit with those marks no longer in line. Fixed objects do not move, so a transit that has opened and stayed open means the boat has travelled — and if the boat has travelled beyond her swing, the anchor has travelled too.',
    },
    { kind: 'heading', text: 'When it is dragging' },
    {
      kind: 'text',
      text: 'Deal with it now, at whatever hour it is. A dragging anchor does not reset itself while you think about it, and the room between you and whatever is downwind is being spent.',
    },
    {
      kind: 'text',
      text: 'Get the engine on and motor gently up toward the anchor to take the strain out of the rode. That one action buys back everything else: she stops being an object being blown somewhere and becomes a boat under command, and every decision after it is made from a position of control rather than from behind.',
    },
    {
      kind: 'text',
      text: 'What you decide next is governed by one number — how much water is left between you and whatever is downwind. With room to spare, more rode is worth trying, since the extra scope may be all the anchor needs to take hold again. Without it, or if it has already been given that chance and refused, stop negotiating with the anchor: recover it and start again, and use the opportunity to pick somewhere with better holding rather than resetting in the spot that has already failed you. Concluding that the anchorage itself was the mistake, and going elsewhere at two in the morning, is a legitimate outcome and not a defeat.',
    },
    {
      kind: 'text',
      text: 'Watch other people’s boats as well as your own, particularly any anchored upwind of you. Their dragging becomes your emergency with very little notice.',
    },
    { kind: 'heading', text: 'Weighing anchor' },
    {
      kind: 'text',
      text: 'Recovering runs the sequence backwards. Before the engine turns, walk the side decks and look at the water: a ladder left down, a dinghy painter, a stray sheet end, anything at all hanging over. In a moment there will be a propeller turning under all of it. Then start up. The foredeck crew points continuously at where the rode leads; the helm drives slowly in that direction in short bursts, and the crew takes in the slack that appears. Nobody is hauling the boat anywhere — the engine moves the boat, the crew simply recovers what the engine has given them.',
    },
    {
      kind: 'text',
      text: 'When the rode is up and down — vertical, anchor directly beneath the bow — make it fast and let the boat’s own weight and a gentle nudge ahead break the anchor out. Pulling an anchor out from a distance, at a low angle, is enormously harder and puts great strain on everything. Once it is free you need just enough way on to keep the rudder answering while the crew finishes recovering it, and the last few feet want doing gently: an anchor swinging on a short rode beside the topsides will find the gelcoat.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'What a windlass is not for',
      text: 'A windlass is built to lift the anchor and rode, not to winch the boat forward against wind, sea and a buried anchor. Manufacturers say so explicitly — both Lewmar and Maxwell direct the operator to motor up to the anchor while the windlass takes up the slack, and Maxwell adds that a fouled anchor should be broken out with the engine while the load is held on a chain stopper, never with the windlass motor. Used the other way it overheats, and it strains its own deck mounting. Details differ between makes, so read the instructions for the unit on the boat you are actually on.',
    },
  ],
};
