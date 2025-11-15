import { Link } from "wouter";
import { MessageCircle, Info, Lock, Clock, Heart } from "lucide-react";

export default function HeroSection() {

  return (
    <section id="home" className="bg-gradient-to-br from-[#f9dcd1] to-[#ecb4a7] py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Safe Space to Talk
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Wishes on Windmills provides confidential AI-powered support for students. 
            Get guidance, resources, and a listening ear whenever you need it.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/chat">
              <button className="bg-[#59291f] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#59291f]/90 transition-colors shadow-lg">
                <MessageCircle className="inline-block w-5 h-5 mr-2" />
                Start Chatting
              </button>
            </Link>
            <Link href="/learn-more">
              <button className="border-2 border-[#59291f] text-[#59291f] px-8 py-3 rounded-lg font-semibold hover:bg-[#59291f]/5 transition-colors">
                <Info className="inline-block w-5 h-5 mr-2" />
                Learn More
              </button>
            </Link>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
              <Lock className="h-6 w-6 text-[#59291f]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Private & Secure</h3>
            <p className="text-gray-600 text-sm">Your conversations are encrypted and confidential</p>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
              <Clock className="h-6 w-6 text-[#59291f]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Available 24/7</h3>
            <p className="text-gray-600 text-sm">Get support whenever you need it, day or night</p>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
              <Heart className="h-6 w-6 text-[#59291f]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Judgment-Free</h3>
            <p className="text-gray-600 text-sm">A safe space to express yourself without fear</p>
          </div>
        </div>
      </div>
    </section>
  );
}
