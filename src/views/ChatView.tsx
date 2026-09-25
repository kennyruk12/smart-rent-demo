import React, { useState, useEffect, useRef } from 'react';
import { Conversation, UserProfile } from '../types';
import { Send, ArrowLeft, Check } from 'lucide-react';

interface ChatViewProps {
  conversations: Conversation[];
  activeConversationId?: string;
  currentUser: UserProfile | null;
  onSendMessage: (conversationId: string, text: string) => void;
  onSelectProperty?: (propertyId: string) => void;
  onBackToHome?: () => void;
  onOpenAuthModal?: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  conversations,
  activeConversationId,
  currentUser,
  onSendMessage,
  onSelectProperty,
  onBackToHome,
  onOpenAuthModal
}) => {
  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-36 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-[#102A43]/10 text-[#102A43] flex items-center justify-center mx-auto">
          <Send className="w-5 h-5 ml-0.5" />
        </div>
        <h2 className="text-2xl font-bold text-[#1C1C1E]">Direct Landlord Messaging</h2>
        <p className="text-xs text-[#6B7280] leading-relaxed max-w-sm mx-auto">
          Connect directly with verified Rwandan property owners. Ask about lease terms, utilities, and schedule visits.
        </p>
        <div className="pt-2">
          <button
            onClick={onOpenAuthModal}
            className="px-7 py-3 bg-[#102A43] hover:bg-[#0d2135] text-white text-xs font-bold rounded-full transition-transform active:scale-98 shadow-sm cursor-pointer"
          >
            Sign in to start messaging
          </button>
        </div>
      </div>
    );
  }

  const [selectedId, setSelectedId] = useState<string>(
    activeConversationId || (conversations.length > 0 ? conversations[0].id : '')
  );
  const [inputText, setInputText] = useState('');
  const [isMobileListVisible, setIsMobileListVisible] = useState(!activeConversationId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find((c) => c.id === selectedId) || conversations[0];

  useEffect(() => {
    if (activeConversationId) {
      setSelectedId(activeConversationId);
      setIsMobileListVisible(false);
    }
  }, [activeConversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConversation) return;

    onSendMessage(activeConversation.id, inputText.trim());
    setInputText('');
  };

  const handleQuickQuestion = (question: string) => {
    if (!activeConversation) return;
    onSendMessage(activeConversation.id, question);
  };

  const quickQuestions = [
    'Is this home available for immediate move-in?',
    'Could we arrange a walk-through visit this weekend?',
    'What is the deposit required for this property?'
  ];

  if (!activeConversation && conversations.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-32 text-center">
        <h2 className="text-2xl font-bold text-[#1C1C1E]">No messages yet</h2>
        <p className="text-xs text-[#6B7280] mt-2">
          When you message a landlord about a property, your conversations will appear here.
        </p>
        <button
          onClick={onBackToHome}
          className="mt-6 px-6 py-2.5 bg-[#102A43] text-white text-xs font-semibold rounded-full cursor-pointer"
        >
          Explore homes
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
      <div className="bg-white rounded-3xl border border-black/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.03)] overflow-hidden h-[calc(100vh-140px)] min-h-[580px] flex">
        
        {/* Left: Clean Conversations List */}
        <div
          className={`${
            isMobileListVisible ? 'flex' : 'hidden'
          } md:flex flex-col w-full md:w-80 lg:w-96 border-r border-black/[0.06] shrink-0 bg-[#FAFAF8]`}
        >
          <div className="p-5 border-b border-black/[0.06]">
            <h2 className="text-lg font-bold text-[#1C1C1E] tracking-tight">Messages</h2>
            <div className="text-[11px] text-[#6B7280]">Direct conversation with landlords</div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-black/[0.03]">
            {conversations.map((conv) => {
              const isSelected = conv.id === selectedId;

              return (
                <div
                  key={conv.id}
                  onClick={() => {
                    setSelectedId(conv.id);
                    setIsMobileListVisible(false);
                  }}
                  className={`p-4 flex items-start gap-3 cursor-pointer transition-colors ${
                    isSelected ? 'bg-white font-medium' : 'hover:bg-black/[0.02]'
                  }`}
                >
                  <img
                    src={conv.landlord.avatar}
                    alt={conv.landlord.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-black/10"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between">
                      <div className="text-xs font-bold text-[#1C1C1E] truncate">
                        {conv.landlord.name}
                      </div>
                      <span className="text-[10px] text-[#6B7280] ml-1">
                        {conv.lastMessageTime}
                      </span>
                    </div>

                    <div className="text-[11px] text-[#102A43] truncate font-medium">
                      {conv.propertyTitle}
                    </div>

                    <p className="text-xs text-[#6B7280] truncate mt-0.5 font-normal">
                      {conv.lastMessage}
                    </p>
                  </div>

                  {conv.unreadCount > 0 && (
                    <span className="w-2 h-2 rounded-full bg-[#0E9F6E] shrink-0 mt-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Chat Window (Minimalist whitespace, no excessive balloons) */}
        <div
          className={`${
            !isMobileListVisible ? 'flex' : 'hidden'
          } md:flex flex-col flex-1 bg-white h-full overflow-hidden`}
        >
          {activeConversation ? (
            <>
              {/* Header with property context banner */}
              <div className="p-4 border-b border-black/[0.06] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    onClick={() => setIsMobileListVisible(true)}
                    className="md:hidden p-1 text-[#6B7280] hover:text-[#1C1C1E] cursor-pointer"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <img
                    src={activeConversation.landlord.avatar}
                    alt={activeConversation.landlord.name}
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-full object-cover ring-1 ring-black/10"
                  />

                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#1C1C1E]">
                      {activeConversation.landlord.name}
                    </div>
                    <div className="text-[10px] text-[#6B7280]">
                      Responds {activeConversation.landlord.responseTime}
                    </div>
                  </div>
                </div>

                {/* Property card snippet on the right */}
                <div
                  onClick={() => onSelectProperty && onSelectProperty(activeConversation.propertyId)}
                  className="flex items-center gap-2.5 p-1.5 px-3 bg-black/[0.03] hover:bg-black/[0.06] rounded-full cursor-pointer transition-colors max-w-xs"
                >
                  <img
                    src={activeConversation.propertyImage}
                    alt={activeConversation.propertyTitle}
                    referrerPolicy="no-referrer"
                    className="w-6 h-6 rounded-full object-cover shrink-0"
                  />
                  <div className="text-[11px] font-semibold text-[#1C1C1E] truncate">
                    {activeConversation.propertyTitle}
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {activeConversation.messages.map((msg) => {
                  const isMe = msg.senderRole === currentUser.role;

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div className="text-[10px] text-[#6B7280] mb-1 px-1">
                        {msg.timestamp}
                      </div>

                      <div
                        className={`max-w-md sm:max-w-lg px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                          isMe
                            ? 'bg-[#102A43] text-white rounded-br-xs font-normal'
                            : 'bg-[#F2F3F1] text-[#1C1C1E] rounded-bl-xs font-normal'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick suggestions */}
              <div className="px-5 py-2 border-t border-black/[0.04] flex gap-2 overflow-x-auto no-scrollbar">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickQuestion(q)}
                    className="shrink-0 text-[11px] text-[#6B7280] hover:text-[#1C1C1E] bg-black/[0.03] hover:bg-black/[0.06] rounded-full px-3 py-1 transition-colors cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSend} className="p-4 border-t border-black/[0.06] flex items-center gap-3">
                <input
                  type="text"
                  placeholder={`Write a message to ${activeConversation.landlord.name.split(' ')[0]}...`}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 bg-black/[0.03] rounded-full px-5 py-2.5 text-xs text-[#1C1C1E] focus:outline-none focus:ring-1 focus:ring-[#102A43]"
                />

                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="w-9 h-9 rounded-full bg-[#102A43] hover:bg-[#0E9F6E] disabled:opacity-40 text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-xs text-[#6B7280]">
              Select a conversation to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
