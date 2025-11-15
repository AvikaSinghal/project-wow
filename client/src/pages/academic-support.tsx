import { useState } from "react";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import EmergencyBanner from "../components/emergency-banner";
import { 
  BookOpen, 
  Clock, 
  Target, 
  Brain, 
  Calendar, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Timer, 
  Coffee, 
  PenTool,
  Users,
  Lightbulb,
  TrendingUp,
  Award,
  AlertCircle,
  Star,
  BarChart3
} from "lucide-react";

interface StudySession {
  id: string;
  subject: string;
  duration: number;
  completed: boolean;
  date: string;
}

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
}

export default function AcademicSupportPage() {
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutes in seconds
  const [pomodoroMode, setPomodoroMode] = useState<"work" | "break">("work");
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    subject: "",
    dueDate: "",
    priority: "medium" as "high" | "medium" | "low"
  });

  // Pomodoro Timer Functions
  const startPomodoro = () => {
    setPomodoroActive(true);
    const timer = setInterval(() => {
      setPomodoroTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setPomodoroActive(false);
          // Switch between work and break
          if (pomodoroMode === "work") {
            setPomodoroMode("break");
            setPomodoroTime(5 * 60); // 5 minute break
          } else {
            setPomodoroMode("work");
            setPomodoroTime(25 * 60); // 25 minute work session
          }
          return pomodoroMode === "work" ? 5 * 60 : 25 * 60;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopPomodoro = () => {
    setPomodoroActive(false);
    setPomodoroTime(25 * 60);
    setPomodoroMode("work");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Assignment Management
  const addAssignment = () => {
    if (newAssignment.title && newAssignment.subject && newAssignment.dueDate) {
      const assignment: Assignment = {
        id: Date.now().toString(),
        ...newAssignment,
        completed: false
      };
      setAssignments([...assignments, assignment]);
      setNewAssignment({ title: "", subject: "", dueDate: "", priority: "medium" });
    }
  };

  const toggleAssignment = (id: string) => {
    setAssignments(assignments.map(assignment => 
      assignment.id === id ? { ...assignment, completed: !assignment.completed } : assignment
    ));
  };

  const deleteAssignment = (id: string) => {
    setAssignments(assignments.filter(assignment => assignment.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-50 border-red-200";
      case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-[#f9dcd1]">
      <EmergencyBanner />
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#ecb4a7] to-[#f9dcd1] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-[#59291f] mb-4">
            Academic Support & Study Tools
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Master your studies with proven techniques, stress management strategies, and productivity tools designed specifically for students.
          </p>
        </div>
      </section>

      {/* Interactive Study Tools */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#59291f] mb-8 text-center">Study Productivity Tools</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Pomodoro Timer */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#59291f]">
              <div className="flex items-center mb-4">
                <Timer className="h-6 w-6 text-[#59291f] mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Pomodoro Study Timer</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Boost focus with 25-minute study sessions followed by 5-minute breaks. This technique improves concentration and prevents burnout.
              </p>
              
              <div className="text-center mb-6">
                <div className={`w-40 h-40 mx-auto rounded-full border-8 flex items-center justify-center transition-all duration-300 ${
                  pomodoroMode === "work" ? "border-[#59291f] bg-[#ecb4a7]" : "border-green-500 bg-green-100"
                }`}>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">
                      {formatTime(pomodoroTime)}
                    </div>
                    <div className="text-sm text-gray-600 capitalize">
                      {pomodoroMode} Time
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 space-x-2">
                  {!pomodoroActive ? (
                    <button
                      onClick={startPomodoro}
                      className="px-6 py-3 bg-[#59291f] text-white rounded-lg hover:bg-[#59291f]/90 transition-colors"
                    >
                      Start Session
                    </button>
                  ) : (
                    <button
                      onClick={stopPomodoro}
                      className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Stop Session
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Assignment Tracker */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#59291f]">
              <div className="flex items-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-[#59291f] mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Assignment Tracker</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Stay organized with your assignments and deadlines. Never miss another due date.
              </p>
              
              {/* Add Assignment Form */}
              <div className="space-y-3 mb-4">
                <input
                  type="text"
                  placeholder="Assignment title"
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#59291f] focus:border-transparent text-sm"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Subject"
                    value={newAssignment.subject}
                    onChange={(e) => setNewAssignment({...newAssignment, subject: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#59291f] focus:border-transparent text-sm"
                  />
                  <input
                    type="date"
                    value={newAssignment.dueDate}
                    onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#59291f] focus:border-transparent text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={newAssignment.priority}
                    onChange={(e) => setNewAssignment({...newAssignment, priority: e.target.value as "high" | "medium" | "low"})}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#59291f] focus:border-transparent text-sm"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                  <button
                    onClick={addAssignment}
                    className="px-4 py-2 bg-[#59291f] text-white rounded-lg hover:bg-[#59291f]/90 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Assignment List */}
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className={`p-3 rounded-lg border ${assignment.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => toggleAssignment(assignment.id)}
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            assignment.completed ? 'bg-[#59291f] border-[#59291f]' : 'border-gray-300'
                          }`}
                        >
                          {assignment.completed && <CheckCircle2 className="h-3 w-3 text-white" />}
                        </button>
                        <div className={assignment.completed ? 'opacity-50' : ''}>
                          <div className={`font-medium ${assignment.completed ? 'line-through' : ''}`}>
                            {assignment.title}
                          </div>
                          <div className="text-sm text-gray-600">
                            {assignment.subject} • Due: {new Date(assignment.dueDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(assignment.priority)}`}>
                          {assignment.priority}
                        </span>
                        <button
                          onClick={() => deleteAssignment(assignment.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {assignments.length === 0 && (
                  <p className="text-center text-gray-500 py-8">
                    Add your first assignment to get started
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Study Techniques & Tips */}
          <h2 className="text-2xl font-bold text-[#59291f] mb-8 text-center">Proven Study Techniques</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Active Learning */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#59291f]">
              <div className="flex items-center mb-4">
                <Brain className="h-5 w-5 text-[#59291f] mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Active Learning</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Summarize chapters in your own words
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Create mind maps and concept diagrams
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Teach concepts to a friend or family member
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Ask yourself questions while reading
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Connect new info to what you already know
                </li>
              </ul>
            </div>

            {/* Memory Techniques */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#59291f]">
              <div className="flex items-center mb-4">
                <Lightbulb className="h-5 w-5 text-[#59291f] mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Memory Boosters</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Use acronyms and mnemonics
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Practice spaced repetition
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Create vivid mental images
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Use flashcards for key terms
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Review before sleep and after waking
                </li>
              </ul>
            </div>

            {/* Time Management */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#59291f]">
              <div className="flex items-center mb-4">
                <Clock className="h-5 w-5 text-[#59291f] mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Time Management</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Break large tasks into smaller chunks
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Use a planner or digital calendar
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Set specific study goals each day
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Eliminate distractions during study
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Schedule regular breaks
                </li>
              </ul>
            </div>

            {/* Test Preparation */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#59291f]">
              <div className="flex items-center mb-4">
                <Award className="h-5 w-5 text-[#59291f] mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Test Prep Strategies</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Practice with past exams and quizzes
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Form study groups with classmates
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Create a study schedule weeks ahead
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Get plenty of sleep before tests
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Practice relaxation techniques
                </li>
              </ul>
            </div>

            {/* Academic Stress Management */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#59291f]">
              <div className="flex items-center mb-4">
                <AlertCircle className="h-5 w-5 text-[#59291f] mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Stress Management</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Practice deep breathing before exams
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Maintain a balanced perspective
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Talk to teachers about concerns
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Take regular study breaks
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Celebrate small achievements
                </li>
              </ul>
            </div>

            {/* Learning Styles */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#59291f]">
              <div className="flex items-center mb-4">
                <TrendingUp className="h-5 w-5 text-[#59291f] mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Learning Styles</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Visual: Use charts, diagrams, colors
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Auditory: Record and listen to notes
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Kinesthetic: Use hands-on activities
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Reading: Summarize and rewrite notes
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#59291f] rounded-full mr-2"></span>
                  Mix methods for best results
                </li>
              </ul>
            </div>
          </div>

          {/* Academic Wellness Tips */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#59291f]">
            <h2 className="text-2xl font-bold text-[#59291f] mb-6 text-center">Academic Wellness & Balance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 text-[#59291f] mr-2" />
                  Maintaining Balance
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <Star className="h-4 w-4 text-[#59291f] mr-2 mt-1 flex-shrink-0" />
                    <span>Set realistic academic goals and celebrate progress</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="h-4 w-4 text-[#59291f] mr-2 mt-1 flex-shrink-0" />
                    <span>Balance study time with hobbies and social activities</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="h-4 w-4 text-[#59291f] mr-2 mt-1 flex-shrink-0" />
                    <span>Don't compare yourself to others - focus on your growth</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="h-4 w-4 text-[#59291f] mr-2 mt-1 flex-shrink-0" />
                    <span>Ask for help when you need it - it's a sign of strength</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Coffee className="h-5 w-5 text-[#59291f] mr-2" />
                  Healthy Study Habits
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <Star className="h-4 w-4 text-[#59291f] mr-2 mt-1 flex-shrink-0" />
                    <span>Create a dedicated, organized study space</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="h-4 w-4 text-[#59291f] mr-2 mt-1 flex-shrink-0" />
                    <span>Stay hydrated and eat brain-healthy snacks</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="h-4 w-4 text-[#59291f] mr-2 mt-1 flex-shrink-0" />
                    <span>Get 8-9 hours of sleep for better memory retention</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="h-4 w-4 text-[#59291f] mr-2 mt-1 flex-shrink-0" />
                    <span>Exercise regularly to reduce stress and improve focus</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}