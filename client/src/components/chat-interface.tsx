import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Bot, User, Send, History, Trash2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { ChatSession, ChatMessage } from "@shared/schema";

interface ChatInterfaceProps {
  onOpenHistory: () => void;
}

export default function ChatInterface({ onOpenHistory }: ChatInterfaceProps) {
  const [currentSessionId, setCurrentSessionId] = useState<number | null>(null);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Query for current session messages
  const { data: currentSession, isLoading: isLoadingSession } = useQuery<ChatSession>({
    queryKey: [`/api/sessions/${currentSessionId}`],
    enabled: !!currentSessionId,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentSessionId, currentSession?.messages]);

  // Create new session mutation
  const createSessionMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/api/sessions', {
        title: 'New Conversation'
      });
      return response.json();
    },
    onSuccess: (newSession) => {
      setCurrentSessionId(newSession.id);
      queryClient.invalidateQueries({ queryKey: ['/api/sessions'] });
      queryClient.invalidateQueries({ queryKey: [`/api/sessions/${newSession.id}`] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create new conversation",
        variant: "destructive",
      });
    }
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async ({ sessionId, content }: { sessionId: number; content: string }) => {
      const response = await apiRequest('POST', `/api/sessions/${sessionId}/messages`, {
        content
      });
      return response.json();
    },
    onMutate: () => {
      setIsTyping(true);
    },
    onSuccess: (data) => {
      setIsTyping(false);
      // Force refetch the current session data
      queryClient.invalidateQueries({ queryKey: [`/api/sessions/${currentSessionId}`] });
      queryClient.refetchQueries({ queryKey: [`/api/sessions/${currentSessionId}`] });
      
      if (data.isCrisisDetected) {
        toast({
          title: "Crisis Support Available",
          description: "We've detected you might be in distress. Please consider reaching out to professional help.",
          variant: "destructive",
        });
      }
    },
    onError: () => {
      setIsTyping(false);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    }
  });

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    let sessionId = currentSessionId;
    
    // Create new session if none exists
    if (!sessionId) {
      try {
        const newSession = await createSessionMutation.mutateAsync();
        sessionId = newSession.id;
      } catch (error) {
        return;
      }
    }

    const message = inputMessage.trim();
    setInputMessage("");
    
    if (sessionId) {
      sendMessageMutation.mutate({ sessionId, content: message });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setCurrentSessionId(null);
    queryClient.removeQueries({ queryKey: [`/api/sessions/${currentSessionId}`] });
  };

  const messages = currentSession?.messages || [];

  return (
    <section id="chat" className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Chat with Wishes on Windmills</h2>
          <p className="text-gray-600">Start a conversation and get the support you need</p>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden" style={{ height: '600px' }}>
          {/* Chat Header */}
          <div className="bg-[#59291f] text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Wishes on Windmills AI</h3>
                <p className="text-xs opacity-90">Online • Ready to help</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                className="text-white/80 hover:text-white transition-colors"
                onClick={onOpenHistory}
              >
                <History className="h-5 w-5" />
              </button>
              <button 
                className="text-white/80 hover:text-white transition-colors"
                onClick={clearChat}
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto" style={{ height: '480px' }}>
            {messages.length === 0 && !isLoadingSession && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-[#59291f] rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-3 max-w-xs">
                  <p className="text-gray-800 text-sm">
                    Hi there! I'm Wishes on Windmills, your AI support companion. I'm here to listen and help you work through whatever is on your mind. What would you like to talk about today?
                  </p>
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div key={message.id} className={`flex items-start space-x-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 bg-[#59291f] rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                <div className={`rounded-2xl p-3 max-w-sm ${
                  message.role === 'user' 
                    ? 'bg-[#59291f] text-white rounded-tr-sm' 
                    : 'bg-gray-100 text-gray-800 rounded-tl-sm'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  {message.isCrisisDetected && (
                    <div className="mt-2 p-2 bg-red-100 border border-red-200 rounded text-xs">
                      <p className="text-red-800 font-medium">Crisis support available:</p>
                      <p className="text-red-700">iCall: +91 9152 987 821</p>
                      <p className="text-red-700">Vandrevala Foundation: +91 9999 666 555</p>
                    </div>
                  )}
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 bg-[#ecb4a7] rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-[#59291f] rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Type your message here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#59291f] focus:border-transparent resize-none"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={sendMessageMutation.isPending}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || sendMessageMutation.isPending}
                className="bg-[#59291f] text-white p-3 rounded-full hover:bg-[#59291f]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Remember: This is not a substitute for professional medical or psychological treatment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
