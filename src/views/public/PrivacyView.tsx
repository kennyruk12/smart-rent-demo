import React from 'react';

export const PrivacyView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 space-y-8">
      <div className="space-y-2 border-b border-black/[0.08] dark:border-white/[0.08] pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
          Last updated: September 2026 · Smart Rent Rwanda Data Protection
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1C1C1E] dark:text-white">1. Information We Collect</h2>
          <p>
            When you register on Smart Rent Rwanda, we collect your name, email address, Rwandan phone number (+250), and role (Tenant or Landlord). For landlords requesting verification, we verify proof of property ownership and Rwandan National ID (NIDA) data.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1C1C1E] dark:text-white">2. How Your Data Is Used</h2>
          <p>
            Your information is used solely to facilitate genuine connections between tenants and landlords, communicate rental requests, and maintain the integrity of our verified marketplace. We never sell your personal data to third-party marketing brokers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1C1C1E] dark:text-white">3. Direct Messaging Privacy</h2>
          <p>
            Messages exchanged between tenants and landlords are protected and accessible only to the conversation participants and authorized platform moderators for spam and fraud prevention.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1C1C1E] dark:text-white">4. Your Rights</h2>
          <p>
            You have the right to request deletion of your account and removal of your property listings at any time by contacting support@smartrent.rw.
          </p>
        </section>
      </div>
    </div>
  );
};
