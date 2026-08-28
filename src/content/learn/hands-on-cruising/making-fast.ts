import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'hands-on-cruising-making-fast',
  moduleId: 'hands-on-cruising',
  order: 4,
  title: 'Making Fast: Moorings & Dock Lines',
  intro:
    'Once the boat has been brought alongside or up to a mooring, the job that remains is securing her properly and then getting her away again without damage.',
  concepts: ['mooring-and-dock-line-handling'],
  blocks: [
    { kind: 'heading', text: 'Where this lesson starts' },
    {
      kind: 'text',
      text: 'Bringing the boat in — the angle to come at, what wind and current will do on the way, how she behaves under reverse, and when to give up on the attempt and try again — is boat handling under power, and the Motoring module owns all of it. What this lesson owns is the rope-work that runs alongside all of that and outlasts it: getting the boat attached to something, keeping her attached safely for however long she is there, and getting her away again with the crew aboard and the gelcoat intact. Some of that begins before she has stopped — the first line ashore is doing real work during the arrival — but it is line handling throughout, not steering.',
    },
    { kind: 'heading', text: 'One idea underneath all of it' },
    {
      kind: 'text',
      text: 'Everything in this lesson follows from a single limitation: a rope can pull and cannot push. So a line does not hold a boat in place — it removes one direction she is allowed to move in, and the direction it removes is the direction the line runs. That is the whole grammar of tying up a boat, and once you have it you can work out any arrangement you meet rather than memorising diagrams of them.',
    },
    { kind: 'heading', text: 'Moorings' },
    {
      kind: 'definition',
      term: 'Mooring',
      text: 'A permanent anchor — commonly a mushroom or a heavy sinker — with substantial chain running up to a buoy floating on the surface. It is sized to stay put through a season rather than a night, which is why you can lie to one in weather that would have you sitting up watching your own anchor.',
    },
    {
      kind: 'definition',
      term: 'Pendant',
      text: 'The line that connects the mooring to your boat, pronounced (and often spelled) "pennant". Some moorings come with one; on others there is nothing but a ring on top of the buoy, and the line is yours to provide.',
    },
    {
      kind: 'text',
      text: 'What makes a strange mooring awkward is that its fittings are not standardised and you cannot see most of them until you are on top of it. The useful way to think about the variants is by how far your crew has to reach. Best case, something is standing proud of the water — a wand, or a small float on a light line — which the crew can take hold of at arm’s length and which the helm can still see during the last few boat-lengths. Worst case there is nothing above the surface at all, and the pendant hangs below the buoy: now the crew is over the bow with a boathook, groping for a loop they cannot see, at exactly the moment the bow has blocked the helm’s view of everything.',
    },
    {
      kind: 'text',
      text: 'Since you cannot tell which you are getting, go forward equipped for the version that needs the most from you. That means a boathook in hand and a line of your own already cleated at the bow, running out clear and back within reach, so it can be threaded through a ring or dropped over a fitting without anyone having to go looking for it. If the mooring turns out to be the easy kind, none of that preparation costs you anything.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'Neutral, from the moment somebody has hold of it',
      text: 'The buoy, its pendant, and any line you have passed through it are all now in the water close to the hull, and the propeller is the thing they must never reach. Once a crew member is holding the mooring, the gearbox stays in neutral until they say otherwise. Putting her into gear at that moment does two bad things at once: it takes the boat away from someone who is gripping a line attached to the seabed, which is how hands get burned or wrenched, and it invites the slack to find the propeller. Neither is recoverable in the second it takes to happen.',
    },
    { kind: 'heading', text: 'Holding: the enemy is time, not force' },
    {
      kind: 'text',
      text: 'Getting the line on is not the same as being secure, and what separates the two is duration. A moored boat is never still: she works to and fro all night, and every one of those movements drags the line a little way across whatever it is bearing on. One pass through a metal ring gives you a single strand rubbing on a hard edge for hours on end, which is fine for lunch and is not a way to spend a night.',
    },
    {
      kind: 'text',
      text: 'The fix is to stop the line from moving where it bears, and to give it two independent attachments rather than one. A round turn and two half hitches is the usual knot for the ring, and the round turn is the part doing the work: the standing part rides on its own turn instead of on the metal, so the wear happens rope-on-rope. Adding a second line, made fast to a different cleat, means no single point of wear can leave the boat unattached. Then look at the deck end, which is where people forget to look — anywhere the line crosses a chock or fairlead it is being worked over an edge just as hard, and wants something wrapped round it to take the abrasion. Split hose is tidy; heavy cloth does the job. Overnight and in any weather, treat this as part of mooring rather than as a refinement.',
    },
    {
      kind: 'text',
      text: 'Leaving repays a little planning of the same kind. The problem at departure is the gap between having two attachments and having none: undo the wrong one first and you are working a stubborn knot one-handed while the boat sets off. Keep one line slack and simply passed through the ring, so that it holds nothing but can still be pulled on, and it becomes the thing you hang on to while you deal with the knotted one. When you are ready, that last line comes back aboard by letting go one end and hauling — no knot to untie at the worst moment, and nothing left behind.',
    },
    { kind: 'heading', text: 'Alongside: everything happens before you arrive' },
    {
      kind: 'text',
      text: 'A berth is a harder problem than a mooring, because the boat is now beside something solid that nobody built with her in mind. Three things about it decide what you do, and all three are answerable by looking rather than guessing: how high it stands out of the water, what there is to tie to, and whether it rises and falls with you or stays put while you do.',
    },
    {
      kind: 'text',
      text: 'Height sets the fenders, which are only working if they are between the hull and whatever it would otherwise meet — so a set hung for a low pontoon protects nothing against a high stone wall, and on a tidal berth the right height now is the wrong height by evening. The fittings set your technique: cleats, rings and posts each want something different, and a post too tall to drop a loop over from deck level is much better discovered now than while somebody stands holding a line waiting for instructions. And a fixed wall means every line’s geometry changes as the water does, which is what separates a berth you can leave for the afternoon from one you cannot.',
    },
    {
      kind: 'text',
      text: 'Lines themselves want rigging so that they are usable one-handed by somebody who is also holding on to the boat. Cleat one end below, run the working end out through whatever it will pass through, and bring it back within reach on deck, clear of anything it could snag on. A soft eye worked in the outboard end gives whoever takes it something to drop straight over a cleat instead of tying a knot on a windy dock.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: 'Nothing soft goes between the hull and the dock',
      text: 'Displacement is the thing to keep in front of you here. A hull that appears to be drifting in at walking pace is still several tons of boat, and a limb put out to hold her off does not slow her down — it just becomes the point where she stops. Fenders are made to be squashed and replaced; people are not. When the two are going to touch and there is no time to get a fender into the gap properly, take your hands back and let them touch. Repair quotes are a far better class of problem than crush injuries.',
    },
    { kind: 'heading', text: 'The one line that arrives first' },
    {
      kind: 'definition',
      term: 'Spring line',
      text: 'A line led at a shallow angle along the hull instead of out from it, so that what it removes is fore-and-aft movement rather than sideways movement. Named for the direction it runs from the boat: one leading aft prevents her going forward, one leading forward prevents her going back.',
    },
    {
      kind: 'text',
      text: 'One spring earns its keep during the arrival itself rather than afterwards. Sent ashore first and given a turn round a cleat or bollard, it does not have to be secured outright: with a turn on, someone can let it render out slowly against the friction of that turn, so the boat’s remaining way bleeds off over several feet instead of arriving all at once at the end of a tight line. That is far kinder to the deck fittings than a sudden check, and it is controllable — more turns to slow her faster, fewer to let her run on. Once she has stopped and that line is made fast, she is held, and everything else can be done unhurriedly.',
    },
    {
      kind: 'text',
      text: 'Where it lands on the boat decides what it does, and the governing point is the beam — the widest part of the hull. Attached just behind that, the pull comes on near enough through the middle of the boat that she is drawn in flat and settles evenly against her fenders. Move the attachment ahead of the beam and you have given the line leverage: it now swings the bow in and levers the stern away, and instead of coming alongside you finish up lying at an angle with your fenders in the wrong places.',
    },
    { kind: 'heading', text: 'Leaving: turning a line into a hinge' },
    {
      kind: 'text',
      text: 'A boat pinned against a dock has to be levered off it before she can be driven away, and springing off is how one line, a fender and the engine do that. It is the same grammar used deliberately: tether one end, drive against the tether, and since the tethered end cannot go anywhere, the free end has to swing.',
    },
    {
      kind: 'text',
      text: 'The two versions are mirror images, so it is worth learning the relationship rather than two recipes. Whichever end you want to swing out, it is the other end you tether — with the spring leading away from that end toward the dock — and you drive the engine in the direction that end is prevented from going. The fender goes at the tethered end, because that is the corner being pressed against the dock while the boat pivots. Wait until the free end is genuinely clear before the spring comes off.',
    },
    {
      kind: 'figure',
      assetId: 'custom-springing-off',
      caption:
        'The same idea run both ways round. In each panel one spring is still attached and a fender sits at that end, because that is the end being pushed against the dock; the engine drives against the spring, and the end with nothing holding it is the end that swings clear. Read either panel and the other follows from it — swap which end is tethered, reverse the gear, and move the fender to match.',
    },
    {
      kind: 'callout',
      tone: 'note',
      title: 'Leave nobody on the dock',
      text: 'The awkward moment in any departure is the last line, because whoever casts it off is standing ashore while the boat is already free to move. The answer is the same trick used to leave a mooring, applied to a dock fitting: rather than tying the far end, pass the line round the cleat or post ashore and bring it back aboard, so you hold both ends and can let go and recover the whole line from on deck. A line rigged that way is said to be doubled. Do it to whichever lines will be let go last — normally the ones taking the load — and no one has to make a decision about jumping. Two things are worth checking as you rig them: that nothing will jam where the line doubles back, and that the shore fitting is not one the line can snarl on when you haul. If a doubled line does snag, be ready to let go of it entirely rather than let it steer your departure for you.',
    },
    {
      kind: 'text',
      text: 'One last habit belongs to the departure. Fenders left over the side once you are clear eventually go missing, and lines dumped in heaps are what you will be untangling next time under pressure. Get both aboard and squared away while nothing else is happening.',
    },
    {
      kind: 'callout',
      tone: 'note',
      title: 'Getting on and off the boat',
      text: 'Step across only when you can put a foot down deliberately, and hold on while you do it. The temptation is to jump precisely because the gap is opening — which is the one situation where a misjudged landing puts somebody between a moving hull and a fixed structure. If she is not close enough to step across, bring her closer with a line rather than with your legs.',
    },
  ],
};
