import { useState, useEffect, useRef } from "react";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import EmergencyBanner from "../components/emergency-banner";
import { 
  Heart, 
  Smile, 
  Brain, 
  Moon, 
  TreePine, 
  Music, 
  BookOpen, 
  Palette, 
  Timer, 
  Zap,
  CheckCircle,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";

export default function ResourcesPage() {
  const [activeBreathingTimer, setActiveBreathingTimer] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState("inhale"); // inhale, hold, exhale
  const [breathingCount, setBreathingCount] = useState(0);
  const [gratitudeItems, setGratitudeItems] = useState<string[]>([]);
  const [newGratitudeItem, setNewGratitudeItem] = useState("");
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isActiveRef = useRef(false);

  const startBreathingExercise = () => {
    setActiveBreathingTimer(true);
    setBreathingCount(0);
    setBreathingPhase("inhale");
    isActiveRef.current = true;
    breathingCycle();
  };

  const stopBreathingExercise = () => {
    setActiveBreathingTimer(false);
    setBreathingPhase("inhale");
    isActiveRef.current = false;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const breathingCycle = () => {
    if (!isActiveRef.current) return;
    
    // Start with inhale phase (4 seconds)
    setBreathingPhase("inhale");
    
    timerRef.current = setTimeout(() => {
      if (!isActiveRef.current) return;
      setBreathingPhase("hold");
      
      // Hold phase (7 seconds)
      timerRef.current = setTimeout(() => {
        if (!isActiveRef.current) return;
        setBreathingPhase("exhale");
        
        // Exhale phase (8 seconds)
        timerRef.current = setTimeout(() => {
          if (!isActiveRef.current) return;
          setBreathingCount(prev => prev + 1);
          breathingCycle(); // Start next cycle
        }, 8000);
      }, 7000);
    }, 4000);
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const addGratitudeItem = () => {
    if (newGratitudeItem.trim()) {
      setGratitudeItems([...gratitudeItems, newGratitudeItem.trim()]);
      setNewGratitudeItem("");
    }
  };

  const removeGratitudeItem = (index: number) => {
    setGratitudeItems(gratitudeItems.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#f9dcd1]">
      <EmergencyBanner />
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#ecb4a7] to-[#f9dcd1] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-[#59291f] mb-4">
            Self-Care Tools & Resources
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover practical tools and techniques to support your mental wellness journey. 
            These resources are designed specifically for teens to help manage stress, build resilience, and maintain emotional balance.
          </p>
        </div>
      </section>

      {/* Interactive Self-Care Tools */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#59291f] mb-8 text-center">Interactive Wellness Tools</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Breathing Exercise */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#59291f]">
              <div className="flex items-center mb-4">
                <TreePine className="h-6 w-6 text-[#59291f] mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">4-7-8 Breathing Exercise</h3>
              </div>
              <p className="text-gray-600 mb-6">
                A calming breathing technique to reduce anxiety and promote relaxation. 
                Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds.
              </p>
              
              <div className="text-center mb-6">
                {activeBreathingTimer ? (
                  <div className="space-y-4">
                    <div className={`w-32 h-32 mx-auto rounded-full border-4 border-[#59291f] flex items-center justify-center transition-all duration-1000 ${
                      breathingPhase === "inhale" ? "scale-110 bg-[#ecb4a7]" : 
                      breathingPhase === "hold" ? "scale-125 bg-[#59291f]" : 
                      "scale-90 bg-[#f9dcd1]"
                    }`}>
                      <span className="text-2xl font-bold text-white capitalize">
                        {breathingPhase}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Cycle {breathingCount + 1}</p>
                    <button
                      onClick={stopBreathingExercise}
                      className="flex items-center justify-center mx-auto px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <Pause className="h-4 w-4 mr-2" />
                      Stop
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-32 h-32 mx-auto rounded-full border-4 border-[#59291f] flex items-center justify-center bg-[#f9dcd1]">
                      <TreePine className="h-12 w-12 text-[#59291f]" />
                    </div>
                    <button
                      onClick={startBreathingExercise}
                      className="flex items-center justify-center mx-auto px-6 py-3 bg-[#59291f] text-white rounded-lg hover:bg-[#59291f]/90 transition-colors"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Breathing Exercise
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Gratitude Journal */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#59291f]">
              <div className="flex items-center mb-4">
                <Heart className="h-6 w-6 text-[#59291f] mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Gratitude Journal</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Write down things you're grateful for. Research shows gratitude practice can improve mood and overall well-being.
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newGratitudeItem}
                    onChange={(e) => setNewGratitudeItem(e.target.value)}
                    placeholder="What are you grateful for today?"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#59291f] focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && addGratitudeItem()}
                  />
                  <button
                    onClick={addGratitudeItem}
                    className="px-4 py-2 bg-[#59291f] text-white rounded-lg hover:bg-[#59291f]/90 transition-colors"
                  >
                    Add
                  </button>
                </div>
                
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {gratitudeItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-[#f9dcd1] rounded-lg">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-[#59291f] mr-2" />
                        <span className="text-gray-800">{item}</span>
                      </div>
                      <button
                        onClick={() => removeGratitudeItem(index)}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {gratitudeItems.length === 0 && (
                    <p className="text-center text-gray-500 py-8">
                      Start by adding something you're grateful for today
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Self-Care Activities */}
          <h2 className="text-2xl font-bold text-[#59291f] mb-8 text-center">Quick Self-Care Activities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 5-Minute Activities */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#59291f]">
              <div className="flex items-center mb-4">
                <Timer className="h-5 w-5 text-[#59291f] mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">5-Minute Breaks</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Take 10 deep breaths
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Stretch your neck and shoulders
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Write down 3 positive thoughts
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Listen to your favorite song
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Do a quick body scan meditation
                </li>
              </ul>
            </div>

            {/* Creative Expression */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#59291f]">
              <div className="flex items-center mb-4">
                <Palette className="h-5 w-5 text-[#59291f] mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Creative Expression</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Doodle or sketch freely
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Write in a personal journal
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Create a mood board
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Try poetry or creative writing
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Make a playlist of mood-boosting songs
                </li>
              </ul>
            </div>

            {/* Mindfulness Moments */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#59291f]">
              <div className="flex items-center mb-4">
                <Brain className="h-5 w-5 text-[#59291f] mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Mindfulness Moments</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Notice 5 things you can see
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Focus on 4 things you can touch
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Listen to 3 sounds around you
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Identify 2 scents you notice
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Think of 1 thing you can taste
                </li>
              </ul>
            </div>

            {/* Physical Wellness */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#59291f]">
              <div className="flex items-center mb-4">
                <Zap className="h-5 w-5 text-[#59291f] mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Physical Wellness</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Take a short walk outside
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Do gentle stretching exercises
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Drink a glass of water mindfully
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Practice progressive muscle relaxation
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Try desk yoga poses
                </li>
              </ul>
            </div>

            {/* Sleep & Rest */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#59291f]">
              <div className="flex items-center mb-4">
                <Moon className="h-5 w-5 text-[#59291f] mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Sleep & Rest</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Create a calming bedtime routine
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Practice a body scan before sleep
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Limit screen time before bed
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Try gentle sleep meditation
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Keep a consistent sleep schedule
                </li>
              </ul>
            </div>

            {/* Social Connection */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#59291f]">
              <div className="flex items-center mb-4">
                <Smile className="h-5 w-5 text-[#59291f] mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Social Connection</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Text a friend to check in
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Share something positive with family
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Join a club or activity you enjoy
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Practice active listening
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Volunteer for a cause you care about
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}