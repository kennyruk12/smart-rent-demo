import React from 'react';
import { PlusCircle, CheckCircle2, ShieldCheck, DollarSign, Users } from 'lucide-react';

interface LandlordCTAProps {
  onListProperty: () => void;
}

export const LandlordCTA: React.FC<LandlordCTAProps> = ({ onListProperty }) => {
  return (
    <section className="relative overflow-hidden bg-[#0B3D91] rounded-3xl text-white p-8 sm:p-12 lg:p-16 shadow-xl">
      {/* Subtle organic green contour background accent */}
      <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#10B981]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-1/4 -top-20 w-72 h-72 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl">
        {/* FREE badge */}
        <div className="inline-flex items-center gap-2 bg-[#10B981]/20 border border-[#10B981]/30 rounded-lg px-3 py-1 mb-5">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
            100% Free for Landlords in Rwanda
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
          Have a property to rent?
        </h2>

        <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
          List your property on Smart Rent for <span className="text-[#10B981] font-bold">FREE</span> and connect directly with verified people looking for a home in Rwanda. No middleman broker deductions.
        </p>

        {/* Benefits checklist */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-slate-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
            <span>0% Commission Fees</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
            <span>Chat Directly with Renter</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
            <span>Verified Tenant Inquiries</span>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <button
            onClick={onListProperty}
            className="px-7 py-4 bg-[#10B981] hover:bg-[#059669] text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-emerald-900/40 transition-all cursor-pointer flex items-center gap-2.5 active:scale-98"
          >
            <PlusCircle className="w-5 h-5" />
            <span>List my property — It's free</span>
          </button>
        </div>
      </div>
    </section>
  );
};
