import React from 'react';
import { Landlord } from '../types';
import { CheckCircle2, MessageSquare, Phone, Mail, Clock, Calendar, ShieldCheck, Home } from 'lucide-react';

interface LandlordCardProps {
  landlord: Landlord;
  onContact: () => void;
  showAllPropertiesBtn?: boolean;
  onViewLandlordProperties?: () => void;
}

export const LandlordCard: React.FC<LandlordCardProps> = ({
  landlord,
  onContact,
  showAllPropertiesBtn = false,
  onViewLandlordProperties
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative">
          <img
            src={landlord.avatar}
            alt={landlord.name}
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-full object-cover ring-2 ring-slate-100"
          />
          {landlord.verified && (
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-xs">
              <CheckCircle2 className="w-5 h-5 text-[#10B981] fill-white" />
            </div>
          )}
        </div>

        {/* Name & status */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-base font-bold text-slate-900">{landlord.name}</h4>
          </div>

          {landlord.verified ? (
            <div className="inline-flex items-center gap-1 text-xs text-emerald-700 font-semibold mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Verified landlord</span>
            </div>
          ) : (
            <span className="text-xs text-slate-500 font-medium">Community host</span>
          )}

          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Member since {landlord.memberSince}</span>
          </div>
        </div>
      </div>

      {/* Bio */}
      <p className="mt-4 text-xs text-slate-600 leading-relaxed">
        {landlord.bio}
      </p>

      {/* Trust Stats Matrix */}
      <div className="mt-5 grid grid-cols-3 gap-2 py-3 px-3 bg-slate-50 rounded-xl text-center border border-slate-100">
        <div>
          <div className="text-xs text-slate-500 font-medium">Listings</div>
          <div className="text-sm font-bold text-slate-900 mt-0.5 tabular-nums">
            {landlord.totalProperties}
          </div>
        </div>
        <div className="border-x border-slate-200/80">
          <div className="text-xs text-slate-500 font-medium">Response</div>
          <div className="text-sm font-bold text-[#10B981] mt-0.5 tabular-nums">
            {landlord.responseRate}
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-500 font-medium">Time</div>
          <div className="text-sm font-bold text-slate-900 mt-0.5 tabular-nums">
            {landlord.responseTime}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 space-y-2">
        <button
          onClick={onContact}
          className="w-full py-2.5 px-4 bg-[#0B3D91] hover:bg-[#082d6b] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Message {landlord.name.split(' ')[0]}</span>
        </button>

        {showAllPropertiesBtn && (
          <button
            onClick={onViewLandlordProperties}
            className="w-full py-2 px-4 bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-3.5 h-3.5 text-slate-500" />
            <span>View all {landlord.totalProperties} listings</span>
          </button>
        )}
      </div>
    </div>
  );
};
