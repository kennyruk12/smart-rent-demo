import React from 'react';
import { Property, RentalRequest, Conversation, UserProfile } from '../types';
import { PropertyCard } from '../components/PropertyCard';
import { ArrowRight, Heart, MessageSquare, Clock, Check } from 'lucide-react';

interface TenantDashboardProps {
  currentUser: UserProfile | null;
  savedProperties: Property[];
  rentalRequests: RentalRequest[];
  conversations: Conversation[];
  onSelectProperty: (property: Property) => void;
  onToggleSave: (id: string) => void;
  onOpenMessages: (convId?: string) => void;
  onExplore: () => void;
  onOpenAuthModal?: () => void;
}

export const TenantDashboard: React.FC<TenantDashboardProps> = ({
  currentUser,
  savedProperties,
  rentalRequests,
  conversations,
  onSelectProperty,
  onToggleSave,
  onOpenMessages,
  onExplore,
  onOpenAuthModal
}) => {
  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-36 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#1C1C1E]">Renter Dashboard</h2>
        <p className="text-xs text-[#6B7280]">
          Sign in to track your rental requests, saved properties, and landlord messages.
        </p>
        <button
          onClick={onOpenAuthModal}
          className="px-6 py-2.5 bg-[#102A43] text-white text-xs font-semibold rounded-full cursor-pointer"
        >
          Sign in
        </button>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 space-y-16">
      {/* 1. Calm Header */}
      <div className="max-w-3xl space-y-2">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1C1E]">
          Good day, {currentUser.name.split(' ')[0]}.
        </h1>
        <p className="text-base text-[#6B7280]">
          Let's find your next home.
        </p>
      </div>

      {/* 2. Personal Activity Feed Timeline (Instead of a wall of cards) */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#6B7280]">
          Your activity
        </h2>

        <div className="bg-white rounded-3xl border border-black/[0.06] p-6 divide-y divide-black/[0.04]">
          {/* Recent requests */}
          {rentalRequests.map((req) => (
            <div key={req.id} className="py-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={req.propertyImage}
                  alt={req.propertyTitle}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-xl object-cover shrink-0"
                />
                <div>
                  <div className="text-xs font-semibold text-[#1C1C1E]">{req.propertyTitle}</div>
                  <div className="text-[11px] text-[#6B7280]">Rental request {req.status.toLowerCase()}</div>
                </div>
              </div>
              <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                req.status === 'Approved' ? 'bg-emerald-50 text-[#0E9F6E]' : 'bg-black/[0.04] text-[#6B7280]'
              }`}>
                {req.status}
              </span>
            </div>
          ))}

          {/* Recent chat */}
          {conversations.slice(0, 2).map((conv) => (
            <div 
              key={conv.id} 
              onClick={() => onOpenMessages(conv.id)}
              className="py-3.5 flex items-center justify-between gap-4 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-3">
                <img
                  src={conv.landlord.avatar}
                  alt={conv.landlord.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-black/10"
                />
                <div>
                  <div className="text-xs font-semibold text-[#1C1C1E]">Message with {conv.landlord.name}</div>
                  <div className="text-[11px] text-[#6B7280] truncate max-w-sm">{conv.lastMessage}</div>
                </div>
              </div>
              <span className="text-[11px] text-[#6B7280]">{conv.lastMessageTime}</span>
            </div>
          ))}

          {rentalRequests.length === 0 && conversations.length === 0 && (
            <div className="py-4 text-xs text-[#6B7280]">No recent activity yet.</div>
          )}
        </div>
      </div>

      {/* 3. Saved Homes (Visual showcase) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-[#1C1C1E]">
            Saved homes ({savedProperties.length})
          </h2>

          <button
            onClick={onExplore}
            className="text-xs font-semibold text-[#102A43] hover:text-[#0E9F6E] flex items-center gap-1 cursor-pointer"
          >
            <span>Continue exploring</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {savedProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                isSaved={true}
                onToggleSave={onToggleSave}
                onSelect={onSelectProperty}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-black/[0.06] p-12 text-center max-w-md mx-auto">
            <h3 className="text-base font-bold text-[#1C1C1E]">Nothing saved yet</h3>
            <p className="text-xs text-[#6B7280] mt-1">
              Tap the heart on a home you like and we'll keep it here for you.
            </p>
            <button
              onClick={onExplore}
              className="mt-5 px-5 py-2.5 bg-[#102A43] text-white text-xs font-semibold rounded-full cursor-pointer"
            >
              Explore homes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
