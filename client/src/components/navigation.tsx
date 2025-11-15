import { Menu, User, LogOut } from "lucide-react";
import logoImage from "@assets/therapy_1753857858231.png";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "./auth-modal";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [location] = useLocation();
  const { user, isAuthenticated, logout, login } = useAuth();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" onClick={scrollToTop} className="flex-shrink-0 flex items-center cursor-pointer">
              <img src={logoImage} alt="Wishes on Windmills" className="h-12 w-12 mr-3 rounded-full" />
              <span className="text-xl font-bold text-gray-900">Wishes on Windmills</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-baseline space-x-8">
              <Link href="/" className={location === '/' ? "text-[#59291f] font-medium" : "text-gray-500 hover:text-[#59291f] transition-colors"} onClick={scrollToTop}>
                Home
              </Link>
              <Link href="/chat" className={location === '/chat' ? "text-[#59291f] font-medium" : "text-gray-500 hover:text-[#59291f] transition-colors"} onClick={scrollToTop}>
                Chat
              </Link>
              <Link href="/resources" className={location === '/resources' ? "text-[#59291f] font-medium" : "text-gray-500 hover:text-[#59291f] transition-colors"} onClick={scrollToTop}>
                Resources
              </Link>
              <Link href="/learn-more" className={location === '/learn-more' ? "text-[#59291f] font-medium" : "text-gray-500 hover:text-[#59291f] transition-colors"} onClick={scrollToTop}>
                About
              </Link>
            </div>
            
            <div className="flex items-center space-x-4 border-l border-gray-200 pl-6">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-[#59291f]" />
                    <span className="text-sm text-gray-700">
                      {user?.firstName ? `Hi, ${user.firstName}` : user?.username}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="text-gray-500 hover:text-[#59291f]"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAuthModal(true)}
                  className="border-[#59291f] text-[#59291f] hover:bg-[#59291f] hover:text-white"
                >
                  <User className="h-4 w-4 mr-1" />
                  Login / Sign Up
                </Button>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button 
              type="button" 
              className="text-gray-500 hover:text-[#59291f] transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              <Link href="/" className={location === '/' ? "text-[#59291f] font-medium text-left py-2" : "text-gray-500 hover:text-[#59291f] transition-colors text-left py-2"} onClick={() => { setIsMenuOpen(false); scrollToTop(); }}>
                Home
              </Link>
              <Link href="/chat" className={location === '/chat' ? "text-[#59291f] font-medium text-left py-2" : "text-gray-500 hover:text-[#59291f] transition-colors text-left py-2"} onClick={() => { setIsMenuOpen(false); scrollToTop(); }}>
                Chat
              </Link>
              <Link href="/resources" className={location === '/resources' ? "text-[#59291f] font-medium text-left py-2" : "text-gray-500 hover:text-[#59291f] transition-colors text-left py-2"} onClick={() => { setIsMenuOpen(false); scrollToTop(); }}>
                Resources
              </Link>
              <Link href="/learn-more" className={location === '/learn-more' ? "text-[#59291f] font-medium text-left py-2" : "text-gray-500 hover:text-[#59291f] transition-colors text-left py-2"} onClick={() => { setIsMenuOpen(false); scrollToTop(); }}>
                About
              </Link>
            </div>
          </div>
        )}
      </div>
      
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={login}
      />
    </nav>
  );
}
