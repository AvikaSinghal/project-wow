import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { X, Trash2 } from "lucide-react";
import type { ChatSession } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface SessionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SessionHistoryModal({ isOpen, onClose }: SessionHistoryModalProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const { data: sessions, isLoading } = useQuery<ChatSession[]>({
    queryKey: ['/api/sessions-with-messages'],
    enabled: isOpen,
  });

  const deleteSessionMutation = useMutation({
    mutationFn: async (sessionId: number) => {
      await apiRequest(`/api/sessions/${sessionId}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/sessions-with-messages'] });
      queryClient.invalidateQueries({ queryKey: ['/api/sessions'] });
      toast({
        title: "Session deleted",
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

  const handleDeleteSession = (sessionId: number, sessionTitle: string) => {
    if (confirm(`Are you sure you want to delete "${sessionTitle}"? This action cannot be undone.`)) {
      deleteSessionMutation.mutate(sessionId);
    }
  };

  if (!isOpen) return null;

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    return new Date(date).toLocaleDateString();
  };

  const getSessionPreview = (session: ChatSession) => {
    const userMessages = session.messages.filter(msg => msg.role === 'user');
    if (userMessages.length === 0) return "No messages yet";
    return userMessages[0].content.substring(0, 100) + (userMessages[0].content.length > 100 ? "..." : "");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Session History</h2>
            <button 
              className="text-gray-500 hover:text-gray-700 transition-colors"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto" style={{ maxHeight: '400px' }}>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#59291f] mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading sessions...</p>
            </div>
          ) : sessions && sessions.length > 0 ? (
            <div className="space-y-4">
              {sessions.map((session) => (
                <div key={session.id} className="border-l-4 border-[#59291f] pl-4 py-2 hover:bg-gray-50 rounded-r transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">{session.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{formatTimeAgo(session.updatedAt)}</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSession(session.id, session.title);
                        }}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-red-50"
                        title="Delete conversation"
                        disabled={deleteSessionMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {getSessionPreview(session)}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {session.messages.length} message{session.messages.length !== 1 ? 's' : ''}
                    </span>
                    <button className="text-[#59291f] text-sm hover:underline">
                      Continue conversation
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No conversation history yet.</p>
              <p className="text-sm text-gray-500 mt-2">Start a conversation to see your session history here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
