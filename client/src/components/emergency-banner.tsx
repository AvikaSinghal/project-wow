import { AlertTriangle, Info } from "lucide-react";
import { useState } from "react";

export default function EmergencyBanner() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
          <span className="text-sm font-medium text-gray-800">
            Crisis or Emergency? Call 988 (Suicide & Crisis Lifeline) or 911 immediately
          </span>
        </div>
        <button 
          className="text-red-500 hover:text-red-700 transition-colors"
          onClick={() => setShowInfo(!showInfo)}
        >
          <Info className="h-5 w-5" />
        </button>
      </div>
      {showInfo && (
        <div className="max-w-6xl mx-auto mt-4 pl-8 text-sm text-gray-700">
          <p className="mb-2">Available 24/7 crisis resources:</p>
          <ul className="space-y-1">
            <li>• 988 Suicide & Crisis Lifeline - Call or text 988</li>
            <li>• Crisis Text Line - Text HOME to 741741</li>
            <li>• Emergency Services - Call 911</li>
            <li>• National Domestic Violence Hotline - 1-800-799-7233</li>
          </ul>
        </div>
      )}
    </div>
  );
}
