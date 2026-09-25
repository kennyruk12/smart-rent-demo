import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SmartRentLogo } from '../../components/SmartRentLogo';
import { Mail, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export const ForgotPasswordView: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    setError(null);
    setSubmitted(true);
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
          Reset your password
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF]">
          Enter your email and we will send password recovery instructions.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white dark:bg-[#161D2A] py-8 px-6 sm:px-10 shadow-sm border border-black/[0.06] dark:border-white/[0.08] rounded-3xl">
          {submitted ? (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-[#0E9F6E] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#1C1C1E] dark:text-white">
                Recovery instructions sent
              </h3>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                If an account exists for <span className="font-semibold text-[#1C1C1E] dark:text-white">{email}</span>, you will receive password reset instructions shortly.
              </p>
              <div className="pt-2">
                <Link
                  to="/reset-password"
                  className="inline-block px-4 py-2 bg-[#102A43] text-white text-xs font-bold rounded-xl"
                >
                  Proceed to Reset Screen
                </Link>
              </div>
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
                  Account Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#6B7280] dark:text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. kennytohne@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#102A43] dark:focus:ring-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#102A43] hover:bg-[#0d2135] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-transform active:scale-98 cursor-pointer"
              >
                Send Password Reset Email
              </button>
            </form>
          )}

          <div className="mt-6 pt-5 border-t border-black/[0.06] dark:border-white/[0.08] text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#102A43] dark:hover:text-white"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
