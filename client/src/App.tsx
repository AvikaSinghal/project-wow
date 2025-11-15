import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "@/lib/queryClient";
import HomePage from "@/pages/home";
import ChatPage from "@/pages/chat";
import ResourcesPage from "@/pages/resources";
import AcademicSupportPage from "@/pages/academic-support";
import LearnMorePage from "@/pages/learn-more";
import CrisisSupportPage from "@/pages/crisis-support";
import FAQPage from "@/pages/faq";
import ContactPage from "@/pages/contact";
import FindHelpPage from "@/pages/find-help";
import NotFound from "@/pages/not-found";

// Component to handle scroll to top on route change
function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/chat" component={ChatPage} />
        <Route path="/resources" component={ResourcesPage} />
        <Route path="/academic-support" component={AcademicSupportPage} />
        <Route path="/learn-more" component={LearnMorePage} />
        <Route path="/crisis-support" component={CrisisSupportPage} />
        <Route path="/faq" component={FAQPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/find-help" component={FindHelpPage} />
        <Route component={NotFound} />
      </Switch>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
