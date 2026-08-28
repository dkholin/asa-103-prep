import type { Lesson } from '../types';

export const lesson: Lesson = {
  "id": "seamanship-routine-vhf",
  "moduleId": "seamanship",
  "order": 3,
  "title": "Routine VHF Communication",
  "intro": "A useful radio call gets the right people onto the right channel with as little occupied airtime as possible. These examples concern routine U.S. recreational boating. Channel assignments and licensing arrangements elsewhere may differ.",
  "concepts": [
    "routine-vhf-communication"
  ],
  "blocks": [
    {
      "kind": "heading",
      "text": "Find the station before the conversation"
    },
    {
      "kind": "table",
      "headers": [
        "Channel",
        "Routine use"
      ],
      "rows": [
        [
          "16",
          "Distress, safety and calling. Make initial voice contact briefly; move routine conversation elsewhere."
        ],
        [
          "9",
          "Supplementary recreational calling where the intended station listens. It is not a replacement for Coast Guard monitoring on 16."
        ],
        [
          "68, 69, 71",
          "Common noncommercial working channels, subject to local restrictions and the station’s authorization."
        ],
        [
          "72",
          "Noncommercial vessel-to-vessel traffic; not a marina ship-to-shore channel."
        ]
      ]
    },
    {
      "kind": "text",
      "text": "Check a marina’s published VHF channel before arrival and use it when appropriate. Do not assume every marina listens on 9 or that any quiet channel is available. For another recreational vessel, use 9 where that station monitors it; otherwise a brief hail on 16 may be appropriate. A working channel must suit both stations and the type of communication."
    },
    {
      "kind": "heading",
      "text": "Make and complete the call"
    },
    {
      "kind": "list",
      "ordered": true,
      "items": [
        "Listen before transmitting. Wait for a clear channel and plan the short message you need to send.",
        "Call the station or vessel by name, then identify your own vessel. Release the push-to-talk button to hear its reply.",
        "Once contact is established on a calling channel, propose or acknowledge an appropriate working channel. Confirm the number before switching.",
        "Switch and listen again. Re-establish contact there, then give the actual request in short, clear transmissions.",
        "Confirm any essential details, identify your vessel as you finish, and return to the appropriate listening watch."
      ]
    },
    {
      "kind": "text",
      "text": "If nobody answers, allow time rather than filling the channel with repeated calls. Check the channel and volume. Do not use Channel 16 for a casual radio check or continue a routine conversation there. Distress and other priority traffic take precedence: stop routine transmissions and listen."
    },
    {
      "kind": "heading",
      "text": "Example: two recreational vessels"
    },
    {
      "kind": "text",
      "text": "Assume both vessels monitor 9 and Channel 68 is available locally. Alder wants to confirm a meeting place with Kestrel. The names and exchange below are a practice example, not a script that must be recited word for word."
    },
    {
      "kind": "table",
      "headers": [
        "Where",
        "Exchange"
      ],
      "rows": [
        [
          "9: Alder",
          "“Kestrel, this is Alder. Over.”"
        ],
        [
          "9: Kestrel",
          "“Alder, Kestrel. Switch to six-eight. Over.”"
        ],
        [
          "9: Alder",
          "“Six-eight. Alder.”"
        ],
        [
          "68: after listening",
          "“Kestrel, Alder. Are we meeting outside the harbor entrance? Over.”"
        ],
        [
          "68: Kestrel",
          "“Alder, Kestrel. Yes, outside the entrance. Over.”"
        ],
        [
          "68: Alder",
          "“Understood. Alder out.”"
        ]
      ]
    },
    {
      "kind": "text",
      "text": "“Over” means you expect a reply; “out” ends your exchange without requesting one. They remain useful marine-radio procedure words, not a reason to make a simple call elaborate. Do not combine them as “over and out.” Speak clearly and release the button between transmissions."
    },
    {
      "kind": "heading",
      "text": "Watch, equipment and U.S. permissions"
    },
    {
      "kind": "text",
      "text": "For a voluntarily equipped boat underway, the non-DSC VHF rule requires a Channel 16 watch when not communicating; noncommercial vessels may use 9 for call and reply instead. The VHF-DSC rule allows a Channel 70 DSC watch or an aural watch on 16. Keep listening on 16 as normal good practice, consistent with Coast Guard guidance. Channel 70 is digital, never a voice working channel."
    },
    {
      "kind": "text",
      "text": "DSC can make individual routine calls using a registered MMSI, as well as support distress functions. Learn the radio’s routine menu from its manual; distress operation belongs in Cruising Life & Safety."
    },
    {
      "kind": "text",
      "text": "Use the lowest permitted transmit power that provides reliable communication to limit interference. On many fixed sets that means trying 1 W for a nearby station and using up to 25 W when needed and allowed. More power does not guarantee contact; antenna height and obstructions affect VHF range."
    },
    {
      "kind": "callout",
      "tone": "note",
      "title": "Domestic exemption has conditions",
      "text": "A U.S. voluntarily equipped vessel using marine VHF, making no foreign-port visits or international communications, generally needs no individual FCC ship-station license. No operator license is required for voluntary VHF use on a domestic voyage. Required-carriage vessels, other transmitting equipment and international operation need separate checks; the exemption is not worldwide."
    }
  ]
};
