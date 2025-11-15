import Navigation from "../components/navigation";
import Footer from "../components/footer";
import EmergencyBanner from "../components/emergency-banner";
import { 
  Shield, 
  Heart, 
  Users, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  MessageSquare,
  Brain,
  Lock,
  UserCheck,
  Lightbulb,
  Target,
  Award,
  BookOpen,
  Phone,
  Globe,
  ArrowRight,
  Star
} from "lucide-react";

export default function LearnMorePage() {
  return (
    <div className="min-h-screen bg-[#f9dcd1]">
      <EmergencyBanner />
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#ecb4a7] to-[#f9dcd1] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-[#59291f] mb-4">
            About Wishes on Windmills
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Understanding our mission, approach, and commitment to supporting high school students' mental health journey through AI-powered therapeutic conversations and comprehensive wellness resources.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#59291f]">
              <div className="flex items-center mb-6">
                <Heart className="h-8 w-8 text-[#59291f] mr-4" />
                <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Wishes on Windmills exists to provide accessible, confidential, and supportive mental health resources specifically designed for students aged 14-18. We bridge the gap between traditional therapy and peer support by offering AI-powered conversations that understand the unique challenges teenagers face.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#59291f] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Provide immediate, 24/7 emotional support</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#59291f] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Create a safe, judgment-free space for expression</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#59291f] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Connect students with professional resources when needed</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#59291f]">
              <div className="flex items-center mb-6">
                <Target className="h-8 w-8 text-[#59291f] mr-4" />
                <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                We envision a world where every teenager has access to mental health support that meets them where they are. By combining the accessibility of technology with the warmth of human understanding, we're creating a new paradigm for adolescent mental wellness.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Star className="h-5 w-5 text-[#59291f] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Reduce stigma around seeking mental health support</span>
                </li>
                <li className="flex items-start">
                  <Star className="h-5 w-5 text-[#59291f] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Empower teens with coping strategies and self-awareness</span>
                </li>
                <li className="flex items-start">
                  <Star className="h-5 w-5 text-[#59291f] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Foster resilience and emotional intelligence</span>
                </li>
              </ul>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#59291f] text-center mb-12">How Wishes on Windmills Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-[#ecb4a7] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="h-8 w-8 text-[#59291f]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Start a Conversation</h3>
                <p className="text-gray-600">
                  Simply begin typing in our chat interface. Share what's on your mind, ask questions, or explore your feelings in a completely confidential space.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-[#ecb4a7] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Brain className="h-8 w-8 text-[#59291f]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">AI-Powered Support</h3>
                <p className="text-gray-600">
                  Our advanced AI provides thoughtful, empathetic responses tailored to your unique situation, while continuously monitoring for crisis situations.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-[#ecb4a7] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <ArrowRight className="h-8 w-8 text-[#59291f]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Connected</h3>
                <p className="text-gray-600">
                  Access additional resources, self-care tools, and when needed, guidance to professional mental health services in your area.
                </p>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#59291f] text-center mb-12">What Makes Us Different</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#59291f]">
                <div className="flex items-center mb-4">
                  <Clock className="h-6 w-6 text-[#59291f] mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">24/7 Availability</h3>
                </div>
                <p className="text-gray-600">
                  Mental health struggles don't follow a 9-to-5 schedule. Our platform is available whenever you need support, whether it's 3 AM or during lunch break.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#59291f]">
                <div className="flex items-center mb-4">
                  <Shield className="h-6 w-6 text-[#59291f] mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Complete Privacy</h3>
                </div>
                <p className="text-gray-600">
                  Your conversations are completely confidential. We don't require personal information, and your privacy is our top priority.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#59291f]">
                <div className="flex items-center mb-4">
                  <Users className="h-6 w-6 text-[#59291f] mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Teen-Focused Approach</h3>
                </div>
                <p className="text-gray-600">
                  Every aspect of our platform is designed specifically for high school students, understanding the unique pressures and challenges you face.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#59291f]">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-[#59291f] mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Crisis Detection</h3>
                </div>
                <p className="text-gray-600">
                  Our AI is trained to recognize signs of crisis and immediately provide appropriate resources and emergency contact information.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#59291f]">
                <div className="flex items-center mb-4">
                  <Lightbulb className="h-6 w-6 text-[#59291f] mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Interactive Tools</h3>
                </div>
                <p className="text-gray-600">
                  Beyond conversations, we offer practical tools like breathing exercises, gratitude journals, and academic support resources.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#59291f]">
                <div className="flex items-center mb-4">
                  <BookOpen className="h-6 w-6 text-[#59291f] mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Educational Resources</h3>
                </div>
                <p className="text-gray-600">
                  Learn about mental health, develop coping strategies, and gain insights into managing stress, anxiety, and other common teen challenges.
                </p>
              </div>
            </div>
          </div>

          {/* Safety & Limitations */}
          <div className="bg-yellow-50 rounded-xl p-8 border-l-4 border-yellow-400 mb-16">
            <div className="flex items-center mb-6">
              <AlertTriangle className="h-8 w-8 text-yellow-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">Important Safety Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">What We Are</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span>A supportive companion for daily mental wellness</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span>A bridge to professional mental health resources</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span>A safe space to explore thoughts and feelings</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span>A resource for coping strategies and self-care tools</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">What We Are Not</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-red-600 mr-2 mt-1 flex-shrink-0" />
                    <span>A replacement for professional therapy or counseling</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-red-600 mr-2 mt-1 flex-shrink-0" />
                    <span>A medical diagnosis or treatment provider</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-red-600 mr-2 mt-1 flex-shrink-0" />
                    <span>An emergency crisis intervention service</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-red-600 mr-2 mt-1 flex-shrink-0" />
                    <span>A substitute for medication or medical care</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* When to Seek Professional Help */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#59291f] mb-16">
            <div className="flex items-center mb-6">
              <UserCheck className="h-8 w-8 text-[#59291f] mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">When to Seek Professional Help</h2>
            </div>
            <p className="text-gray-600 mb-6">
              While Wishes on Windmills provides valuable support, there are times when professional intervention is necessary. Consider reaching out to a mental health professional if you experience:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Phone className="h-5 w-5 text-[#59291f] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Persistent thoughts of self-harm or suicide</span>
                </li>
                <li className="flex items-start">
                  <Phone className="h-5 w-5 text-[#59291f] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Severe anxiety or panic attacks that interfere with daily life</span>
                </li>
                <li className="flex items-start">
                  <Phone className="h-5 w-5 text-[#59291f] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Depression that lasts for weeks or months</span>
                </li>
                <li className="flex items-start">
                  <Phone className="h-5 w-5 text-[#59291f] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Substance abuse or addiction concerns</span>
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Phone className="h-5 w-5 text-[#59291f] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Eating disorders or unhealthy relationships with food</span>
                </li>
                <li className="flex items-start">
                  <Phone className="h-5 w-5 text-[#59291f] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Trauma or abuse experiences</span>
                </li>
                <li className="flex items-start">
                  <Phone className="h-5 w-5 text-[#59291f] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Significant changes in sleep, appetite, or behavior</span>
                </li>
                <li className="flex items-start">
                  <Phone className="h-5 w-5 text-[#59291f] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Inability to function in school or relationships</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Technology & Privacy */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#59291f]">
              <div className="flex items-center mb-6">
                <Brain className="h-8 w-8 text-[#59291f] mr-4" />
                <h2 className="text-2xl font-bold text-gray-900">Our Technology</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Wishes on Windmills uses advanced AI technology specifically trained to understand and respond to teenage mental health concerns. Our system:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Award className="h-5 w-5 text-[#59291f] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Uses state-of-the-art natural language processing</span>
                </li>
                <li className="flex items-start">
                  <Award className="h-5 w-5 text-[#59291f] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Continuously learns from interactions (anonymously)</span>
                </li>
                <li className="flex items-start">
                  <Award className="h-5 w-5 text-[#59291f] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Maintains conversation context for meaningful dialogue</span>
                </li>
                <li className="flex items-start">
                  <Award className="h-5 w-5 text-[#59291f] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Provides crisis detection and appropriate resources</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#59291f]">
              <div className="flex items-center mb-6">
                <Lock className="h-8 w-8 text-[#59291f] mr-4" />
                <h2 className="text-2xl font-bold text-gray-900">Your Privacy</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Your privacy and safety are our highest priorities. Here's how we protect your information:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Shield className="h-5 w-5 text-[#59291f] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">No personal information required to use the platform</span>
                </li>
                <li className="flex items-start">
                  <Shield className="h-5 w-5 text-[#59291f] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Conversations are encrypted and secure</span>
                </li>
                <li className="flex items-start">
                  <Shield className="h-5 w-5 text-[#59291f] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Data is anonymized for safety and improvement purposes</span>
                </li>
                <li className="flex items-start">
                  <Shield className="h-5 w-5 text-[#59291f] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">No sharing with parents, schools, or third parties</span>
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