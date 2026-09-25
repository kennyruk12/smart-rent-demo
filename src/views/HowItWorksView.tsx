import React, { useState } from 'react';
import { ChevronDown, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HowItWorksViewProps {
  onExplore?: () => void;
  onOpenCreateProperty?: () => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({
  onExplore,
  onOpenCreateProperty
}) => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleExplore = onExplore || (() => navigate('/explore'));
  const handleCreate = onOpenCreateProperty || (() => navigate('/signup/landlord'));

  const faqs = [
    {
      q: 'Is Smart Rent really free for landlords?',
      a: 'Yes. Smart Rent is 100% free for landlords in Rwanda. We never take broker commissions or deduct from your monthly rent.'
    },
    {
      q: 'Do tenants pay commissionaire fees?',
      a: 'No. Tenants connect directly with landlords and property managers. There are zero agency or commissionaire fees charged to renters.'
    },
    {
      q: 'How does verification work in Rwanda?',
      a: 'We verify landlord ownership and legitimacy to maintain trust and protect tenants from fraudulent listings.'
    },
    {
      q: 'How do I submit an application to rent?',
      a: 'Click "Request to Rent" on any property. Fill in your intended move-in date and lease duration. The landlord receives your request instantly and can approve it and chat with you.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 space-y-20">
      <div className="max-w-3xl space-y-4">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-[#0E9F6E]">
          Simple & Direct
        </span>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#1C1C1E] leading-tight">
          How Smart Rent works.
        </h1>
        <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed">
          Smart Rent brings clarity and modern technology to property rentals across Rwanda. No predatory commissionaires, no hidden charges.
        </p>
      </div>

      {/* 3 Step Sequence */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8 border-t border-black/[0.06]">
        <div className="space-y-3">
          <div className="text-xs font-bold text-[#6B7280] tracking-widest">01</div>
          <h3 className="text-xl font-bold text-[#1C1C1E]">Search</h3>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Filter verified residences across Kigali and Rwanda by neighborhood, price, bedrooms, and amenities.
          </p>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-bold text-[#6B7280] tracking-widest">02</div>
          <h3 className="text-xl font-bold text-[#1C1C1E]">Connect</h3>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Message the landlord directly via in-app chat. Inquire about water backup or book an in-person walk-through.
          </p>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-bold text-[#6B7280] tracking-widest">03</div>
          <h3 className="text-xl font-bold text-[#1C1C1E]">Move in</h3>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Submit your move-in request with zero broker commission. Sign your lease with confidence.
          </p>
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-3xl pt-12 border-t border-black/[0.06] space-y-8">
        <h2 className="text-2xl font-bold tracking-tight text-[#1C1C1E]">
          Frequently Asked Questions
        </h2>

        <div className="divide-y divide-black/[0.06]">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} className="py-4">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full flex items-center justify-between text-left text-sm font-semibold text-[#1C1C1E] cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#6B7280] transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-2 text-xs text-[#6B7280] leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
