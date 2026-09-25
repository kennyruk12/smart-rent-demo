import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { SmartRentLogo } from '../../components/SmartRentLogo';
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, AlertCircle, Building2, CheckCircle2 } from 'lucide-react';

export const SignupLandlordView: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+250 78');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!agreeTerms) {
      setError('Please agree to the Terms of Service and Landlord Code of Conduct.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    try {
      await signup({
        name,
        email,
        phone,
        role: 'landlord',
        password
      });
      navigate('/landlord/dashboard', { replace: true });
    } catch (err: any) {
      setError(err?.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#0B0F17] flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
          <SmartRentLogo variant="icon-only" size="md" />
          <span className="font-extrabold text-2xl tracking-tight text-[#102A43] dark:text-white">
            Smart<span className="text-[#0E9F6E]">Rent</span>
          </span>
        </Link>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-[#0E9F6E] mb-2">
          Landlord Account · 100% Free Listings
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1C1E] dark:text-white">
          Register as Landlord
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF]">
          List your residential properties free in Rwanda with zero broker commission.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white dark:bg-[#161D2A] py-8 px-6 sm:px-10 shadow-sm border border-black/[0.06] dark:border-white/[0.08] rounded-3xl">
          {error && (
            <div className="mb-5 p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="mb-6 p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-[#0E9F6E] dark:text-emerald-400 text-xs space-y-1.5">
            <div className="font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Zero-Broker-Fee Direct Guarantee</span>
            </div>
            <p className="text-[11px] leading-relaxed text-emerald-900/80 dark:text-emerald-300/80">
              Landlord listings are completely free. You keep 100% of rental revenue and deal directly with verified tenants.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200 mb-1.5">
                Full Legal Name / Property Owner Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#6B7280] dark:text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jean-Paul Habimana"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0E9F6E]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#6B7280] dark:text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. jp.habimana@smartrent.rw"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0E9F6E]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200 mb-1.5">
                Rwandan Mobile Phone (+250)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#6B7280] dark:text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+250 788 123 456"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0E9F6E]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#6B7280] dark:text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0E9F6E]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#1C1C1E] dark:hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-1">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#0E9F6E] focus:ring-[#0E9F6E]"
                />
                <span className="text-[11px] text-[#6B7280] dark:text-gray-400">
                  I agree to Smart Rent's{' '}
                  <Link to="/terms" className="font-semibold text-[#0E9F6E] hover:underline">
                    Terms
                  </Link>{' '}
                  and confirm I own or represent properties listed in Rwanda.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-[#0E9F6E] hover:bg-[#0b8058] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-transform active:scale-98 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{isLoading ? 'Creating account...' : 'Create Free Landlord Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-black/[0.06] dark:border-white/[0.08] text-center text-xs text-[#6B7280] dark:text-[#9CA3AF]">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-[#0E9F6E] hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
