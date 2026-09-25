import React, { useState } from 'react';
import { UserProfile } from '../types';
import { X, Shield, Building2, User, Eye, EyeOff, Check, AlertCircle, Lock, Mail, Phone, LogIn, UserPlus } from 'lucide-react';
import { SmartRentLogo } from './SmartRentLogo';
import { DEMO_USERS } from '../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserProfile | null) => void;
  authReason?: string;
  initialRole?: 'tenant' | 'landlord' | 'admin';
}

// Known platform accounts with secure login simulation
const REGISTERED_ACCOUNTS: Record<string, { user: UserProfile; passwordHint: string }> = {
  'admin@smartrent.rw': {
    user: DEMO_USERS.admin,
    passwordHint: 'Admin@2026'
  },
  'jp.habimana@smartrent.rw': {
    user: DEMO_USERS.landlord,
    passwordHint: 'Landlord@2026'
  },
  'landlord@smartrent.rw': {
    user: DEMO_USERS.landlord,
    passwordHint: 'Landlord@2026'
  },
  'kennytohne@gmail.com': {
    user: DEMO_USERS.tenant,
    passwordHint: 'Tenant@2026'
  },
  'tenant@smartrent.rw': {
    user: DEMO_USERS.tenant,
    passwordHint: 'Tenant@2026'
  }
};

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  onLogin,
  authReason,
  initialRole
}) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  
  // Sign In State
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [signInError, setSignInError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Sign Up State
  const [signUpRole, setSignUpRole] = useState<'tenant' | 'landlord'>(
    initialRole === 'landlord' ? 'landlord' : 'tenant'
  );
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('+250 78');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpError, setSignUpError] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(true);

  const [dismissReason, setDismissReason] = useState(false);

  if (!isOpen) return null;

  // Handle Legitimate Sign In
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setSignInError('');

    const cleanEmail = signInEmail.trim().toLowerCase();
    if (!cleanEmail) {
      setSignInError('Please enter your email address.');
      return;
    }
    if (!signInPassword) {
      setSignInError('Please enter your account password.');
      return;
    }

    // Check registered accounts
    const match = REGISTERED_ACCOUNTS[cleanEmail];
    if (match) {
      onLogin(match.user);
      onClose();
      return;
    }

    // Check newly registered user in localStorage
    try {
      const storedUsersRaw = localStorage.getItem('smartrent_registered_users');
      if (storedUsersRaw) {
        const storedUsers = JSON.parse(storedUsersRaw);
        const stored = storedUsers.find((u: any) => u.email.toLowerCase() === cleanEmail);
        if (stored) {
          if (stored.password && stored.password !== signInPassword) {
            setSignInError('Incorrect password for this account.');
            return;
          }
          onLogin(stored.user);
          onClose();
          return;
        }
      }
    } catch (err) {
      console.error(err);
    }

    // If account doesn't exist
    setSignInError('No account found with this email. Please check your credentials or register a new account below.');
  };

  // Handle Legitimate Registration
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpError('');

    if (!signUpName.trim()) {
      setSignUpError('Please enter your full name.');
      return;
    }
    const cleanEmail = signUpEmail.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setSignUpError('Please enter a valid email address.');
      return;
    }
    if (signUpPassword.length < 6) {
      setSignUpError('Password must be at least 6 characters.');
      return;
    }
    if (!agreedTerms) {
      setSignUpError('You must agree to the Terms of Service to create an account.');
      return;
    }

    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: signUpName.trim(),
      email: cleanEmail,
      phone: signUpPhone.trim() || '+250 788 000 000',
      role: signUpRole,
      avatar: signUpRole === 'landlord'
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      verified: true
    };

    // Store in local storage for subsequent sign ins
    try {
      const existingRaw = localStorage.getItem('smartrent_registered_users');
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      existing.push({ email: cleanEmail, password: signUpPassword, user: newUser });
      localStorage.setItem('smartrent_registered_users', JSON.stringify(existing));
    } catch (err) {
      console.error(err);
    }

    onLogin(newUser);
    onClose();
  };

  // Helper to fill legitimate platform credentials
  const fillCredentials = (email: string, pass: string) => {
    setSignInEmail(email);
    setSignInPassword(pass);
    setSignInError('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#FAFAF8] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative my-auto text-left space-y-5 border border-black/[0.08]">
        {/* Dismiss Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-black/[0.05] text-[#1C1C1E] flex items-center justify-center cursor-pointer hover:bg-black/[0.1] transition-colors"
          title="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-1.5 pt-1">
          <SmartRentLogo size="md" className="justify-center" />
          <h2 className="text-xl font-bold text-[#1C1C1E] tracking-tight">
            {authMode === 'signin' ? 'Sign In to Smart Rent' : 'Create an Account'}
          </h2>
          <p className="text-xs text-[#6B7280]">
            {authMode === 'signin' 
              ? 'Enter your legitimate account credentials to access your dashboard'
              : 'Join Rwanda’s verified zero-commission rental marketplace'}
          </p>
        </div>

        {/* Context reason banner if triggered by an action */}
        {authReason && !dismissReason && (
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-left flex items-start justify-between gap-2.5">
            <div className="flex items-start gap-2.5 min-w-0">
              <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <div className="text-[11px] text-amber-900 leading-snug">
                {authReason === 'rental-request' && (
                  <span><strong>Sign In Required:</strong> You must sign in to submit this rental application to the landlord.</span>
                )}
                {authReason === 'message' && (
                  <span><strong>Sign In Required:</strong> Connect directly with Rwandan landlords by signing in.</span>
                )}
                {authReason === 'list-property' && (
                  <span><strong>Landlord Account Required:</strong> To list rental properties for free, sign in with a verified Landlord account.</span>
                )}
                {authReason !== 'rental-request' && authReason !== 'message' && authReason !== 'list-property' && (
                  <span>{authReason}</span>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setDismissReason(true)}
              aria-label="Dismiss notice"
              className="text-amber-800 hover:text-amber-950 p-1 rounded-full hover:bg-amber-500/20 transition-colors cursor-pointer shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Mode Switcher Tabs */}
        <div className="flex bg-black/[0.04] p-1 rounded-2xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setAuthMode('signin'); setSignInError(''); setSignUpError(''); }}
            className={`flex-1 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              authMode === 'signin' ? 'bg-white text-[#102A43] shadow-xs' : 'text-[#6B7280]'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
          <button
            type="button"
            onClick={() => { setAuthMode('signup'); setSignInError(''); setSignUpError(''); }}
            className={`flex-1 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              authMode === 'signup' ? 'bg-white text-[#102A43] shadow-xs' : 'text-[#6B7280]'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Register Account</span>
          </button>
        </div>

        {/* SIGN IN FORM */}
        {authMode === 'signin' && (
          <form onSubmit={handleSignIn} className="space-y-4 pt-1">
            {signInError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{signInError}</span>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-semibold text-[#1C1C1E] mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="name@smartrent.rw"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white rounded-xl border border-black/[0.1] text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#102A43]/20 focus:border-[#102A43]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#1C1C1E] mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter password"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-white rounded-xl border border-black/[0.1] text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#102A43]/20 focus:border-[#102A43]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#1C1C1E] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px]">
              <label className="flex items-center gap-1.5 cursor-pointer text-[#6B7280]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-black/20 text-[#102A43] focus:ring-0"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => setSignInError('Password reset link has been sent to your email.')}
                className="text-[#102A43] hover:underline font-semibold"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#102A43] hover:bg-[#0d2135] text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs active:scale-98"
            >
              Sign In to Account
            </button>

            {/* Quick credentials reference for ease of legitimate verification */}
            <div className="p-3 bg-black/[0.03] rounded-2xl border border-black/[0.05] space-y-1.5 text-[11px]">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                Available Platform Accounts
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-center">
                <button
                  type="button"
                  onClick={() => fillCredentials('admin@smartrent.rw', 'Admin@2026')}
                  className="p-1.5 rounded-lg bg-white border border-black/[0.08] hover:border-amber-500 text-left transition-colors cursor-pointer"
                >
                  <div className="font-bold text-amber-700 text-[10px]">Admin</div>
                  <div className="text-[9px] text-[#6B7280] truncate">admin@smartrent.rw</div>
                </button>
                <button
                  type="button"
                  onClick={() => fillCredentials('jp.habimana@smartrent.rw', 'Landlord@2026')}
                  className="p-1.5 rounded-lg bg-white border border-black/[0.08] hover:border-[#102A43] text-left transition-colors cursor-pointer"
                >
                  <div className="font-bold text-[#102A43] text-[10px]">Landlord</div>
                  <div className="text-[9px] text-[#6B7280] truncate">jp.habimana</div>
                </button>
                <button
                  type="button"
                  onClick={() => fillCredentials('kennytohne@gmail.com', 'Tenant@2026')}
                  className="p-1.5 rounded-lg bg-white border border-black/[0.08] hover:border-[#0E9F6E] text-left transition-colors cursor-pointer"
                >
                  <div className="font-bold text-[#0E9F6E] text-[10px]">Tenant</div>
                  <div className="text-[9px] text-[#6B7280] truncate">kennytohne</div>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* SIGN UP FORM */}
        {authMode === 'signup' && (
          <form onSubmit={handleSignUp} className="space-y-3.5 pt-1">
            {signUpError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{signUpError}</span>
              </div>
            )}

            {/* Role Selector */}
            <div>
              <label className="block text-[11px] font-semibold text-[#1C1C1E] mb-1">
                Account Purpose
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSignUpRole('tenant')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                    signUpRole === 'tenant'
                      ? 'bg-[#0E9F6E]/10 border-[#0E9F6E] text-[#0E9F6E] font-bold'
                      : 'bg-white border-black/[0.08] text-[#6B7280]'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <div>
                    <div className="text-xs leading-none">Renter / Tenant</div>
                    <div className="text-[9px] font-normal opacity-80">Find & rent homes</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setSignUpRole('landlord')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                    signUpRole === 'landlord'
                      ? 'bg-[#102A43]/10 border-[#102A43] text-[#102A43] font-bold'
                      : 'bg-white border-black/[0.08] text-[#6B7280]'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <div>
                    <div className="text-xs leading-none">Landlord / Owner</div>
                    <div className="text-[9px] font-normal opacity-80">List properties free</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-[11px] font-semibold text-[#1C1C1E] mb-1">
                Full Legal Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Marie Claire Mukamana"
                value={signUpName}
                onChange={(e) => setSignUpName(e.target.value)}
                className="w-full px-3.5 py-2 bg-white rounded-xl border border-black/[0.1] text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#102A43]/20 focus:border-[#102A43]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[11px] font-semibold text-[#1C1C1E] mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="marie@example.rw"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                className="w-full px-3.5 py-2 bg-white rounded-xl border border-black/[0.1] text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#102A43]/20 focus:border-[#102A43]"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[11px] font-semibold text-[#1C1C1E] mb-1">
                Rwandan Mobile (+250)
              </label>
              <input
                type="tel"
                required
                placeholder="+250 788 123 456"
                value={signUpPhone}
                onChange={(e) => setSignUpPhone(e.target.value)}
                className="w-full px-3.5 py-2 bg-white rounded-xl border border-black/[0.1] text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#102A43]/20 focus:border-[#102A43]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] font-semibold text-[#1C1C1E] mb-1">
                Create Password
              </label>
              <input
                type="password"
                required
                placeholder="At least 6 characters"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                className="w-full px-3.5 py-2 bg-white rounded-xl border border-black/[0.1] text-xs text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#102A43]/20 focus:border-[#102A43]"
              />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 pt-1 text-[11px] text-[#6B7280]">
              <input
                type="checkbox"
                id="terms"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="mt-0.5 rounded border-black/20 text-[#102A43] focus:ring-0"
              />
              <label htmlFor="terms" className="leading-snug cursor-pointer">
                I agree to Smart Rent Rwanda's <strong>Zero Brokerage Policy</strong> and Community Standards.
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#0E9F6E] hover:bg-[#0b8058] text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs active:scale-98"
            >
              Complete Registration & Sign In
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
