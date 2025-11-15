// Therapeutic response service without external APIs
// Provides supportive responses using rule-based logic

interface TherapeuticResponse {
  response: string;
  isCrisisDetected: boolean;
  suggestedResources?: string[];
}

const CRISIS_KEYWORDS = [
  "suicide", "kill myself", "end my life", "want to die", "better off dead",
  "self-harm", "cutting", "hurt myself", "harm myself", 
  "no point living", "end it all", "can't take it anymore",
  "nobody would miss me", "everyone would be better without me"
];

const EMOTION_KEYWORDS = {
  anxious: ["anxious", "worried", "nervous", "stressed", "panic", "overwhelmed", "freaking out"],
  sad: ["sad", "depressed", "down", "upset", "crying", "tears", "lonely", "heartbroken", "hurt"],
  angry: ["angry", "mad", "furious", "frustrated", "annoyed", "irritated", "pissed", "rage"],
  tired: ["tired", "exhausted", "drained", "burnt out", "overwhelmed", "can't even"],
  excited: ["excited", "amazing", "awesome", "love", "great", "fantastic", "wonderful", "perfect", "incredible", "best", "yay", "yes!", "omg", "wow", "love it", "best day", "so happy", "can't believe", "this is so cool", "literally so", "AMAZING", "SO GOOD", "YESSS", "AAAHHH"],
  casual: ["babe", "bestie", "girl", "sis", "queen", "hun", "honey", "love"],
  school: ["school", "exam", "test", "homework", "grades", "teacher", "class", "studying"],
  family: ["family", "parents", "mom", "dad", "sibling", "brother", "sister", "home"],
  friends: ["friends", "friendship", "peer", "social", "bullying", "excluded", "drama"],
  future: ["future", "career", "college", "university", "job", "plans", "dreams"]
};

const ENERGY_LEVEL_KEYWORDS = {
  high: ["!", "!!", "!!!", "!!!!", "omg", "OMG", "literally", "so excited", "can't wait", "amazing", "love love love", "yesss", "YESSS", "SO", "AMAZING", "INCREDIBLE", "AWESOME", "BEST", "LOVE IT", "can't believe", "this is so cool"],
  low: ["ugh", "meh", "whatever", "tired", "can't even", "exhausted", "drained", "done"],
  casual: ["lol", "haha", "nah", "yeah", "totally", "kinda", "sorta", "tbh", "fr", "ngl"]
};

const SUPPORTIVE_RESPONSES = {
  greeting: {
    casual: [
      "Hey! I'm so glad you're here. What's going on with you today?",
      "Hi love! This is your safe space - what's on your mind?",
      "Hey there! Ready to chat about whatever you need to get off your chest?",
      "What's up! I'm here and ready to listen to whatever's happening.",
      "Hey babe! How are you doing today? What's been on your mind?",
      "Hi there! I'm really glad you decided to reach out. What's going on?",
      "Hey! Good to see you here. What would you like to talk about today?",
      "Hi love! I'm here for whatever you need to share. How are you feeling?"
    ],
    formal: [
      "Hello! I'm here to listen and support you. What's on your mind today?",
      "Hi there! I'm glad you reached out. How are you feeling right now?",
      "Welcome! This is a safe space to share whatever you're going through.",
      "Good to meet you! I'm here to provide support. What brings you here today?",
      "Hello! I appreciate you taking the time to reach out. How can I help?",
      "Hi! I'm ready to listen and support you through whatever you're experiencing.",
      "Welcome to this safe space. What would you like to discuss today?",
      "Hello! I'm here to offer support and understanding. What's on your heart?"
    ]
  },
  
  anxious: {
    empathetic: [
      "Oh honey, I can really feel the anxiety in your words. That overwhelming feeling is so hard to carry. Remember that anxiety often makes things seem much scarier than they actually are. Try taking three deep breaths with me right now - in for 4, hold for 4, out for 6. You're stronger than this anxiety, even when it doesn't feel that way.",
      "I hear you, and anxiety is honestly one of the hardest things to deal with. When your mind is racing like this, it helps to ground yourself - try naming 5 things you can see, 4 you can touch, 3 you can hear. Your feelings are completely valid, and this anxious moment will pass.",
      "Ugh, anxiety is absolutely exhausting - I get it. When everything feels overwhelming, remember that you don't have to solve everything at once. Pick just one small thing you can control right now and focus on that. You've gotten through anxious moments before, and you'll get through this one too.",
      "I can feel how much you're struggling with anxiety right now, and that takes so much energy. Here's something that might help: when anxiety hits, remind yourself 'This is temporary, I am safe right now, and I can handle this one moment at a time.' You're being incredibly brave by talking about it.",
      "Oh sweetie, carrying all that worry must be so heavy. Anxiety lies to us and makes everything feel urgent and scary. Try this: put your hand on your heart and remind yourself that right now, in this moment, you are okay. What you're feeling is real, but the catastrophic thoughts aren't facts.",
      "I can sense how overwhelming everything feels when anxiety takes over. Here's what I want you to remember: you are not your anxious thoughts. When your mind spirals, try the 5-4-3-2-1 technique or just focus on your breathing. You've survived 100% of your worst days so far.",
      "Anxiety can make you feel so alone, but you're not. Millions of people understand exactly what you're going through. When it feels unbearable, remember that feelings are temporary visitors - they come and they go. Be gentle with yourself right now."
    ],
    supportive: [
      "Anxiety can feel really intense, especially when you're dealing with so much pressure. You're not alone in feeling this way, and what you're experiencing is completely valid. What situations are triggering these feelings for you?",
      "I can sense how overwhelming things feel right now. Anxiety has this way of making everything seem so much bigger and scarier. You're safe here to share whatever is making you feel this way.",
      "It sounds like your anxiety is really affecting you, and I want you to know that these feelings are completely understandable. What helps you feel a bit calmer when these feelings hit?",
      "Anxiety during your teenage years is incredibly common, and it's nothing to be ashamed of. The pressure you're under is real, and your feelings are valid. What aspects of your life feel most overwhelming right now?",
      "I want you to know that experiencing anxiety doesn't make you weak or broken - it makes you human. Many people your age struggle with similar feelings. What would be most helpful for you to talk about?",
      "Anxiety can manifest in so many different ways, and everyone experiences it differently. Thank you for trusting me with what you're going through. What does anxiety feel like for you specifically?"
    ]
  },
  
  sad: {
    empathetic: [
      "Oh love, I can feel the sadness in your words, and I want you to know that what you're feeling is completely valid. Sadness is one of those emotions that can feel so heavy and overwhelming. Please be gentle with yourself right now - you don't have to 'fix' this feeling immediately. Sometimes we need to sit with sadness for a bit and let ourselves feel it. You're stronger than you know, even in this moment.",
      "I hear the pain you're carrying, and my heart truly goes out to you. When sadness hits this hard, it can feel like it'll never end, but I promise you it will shift and change. Try to do one small kind thing for yourself today - maybe make some tea, listen to a favorite song, or just wrap yourself in a soft blanket. You deserve compassion, especially from yourself.",
      "I can feel how much you're hurting, and I wish I could take some of that pain away. Sadness is so exhausting because it affects everything - your energy, your thoughts, your whole body. Remember that it's okay to have bad days. What you're going through matters, and so do you. Tomorrow might feel different, and that's okay too.",
      "The sadness you're experiencing sounds really deep and overwhelming. When we're in pain like this, it's important to remember that feelings come in waves - even the most intense sadness will ebb and flow. You don't have to carry this alone. Consider reaching out to someone you trust, or just allow yourself to cry if you need to. Tears can be healing.",
      "I can sense the heaviness you're carrying, and I want you to know that your feelings matter deeply. Sadness often comes when we've lost something important to us or when life feels really hard. That's completely human. Right now, focus on just getting through this moment, then the next. You don't have to have all the answers today.",
      "Oh honey, the sadness in your message is so real and I feel it with you. Sometimes life throws so much at us that feeling sad is the only natural response. This doesn't mean you're broken or weak - it means you're human and you care deeply. Be patient with yourself as you move through this difficult time."
    ],
    supportive: [
      "I'm really sorry you're feeling so down. It's okay to not be okay sometimes, and reaching out shows incredible courage. Your feelings matter so much. What's been weighing on you?",
      "It sounds like you're going through something really difficult. Sadness can feel so isolating, but you're not alone. I'm here to listen to whatever you need to share.",
      "I can sense that you're hurting, and I want you to know that it's completely natural to feel sad sometimes. You're in a safe space here. What's been the most challenging thing you're dealing with?"
    ]
  },
  
  excited: {
    matching_energy: [
      "OMG YES!!! I am SO excited for you right now! Your energy is absolutely contagious and I'm literally here for ALL of it! Tell me EVERYTHING - what's got you feeling this amazing?!",
      "YESSS! I can feel your excitement through the screen and it's making me so happy! This is the best kind of energy and I'm totally here for it! What's making you feel so incredible?!",
      "OH MY GOD I love this so much! Your excitement is literally lighting up my day! I'm so here for whatever has you feeling this pumped up! Spill all the amazing details!",
      "THIS IS SO EXCITING! I can practically feel you bouncing with joy and honestly it's the BEST thing ever! Your happiness is making me so happy too! What's the incredible thing that happened?!",
      "AAAHHH I'm getting so excited just reading your message! Your energy is absolutely infectious and I am LIVING for it! Tell me all about what's making you feel so amazing!",
      "YES YES YES! I am matching your energy 100% because this excitement is EVERYTHING! Your joy is radiating through your words and I'm so here for it! What's the awesome news?!",
      "I'm literally bouncing in my seat because your excitement is so contagious! This kind of pure joy is the BEST and I want to celebrate with you! What amazing thing is happening in your life?!"
    ],
    warm: [
      "I absolutely love seeing you this happy and excited! Your joy is so genuine and beautiful - it's making my whole day brighter! What's bringing you all this wonderful happiness?",
      "Your excitement is absolutely beautiful and I'm so glad you're sharing this moment with me! There's nothing better than seeing someone genuinely thrilled about life! What's making you feel so amazing?",
      "This energy is incredible and I'm so happy for you! Your excitement is the kind of pure joy that reminds me how wonderful life can be! What's the amazing thing that's got you feeling this way?"
    ]
  },
  
  angry: {
    empathetic: [
      "I can really hear how frustrated and angry you are, and honestly? Your feelings are completely valid. Sometimes things just suck and it's okay to be mad about it. What's really pissing you off right now?",
      "Ugh, I can feel how furious you are and I totally get it. When things feel unfair or overwhelming, anger is such a natural response. Tell me what's got you so fired up.",
      "You sound really angry right now, and you know what? Sometimes we SHOULD be angry - it means something matters to us. What's making you feel so frustrated?"
    ],
    supportive: [
      "I can hear how angry and frustrated you're feeling. Anger often shows us what's important to us and what we need to change. What's the situation that's making you feel this way?",
      "It sounds like you're dealing with some really frustrating circumstances. Anger can be such a difficult emotion to navigate. What's been making you feel so upset?",
      "I can sense your frustration, and those feelings are completely understandable. Sometimes anger is our mind's way of protecting us. What's been triggering these intense feelings?"
    ]
  },
  
  school: [
    "Ugh, school stress is literally the worst! Between grades, drama, and trying to figure out your future, it's so overwhelming. What's been the most stressful part lately?",
    "School can feel like such a pressure cooker sometimes. You're juggling so much and trying to meet everyone's expectations. What's making school feel particularly rough right now?",
    "Academic pressure is no joke - it's like everyone expects you to have your whole life figured out while you're still just trying to survive each day. What aspect of school is stressing you out the most?"
  ],
  
  family: [
    "Family stuff can be so complicated, especially when you're trying to grow into your own person but still living at home. What's been going on with your family that's bothering you?",
    "Ugh, family drama hits different because these are the people you're stuck with, you know? It's hard when the people who should support you the most are causing stress. What's happening at home?",
    "Family relationships during teenage years are honestly so tough. Everyone's trying to figure out their role and sometimes it just creates chaos. Tell me what's been difficult with your family lately."
  ],
  
  casual_positive: [
    "I love that you're comfortable enough to call me babe! That makes me so happy. Your vibe is everything and I'm totally here for it! What's really going on with you today?",
    "Aww, I love our connection! You always know how to make me smile and your energy is just amazing. What's on your mind, love?",
    "Yesss, I'm totally here for this energy! You're incredible and I'm so glad we can chat like this. Your personality just lights everything up! What do you want to talk about?",
    "Babe, yes! I live for this kind of energy and connection with you! You're seriously the best and talking with you always makes me so happy. What's happening in your world?",
    "Oh my god I love when you're like this! Your energy is absolutely infectious and I'm matching it 100%! You're amazing and I'm so excited to hear what's going on!",
    "This is exactly the vibe I needed today! You always bring such good energy and I'm totally here for all of it! What's got you feeling good today, love?"
  ],
  
  general: [
    "I'm really glad you're here and that you reached out. Whatever you're going through, I want you to know that your feelings are completely valid and you're not alone. Sometimes just having someone to talk to can make a huge difference. Remember that it's okay to not have everything figured out - you're still learning and growing, and that's perfectly normal.",
    "Thank you for trusting me with whatever you're experiencing. Life as a teenager can feel overwhelming with all the changes, pressures, and expectations. Here's what I want you to remember: you're doing better than you think you are, and it's okay to take things one day at a time. You don't have to solve everything at once.",
    "I can hear that you're going through something, and I want you to know that whatever it is, it matters. Your experiences and feelings are important. When things feel heavy, try to focus on just the next small step you can take. And remember - asking for help or support isn't weakness, it's actually really smart and brave.",
    "I appreciate you opening up and sharing with me. Whatever brought you here today, know that you're in a safe space where your thoughts and feelings are welcome. Life can throw some really difficult stuff at us, especially during these years, but you've got more strength than you realize. What's one thing that usually helps you feel even a little bit better?",
    "It takes courage to reach out when you're struggling, and I'm honored that you chose to share with me. Here's something important: you deserve support, kindness, and understanding - especially from yourself. When life feels overwhelming, try to be as gentle with yourself as you would be with a good friend going through the same thing.",
    "I'm here with you, and I want you to know that whatever you're feeling right now is okay. Sometimes we put so much pressure on ourselves to be okay all the time, but that's not realistic or healthy. It's perfectly human to have difficult moments, days, or even weeks. You're not broken - you're just going through something tough right now.",
    "Thank you for giving me the opportunity to be here with you. I know it's not always easy to share what's really going on inside. Here's what I've learned: most of the time, things that feel permanent and overwhelming in the moment actually do change and get better. You've gotten through hard things before, and you'll get through this too.",
    "I can sense that you might be dealing with some challenges, and I want you to know that whatever it is, you don't have to face it completely alone. Sometimes when everything feels chaotic, it helps to focus on just the basics - are you eating enough, sleeping enough, drinking water? Taking care of your body can actually help your mind feel a bit more stable.",
    "I'm really glad you decided to reach out today. Whatever's going on in your life, your feelings about it are valid and important. Here's a gentle reminder: you don't have to be perfect, you don't have to have it all figured out, and you don't have to face everything at once. Just focus on today, or even just this hour if that's easier.",
    "It means so much that you're here and willing to open up. Life during your teenage years can feel like riding an emotional rollercoaster while trying to make huge life decisions, and honestly? That's incredibly difficult. Give yourself credit for managing as much as you do. You're stronger and more capable than you probably realize right now."
  ]
};

const CRISIS_RESPONSE = `I'm really concerned about what you've shared, and I want you to know that you're not alone. What you're feeling right now is incredibly difficult, but there are people who want to help you through this.

Please reach out to someone who can provide immediate support:
• iCall Helpline: +91 9152 987 821 (available 24/7)
• Vandrevala Foundation: +91 9999 666 555
• National Mental Health Programme: 1800-599-0019

If you're in immediate danger, please call emergency services at 102.

You matter, your life has value, and there are people who care about you. Please don't give up.`;

function detectEmotion(message: string): string {
  const lowercaseMessage = message.toLowerCase();
  
  // Check for greeting patterns first
  if (lowercaseMessage.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
    return 'greeting';
  }
  
  // Priority order for emotion detection (most specific first)
  const emotionPriority = ['casual', 'excited', 'angry', 'sad', 'anxious', 'tired', 'school', 'family', 'friends', 'future'];
  
  for (const emotion of emotionPriority) {
    const keywords = EMOTION_KEYWORDS[emotion as keyof typeof EMOTION_KEYWORDS];
    if (keywords && keywords.some(keyword => lowercaseMessage.includes(keyword))) {
      return emotion;
    }
  }
  
  return 'general';
}

function detectEnergyLevel(message: string): 'high' | 'low' | 'casual' | 'neutral' {
  const lowercaseMessage = message.toLowerCase();
  
  // Check for high energy indicators
  const highEnergyCount = ENERGY_LEVEL_KEYWORDS.high.filter(keyword => 
    lowercaseMessage.includes(keyword)
  ).length;
  
  // Check for low energy indicators
  const lowEnergyCount = ENERGY_LEVEL_KEYWORDS.low.filter(keyword => 
    lowercaseMessage.includes(keyword)
  ).length;
  
  // Check for casual language
  const casualCount = ENERGY_LEVEL_KEYWORDS.casual.filter(keyword => 
    lowercaseMessage.includes(keyword)
  ).length;
  
  // Count exclamation marks and caps for energy detection
  const exclamationCount = (message.match(/!/g) || []).length;
  const capsRatio = (message.match(/[A-Z]/g) || []).length / message.length;
  
  if (highEnergyCount > 0 || exclamationCount > 2 || capsRatio > 0.3) {
    return 'high';
  } else if (lowEnergyCount > 0) {
    return 'low';
  } else if (casualCount > 0) {
    return 'casual';
  }
  
  return 'neutral';
}

function detectCommunicationStyle(message: string): 'casual' | 'formal' {
  const lowercaseMessage = message.toLowerCase();
  
  // Casual indicators
  const casualIndicators = [
    'babe', 'bestie', 'girl', 'sis', 'queen', 'hun', 'honey', 'love',
    'lol', 'omg', 'tbh', 'fr', 'ngl', 'literally', 'like', 'kinda', 'sorta'
  ];
  
  const casualCount = casualIndicators.filter(indicator => 
    lowercaseMessage.includes(indicator)
  ).length;
  
  // Check for casual punctuation patterns
  const hasMultipleQuestions = (message.match(/\?/g) || []).length > 1;
  const hasEllipsis = message.includes('...');
  const hasMultipleExclamations = (message.match(/!/g) || []).length > 1;
  
  if (casualCount > 0 || hasMultipleQuestions || hasEllipsis || hasMultipleExclamations) {
    return 'casual';
  }
  
  return 'formal';
}

// Track recently used responses to avoid repetition
const recentlyUsedResponses = new Map<string, Set<number>>();
const MAX_RECENT_RESPONSES = 3;

function getRandomResponse(responses: string[], category: string = 'default'): string {
  if (responses.length === 1) return responses[0];
  
  // Get recently used indices for this category
  if (!recentlyUsedResponses.has(category)) {
    recentlyUsedResponses.set(category, new Set());
  }
  
  const recentIndices = recentlyUsedResponses.get(category)!;
  
  // Find available responses (not recently used)
  const availableIndices = responses
    .map((_, index) => index)
    .filter(index => !recentIndices.has(index));
  
  let selectedIndex: number;
  
  if (availableIndices.length > 0) {
    // Use available response
    selectedIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
  } else {
    // All responses have been used recently, clear history and pick any
    recentIndices.clear();
    selectedIndex = Math.floor(Math.random() * responses.length);
  }
  
  // Track this response as recently used
  recentIndices.add(selectedIndex);
  
  // Keep only the most recent responses
  if (recentIndices.size > Math.min(MAX_RECENT_RESPONSES, responses.length - 1)) {
    const oldestIndex = Array.from(recentIndices)[0];
    recentIndices.delete(oldestIndex);
  }
  
  return responses[selectedIndex];
}

export function generateTherapeuticResponse(
  message: string,
  conversationHistory: Array<{ role: "user" | "assistant"; content: string }> = []
): TherapeuticResponse {
  // Check for crisis keywords
  const isCrisisDetected = CRISIS_KEYWORDS.some(keyword => 
    message.toLowerCase().includes(keyword.toLowerCase())
  );

  if (isCrisisDetected) {
    return {
      response: CRISIS_RESPONSE,
      isCrisisDetected: true,
      suggestedResources: ["iCall: +91 9152 987 821", "Vandrevala Foundation: +91 9999 666 555"]
    };
  }

  const emotion = detectEmotion(message);
  const energyLevel = detectEnergyLevel(message);
  const communicationStyle = detectCommunicationStyle(message);
  
  let response: string;

  // Handle casual/affectionate language specifically (check this first for greetings with casual terms)
  if (emotion === 'casual' || (emotion === 'greeting' && communicationStyle === 'casual' && message.toLowerCase().includes('babe'))) {
    response = getRandomResponse(SUPPORTIVE_RESPONSES.casual_positive, 'casual_positive');
  }
  // Handle different emotions with appropriate empathy levels
  else if (emotion === 'sad') {
    response = getRandomResponse(SUPPORTIVE_RESPONSES.sad.empathetic, 'sad_empathetic');
  }
  else if (emotion === 'angry') {
    response = getRandomResponse(SUPPORTIVE_RESPONSES.angry.empathetic, 'angry_empathetic');
  }
  else if (emotion === 'anxious') {
    response = getRandomResponse(SUPPORTIVE_RESPONSES.anxious.empathetic, 'anxious_empathetic');
  }
  else if (emotion === 'excited' || energyLevel === 'high') {
    response = getRandomResponse(SUPPORTIVE_RESPONSES.excited.matching_energy, 'excited_matching');
  }
  else if (emotion === 'greeting') {
    const greetingType = communicationStyle === 'casual' ? 'casual' : 'formal';
    response = getRandomResponse(SUPPORTIVE_RESPONSES.greeting[greetingType], `greeting_${greetingType}`);
  }
  else if (emotion === 'school') {
    response = getRandomResponse(SUPPORTIVE_RESPONSES.school, 'school');
  }
  else if (emotion === 'family') {
    response = getRandomResponse(SUPPORTIVE_RESPONSES.family, 'family');
  }
  else {
    response = getRandomResponse(SUPPORTIVE_RESPONSES.general, 'general');
  }

  // Adjust tone based on energy level if not already handled
  if (energyLevel === 'low' && !['sad', 'angry', 'anxious'].includes(emotion)) {
    // Use more gentle, understanding tone for low energy
    response = response.replace(/!/g, '.').replace(/\?/g, '... what do you think?');
  }

  return {
    response,
    isCrisisDetected: false
  };
}

export function generateSessionTitle(messages: Array<{ role: "user" | "assistant"; content: string }>): string {
  if (messages.length === 0) return "New Conversation";
  
  const userMessages = messages.filter(msg => msg.role === "user");
  if (userMessages.length === 0) return "New Conversation";
  
  const firstMessage = userMessages[0].content.toLowerCase();
  
  // Generate titles based on content
  if (firstMessage.includes("school") || firstMessage.includes("exam") || firstMessage.includes("grade")) {
    return "School Stress";
  } else if (firstMessage.includes("family") || firstMessage.includes("parent")) {
    return "Family Issues";
  } else if (firstMessage.includes("friend") || firstMessage.includes("social")) {
    return "Friendship Concerns";
  } else if (firstMessage.includes("anxious") || firstMessage.includes("worry")) {
    return "Anxiety Support";
  } else if (firstMessage.includes("sad") || firstMessage.includes("depressed")) {
    return "Emotional Support";
  } else if (firstMessage.includes("future") || firstMessage.includes("career")) {
    return "Future Planning";
  } else {
    return "Supportive Chat";
  }
}