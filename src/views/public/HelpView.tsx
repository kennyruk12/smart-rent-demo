import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HelpView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is Smart Rent really 100% free of broker fees?',
      a: 'Yes, completely. Smart Rent connects tenants and landlords directly. We do not take a cut or charge one month of rent as traditional commission brokers do.'
    },
    {
      q: 'How does landlord verification work in Rwanda?',
      a: 'Landlords verify their account by submitting their Rwandan National ID (NIDA) and property ownership documentation. Verified listings feature a green verified checkmark.'
    },
    {
      q: 'Can landlords list properties for free?',
      a: 'Yes, property listings are 100% free forever for all residential property owners. You can upload photos, set pricing in RWF, and manage availability without paying anything.'
    },
    {
      q: 'How do I submit a rental request?',
      a: 'When you find a property you like, click "Request to Rent" on the property details page. You will specify your desired move-in date and lease duration. The owner receives it immediately.'
    },
    {
      q: 'What should I do if a landlord asks for middleman commission?',
      a: 'Report the listing immediately using the report button on the property page. Smart Rent strictly prohibits third-party broker fees on our platform.'
    }
  ];

  const filteredFaqs = faqs.filter(f => 
    !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 space-y-10">
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0E9F6E]">
          Help & Support
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF]">
          Everything you need to know about renting homes and listing properties on Smart Rent Rwanda.
        </p>
      </div>

      <div className="relative max-w-md mx-auto">
        <Search className="w-4 h-4 text-[#6B7280] dark:text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search questions or keywords..."
          className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#161D2A] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#102A43] dark:focus:ring-emerald-500 shadow-xs"
        />
      </div>

      <div className="space-y-3">
        {filteredFaqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white dark:bg-[#161D2A] rounded-2xl border border-black/[0.06] dark:border-white/[0.08] shadow-xs overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#1C1C1E] dark:text-white cursor-pointer"
              >
                <span>{faq.q}</span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-[#0E9F6E]" /> : <ChevronDown className="w-4 h-4 text-[#6B7280]" />}
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed border-t border-black/[0.04] dark:border-white/[0.04]">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-[#FAFAF8] dark:bg-[#161D2A] p-6 rounded-3xl border border-black/[0.06] dark:border-white/[0.08] text-center space-y-2">
        <div className="text-xs font-bold text-[#1C1C1E] dark:text-white">Still have questions?</div>
        <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
          Reach out to our customer care team at any time.
        </p>
        <div className="pt-2">
          <Link
            to="/contact"
            className="px-4 py-2 bg-[#102A43] text-white text-xs font-bold rounded-xl inline-block"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};
