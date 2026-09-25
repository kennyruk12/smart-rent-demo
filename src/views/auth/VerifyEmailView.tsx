import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SmartRentLogo } from '../../components/SmartRentLogo';
import { MailCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const VerifyEmailView: React.FC = () => {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);

  const handleSimulateVerify = () => {
    setVerified(true);
    setTimeout(() => {
      navigate('/login');
    }, 1500);
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
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1C1E] dark:text-white">
          Verify your email address
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF]">
          Confirm your email to complete verification and enable messaging.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white dark:bg-[#161D2A] py-8 px-6 sm:px-10 shadow-sm border border-black/[0.06] dark:border-white/[0.08] rounded-3xl text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-[#0E9F6E] flex items-center justify-center mx-auto">
            {verified ? <CheckCircle2 className="w-8 h-8" /> : <MailCheck className="w-8 h-8" />}
          </div>

          <div>
            <h3 className="text-base font-bold text-[#1C1C1E] dark:text-white">
              {verified ? 'Email Confirmed!' : 'Check your inbox'}
            </h3>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1.5 leading-relaxed">
              {verified 
                ? 'Your email address is verified. Redirecting to login...'
                : 'We sent a verification link to your registered email address. Click the link inside to verify your identity.'}
            </p>
          </div>

          {!verified && (
            <button
              onClick={handleSimulateVerify}
              className="w-full py-2.5 px-4 bg-[#0E9F6E] hover:bg-[#0b8058] text-white text-xs font-bold rounded-xl shadow-xs transition-transform active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Simulate Click on Verification Link</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <div className="pt-2 text-xs text-[#6B7280] dark:text-[#9CA3AF]">
            <Link to="/login" className="font-semibold text-[#102A43] dark:text-emerald-400 hover:underline">
              Return to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
