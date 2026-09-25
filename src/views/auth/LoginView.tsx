import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { SmartRentLogo } from '../../components/SmartRentLogo';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { DEMO_USERS } from '../../data/mockData';

export const LoginView: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (!email.trim() || !password) {
        setError('Please enter both email address and password.');
        setIsLoading(false);
        return;
      }

      const user = await login(email);

      // Navigate to redirectUrl if provided, otherwise route to role-based dashboard
      if (redirectUrl) {
        navigate(redirectUrl, { replace: true });
      } else if (user.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else if (user.role === 'landlord') {
        navigate('/landlord/dashboard', { replace: true });
      } else {
        navigate('/tenant/dashboard', { replace: true });
      }
    } catch (err: any) {
      setError(err?.message || 'Login failed. Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = (role: 'tenant' | 'landlord' | 'admin') => {
    if (role === 'admin') {
      setEmail(DEMO_USERS.admin.email);
      setPassword('admin123');
    } else if (role === 'landlord') {
      setEmail(DEMO_USERS.landlord.email);
      setPassword('landlord123');
    } else {
      setEmail(DEMO_USERS.tenant.email);
      setPassword('tenant123');
    }
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#0B0F17] flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
          <SmartRentLogo className="w-10 h-10" />
          <span className="font-extrabold text-2xl tracking-tight text-[#102A43] dark:text-white">
            Smart<span className="text-[#0E9F6E]">Rent</span>
          </span>
        </Link>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1C1E] dark:text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF]">
          Or{' '}
          <Link to="/signup" className="font-semibold text-[#0E9F6E] hover:underline">
            create a new Smart Rent account
          </Link>
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

          <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="e.g. kennytohne@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#102A43] dark:focus:ring-emerald-500 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] font-semibold text-[#0E9F6E] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#6B7280] dark:text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#102A43] dark:focus:ring-emerald-500 transition-all"
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

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#0E9F6E] focus:ring-[#0E9F6E]"
                />
                <span className="text-xs text-[#6B7280] dark:text-gray-400">Remember me</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-[#102A43] hover:bg-[#0d2135] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-transform active:scale-98 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{isLoading ? 'Signing in...' : 'Sign in to Smart Rent'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Fill Buttons for Immediate Verification */}
          <div className="mt-6 pt-5 border-t border-black/[0.06] dark:border-white/[0.08]">
            <div className="text-[11px] font-semibold text-center text-[#6B7280] dark:text-gray-400 mb-2.5">
              Quick Test Credentials:
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('tenant')}
                className="py-1.5 px-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[#1C1C1E] dark:text-gray-200 text-[11px] font-bold rounded-lg cursor-pointer transition-colors text-center"
              >
                Tenant
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('landlord')}
                className="py-1.5 px-2 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 text-[#0E9F6E] text-[11px] font-bold rounded-lg cursor-pointer transition-colors text-center"
              >
                Landlord
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="py-1.5 px-2 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 text-amber-700 dark:text-amber-400 text-[11px] font-bold rounded-lg cursor-pointer transition-colors text-center"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
