import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Emotion = 
  | "happy" 
  | "caring" 
  | "thoughtful" 
  | "supportive" 
  | "excited" 
  | "concerned" 
  | "neutral" 
  | "listening"
  | "encouraging";

interface AvatarDisplayProps {
  emotion?: Emotion;
  size?: "sm" | "md" | "lg";
  className?: string;
  animate?: boolean;
}

export default function AvatarDisplay({ 
  emotion = "neutral", 
  size = "md", 
  className = "",
  animate = true 
}: AvatarDisplayProps) {
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>(emotion);

  useEffect(() => {
    setCurrentEmotion(emotion);
  }, [emotion]);

  const sizeClasses = {
    sm: "w-14 h-16",
    md: "w-20 h-24", 
    lg: "w-28 h-32"
  };

  const getAvatarSvg = (emotion: Emotion) => {
    const goldenColor = "#ffd700"; // Golden yellow
    const lightGolden = "#fffacd"; // Light golden
    const darkGolden = "#daa520"; // Darker golden for shading
    const eyeColor = "#654321"; // Warm brown eyes
    const noseColor = "#000000"; // Black nose
    
    return (
      <svg viewBox="0 0 100 120" className="w-full h-full">
        {/* Body */}
        <ellipse cx="50" cy="85" rx="25" ry="20" fill={goldenColor} stroke={darkGolden} strokeWidth="1"/>
        
        {/* Body shading */}
        <ellipse cx="45" cy="82" rx="18" ry="15" fill={lightGolden} opacity="0.7"/>
        
        {/* Chest patch */}
        <ellipse cx="50" cy="80" rx="12" ry="8" fill={lightGolden}/>
        
        {/* Front legs */}
        <ellipse cx="40" cy="100" rx="5" ry="12" fill={goldenColor}/>
        <ellipse cx="60" cy="100" rx="5" ry="12" fill={goldenColor}/>
        
        {/* Front paws */}
        <ellipse cx="40" cy="108" rx="4" ry="5" fill={darkGolden}/>
        <ellipse cx="60" cy="108" rx="4" ry="5" fill={darkGolden}/>
        
        {/* Back legs (partially visible) */}
        <ellipse cx="35" cy="95" rx="4" ry="8" fill={goldenColor} opacity="0.8"/>
        <ellipse cx="65" cy="95" rx="4" ry="8" fill={goldenColor} opacity="0.8"/>
        
        {/* Head */}
        <ellipse cx="50" cy="45" rx="22" ry="20" fill={goldenColor} stroke={darkGolden} strokeWidth="1"/>
        
        {/* Head shading for depth */}
        <ellipse cx="45" cy="42" rx="15" ry="16" fill={lightGolden} opacity="0.6"/>
        
        {/* Muzzle */}
        <ellipse cx="50" cy="55" rx="12" ry="8" fill={lightGolden}/>
        <ellipse cx="50" cy="58" rx="8" ry="5" fill={goldenColor}/>
        
        {/* Golden Retriever ears - long and floppy */}
        <motion.ellipse 
          cx="30" cy="35" rx="8" ry="15" fill={goldenColor} stroke={darkGolden} strokeWidth="1"
          initial={{ rotate: -20 }}
          animate={{ 
            rotate: emotion === "excited" ? -30 : 
                    emotion === "concerned" ? -10 : 
                    emotion === "listening" ? -35 : -20 
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
        <motion.ellipse 
          cx="70" cy="35" rx="8" ry="15" fill={goldenColor} stroke={darkGolden} strokeWidth="1"
          initial={{ rotate: 20 }}
          animate={{ 
            rotate: emotion === "excited" ? 30 : 
                    emotion === "concerned" ? 10 : 
                    emotion === "listening" ? 35 : 20 
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
        
        {/* Inner ears */}
        <ellipse cx="32" cy="38" rx="4" ry="8" fill="#ff6b6b" opacity="0.4"/>
        <ellipse cx="68" cy="38" rx="4" ry="8" fill="#ff6b6b" opacity="0.4"/>
        
        {/* Eyes - friendly golden retriever eyes */}
        <motion.g
          initial={{ scale: 1 }}
          animate={{ 
            scale: emotion === "excited" ? 1.15 : 
                   emotion === "concerned" ? 0.9 : 1 
          }}
          transition={{ duration: 0.4 }}
        >
          {/* Eye shapes */}
          <ellipse cx="42" cy="42" rx="5" ry="6" fill="white"/>
          <ellipse cx="58" cy="42" rx="5" ry="6" fill="white"/>
          
          {/* Pupils */}
          <motion.circle 
            cx="42" cy="43" r="3" fill={eyeColor}
            animate={{
              scaleY: emotion === "happy" || emotion === "excited" ? 0.6 : 1,
              y: emotion === "happy" || emotion === "excited" ? 1 : 0
            }}
          />
          <motion.circle 
            cx="58" cy="43" r="3" fill={eyeColor}
            animate={{
              scaleY: emotion === "happy" || emotion === "excited" ? 0.6 : 1,
              y: emotion === "happy" || emotion === "excited" ? 1 : 0
            }}
          />
          
          {/* Eye highlights */}
          <circle cx="43" cy="41" r="1" fill="white" opacity="0.9"/>
          <circle cx="59" cy="41" r="1" fill="white" opacity="0.9"/>
        </motion.g>
        
        {/* Eyebrows for expression */}
        <motion.g
          animate={{
            y: emotion === "concerned" ? -2 : 
               emotion === "thoughtful" ? -1 : 0
          }}
        >
          <path d="M38,36 Q42,34 46,36" stroke={darkGolden} strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M54,36 Q58,34 62,36" stroke={darkGolden} strokeWidth="2" fill="none" strokeLinecap="round"/>
        </motion.g>
        
        {/* Nose - classic dog nose */}
        <motion.ellipse 
          cx="50" cy="52" rx="3" ry="2.5" fill={noseColor}
          initial={{ scale: 1 }}
          animate={{ scale: emotion === "excited" ? 1.2 : 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Nostrils */}
        <ellipse cx="49" cy="52" rx="0.8" ry="0.5" fill="white" opacity="0.3"/>
        <ellipse cx="51" cy="52" rx="0.8" ry="0.5" fill="white" opacity="0.3"/>
        
        {/* Mouth line from nose */}
        <line x1="50" y1="54.5" x2="50" y2="58" stroke={noseColor} strokeWidth="1.5"/>
        
        {/* Mouth expressions */}
        <motion.g
          initial={{ opacity: 0, y: 2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {emotion === "happy" || emotion === "excited" || emotion === "encouraging" ? (
            <path d="M42,60 Q50,68 58,60" stroke={noseColor} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          ) : emotion === "concerned" ? (
            <path d="M42,63 Q50,58 58,63" stroke={noseColor} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          ) : emotion === "caring" || emotion === "supportive" ? (
            <path d="M45,61 Q50,64 55,61" stroke={noseColor} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          ) : (
            <line x1="46" y1="61" x2="54" y2="61" stroke={noseColor} strokeWidth="2" strokeLinecap="round"/>
          )}
        </motion.g>
        
        {/* Tongue for happy emotions */}
        {(emotion === "excited" || emotion === "happy") && (
          <motion.ellipse 
            cx="50" cy="65" rx="4" ry="3" fill="#ff69b4"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          />
        )}
        
        {/* Tail - full body view */}
        {animate && (
          <motion.path 
            d="M75,85 Q85,75 82,65 Q80,55 75,60 Q73,65 75,70"
            stroke={goldenColor} 
            strokeWidth="6" 
            fill="none"
            strokeLinecap="round"
            initial={{ rotate: 0 }}
            animate={{ 
              rotate: emotion === "excited" ? [0, 25, -25, 0] : 
                     emotion === "happy" ? [0, 20, -20, 0] :
                     emotion === "supportive" ? [0, 10, -10, 0] : 
                     emotion === "encouraging" ? [0, 15, -15, 0] : 0
            }}
            transition={{ 
              duration: emotion === "excited" ? 0.5 : 
                       emotion === "happy" ? 0.8 : 1.2, 
              repeat: (emotion === "excited" || emotion === "happy" || emotion === "supportive" || emotion === "encouraging") ? Infinity : 0,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            style={{ transformOrigin: "75 85" }}
          />
        )}
        
        {/* Tail tip */}
        {animate && (
          <motion.circle 
            cx="75" cy="60" r="3" fill={lightGolden}
            initial={{ rotate: 0 }}
            animate={{ 
              rotate: emotion === "excited" ? [0, 25, -25, 0] : 
                     emotion === "happy" ? [0, 20, -20, 0] :
                     emotion === "supportive" ? [0, 10, -10, 0] : 
                     emotion === "encouraging" ? [0, 15, -15, 0] : 0
            }}
            transition={{ 
              duration: emotion === "excited" ? 0.5 : 
                       emotion === "happy" ? 0.8 : 1.2, 
              repeat: (emotion === "excited" || emotion === "happy" || emotion === "supportive" || emotion === "encouraging") ? Infinity : 0,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            style={{ transformOrigin: "75 85" }}
          />
        )}
        
        {/* Collar */}
        <rect x="35" y="65" width="30" height="4" rx="2" fill="#dc143c"/>
        <circle cx="50" cy="67" r="2" fill="#ffd700"/>
        
        {/* Body spots/markings for authenticity */}
        <ellipse cx="45" cy="88" rx="3" ry="2" fill={darkGolden} opacity="0.4"/>
        <ellipse cx="58" cy="92" rx="2" ry="1.5" fill={darkGolden} opacity="0.4"/>
      </svg>
    );
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentEmotion}
          initial={animate ? { scale: 0.8, opacity: 0 } : { scale: 1, opacity: 1 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={animate ? { scale: 0.8, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          {getAvatarSvg(currentEmotion)}
        </motion.div>
      </AnimatePresence>
      
      {/* Emotion indicator (optional) */}
      {animate && (
        <motion.div
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-[#f9dcd1] text-[#59291f] text-xs px-2 py-1 rounded-full shadow-sm">
            {currentEmotion}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Hook for managing avatar emotions based on conversation context
export function useAvatarEmotion() {
  const [emotion, setEmotion] = useState<Emotion>("neutral");

  const updateEmotionFromMessage = (message: string, isUserMessage: boolean = false) => {
    if (isUserMessage) {
      // Analyze user message and respond with appropriate emotion
      const lowerMessage = message.toLowerCase();
      
      if (lowerMessage.includes("bye") || lowerMessage.includes("goodbye")) {
        setEmotion("caring");
      } else if (lowerMessage.includes("help") || lowerMessage.includes("stressed") || lowerMessage.includes("worried")) {
        setEmotion("supportive");
      } else if (lowerMessage.includes("happy") || lowerMessage.includes("excited") || lowerMessage.includes("great")) {
        setEmotion("happy");
      } else if (lowerMessage.includes("sad") || lowerMessage.includes("down") || lowerMessage.includes("depressed")) {
        setEmotion("concerned");
      } else {
        setEmotion("listening");
      }
    } else {
      // AI is responding - show thoughtful then appropriate emotion
      setEmotion("thoughtful");
      setTimeout(() => {
        const lowerMessage = message.toLowerCase();
        if (lowerMessage.includes("sorry to hear") || lowerMessage.includes("understand")) {
          setEmotion("caring");
        } else if (lowerMessage.includes("congratulations") || lowerMessage.includes("awesome") || lowerMessage.includes("excited")) {
          setEmotion("excited");
        } else if (lowerMessage.includes("here to help") || lowerMessage.includes("support")) {
          setEmotion("supportive");
        } else {
          setEmotion("encouraging");
        }
      }, 1000);
    }
  };

  const setEmotionDirectly = (newEmotion: Emotion) => {
    setEmotion(newEmotion);
  };

  return {
    emotion,
    updateEmotionFromMessage,
    setEmotion: setEmotionDirectly
  };
}