import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Brain, Zap, Coffee, BookOpen, Users, Home, Star, Clock, Target } from "lucide-react";

interface ConversationStartersProps {
  onSelectStarter: (message: string) => void;
  isVisible: boolean;
}

interface StarterCategory {
  name: string;
  icon: React.ReactNode;
  color: string;
  starters: string[];
  description: string;
}

const conversationCategories: StarterCategory[] = [
  {
    name: "Feeling Stressed",
    icon: <Brain className="w-4 h-4" />,
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300",
    description: "When everything\nfeels overwhelming",
    starters: [
      "I have so much on my plate right now and I don't know where to start...",
      "Everything feels like too much today, I'm struggling to keep up",
      "I can't stop thinking about all the things I need to do and it's making me anxious",
      "I feel like I'm drowning in responsibilities and pressure",
      "The stress is getting to me and I don't know how to handle it anymore"
    ]
  },
  {
    name: "Academic Pressure",
    icon: <BookOpen className="w-4 h-4" />,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
    description: "School and\nstudy struggles",
    starters: [
      "I'm really worried about my upcoming exams and whether I'll do well",
      "My grades aren't where I want them to be and my parents are disappointed",
      "I don't understand this subject no matter how hard I try",
      "Everyone else seems to get it but I'm falling behind in class",
      "The pressure to get into a good college is really getting to me"
    ]
  },
  {
    name: "Social Issues",
    icon: <Users className="w-4 h-4" />,
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300",
    description: "Friends and\nsocial situations",
    starters: [
      "I'm having drama with my friend group and don't know how to handle it",
      "I feel left out and like I don't really belong anywhere",
      "Someone I trusted really hurt me and I don't know what to do",
      "I'm struggling to make friends and feel pretty lonely",
      "There's so much social pressure and I feel like I can't be myself"
    ]
  },
  {
    name: "Family Stuff",
    icon: <Home className="w-4 h-4" />,
    color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
    description: "Home and\nfamily dynamics",
    starters: [
      "My parents and I keep fighting and I don't know how to fix it",
      "There's a lot of tension at home and it's affecting everything",
      "I feel like my family doesn't understand me or what I'm going through",
      "My parents have such high expectations and I'm afraid of letting them down",
      "Family drama is making it hard to focus on anything else"
    ]
  },
  {
    name: "Feeling Low",
    icon: <Heart className="w-4 h-4" />,
    color: "bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-300",
    description: "When you're struggling\nemotionally",
    starters: [
      "I've been feeling really down lately and can't seem to shake it",
      "Nothing feels enjoyable anymore and I'm just going through the motions",
      "I feel empty inside and like nothing I do matters",
      "I'm having a really hard time and don't know who to talk to",
      "Everything feels hopeless right now and I need someone to understand"
    ]
  },
  {
    name: "Excited/Good News",
    icon: <Star className="w-4 h-4" />,
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
    description: "Sharing positive\nmoments",
    starters: [
      "Something amazing happened today and I'm so excited to share it!",
      "I actually did really well on something I was worried about!",
      "I'm feeling really good about myself lately and wanted to talk about it",
      "Things are finally looking up and I'm feeling hopeful again",
      "I had such a good day and want to celebrate with someone!"
    ]
  },
  {
    name: "Tired/Burnt Out",
    icon: <Coffee className="w-4 h-4" />,
    color: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300",
    description: "When you're\nexhausted",
    starters: [
      "I'm so tired all the time and can't seem to catch up on rest",
      "I feel completely burnt out and don't have energy for anything",
      "Everything feels like such an effort right now",
      "I'm exhausted from trying to keep up with everything",
      "I need help figuring out how to recharge and feel better"
    ]
  },
  {
    name: "Future Worries",
    icon: <Target className="w-4 h-4" />,
    color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300",
    description: "Concerns about\nwhat's ahead",
    starters: [
      "I'm really anxious about my future and what's going to happen",
      "I don't know what I want to do with my life and it's scary",
      "Everyone seems to have their life figured out but I'm so lost",
      "I'm worried I'm making the wrong choices for my future",
      "The uncertainty about what comes next is really stressing me out"
    ]
  }
];

export default function ConversationStarters({ onSelectStarter, isVisible }: ConversationStartersProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (!isVisible) return null;

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(selectedCategory === categoryName ? null : categoryName);
  };

  const handleStarterSelect = (starter: string) => {
    onSelectStarter(starter);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mb-6">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            How are you feeling today?
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Choose what matches your mood to get personalized conversation starters
          </p>
        </div>

        {/* Emotion Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {conversationCategories.map((category) => (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? "default" : "outline"}
              onClick={() => handleCategorySelect(category.name)}
              className="h-auto min-h-[100px] p-3 flex flex-col items-center justify-center gap-2 text-center"
            >
              <div className={`p-2 rounded-full ${category.color} flex-shrink-0`}>
                {category.icon}
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="font-medium text-xs leading-tight mb-1 text-center">
                  {category.name}
                </div>
                <div className="text-xs opacity-70 hidden md:block leading-tight text-center whitespace-pre-line">
                  {category.description}
                </div>
              </div>
            </Button>
          ))}
        </div>

        {/* Conversation Starters */}
        {selectedCategory && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="flex items-center gap-1">
                {conversationCategories.find(c => c.name === selectedCategory)?.icon}
                {selectedCategory}
              </Badge>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Pick a starter that feels right:
              </span>
            </div>
            
            <div className="space-y-2">
              {conversationCategories
                .find(c => c.name === selectedCategory)
                ?.starters.map((starter, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={() => handleStarterSelect(starter)}
                  className="w-full text-left justify-start h-auto p-4 whitespace-normal break-words hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="text-sm leading-relaxed text-wrap">{starter}</div>
                </Button>
              ))}
            </div>
          </div>
        )}

        {!selectedCategory && (
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Select how you're feeling to see conversation starters, or just start typing your own message below.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}