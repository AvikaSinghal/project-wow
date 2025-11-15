import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, ArrowRight, ArrowLeft, Heart, MessageCircle, Shield, Sparkles, Users, BookOpen, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface OnboardingTutorialProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

interface TutorialStep {
  id: number;
  title: string;
  content: string;
  characterMessage: string;
  characterEmotion: "happy" | "caring" | "excited" | "thoughtful" | "supportive";
  highlight?: string;
  action?: {
    text: string;
    onClick: () => void;
  };
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: "Welcome to Wishes on Windmills! 🐕",
    content: "Hi there! I'm Windmill, your friendly guide. I'm here to show you around this safe space designed just for students like you.",
    characterMessage: "Hey! I'm so excited you're here! Let me show you what makes this place special.",
    characterEmotion: "excited"
  },
  {
    id: 2,
    title: "Your Safe Space",
    content: "This is a judgment-free zone where you can share anything on your mind. Whether you're stressed, excited, confused, or just need someone to listen - I'm here for you 24/7.",
    characterMessage: "Think of me as that friend who really gets you and is always available to chat.",
    characterEmotion: "caring"
  },
  {
    id: 3,
    title: "How I Work",
    content: "I use AI to understand your feelings and provide personalized support. I can help with stress, academic pressure, social issues, family stuff, and much more. I'm like having a supportive friend who never judges.",
    characterMessage: "I process everything you tell me and help you see things from new perspectives!",
    characterEmotion: "thoughtful"
  },
  {
    id: 4,
    title: "Conversation Starters",
    content: "Not sure how to begin? No worries! I have conversation starters based on how you're feeling. Just pick your mood and I'll suggest ways to start our chat.",
    characterMessage: "Sometimes it's hard to put feelings into words. I've got your back with helpful prompts!",
    characterEmotion: "supportive"
  },
  {
    id: 5,
    title: "Privacy & Safety",
    content: "Your conversations are private and confidential. If I detect you might be in crisis, I'll provide immediate resources and support. Your safety is my top priority.",
    characterMessage: "You can trust me with anything. I'm programmed to keep you safe and supported.",
    characterEmotion: "caring"
  },
  {
    id: 6,
    title: "Ready to Chat?",
    content: "That's it! You're all set to start chatting. Remember, there's no wrong way to use this space. Share whatever feels right for you, and I'll be here to support you.",
    characterMessage: "I can't wait to get to know you better! Ready for our first conversation?",
    characterEmotion: "happy"
  }
];

const CharacterAvatar = ({ emotion, isAnimating }: { emotion: string; isAnimating: boolean }) => {
  const getCharacterStyle = () => {
    switch (emotion) {
      case "excited":
        return "text-yellow-500 animate-bounce";
      case "caring":
        return "text-pink-500 animate-pulse";
      case "thoughtful":
        return "text-blue-500";
      case "supportive":
        return "text-green-500";
      case "happy":
      default:
        return "text-orange-500";
    }
  };

  return (
    <motion.div
      className={`text-6xl ${getCharacterStyle()} flex items-center justify-center`}
      animate={isAnimating ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    >
      🐕
    </motion.div>
  );
};

const ProgressIndicator = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  return (
    <div className="flex items-center gap-2 mb-6">
      {Array.from({ length: totalSteps }, (_, i) => (
        <motion.div
          key={i}
          className={`h-2 rounded-full transition-all duration-300 ${
            i < currentStep ? "bg-[#59291f] w-8" : "bg-gray-200 w-2"
          }`}
          layoutId={`progress-${i}`}
        />
      ))}
      <span className="text-sm text-gray-500 ml-2">
        {currentStep} of {totalSteps}
      </span>
    </div>
  );
};

export default function OnboardingTutorial({ isOpen, onClose, onComplete }: OnboardingTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setIsAnimating(true);
    }
  }, [isOpen]);

  const currentTutorialStep = tutorialSteps[currentStep];

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 2000);
    } else {
      onComplete();
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 2000);
    }
  };

  const handleSkip = () => {
    onComplete();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#f9dcd1] rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#59291f]" />
            </div>
            <h2 className="text-xl font-semibold text-[#59291f]">Getting Started</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-8">
          <ProgressIndicator currentStep={currentStep + 1} totalSteps={tutorialSteps.length} />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Character Section */}
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <CharacterAvatar emotion={currentTutorialStep.characterEmotion} isAnimating={isAnimating} />
                </div>
                <div className="flex-1">
                  <Card className="bg-[#f9dcd1] border-[#ecb4a7]">
                    <CardContent className="p-4">
                      <p className="text-[#59291f] font-medium">
                        {currentTutorialStep.characterMessage}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Main Content */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {currentTutorialStep.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  {currentTutorialStep.content}
                </p>

                {/* Step-specific highlights */}
                {currentStep === 1 && (
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                      <Heart className="w-8 h-8 text-pink-500 mx-auto mb-2" />
                      <p className="text-sm font-medium">Safe Space</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <MessageCircle className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                      <p className="text-sm font-medium">24/7 Support</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <p className="text-sm font-medium">Private</p>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <Users className="w-6 h-6 text-purple-500 mb-2" />
                      <p className="text-sm font-medium">Social Issues</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Friends, peer pressure, feeling left out</p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <BookOpen className="w-6 h-6 text-blue-500 mb-2" />
                      <p className="text-sm font-medium">Academic Stress</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Exams, grades, college pressure</p>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="mt-6">
                    <Card className="border-[#ecb4a7] bg-gradient-to-r from-[#f9dcd1] to-white dark:to-gray-800">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge className="bg-orange-100 text-orange-800">Feeling Stressed</Badge>
                          <Badge className="bg-blue-100 text-blue-800">Academic Pressure</Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 italic">
                          "I have so much on my plate right now and I don't know where to start..."
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="w-5 h-5 text-red-500" />
                      <p className="font-medium text-red-800 dark:text-red-200">Crisis Support Available</p>
                    </div>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      If you're in crisis, I'll immediately provide emergency resources and professional help.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="text-gray-500 hover:text-gray-700"
          >
            Skip Tutorial
          </Button>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="border-[#ecb4a7] text-[#59291f] hover:bg-[#f9dcd1]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              className="bg-[#59291f] hover:bg-[#59291f]/90 text-white"
            >
              {currentStep === tutorialSteps.length - 1 ? "Get Started!" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}