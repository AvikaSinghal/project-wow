import EmergencyBanner from "@/components/emergency-banner";
import Navigation from "@/components/navigation";
import SimpleChat from "@/components/simple-chat";
import Footer from "@/components/footer";
import OnboardingTutorial from "@/components/onboarding-tutorial";
import { useOnboarding } from "@/hooks/useOnboarding";

export default function ChatPage() {
  const { showOnboarding, completeOnboarding, closeOnboarding } = useOnboarding();
  return (
    <div className="min-h-screen bg-[#f9dcd1]">
      <EmergencyBanner />
      <Navigation />
      <div className="pt-8">
        <SimpleChat showHistoryButton={true} />
      </div>
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