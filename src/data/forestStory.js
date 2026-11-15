// Draft dialogue. typingTime values are preserved but not used yet.
export const forestStory = {
  id: 'forest',
  sender: '202-555-0134',
  startNode: 'opening',

  nodes: {
    opening: {
      messages: [
        { text: 'Hello? Is somebody there?' },
        { text: "I lost the trail. It's getting dark, and everything looks the same." },
        { text: 'Please tell me someone can hear me.', typingTime: 1900 },
        { text: "I'm trying to stay calm. What should I tell you first?" }
      ],
      choices: [
        {
          id: 'ask-location',
          text: 'Describe where you are. Do you see any landmarks?',
          next: 'landmarks'
        },
        {
          id: 'ask-supplies',
          text: 'Are you injured, and what supplies do you have?',
          next: 'supplies'
        }
      ]
    },

    landmarks: {
      messages: [
        { text: "There's a wooden trail sign nearby. Part of the name is worn away." },
        { text: "I can also hear a creek, but I don't know which direction it runs." },
        { text: "I'll stay close enough to describe the sign if someone needs to find me." }
      ],
      next: 'strangeNoise'
    },

    supplies: {
      messages: [
        { text: "I'm not hurt. I have some food, a map, and a compass." },
        { text: "My phone's GPS shows a rough location, but the signal keeps dropping." },
        { text: "I can send the location details while the phone still works." }
      ],
      next: 'strangeNoise'
    },

    strangeNoise: {
      messages: [
        { text: 'Wait. I heard something move in the trees.', typingTime: 2200 },
        { text: "It's getting foggy. I can see an old cabin nearby and what might be a path toward a road." },
        { text: "I don't know what made that noise. Should I move?" }
      ],
      choices: [
        {
          id: 'remain-in-place',
          text: 'Stay in a safe spot. Avoid approaching the noise.',
          next: 'stayedPut'
        },
        {
          id: 'inspect-cabin',
          text: 'Check the cabin from outside without entering blindly.',
          next: 'cabinChecked'
        },
        {
          id: 'follow-road',
          text: 'Try to reach the road before visibility gets worse.',
          next: 'roadSearch'
        }
      ]
    },

    stayedPut: {
      messages: [
        { text: "Okay. I'm staying where I can see the trail sign." },
        { text: "The noise stopped. I don't see anything approaching me." }
      ],
      next: 'lowBattery'
    },

    cabinChecked: {
      messages: [
        { text: "I can see through the cabin's window. It looks empty, but I don't want to take chances." },
        { text: "There's a covered spot outside where I can rest and still be visible." }
      ],
      next: 'lowBattery'
    },

    roadSearch: {
      messages: [
        { text: "I tried walking toward the road, but the fog swallowed up the path." },
        { text: "I tripped on a root. My ankle hurts, and I'm not sure where the trail sign is anymore." },
        { text: "I'm stopping here. I don't want to make it worse." }
      ],
      next: 'lowBattery'
    },

    lowBattery: {
      messages: [
        { text: "My battery's down to 5%. I've switched on power-saving mode." },
        { text: "Hang on... I think I hear people calling out nearby. Could that be the search team?" }
      ],
      next: 'rescueVoices'
    },

    rescueVoices: {
      messages: [
        { text: "I can't see anyone through the fog, but the voices sound closer." },
        { text: 'What should I do?', typingTime: 1500 }
      ],
      choices: [
        {
          id: 'signal-in-place',
          text: 'Stay somewhere safe and visible. Call out or signal your position.',
          next: 'rescued'
        },
        {
          id: 'send-last-location',
          text: 'Send your last known location to the search team and stay put.',
          next: 'delayedRescue'
        },
        {
          id: 'follow-voices',
          text: 'Try moving toward the voices to meet them.',
          next: 'connectionLost'
        }
      ]
    },

    rescued: {
      messages: [
        { text: "I called out, and someone answered!" },
        { text: "I can see their lights. They're coming over now." },
        { text: 'Thank you for staying with me.', typingTime: 2300 }
      ],
      ending: {
        title: 'Found',
        summary: 'The caller made contact with the search team while remaining in a known, visible location. Reflect on how location details and communication helped.'
      }
    },

    delayedRescue: {
      messages: [
        { text: "I sent what I could. My screen's almost black now." },
        { text: 'If the line drops... thanks for answering.', typingTime: 2500 },
        { text: '[Transmission interrupted]' }
      ],
      ending: {
        title: 'Rescue Delayed',
        summary: 'The search team later located the caller using the available information. The line went down first, illustrating the value of reporting a location early and conserving communication options.'
      }
    },

    connectionLost: {
      messages: [
        { text: "I'm moving toward them, but now I can't hear anything." },
        { text: "I think I took a wrong turn. Where did the path go?" },
        { text: 'Hello? Can you still—', typingTime: 2000 },
        { text: '[Connection interrupted]' }
      ],
      ending: {
        title: 'Contact Lost',
        summary: 'The caller moved away from the last reported location, and contact ended before rescue could be confirmed. Their ultimate fate is unknown.'
      }
    }
  }
};
