import React from 'react';
import { useData } from '../../context/DataContext';
import { MessageSquare, ShieldCheck, User } from 'lucide-react';

export const AdminMessagesView: React.FC = () => {
  const { conversations } = useData();

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
          Message Moderation & Support Logs ({conversations.length})
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
          Monitor conversations to enforce zero-fee direct rental integrity and prevent off-platform broker scams.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className="p-6 rounded-3xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#161D2A] shadow-2xs space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
              <div>
                <div className="text-xs font-bold text-[#1C1C1E] dark:text-white">
                  {conv.tenantName} ↔ {conv.landlord.name}
                </div>
                <div className="text-[11px] text-[#0E9F6E]">Property: {conv.propertyTitle}</div>
              </div>
              <span className="text-[10px] text-[#6B7280]">{conv.lastMessageTime}</span>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto text-xs">
              {conv.messages.map((m) => (
                <div key={m.id} className="p-2.5 rounded-xl bg-[#FAFAF8] dark:bg-[#111722]">
                  <div className="flex items-center justify-between text-[10px] text-[#6B7280] mb-0.5">
                    <strong>{m.senderName} ({m.senderRole})</strong>
                    <span>{m.timestamp}</span>
                  </div>
                  <p className="text-xs text-[#1C1C1E] dark:text-gray-200">{m.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
