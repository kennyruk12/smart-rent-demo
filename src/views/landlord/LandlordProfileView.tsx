import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Building2, ShieldCheck, CheckCircle2, Phone, Mail, User } from 'lucide-react';

export const LandlordProfileView: React.FC = () => {
  const { currentUser, updateProfile } = useAuth();

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, phone });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
          Landlord Profile
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
          Your public landlord identity shown on Rwandan property listings.
        </p>
      </div>

      <div className="bg-white dark:bg-[#161D2A] p-6 sm:p-8 rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-2xs space-y-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
            alt={currentUser?.name}
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-full object-cover ring-2 ring-emerald-500/20"
          />
          <div>
            <div className="font-bold text-sm text-[#1C1C1E] dark:text-white">
              {currentUser?.name}
            </div>
            <div className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">{currentUser?.email}</div>
            <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#0E9F6E]">
              ✓ NIDA Verified Rwandan Property Owner
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200 mb-1">
              Full Legal Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200 mb-1">
              Contact Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200 mb-1">
              Rwandan Mobile Phone (+250)
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="py-2.5 px-6 bg-[#0E9F6E] hover:bg-[#0b8058] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
            >
              Save Landlord Profile
            </button>
            {saved && (
              <span className="text-xs text-[#0E9F6E] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Profile updated!
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
