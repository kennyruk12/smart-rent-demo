import React from 'react';

export const TermsView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 space-y-8">
      <div className="space-y-2 border-b border-black/[0.08] dark:border-white/[0.08] pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
          Last updated: September 2026 · Smart Rent Rwanda User Agreement
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1C1C1E] dark:text-white">1. Zero Commission Policy</h2>
          <p>
            Smart Rent is dedicated to a commission-free rental marketplace in Rwanda. Users, landlords, and agents agree not to charge unauthorized middleman finder fees or demanding extra month rent from prospective tenants on our platform.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1C1C1E] dark:text-white">2. Free Landlord Listings</h2>
          <p>
            Standard residential property listings for landlords are 100% free of charge. Property owners are prohibited from posting fraudulent photos, incorrect locations, or deceptive rental rates in Rwandan Francs (RWF).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1C1C1E] dark:text-white">3. Verified Landlord Standards</h2>
          <p>
            Landlords with the verified checkmark have provided authentic identification. Any account found impersonating property owners will be permanently suspended and reported to local authorities.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1C1C1E] dark:text-white">4. Rental Agreements & Leases</h2>
          <p>
            While Smart Rent facilitates digital lease requests and direct communication, the final tenancy contract is an agreement made directly between the tenant and the landlord. Both parties are encouraged to verify inventory and terms in person.
          </p>
        </section>
      </div>
    </div>
  );
};
