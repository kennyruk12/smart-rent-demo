import React from 'react';
import { Link } from 'react-router-dom';
import { SmartRentLogo } from '../../components/SmartRentLogo';
import { User, Building2, Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const SignupChoiceView: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#0B0F17] flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
          <SmartRentLogo className="w-10 h-10" />
          <span className="font-extrabold text-2xl tracking-tight text-[#102A43] dark:text-white">
            Smart<span className="text-[#0E9F6E]">Rent</span>
          </span>
        </Link>
        <h2 className="text-3xl font-extrabold tracking-tight text-[#1C1C1E] dark:text-white">
          Join Smart Rent Rwanda
        </h2>
        <p className="mt-2 text-sm text-[#6B7280] dark:text-[#9CA3AF]">
          Select how you want to use the platform. Direct contact, 0% broker fee.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl px-4 sm:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tenant Option */}
          <Link
            to="/signup/tenant"
            className="group relative bg-white dark:bg-[#161D2A] rounded-3xl p-8 border-2 border-black/[0.06] dark:border-white/[0.08] hover:border-[#102A43] dark:hover:border-emerald-500 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-[#102A43] dark:text-blue-400 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <User className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#1C1C1E] dark:text-white mb-2">
                I am a Tenant
              </h3>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed mb-6">
                Find verified Rwandan homes, connect directly with owners, save favorites, and sign leases without middleman commissions.
              </p>
              <ul className="space-y-2.5 text-xs text-[#1C1C1E] dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0E9F6E]" />
                  <span>Browse 100% verified listings</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0E9F6E]" />
                  <span>Chat directly with property owners</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0E9F6E]" />
                  <span>Submit digital rental requests</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between text-xs font-bold text-[#102A43] dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>Register as Tenant</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* Landlord Option */}
          <Link
            to="/signup/landlord"
            className="group relative bg-white dark:bg-[#161D2A] rounded-3xl p-8 border-2 border-emerald-500/20 dark:border-emerald-500/30 hover:border-[#0E9F6E] transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
          >
            <div className="absolute top-4 right-4 bg-emerald-100 dark:bg-emerald-950/60 text-[#0E9F6E] text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
              100% Free
            </div>

            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-[#0E9F6E] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Building2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#1C1C1E] dark:text-white mb-2">
                I am a Landlord
              </h3>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed mb-6">
                List your residential properties completely free, review qualified tenant inquiries, and manage agreements directly.
              </p>
              <ul className="space-y-2.5 text-xs text-[#1C1C1E] dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0E9F6E]" />
                  <span>Completely free property listings</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0E9F6E]" />
                  <span>No commission or broker deductions</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0E9F6E]" />
                  <span>Manage units in a dedicated Hub</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between text-xs font-bold text-[#0E9F6E] group-hover:translate-x-1 transition-transform">
              <span>Register as Landlord</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>

        <div className="mt-8 text-center text-xs text-[#6B7280] dark:text-[#9CA3AF]">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-[#0E9F6E] hover:underline">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
};
