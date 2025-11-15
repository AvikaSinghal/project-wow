import { useState } from "react";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import EmergencyBanner from "../components/emergency-banner";
import { ChevronDown, ChevronUp, HelpCircle, Shield, MessageSquare, Clock, Heart, Globe } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // Getting Started
  {
    id: "what-is-wishes",
    question: "What is Wishes on Windmills?",
    answer: "Wishes on Windmills is an AI-powered mental health support platform specifically designed for students (ages 14-18). We provide 24/7 accessible therapeutic conversations, crisis resources, academic support tools, and comprehensive mental health resources in a safe, confidential environment.",
    category: "Getting Started"
  },
  {
    id: "how-to-start",
    question: "How do I get started?",
    answer: "You can start using our basic chat feature immediately as a guest, or create an account for access to advanced features like session history, academic tools, and progress tracking. Simply visit our homepage and click 'Start Conversation' to begin your journey.",
    category: "Getting Started"
  },
  {
    id: "who-can-use",
    question: "Who can use this service?",
    answer: "Our platform is designed specifically for students aged 14-18. However, parents, teachers, and counselors can also access our resources to better understand how to support teenagers in their mental health journey.",
    category: "Getting Started"
  },

  // Safety & Privacy
  {
    id: "is-it-safe",
    question: "Is my information safe and private?",
    answer: "Yes, we take your privacy very seriously. All conversations are encrypted and confidential. We follow strict data protection protocols and never share your personal information without your consent. Your safety and privacy are our top priorities.",
    category: "Safety & Privacy"
  },
  {
    id: "crisis-detection",
    question: "What happens if I'm in crisis?",
    answer: "Our AI system includes crisis detection capabilities. If we detect that you may be in immediate danger, we will immediately provide you with emergency resources, crisis hotlines, and encourage you to reach out for professional help. We have 24/7 crisis resources available for 194 countries worldwide.",
    category: "Safety & Privacy"
  },
  {
    id: "confidentiality",
    question: "Will you tell my parents or school about our conversations?",
    answer: "Your conversations are private and confidential. We do not share information with parents, schools, or anyone else without your consent, except in cases where there is immediate risk of harm to yourself or others, as required by law.",
    category: "Safety & Privacy"
  },

  // How It Works
  {
    id: "how-ai-works",
    question: "How does the AI therapist work?",
    answer: "Our AI uses advanced natural language processing trained specifically for therapeutic conversations with teenagers. It provides empathetic, age-appropriate responses and can help you explore your feelings, develop coping strategies, and work through challenges. While highly sophisticated, it's designed to complement, not replace, professional human therapy.",
    category: "How It Works"
  },
  {
    id: "available-247",
    question: "Is the service available 24/7?",
    answer: "Yes! Our AI support is available 24 hours a day, 7 days a week. Whether you're dealing with late-night anxiety, early morning stress, or need support during a difficult moment, we're always here for you.",
    category: "How It Works"
  },
  {
    id: "conversation-topics",
    question: "What topics can I discuss?",
    answer: "You can discuss anything on your mind - anxiety, depression, school stress, relationship issues, family problems, identity questions, academic pressure, social challenges, and more. Our AI is trained to handle a wide range of mental health topics relevant to teenagers.",
    category: "How It Works"
  },

  // Features & Tools
  {
    id: "academic-support",
    question: "What academic support tools are available?",
    answer: "We offer various academic wellness tools including a Pomodoro timer for focused study sessions, assignment tracking, stress management techniques for test anxiety, time management strategies, and study productivity resources designed specifically for high school students.",
    category: "Features & Tools"
  },
  {
    id: "self-care-tools",
    question: "What self-care tools do you provide?",
    answer: "Our self-care toolkit includes guided breathing exercises, gratitude journaling, mindfulness activities, mood tracking, stress relief techniques, and quick wellness activities you can do anywhere. All tools are designed to fit into a busy student schedule.",
    category: "Features & Tools"
  },
  {
    id: "crisis-resources",
    question: "What crisis resources are available?",
    answer: "We provide comprehensive crisis support including emergency numbers for 194 countries, mental health hotlines, suicide prevention resources, local crisis centers, and immediate safety planning tools. Our crisis support page is organized by country for easy access to local resources.",
    category: "Features & Tools"
  },

  // Limitations & Professional Help
  {
    id: "ai-limitations",
    question: "What are the limitations of AI therapy?",
    answer: "While our AI is highly sophisticated, it cannot replace human professional therapy. It cannot prescribe medications, provide official diagnoses, or handle severe mental health crises. For serious mental health conditions, trauma, or persistent issues, we strongly encourage seeking professional human support.",
    category: "Limitations & Professional Help"
  },
  {
    id: "when-seek-professional",
    question: "When should I seek professional help?",
    answer: "Consider professional help if you're experiencing persistent sadness, thoughts of self-harm, substance abuse, severe anxiety that impacts daily life, trauma, eating disorders, or if problems persist despite using our tools. We can help you find local mental health resources.",
    category: "Limitations & Professional Help"
  },
  {
    id: "emergency-situations",
    question: "What should I do in an emergency?",
    answer: "If you're in immediate danger, please call your local emergency services (911 in US, 112 in Europe, etc.) or go to your nearest emergency room. For suicidal thoughts, contact your local suicide prevention hotline. Our crisis support page has emergency numbers for 194 countries.",
    category: "Limitations & Professional Help"
  },

  // Account & Technical
  {
    id: "account-required",
    question: "Do I need to create an account?",
    answer: "No account is required for basic chat functionality. However, creating an account gives you access to advanced features like conversation history, academic tools, progress tracking, and personalized resources. Guest users can use the chat feature without registration.",
    category: "Account & Technical"
  },
  {
    id: "cost",
    question: "How much does it cost?",
    answer: "Wishes on Windmills is completely free to use. We believe mental health support should be accessible to all students, regardless of financial circumstances. All features including AI conversations, crisis resources, and wellness tools are provided at no cost.",
    category: "Account & Technical"
  },
  {
    id: "mobile-friendly",
    question: "Can I use this on my phone?",
    answer: "Yes! Our platform is fully mobile-responsive and works seamlessly on smartphones, tablets, laptops, and desktop computers. You can access support wherever you are, whenever you need it.",
    category: "Account & Technical"
  }
];

const categories = [
  "Getting Started",
  "Safety & Privacy", 
  "How It Works",
  "Features & Tools",
  "Limitations & Professional Help",
  "Account & Technical"
];

const categoryIcons = {
  "Getting Started": HelpCircle,
  "Safety & Privacy": Shield,
  "How It Works": MessageSquare,
  "Features & Tools": Heart,
  "Limitations & Professional Help": Clock,
  "Account & Technical": Globe
};

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = selectedCategory === "All" 
    ? faqData 
    : faqData.filter(faq => faq.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#f9dcd1]">
      <EmergencyBanner />
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#ecb4a7] to-[#f9dcd1] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-[#59291f] mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Find answers to common questions about Wishes on Windmills, our AI-powered mental health support, and how we can help you on your wellness journey.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-[#59291f] mb-4">Browse by Category</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === "All"
                    ? "bg-[#59291f] text-white"
                    : "bg-white text-gray-700 hover:bg-[#ecb4a7]"
                }`}
              >
                All Questions
              </button>
              {categories.map(category => {
                const Icon = categoryIcons[category as keyof typeof categoryIcons];
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${
                      selectedCategory === category
                        ? "bg-[#59291f] text-white"
                        : "bg-white text-gray-700 hover:bg-[#ecb4a7]"
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-1" />
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQs.map((faq) => {
              const isOpen = openItems.includes(faq.id);
              const Icon = categoryIcons[faq.category as keyof typeof categoryIcons];
              
              return (
                <div key={faq.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <Icon className="h-5 w-5 text-[#59291f] mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                        <span className="text-xs text-gray-500 mt-1">{faq.category}</span>
                      </div>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-4">
                      <div className="border-l-4 border-[#ecb4a7] pl-4">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-semibold text-[#59291f] mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-700 mb-6">
              If you couldn't find the answer you're looking for, we're here to help. 
              Start a conversation with our AI assistant or check out our crisis resources for immediate support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="bg-[#59291f] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#4a1f17] transition-colors"
              >
                Start a Conversation
              </a>
              <a
                href="/crisis-support"
                className="bg-white text-[#59291f] border-2 border-[#59291f] px-6 py-3 rounded-lg font-medium hover:bg-[#f9dcd1] transition-colors"
              >
                Crisis Resources
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}