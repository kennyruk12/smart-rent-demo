import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, HeartHandshake, Sparkles, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { SmartRentLogo } from '../../components/SmartRentLogo';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 space-y-16">
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0E9F6E]">
          About Smart Rent Rwanda
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
          Eliminating middleman fees in Rwandan home rentals
        </h1>
        <p className="text-sm sm:text-base text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
          Smart Rent was founded with a singular purpose: to connect property owners and renters in Rwanda directly, ending predatory broker commissions and opaque rental agreements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#161D2A] p-6 rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-[#0E9F6E] flex items-center justify-center font-bold">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#1C1C1E] dark:text-white">
            0% Commission Guarantee
          </h3>
          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
            Neither tenants nor landlords pay a cut to agents. Every Franc agreed on the lease goes straight to housing.
          </p>
        </div>

        <div className="bg-white dark:bg-[#161D2A] p-6 rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-[#102A43] dark:text-blue-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#1C1C1E] dark:text-white">
            NIDA Identity Verification
          </h3>
          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
            Property owners verify their national identification, guaranteeing genuine title holders and authentic properties.
          </p>
        </div>

        <div className="bg-white dark:bg-[#161D2A] p-6 rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center font-bold">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#1C1C1E] dark:text-white">
            Free Landlord Listings
          </h3>
          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
            Listing residential homes on Smart Rent is completely free for landlords forever, encouraging transparent real-time inventory.
          </p>
        </div>
      </div>

      <div className="bg-[#102A43] dark:bg-[#161D2A] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h2 className="text-2xl font-bold">Ready to find your next home in Kigali?</h2>
          <p className="text-xs sm:text-sm text-white/80">
            Browse verified listings across Gasabo, Kicukiro, and Nyarugenge with real photos and exact prices.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/explore"
            className="px-6 py-3 bg-[#0E9F6E] hover:bg-[#0b8058] text-white text-xs sm:text-sm font-bold rounded-full transition-transform active:scale-98 shadow-sm"
          >
            Explore Properties
          </Link>
          <Link
            to="/signup/landlord"
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold rounded-full border border-white/20"
          >
            List Free
          </Link>
        </div>
      </div>
    </div>
  );
};
