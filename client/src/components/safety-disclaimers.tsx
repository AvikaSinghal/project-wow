import { Shield, AlertTriangle } from "lucide-react";

export default function SafetyDisclaimers() {
  return (
    <section id="about" className="bg-[#f9dcd1] py-12 border-t-4 border-[#59291f]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Safety Information</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Shield className="h-5 w-5 text-[#59291f] mr-2" />
              Privacy & Safety
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Conversations are encrypted and secure</li>
              <li>• We don't store personal identifying information</li>
              <li>• Crisis detection helps connect you to human support</li>
              <li>• Your safety is our top priority</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
              Limitations
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• This is not a replacement for professional therapy</li>
              <li>• Cannot diagnose or treat mental health conditions</li>
              <li>• For emergencies, contact 911 or crisis services</li>
              <li>• Consult healthcare providers for ongoing support</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Wishes on Windmills is designed to provide supportive conversations and resources, but it cannot replace professional mental health care. 
            If you're experiencing thoughts of self-harm or suicide, please contact emergency services or a crisis hotline immediately.
          </p>
        </div>
      </div>
    </section>
  );
}
