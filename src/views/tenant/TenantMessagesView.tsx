import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { MessageSquare, Send, User, Building2, Check, Clock } from 'lucide-react';

export const TenantMessagesView: React.FC = () => {
  const { conversationId } = useParams<{ conversationId?: string }>();
  const { currentUser } = useAuth();
  const { conversations, sendMessage } = useData();

  const [activeConvId, setActiveConvId] = useState<string>(() => {
    return conversationId || (conversations[0]?.id ?? '');
  });
  const [inputText, setInputText] = useState('');

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConv || !currentUser) return;

    sendMessage(activeConv.id, inputText, currentUser);
    setInputText('');
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto h-[calc(100vh-2rem)] flex flex-col">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
          Direct Landlord Messages
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
          Chat directly with verified Rwandan property owners with zero intermediaries.
        </p>
      </div>

      <div className="flex-1 min-h-0 bg-white dark:bg-[#161D2A] rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-2xs overflow-hidden flex flex-col md:flex-row">
        {/* Conversations List */}
        <div className="w-full md:w-80 border-r border-black/[0.06] dark:border-white/[0.08] flex flex-col h-full shrink-0">
          <div className="p-4 border-b border-black/[0.06] dark:border-white/[0.08] text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400">
            Active Conversations ({conversations.length})
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-black/[0.04] dark:divide-white/[0.04]">
            {conversations.map((conv) => {
              const isActive = conv.id === activeConv?.id;
              return (
                <button
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  className={`w-full p-4 text-left flex items-start gap-3 transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-black/[0.03] dark:bg-white/[0.05]'
                      : 'hover:bg-black/[0.015] dark:hover:bg-white/[0.02]'
                  }`}
                >
                  <img
                    src={conv.landlord.avatar}
                    alt={conv.landlord.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-black/10"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#1C1C1E] dark:text-white truncate">
                        {conv.landlord.name}
                      </span>
                      <span className="text-[10px] text-[#6B7280] dark:text-gray-400">
                        {conv.lastMessageTime}
                      </span>
                    </div>
                    <div className="text-[11px] font-medium text-[#0E9F6E] truncate">
                      {conv.propertyTitle}
                    </div>
                    <div className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] truncate mt-0.5">
                      {conv.lastMessage}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat Thread */}
        {activeConv ? (
          <div className="flex-1 flex flex-col h-full min-w-0 bg-[#FAFAF8] dark:bg-[#111722]">
            {/* Chat Header */}
            <div className="p-4 bg-white dark:bg-[#161D2A] border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={activeConv.landlord.avatar}
                  alt={activeConv.landlord.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-xs text-[#1C1C1E] dark:text-white flex items-center gap-1.5">
                    <span>{activeConv.landlord.name}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 bg-emerald-50 text-[#0E9F6E] rounded-md">
                      Owner
                    </span>
                  </div>
                  <div className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">
                    Inquiry regarding: {activeConv.propertyTitle}
                  </div>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {activeConv.messages.map((m) => {
                const isMe = m.senderRole === 'tenant';
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                        isMe
                          ? 'bg-[#102A43] text-white rounded-br-xs'
                          : 'bg-white dark:bg-[#161D2A] text-[#1C1C1E] dark:text-white border border-black/[0.06] dark:border-white/[0.08] rounded-bl-xs'
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className="text-[10px] text-[#6B7280] dark:text-gray-400 mt-1 px-1">
                      {m.timestamp}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={handleSend}
              className="p-3 bg-white dark:bg-[#161D2A] border-t border-black/[0.06] dark:border-white/[0.08] flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message to the property owner..."
                className="flex-1 px-4 py-2.5 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white text-xs border border-black/10 dark:border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#102A43]"
              />
              <button
                type="submit"
                className="p-2.5 bg-[#102A43] hover:bg-[#0d2135] text-white rounded-xl cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-xs text-[#6B7280]">
            No conversation selected.
          </div>
        )}
      </div>
    </div>
  );
};
