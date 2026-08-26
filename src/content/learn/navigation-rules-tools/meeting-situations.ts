import type { Lesson } from '../types';

export const lesson: Lesson = {
  id: 'navigation-rules-tools-meeting-situations', moduleId: 'navigation-rules-tools', order: 2,
  title: 'Meeting Situations: Overtaking, Head-On, Crossing',
  intro: 'The three power-driven encounters the Rules name, and who does what in each.',
  concepts: ['overtaking-situation', 'head-on-situation', 'crossing-situation'],
  blocks: [
    { kind: 'text', text: 'Three of the steering rules describe geometry rather than vessel type: overtaking (Rule 13), head-on (Rule 14), and crossing (Rule 15). Before applying any of them, work out which picture you are actually in. The wrong rule confidently applied is worse than no rule at all.' },
    { kind: 'heading', text: 'Overtaking' },
    { kind: 'text', text: 'A vessel is overtaking when she comes up on another from a direction more than 22.5 degrees abaft that vessel’s beam — the sector from which, at night, she would see only the other’s sternlight and neither sidelight. That is a bearing test taken from the vessel ahead, not a judgement about relative speed alone.' },
    { kind: 'figure', assetId: 'custom-overtaking', caption: 'The overtaking sector is defined from the vessel ahead: anywhere more than 22.5° abaft her beam, on either side. At night that is the arc where only her sternlight shows.' },
    {
      kind: 'list',
      items: [
        'The overtaking vessel keeps out of the way of the vessel being overtaken, and Rule 13 says so notwithstanding the other steering rules — vessel type does not change it.',
        'If you are in any doubt whether you are overtaking, assume that you are and act accordingly.',
        'A later change in bearing does not convert you into a crossing vessel. The duty runs until you are finally past and clear.',
      ],
    },
    { kind: 'heading', text: 'Head-on' },
    { kind: 'text', text: 'Rule 14 applies to two power-driven vessels meeting on reciprocal or nearly reciprocal courses. Each alters course to starboard, so the two pass port side to port side. There is no stand-on vessel in a true head-on meeting: both are obliged to act, and each should make the alteration early enough and large enough that the other can see it.' },
    { kind: 'figure', assetId: 'custom-headon-bowview', caption: 'Reciprocal courses, each vessel dead ahead of the other. Both are obliged to act, which is what distinguishes this geometry from a crossing.' },
    { kind: 'text', text: 'The recognition cues are practical. By night you would see the other vessel’s masthead lights in line or nearly in line, and/or both her sidelights at once. By day you see the corresponding aspect — her bow, not her side. If you are in any doubt whether a head-on situation exists, assume that it does and act accordingly.' },
    { kind: 'heading', text: 'Crossing' },
    { kind: 'text', text: 'When two power-driven vessels are crossing so as to involve risk of collision, the vessel that has the other on her own starboard side keeps out of the way and, where circumstances admit, avoids crossing ahead of her. Passing astern is the preferred shape because it stays safe even if your estimate of the other vessel’s speed is wrong, and because an early alteration to starboard makes your intention unmistakable.' },
    { kind: 'figure', assetId: 'custom-crossing', caption: 'A crossing encounter seen from the vessel that has the other on her own starboard side: this is the give-way half of the picture.' },
    { kind: 'figure', assetId: 'custom-crossing-standon', caption: 'The mirror image, from the vessel that has the other on her port side: the stand-on half. Same encounter, opposite duty — which is why the side the other vessel appears on is the first thing to establish.' },
    { kind: 'text', text: 'The stand-on vessel’s job in a crossing is to remain predictable: keep course and speed, watch the give-way vessel closely, and be ready to act under Rule 17 if she does not. As covered in the previous lesson, a stand-on vessel that has to act in a crossing should not alter to port for a vessel on her own port side.' },
    { kind: 'callout', tone: 'warning', title: 'Check which rule actually governs before you apply one', text: 'Rules 14 and 15 are written for two power-driven vessels. Two vessels under sail alone are governed by Rule 12’s tack rules even when meeting bow to bow. Overtaking overrides both, whatever the vessel types. And vessels not in sight of one another in restricted visibility are under Rule 19, where there is no stand-on vessel at all. Identify the situation first, then the duty.' },
    { kind: 'callout', tone: 'note', title: 'Doubt always resolves toward the stricter duty', text: 'Doubt about overtaking means assume you are overtaking. Doubt about head-on means assume it exists. Doubt about whether risk of collision exists means assume it does. The pattern is deliberate: uncertainty is resolved in the direction that makes you act, not in the direction that lets you hold on.' },
  ],
};
