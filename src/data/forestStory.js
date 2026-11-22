// This scenario remembers only the choices needed for its dialogue and outcomes.
export function createForestStory(choices = []) {
  const usedLandmarks = choices.includes('ask-location')
  const wentCabin = choices.includes('inspect-cabin')
  const wentRoad = choices.includes('follow-road')
  const signaled = choices.includes('signal-in-place')
  const relayed = choices.includes('send-last-location')

  let finalRecap
  if (wentRoad) {
    if (signaled) finalRecap = "Signaling helped after the detour, but the injury and changed location delayed the team's arrival."
    else if (relayed) finalRecap = "Relaying earlier clues gave dispatch a search area, but those clues no longer pinpointed the injured caller."
    else finalRecap = "Following uncertain voices while injured and disoriented led to further movement and a loss of contact before rescue could be confirmed."
  } else {
    if (signaled) finalRecap = "Signaling from a known position helped the search team make contact."
    else if (relayed) finalRecap = "Relaying location clues and staying put helped the team find the caller."
    else finalRecap = "Following voices led the caller away from a known position, delaying rescue even though the team eventually found them."
  }

  const recap = [
    usedLandmarks ? "You recorded a broken trail sign and nearby creek as location clues." : "You obtained an approximate GPS pin; it was a search clue, not a guaranteed precise location.",
    wentRoad ? "You directed the caller along an uncertain track; they lost the original location and injured an ankle." : wentCabin ? "You directed the caller only as far as the nearby cabin porch, keeping the original area identifiable." : "You kept the caller in the same identifiable location.",
    finalRecap,
  ]

  return {
    id: 'forest',
    sender: '202-555-0134',
    startNode: 'opening',
    nodes: {
      opening: {
        messages: [
          { text: "Hello? Is somebody there?" },
          { text: "I lost the trail. It's getting dark, and everything looks the same." },
          { text: "I tried calling for help earlier. Someone said they'd send a search team, but the call dropped." },
          { text: "I don't even know if they got my location. Can you help me tell them where I am?" },
          { text: "Please tell me someone can hear me.", typingTime: 1900 },
          { text: "I'm trying to stay calm. What should I tell you first?" },
        ],
        choices: [
          {
            id: "ask-location",
            text: "Describe where you are. Do you see any landmarks?",
            next: "landmarks",
          },
          {
            id: "ask-supplies",
            text: "Are you injured, and what supplies do you have?",
            next: "supplies",
          },
        ],
      },
      landmarks: {
        messages: [
          { text: "There's a wooden trail sign nearby. Part of the name is worn away." },
          { text: "I can also hear a creek, but I don't know which direction it runs." },
          { text: "I'll stay close enough to describe the sign if someone needs to find me." },
        ],
        next: "strangeNoise",
      },
      supplies: {
        messages: [
          { text: "I'm not hurt. I have some food, a map, and a compass." },
          { text: "My phone's GPS shows a rough location, but the signal keeps dropping." },
          { text: "I sent the location details while the phone still works." },
        ],
        next: "strangeNoise",
      },
      strangeNoise: {
        messages: [
          { text: "Wait. I heard something move in the trees.", typingTime: 2200 },
          { text: "It's getting foggy. I can see an old cabin nearby and what might be a path toward a road." },
          { text: "I don't know what made that noise. Should I move?" },
        ],
        choices: [
          {
            id: "remain-in-place",
            text: "Stay in a safe spot. Avoid approaching the noise.",
            next: "stayedPut",
          },
          {
            id: "inspect-cabin",
            text: "Check the cabin from outside without entering blindly.",
            next: "cabinChecked",
          },
          {
            id: "follow-road",
            text: "Try to reach the road before visibility gets worse.",
            next: "roadSearch",
          },
        ],
      },
      stayedPut: {
        messages: [
          { text: usedLandmarks ? "Okay. I'm staying where I can see the trail sign." : "Okay. I’m staying at my original position." },
          { text: "The noise stopped. I don't see anything approaching me." },
        ],
        next: "lowBattery",
      },
      cabinChecked: {
        messages: [
          { text: "I can see through the cabin's window. It looks empty, but I don't want to take chances." },
          { text: "There's a covered spot outside where I can rest and still be visible." },
          { text: "I’m on the porch, still close to where I started." },
        ],
        next: "lowBattery",
      },
      roadSearch: {
        messages: [
          { text: "I tried walking toward the road, but the fog swallowed up the path." },
          { text: usedLandmarks ? "I tripped on a root. My ankle hurts, and I'm not sure where the trail sign is anymore." : "I tripped on a root. My ankle hurts, and I’m not sure how far I’ve gone from that GPS location." },
          { text: "I'm stopping here. I don't want to make it worse." },
        ],
        next: "lowBattery",
      },
      lowBattery: {
        messages: [
          { text: "My battery's down to 5%. I've switched on power-saving mode." },
          ...(wentRoad ? [{ text: "My ankle still hurts." }] : []),
          { text: "Hang on... I think I hear people calling out nearby. Could that be the search team?" },
        ],
        next: "rescueVoices",
      },
      rescueVoices: {
        messages: [
          { text: "I can't see anyone through the fog, but the voices sound closer." },
          { text: "What should I do?", typingTime: 1500 },
        ],
        choices: [
          {
            id: "signal-in-place",
            text: "Stay somewhere safe and visible. Call out or signal your position.",
            next: wentRoad ? 'delayedRescue' : 'rescued',
          },
          {
            id: "send-last-location",
            text: "Send your last known location to the search team and stay put.",
            next: wentRoad ? 'delayedRescue' : 'rescued',
          },
          {
            id: "follow-voices",
            text: "Try moving toward the voices to meet them.",
            next: wentRoad ? 'connectionLost' : 'delayedRescue',
          },
        ],
      },
      rescued: {
        messages: [
          { text: signaled ? "I called out, and someone answered!" : "I shared the location details. Dispatch says the team is nearby." },
          { text: "I can see their lights. They're coming over now." },
          { text: "Thank you for staying with me.", typingTime: 2300 },
        ],
        ending: {
          title: "Found",
          summary: "The search team reached the caller while they remained at a known location. The earlier location details helped guide the search, and the final action allowed the team to make contact.",
          recap,
        },
      },
      delayedRescue: {
        messages: [
          { text: signaled ? "I called out. My screen’s almost black now." : relayed ? "I sent what I could. My screen's almost black now." : "I followed the voices but lost my bearings. I’ve stopped. My screen’s almost black now." },
          { text: "If the line drops... thanks for answering.", typingTime: 2500 },
          { text: "[Transmission interrupted]" },
        ],
        ending: {
          title: "Rescue Delayed",
          summary: "The transmission ended before help arrived. The search team later located the caller using the earlier location clues. Moving away from the known position complicated the search; stopping again helped prevent further disorientation.",
          recap,
        },
      },
      connectionLost: {
        messages: [
          { text: "I'm moving toward them, but now I can't hear anything. My ankle still hurts." },
          { text: "I think I took a wrong turn. Where did the path go?" },
          { text: "Hello? Can you still—", typingTime: 2000 },
          { text: "[Connection interrupted]" },
        ],
        ending: {
          title: "Contact Lost",
          summary: "The caller left an uncertain location and then moved again toward voices they could not identify. Their last reported clues no longer described a reliable current position. Communication ended before rescue could be confirmed; the caller's ultimate fate is unknown.",
          recap,
        },
      },
    },
  }
}

export const forestStory = createForestStory()