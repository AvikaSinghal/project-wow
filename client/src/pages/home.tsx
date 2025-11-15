import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MessageCircle, Brain, HelpCircle } from "lucide-react";
import EmergencyBanner from "@/components/emergency-banner";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ResourcesSection from "@/components/resources-section";
import SafetyDisclaimers from "@/components/safety-disclaimers";
import Footer from "@/components/footer";
import OnboardingTutorial from "@/components/onboarding-tutorial";
import { useOnboarding } from "@/hooks/useOnboarding";

export default function HomePage() {
  const { showOnboarding, completeOnboarding, closeOnboarding, resetOnboarding, hasCompletedOnboarding } = useOnboarding();
  
  return (
    <div className="min-h-screen bg-[#f9dcd1]">
      <EmergencyBanner />
      <Navigation />
      
      {/* Help Button for returning users */}
      {hasCompletedOnboarding && (
        <div className="fixed bottom-6 right-6 z-40">
          <Button
            onClick={resetOnboarding}
            className="bg-[#59291f] hover:bg-[#59291f]/90 text-white rounded-full p-3 shadow-lg"
            title="Restart Tutorial"
          >
            <HelpCircle className="w-5 h-5" />
          </Button>
        </div>
      )}
      
      <HeroSection />
      
      {/* AI Support Chat Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Brain className="h-10 w-10 text-[#59291f]" />
              <h2 className="text-4xl font-bold text-[#59291f]">AI Support Chat</h2>
            </div>
            <div className="space-y-4 max-w-3xl mx-auto">
              <p className="text-gray-700 text-xl leading-relaxed">
                Share what's on your mind in a safe, supportive space. I'm here to listen and help you navigate whatever you're going through.
              </p>
              <p className="text-[#59291f] text-lg font-medium">
                I'm Project WOW — here to help you feel a little more "wow" too.
              </p>
            </div>
          </div>
          
          <div className="pt-4">
            <Link href="/chat">
              <Button className="bg-[#59291f] hover:bg-[#59291f]/90 text-white px-12 py-5 text-xl font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                <MessageCircle className="h-6 w-6 mr-3" />
                Start New Conversation
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      
      <ResourcesSection />
      <SafetyDisclaimers />
      <Footer />
      
      {/* Onboarding Tutorial */}
      <OnboardingTutorial 
        isOpen={showOnboarding}
        onClose={closeOnboarding}
        onComplete={completeOnboarding}
      />
    </div>
  );
}
