import { 
  Phone, 
  Heart, 
  GraduationCap, 
  UserCheck, 
  MessageCircle, 
  BookOpen,
  Leaf,
  Moon,
  Target,
  Book,
  Clock,
  Brain,
  Scale,
  Users,
  Hospital,
  School,
  Pill,
  Home,
  Globe,
  Video,
  Smartphone,
  Headphones,
  Info,
  Lightbulb,
  TrendingUp,
  HelpCircle
} from "lucide-react";
import { Link } from "wouter";

export default function ResourcesSection() {
  return (
    <section id="resources" className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Mental Health Resources</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore additional resources and tools to support your mental health journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Crisis Resources */}
          <Link href="/crisis-support" className="block" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center mb-4">
                <Phone className="h-5 w-5 text-red-500 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Crisis Support</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-900">Emergency Numbers by Country</p>
                  <p className="text-sm text-gray-600">Get immediate help in your location</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Mental Health Hotlines</p>
                  <p className="text-sm text-gray-600">24/7 crisis support worldwide</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Suicide Prevention</p>
                  <p className="text-sm text-gray-600">Confidential support resources</p>
                </div>
              </div>
              <div className="mt-4 text-red-600 text-sm font-medium">
                Click to access crisis support →
              </div>
            </div>
          </Link>

          {/* Self-Care Tools */}
          <Link href="/resources" className="block" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#59291f] hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center mb-4">
                <Heart className="h-5 w-5 text-[#59291f] mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Self-Care Tools</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Leaf className="h-4 w-4 text-[#59291f] mr-2" />
                  Interactive breathing exercises
                </li>
                <li className="flex items-center">
                  <Moon className="h-4 w-4 text-[#59291f] mr-2" />
                  Gratitude journal & mindfulness
                </li>
                <li className="flex items-center">
                  <Target className="h-4 w-4 text-[#59291f] mr-2" />
                  Stress management activities
                </li>
                <li className="flex items-center">
                  <Book className="h-4 w-4 text-[#59291f] mr-2" />
                  Quick wellness practices
                </li>
              </ul>
              <div className="mt-4 text-[#59291f] text-sm font-medium">
                Click to explore tools →
              </div>
            </div>
          </Link>

          {/* Academic Support */}
          <Link href="/academic-support" className="block" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#59291f] hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center mb-4">
                <GraduationCap className="h-5 w-5 text-[#59291f] mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Academic Support</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Clock className="h-4 w-4 text-[#59291f] mr-2" />
                  Time management tools
                </li>
                <li className="flex items-center">
                  <Brain className="h-4 w-4 text-[#59291f] mr-2" />
                  Study techniques & tips
                </li>
                <li className="flex items-center">
                  <Scale className="h-4 w-4 text-[#59291f] mr-2" />
                  Academic wellness balance
                </li>
                <li className="flex items-center">
                  <Users className="h-4 w-4 text-[#59291f] mr-2" />
                  Productivity resources
                </li>
              </ul>
              <div className="mt-4 text-[#59291f] text-sm font-medium">
                Click to explore tools →
              </div>
            </div>
          </Link>

          {/* Professional Help */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center mb-4">
              <UserCheck className="h-5 w-5 text-purple-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Professional Help</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <Hospital className="h-4 w-4 text-purple-500 mr-2" />
                Find a therapist
              </li>
              <li className="flex items-center">
                <School className="h-4 w-4 text-purple-500 mr-2" />
                School counselors
              </li>
              <li className="flex items-center">
                <Pill className="h-4 w-4 text-purple-500 mr-2" />
                Psychiatric services
              </li>
              <li className="flex items-center">
                <Home className="h-4 w-4 text-purple-500 mr-2" />
                Family therapy
              </li>
            </ul>
          </div>

          {/* Online Communities */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#59291f]">
            <div className="flex items-center mb-4">
              <MessageCircle className="h-5 w-5 text-[#59291f] mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Communities</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <Globe className="h-4 w-4 text-[#59291f] mr-2" />
                Teen support forums
              </li>
              <li className="flex items-center">
                <Video className="h-4 w-4 text-[#59291f] mr-2" />
                Virtual support groups
              </li>
              <li className="flex items-center">
                <Smartphone className="h-4 w-4 text-[#59291f] mr-2" />
                Mental health apps
              </li>
              <li className="flex items-center">
                <Headphones className="h-4 w-4 text-[#59291f] mr-2" />
                Wellness podcasts
              </li>
            </ul>
          </div>

          {/* Learn More */}
          <Link href="/learn-more" className="block" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#59291f] hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center mb-4">
                <BookOpen className="h-5 w-5 text-[#59291f] mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Learn More</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Info className="h-4 w-4 text-[#59291f] mr-2" />
                  About our mission & approach
                </li>
                <li className="flex items-center">
                  <Lightbulb className="h-4 w-4 text-[#59291f] mr-2" />
                  How our technology works
                </li>
                <li className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-[#59291f] mr-2" />
                  Safety & privacy information
                </li>
                <li className="flex items-center">
                  <HelpCircle className="h-4 w-4 text-[#59291f] mr-2" />
                  When to seek professional help
                </li>
              </ul>
              <div className="mt-4 text-[#59291f] text-sm font-medium">
                Click to learn more →
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
