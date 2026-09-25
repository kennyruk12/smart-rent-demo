import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SmartRentLogo } from '../../components/SmartRentLogo';
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';

export const ResetPasswordView: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError(null);
    setSuccess(true);
    setTimeout(() => {
      navigate('/login');
    }, 2000);
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
          Set new password
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF]">
          Create a new secure password for your Smart Rent account.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white dark:bg-[#161D2A] py-8 px-6 sm:px-10 shadow-sm border border-black/[0.06] dark:border-white/[0.08] rounded-3xl">
          {success ? (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-[#0E9F6E] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#1C1C1E] dark:text-white">
                Password successfully updated
              </h3>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                Redirecting you to login...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200 mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#6B7280] dark:text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full pl-10 pr-10 py-2.5 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#102A43] dark:focus:ring-emerald-500"
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

              <div>
                <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#6B7280] dark:text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#102A43] dark:focus:ring-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#102A43] hover:bg-[#0d2135] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-transform active:scale-98 cursor-pointer"
              >
                Save New Password
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
