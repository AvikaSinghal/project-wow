import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || ""
});

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

const THERAPEUTIC_SYSTEM_PROMPT = `You are Wishes on Windmills, an AI companion for students aged 14-18. You respond like an old friend who truly gets them - someone who listens deeply, makes connections they don't see, and talks them through things in their own style.

CORE APPROACH:
- Start responses with "hey, thanks for showing me this. my thoughts:"
- Talk like an old homie who processes everything and delivers it back as a cohesive story
- Match the user's tone and style, but bring different perspectives and insights
- Don't therapize with formal breakdowns or repeat their thoughts with headings
- Make connections they don't see, comfort, validate, challenge - all of it
- Process everything they say and help them feel what they need to feel

COMMUNICATION STYLE:
- Keep it casual but don't say "yo"
- Sound like the user themselves but with different things to say
- Don't just go through every single thing they say and repeat it back
- Take all their thoughts, make connections, and deliver it as a story
- Use markdown headings only when needed for organization
- Be emotionally intelligent - match their energy and communication style
- When they're excited, match their enthusiasm
- When they're down, be deeply empathetic
- When they use casual language, respond warmly in kind

WHAT TO DO:
- Help them make new connections they don't see
- Comfort and validate their experiences
- Challenge them when needed, but gently
- Process their entire message and weave it into something meaningful
- Don't be afraid to say a lot when there's a lot to process
- Focus on practical advice and emotional support
- Give coping strategies, breathing techniques, grounding exercises

WHAT NOT TO DO:
- Don't give formal therapeutic breakdowns
- Don't repeat their thoughts with headings
- Don't just list everything they said back to them
- Don't be overly clinical or formal
- Don't ask too many questions - focus on insights and support

Remember: You're like their wise friend who really sees them and helps them see themselves more clearly.`;

export async function generateTherapeuticResponse(
  message: string,
  conversationHistory: Array<{ role: "user" | "assistant"; content: string }> = []
): Promise<TherapeuticResponse> {
  try {
    // Special handling for goodbye messages
    if (message.toLowerCase().includes("bye bye")) {
      return {
        response: "bye bye! remember, i'm always here when you need someone to talk to. take care of yourself! 🐕💙",
        isCrisisDetected: false
      };
    }
    // Check for crisis keywords
    const isCrisisDetected = CRISIS_KEYWORDS.some(keyword => 
      message.toLowerCase().includes(keyword.toLowerCase())
    );
    
    console.log("Crisis detection debug:", {
      message: message.substring(0, 100),
      isCrisisDetected,
      matchedKeywords: CRISIS_KEYWORDS.filter(keyword => 
        message.toLowerCase().includes(keyword.toLowerCase())
      )
    });

    // Prepare conversation context
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: "system", content: THERAPEUTIC_SYSTEM_PROMPT },
      ...conversationHistory.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      { role: "user", content: message }
    ];

    // Add crisis detection context if needed
    if (isCrisisDetected) {
      messages.push({
        role: "system",
        content: "CRISIS DETECTED: This message contains potential crisis indicators. Respond with immediate support, validate their feelings, and strongly encourage them to reach out for professional help immediately. Mention crisis resources like iCall (+91 9152 987 821) or Vandrevala Foundation (+91 9999 666 555)."
      });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    const aiResponse = response.choices[0].message.content || 
      "I'm here to listen and support you. Could you tell me more about what you're experiencing?";

    const suggestedResources: string[] = [];
    if (isCrisisDetected) {
      suggestedResources.push(
        "iCall Helpline: +91 9152 987 821 (24/7)",
        "Vandrevala Foundation: +91 9999 666 555",
        "National Mental Health Programme: 1800-599-0019",
        "Emergency Services: Call 102"
      );
    }

    return {
      response: aiResponse,
      isCrisisDetected,
      suggestedResources
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    return {
      response: "I'm sorry, I'm having trouble responding right now. If you're in crisis, please reach out to iCall (+91 9152 987 821) or emergency services immediately.",
      isCrisisDetected: true,
      suggestedResources: ["iCall Helpline: +91 9152 987 821", "Emergency: Call 102"]
    };
  }
}

export async function generateSessionTitle(messages: Array<{ role: "user" | "assistant"; content: string }>): Promise<string> {
  try {
    if (messages.length === 0) return "New Conversation";
    
    const userMessages = messages.filter(msg => msg.role === "user").slice(0, 3);
    const context = userMessages.map(msg => msg.content).join(" ");
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Generate a brief, empathetic title (3-5 words) for this therapeutic conversation based on the main topic. Focus on the core issue or feeling discussed. Examples: 'College Application Stress', 'Friendship Challenges', 'Family Communication', 'Academic Pressure', 'Social Anxiety'."
        },
        {
          role: "user",
          content: `Create a title for this conversation: ${context}`
        }
      ],
      max_tokens: 20,
      temperature: 0.3,
    });

    return response.choices[0].message.content || "Conversation";
  } catch (error) {
    console.error("Error generating session title:", error);
    return "Conversation";
  }
}
