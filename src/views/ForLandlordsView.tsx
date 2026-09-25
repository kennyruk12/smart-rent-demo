import React from 'react';
import { Check, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ForLandlordsViewProps {
  onOpenCreateProperty?: () => void;
  onExplore?: () => void;
}

export const ForLandlordsView: React.FC<ForLandlordsViewProps> = ({
  onOpenCreateProperty,
  onExplore
}) => {
  const navigate = useNavigate();
  const handleCreate = onOpenCreateProperty || (() => navigate('/signup/landlord'));
  const handleExplore = onExplore || (() => navigate('/explore'));
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 space-y-20">
      {/* Editorial Hero */}
      <div className="max-w-3xl space-y-4">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-[#0E9F6E]">
          Zero Commission Marketplace
        </span>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#1C1C1E] leading-tight">
          List your property completely free.
        </h1>
        <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed">
          Traditional street brokers in Rwanda charge landlords up to a full month of rent. Smart Rent connects you directly with verified tenants for zero cost.
        </p>

        <div className="pt-4 flex flex-wrap gap-4">
          <button
            onClick={handleCreate}
            className="px-7 py-3.5 bg-[#102A43] hover:bg-[#0d2135] text-white text-xs font-bold rounded-full transition-transform active:scale-98 shadow-sm cursor-pointer"
          >
            List my property — It's free
          </button>
          <button
            onClick={handleExplore}
            className="px-6 py-3.5 bg-white hover:bg-black/[0.02] text-[#1C1C1E] border border-black/[0.08] text-xs font-semibold rounded-full cursor-pointer"
          >
            Browse marketplace
          </button>
        </div>
      </div>

      {/* 3 Pillars for Landlords */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8 border-t border-black/[0.06]">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-[#1C1C1E]">100% Free Forever</h3>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            No listing fees, no monthly hosting costs, and zero percentage taken from your rental income.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-bold text-[#1C1C1E]">Direct Tenant Messenger</h3>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Communicate directly with potential tenants. Schedule visits, discuss utilities, and review applications on your schedule.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-bold text-[#1C1C1E]">Verified Identities</h3>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Tenants are vetted with real contact information, intended lease duration, and number of occupants.
          </p>
        </div>
      </div>
    </div>
  );
};
