import React from 'react';
import { 
  Search, 
  MessageSquare, 
  KeyRound, 
  ShieldCheck, 
  Home, 
  MessagesSquare, 
  Clock 
} from 'lucide-react';

export const TrustPillars: React.FC = () => {
  const brandPillars = [
    {
      title: 'Quality Homes',
      subtitle: 'Verified listings & real photography',
      icon: Home
    },
    {
      title: 'Secure & Trusted',
      subtitle: 'Verified Rwandan landlord identities',
      icon: ShieldCheck
    },
    {
      title: 'Direct Communication',
      subtitle: 'Talk directly to property owners',
      icon: MessagesSquare
    },
    {
      title: 'Easy Booking',
      subtitle: 'Transparent terms, move in faster',
      icon: Clock
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Search',
      description: 'Discover verified homes across Kigali and Rwanda based on your budget, district, and preferred property type.',
      icon: Search
    },
    {
      number: '02',
      title: 'Connect',
      description: 'Chat directly with the property owner. Ask about water reserves, cashpower meters, or book a private walk-through.',
      icon: MessageSquare
    },
    {
      number: '03',
      title: 'Move in',
      description: 'Submit an official rental request directly through Smart Rent and arrange keys without middleman broker fees.',
      icon: KeyRound
    }
  ];

  return (
    <div className="space-y-16">
      {/* 4 Brand Pillars (from brand guidelines) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {brandPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 text-[#0B3D91]">
                  <Icon className="w-6 h-6 stroke-[1.75]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{pillar.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">{pillar.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* How Smart Rent Works */}
      <div>
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-[#10B981] mb-2">
            Simple & Transparent
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            How Smart Rent works
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Rent a home with confidence directly from landlords in three straightforward steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold text-[#0B3D91]/20 tabular-nums">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#10B981] flex items-center justify-center">
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-[#0B3D91]">
                  <span>Step {step.number} of 03</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
