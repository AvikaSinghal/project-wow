import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { Send, MessageCircle, Heart, Brain, History, Clock, Trash2 } from "lucide-react";
import ConversationStarters from "./conversation-starters";
import AvatarDisplay, { useAvatarEmotion } from "./avatar-display";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  content: string;
  role: "user" | "assistant";
  timestamp: string;
  isCrisisDetected: boolean;
}

interface Session {
  id: number;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

const DEFAULT_WELCOME_MESSAGE = "heyy, i'm Wishes on Windmills 🦋 think of me as your mental health bestie or your pocket therapist & chill zone💭\nwhatever mood you're in, you're not alone.\ntalk to me — i'm here to help you feel a little lighter 💌";

interface SimpleChatProps {
  showHistoryButton?: boolean;
}

export default function SimpleChat({ showHistoryButton = true }: SimpleChatProps) {
  const [message, setMessage] = useState("");
  const [currentSessionId, setCurrentSessionId] = useState<number | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showStarters, setShowStarters] = useState(true);
  const queryClient = useQueryClient();
  const { emotion, updateEmotionFromMessage, setEmotion } = useAvatarEmotion();
  const { toast } = useToast();

  // Get current session data
  const { data: session, isLoading: sessionLoading } = useQuery({
    queryKey: [`/api/sessions/${currentSessionId}`],
    enabled: !!currentSessionId,
  });

  // Get all sessions for history
  const { data: allSessions, isLoading: historyLoading } = useQuery({
    queryKey: ["/api/sessions"],
  });

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
      queryClient.invalidateQueries({ queryKey: ["/api/sessions"] });
    },
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!currentSessionId) {
        throw new Error("No session available");
      }
      const response = await apiRequest('POST', `/api/sessions/${currentSessionId}/messages`, {
        content
      });
      return response.json();
    },
    onSuccess: (data, variables) => {
      setMessage("");
      // Update avatar emotion based on user message
      updateEmotionFromMessage(variables, true);
      
      // Update avatar emotion based on AI response after a delay
      if (data.assistantMessage) {
        setTimeout(() => {
          updateEmotionFromMessage(data.assistantMessage.content, false);
        }, 500);
      }
      
      queryClient.invalidateQueries({ queryKey: [`/api/sessions/${currentSessionId}`] });
      queryClient.refetchQueries({ queryKey: [`/api/sessions/${currentSessionId}`] });
    },
  });

  // Delete session mutation
  const deleteSessionMutation = useMutation({
    mutationFn: async (sessionId: number) => {
      await apiRequest('DELETE', `/api/sessions/${sessionId}`);
    },
    onSuccess: (_, deletedSessionId) => {
      // If we deleted the current session, clear it
      if (currentSessionId === deletedSessionId) {
        setCurrentSessionId(null);
      }
      queryClient.invalidateQueries({ queryKey: ["/api/sessions"] });
      toast({
        title: "Chat deleted",
        description: "Your conversation has been permanently deleted.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to delete",
        description: "Unable to delete the conversation. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleDeleteSession = (sessionId: number, sessionTitle: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering the session load
    if (confirm(`Are you sure you want to delete "${sessionTitle}"? This action cannot be undone.`)) {
      deleteSessionMutation.mutate(sessionId);
    }
  };

  const handleSendMessage = async (messageText?: string) => {
    const messageToSend = messageText || message.trim();
    if (!messageToSend) return;

    // Hide conversation starters once user starts chatting
    setShowStarters(false);

    try {
      // Create session if none exists
      if (!currentSessionId) {
        const newSession = await createSessionMutation.mutateAsync();
        setCurrentSessionId(newSession.id);
        // Wait a bit for session to be created
        setTimeout(() => {
          sendMessageMutation.mutate(messageToSend);
        }, 200);
      } else {
        sendMessageMutation.mutate(messageToSend);
      }
      
      // If using a conversation starter, set it as the message
      if (messageText) {
        setMessage(messageText);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleStarterSelect = (starter: string) => {
    // Set initial emotion based on conversation starter topic
    if (starter.toLowerCase().includes("stress") || starter.toLowerCase().includes("worried")) {
      setEmotion("supportive");
    } else if (starter.toLowerCase().includes("excited") || starter.toLowerCase().includes("good")) {
      setEmotion("excited");
    } else {
      setEmotion("listening");
    }
    handleSendMessage(starter);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startNewConversation = () => {
    createSessionMutation.mutate();
  };

  const loadSession = (sessionId: number) => {
    setCurrentSessionId(sessionId);
    setShowHistory(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center space-y-4 mb-6">
        <div className="flex items-center justify-center gap-2">
          <Brain className="h-8 w-8 text-[#59291f]" />
          <h1 className="text-3xl font-bold text-[#59291f]">AI Support Chat</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Share what's on your mind in a safe, supportive space. I'm here to listen and help you navigate whatever you're going through.
        </p>
        
        {/* History Toggle - only show if enabled */}
        {showHistoryButton && (
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setShowHistory(!showHistory)}
              variant="outline"
              className="border-[#59291f] text-[#59291f] hover:bg-[#59291f] hover:text-white"
            >
              <History className="h-4 w-4 mr-2" />
              {showHistory ? "Hide" : "Show"} Chat History
            </Button>
            {currentSessionId && (
              <Button
                onClick={startNewConversation}
                disabled={createSessionMutation.isPending}
                className="bg-[#59291f] hover:bg-[#59291f]/90 text-white"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                New Chat
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-6">
        {/* History Sidebar - only show if history button is enabled */}
        {showHistoryButton && showHistory && (
          <div className="w-80 space-y-4">
            <Card className="border-[#ecb4a7]">
              <CardHeader className="bg-[#f9dcd1] border-b border-[#ecb4a7]">
                <CardTitle className="text-[#59291f] flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Chat History
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {historyLoading ? (
                  <div className="text-center text-gray-500 py-4">
                    Loading history...
                  </div>
                ) : (allSessions as any)?.length ? (
                  <div className="space-y-2">
                    {(allSessions as any).map((historySession: any) => (
                      <div
                        key={historySession.id}
                        className={`p-3 rounded-lg transition-colors border ${
                          currentSessionId === historySession.id
                            ? "bg-[#f9dcd1] border-[#59291f]"
                            : "hover:bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div 
                          onClick={() => loadSession(historySession.id)}
                          className="cursor-pointer flex-1"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm text-[#59291f] truncate">
                                {historySession.title}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {formatDate(historySession.createdAt)}
                              </div>
                            </div>
                            <button
                              onClick={(e) => handleDeleteSession(historySession.id, historySession.title, e)}
                              className="ml-2 text-gray-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-red-50 flex-shrink-0"
                              title="Delete conversation"
                              disabled={deleteSessionMutation.isPending}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-4">
                    <MessageCircle className="h-8 w-8 mx-auto mb-2 text-[#ecb4a7]" />
                    <p className="text-sm">No previous chats</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Chat Area */}
        <div className="flex-1 space-y-6">

          {/* Conversation Starters */}
          {showStarters && !currentSessionId && (
            <div className="space-y-6">
              <div className="text-center">
                <AvatarDisplay emotion="excited" size="lg" animate={true} />
                <h2 className="text-2xl font-bold text-[#59291f] mt-4 mb-2">Meet Windmill!</h2>
                <p className="text-gray-600">Your friendly companion is here to listen and support you</p>
              </div>
              <ConversationStarters 
                onSelectStarter={handleStarterSelect}
                isVisible={showStarters}
              />
            </div>
          )}

        {/* Start Chat Button */}
        {!currentSessionId && !showStarters && (
          <div className="text-center">
            <Button
              onClick={startNewConversation}
              disabled={createSessionMutation.isPending}
              className="bg-[#59291f] hover:bg-[#59291f]/90 text-white px-8 py-3 text-lg"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              {createSessionMutation.isPending ? "Starting..." : "Start New Conversation"}
            </Button>
          </div>
        )}

        {/* Chat Interface */}
        {currentSessionId && (
        <Card className="border-[#ecb4a7]">
          <CardHeader className="bg-[#f9dcd1] border-b border-[#ecb4a7]">
            <div className="flex items-center justify-between">
              <CardTitle className="text-[#59291f] flex items-center gap-3">
                <AvatarDisplay emotion={emotion} size="sm" animate={true} />
                <div>
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    {(session as any)?.title || "Chat Session"}
                  </div>
                  <div className="text-sm font-normal text-gray-600 mt-1">
                    Windmill is feeling {emotion}
                  </div>
                </div>
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowHistory(!showHistory)}
                className="border-[#59291f] text-[#59291f] hover:bg-[#59291f] hover:text-white"
              >
                <History className="h-4 w-4 mr-1" />
                History
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {sessionLoading ? (
                <div className="text-center text-gray-500 py-8">
                  Loading conversation...
                </div>
              ) : (session as any)?.messages?.length ? (
                (session as any).messages.map((msg: Message) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.role === "user"
                          ? "bg-[#59291f] text-white rounded-br-none"
                          : "bg-[#f9dcd1] text-[#59291f] rounded-bl-none"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                      {msg.isCrisisDetected && (
                        <Badge variant="destructive" className="mt-2">
                          Crisis Support Available
                        </Badge>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex justify-start items-start gap-3">
                  <AvatarDisplay emotion="happy" size="md" animate={true} />
                  <div className="bg-[#f9dcd1] text-[#59291f] p-4 rounded-lg rounded-bl-none max-w-[90%]">
                    <p className="whitespace-pre-wrap">{DEFAULT_WELCOME_MESSAGE}</p>
                  </div>
                </div>
              )}
              
              {sendMessageMutation.isPending && (
                <div className="flex justify-start">
                  <div className="bg-[#f9dcd1] text-[#59291f] p-3 rounded-lg rounded-bl-none max-w-[80%]">
                    <div className="flex items-center gap-2">
                      <div className="animate-pulse">💭</div>
                      <span>I'm thinking about your message...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-[#ecb4a7] p-4">
              <div className="flex gap-2">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share what's on your mind..."
                  className="min-h-[60px] resize-none focus:ring-[#59291f] focus:border-[#59291f]"
                  disabled={sendMessageMutation.isPending}
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!message.trim() || sendMessageMutation.isPending}
                  className="bg-[#59291f] hover:bg-[#59291f]/90 text-white px-6"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Press Enter to send, Shift+Enter for new line
              </p>
            </div>
          </CardContent>
        </Card>
      )}


        </div>
      </div>
    </div>
  );
}