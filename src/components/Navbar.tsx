import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SmartRentLogo } from './SmartRentLogo';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { 
  Heart, 
  MessageSquare, 
  Plus, 
  User, 
  LogOut, 
  Building2, 
  Menu, 
  X, 
  ChevronDown, 
  Shield, 
  Compass,
  FileText
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const { savedPropertyIds, conversations, rentalRequests } = useData();
  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';
  const isTransparent = isHome && !isScrolled;

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/login');
  };

  const unreadMessagesCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);
  const pendingRequestsCount = rentalRequests.filter(r => r.status === 'Pending').length;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent text-white'
          : 'bg-[#FAFAF8]/90 dark:bg-[#0B0F17]/90 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/[0.08] text-[#1C1C1E] dark:text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer group">
          <SmartRentLogo variant={isTransparent ? 'light' : 'horizontal'} size="md" />
        </Link>

        {/* Center: Public / Tenant Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/explore"
            className={`text-xs font-semibold tracking-tight transition-colors hover:text-[#0E9F6E] ${
              location.pathname === '/explore' || location.pathname === '/properties'
                ? 'text-[#0E9F6E] font-bold'
                : isTransparent
                ? 'text-white/90'
                : 'text-[#6B7280] dark:text-gray-300'
            }`}
          >
            Explore
          </Link>

          <Link
            to="/locations"
            className={`text-xs font-semibold tracking-tight transition-colors hover:text-[#0E9F6E] ${
              location.pathname.startsWith('/locations')
                ? 'text-[#0E9F6E] font-bold'
                : isTransparent
                ? 'text-white/90'
                : 'text-[#6B7280] dark:text-gray-300'
            }`}
          >
            Locations
          </Link>

          {/* Visitor Only: How It Works & For Landlords */}
          {!currentUser && (
            <>
              <Link
                to="/how-it-works"
                className={`text-xs font-semibold tracking-tight transition-colors hover:text-[#0E9F6E] ${
                  location.pathname === '/how-it-works'
                    ? 'text-[#0E9F6E] font-bold'
                    : isTransparent
                    ? 'text-white/90'
                    : 'text-[#6B7280] dark:text-gray-300'
                }`}
              >
                How it works
              </Link>
              <Link
                to="/for-landlords"
                className={`text-xs font-semibold tracking-tight transition-colors hover:text-[#0E9F6E] ${
                  location.pathname === '/for-landlords'
                    ? 'text-[#0E9F6E] font-bold'
                    : isTransparent
                    ? 'text-white/90'
                    : 'text-[#6B7280] dark:text-gray-300'
                }`}
              >
                For landlords
              </Link>
            </>
          )}

          {/* Tenant Quick Links */}
          {currentUser?.role === 'tenant' && (
            <>
              <Link
                to="/tenant/saved"
                className={`text-xs font-semibold tracking-tight transition-colors hover:text-[#0E9F6E] flex items-center gap-1.5 ${
                  location.pathname === '/tenant/saved'
                    ? 'text-[#0E9F6E] font-bold'
                    : isTransparent
                    ? 'text-white/90'
                    : 'text-[#6B7280] dark:text-gray-300'
                }`}
              >
                <Heart className="w-3.5 h-3.5" />
                <span>Saved ({savedPropertyIds.length})</span>
              </Link>

              <Link
                to="/tenant/requests"
                className={`text-xs font-semibold tracking-tight transition-colors hover:text-[#0E9F6E] flex items-center gap-1.5 ${
                  location.pathname.startsWith('/tenant/requests')
                    ? 'text-[#0E9F6E] font-bold'
                    : isTransparent
                    ? 'text-white/90'
                    : 'text-[#6B7280] dark:text-gray-300'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>My Requests</span>
              </Link>
            </>
          )}

          {/* Landlord Quick Link */}
          {currentUser?.role === 'landlord' && (
            <Link
              to="/landlord/dashboard"
              className="text-xs font-bold text-[#0E9F6E] hover:underline flex items-center gap-1"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Landlord Hub</span>
            </Link>
          )}

          {/* Admin Quick Link */}
          {currentUser?.role === 'admin' && (
            <Link
              to="/admin/dashboard"
              className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Console</span>
            </Link>
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Light / Dark Mode Toggle */}
          <ThemeToggle
            className={
              isTransparent
                ? 'text-white hover:bg-white/20'
                : 'text-[#1C1C1E] dark:text-white'
            }
          />

          {/* List Free CTA */}
          {!currentUser ? (
            <Link
              to="/signup/landlord"
              className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                isTransparent
                  ? 'bg-white/15 hover:bg-white/25 text-white border border-white/20 backdrop-blur-xs'
                  : 'bg-[#102A43] hover:bg-[#0d2135] text-white shadow-xs'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>List free</span>
            </Link>
          ) : currentUser.role === 'landlord' ? (
            <Link
              to="/landlord/properties/new/basic"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-[#0E9F6E] hover:bg-[#0b8058] text-white shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Unit</span>
            </Link>
          ) : null}

          {/* Profile Dropdown if Logged In / Sign In if Guest */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className={`flex items-center gap-1.5 p-1 rounded-full transition-colors cursor-pointer relative ${
                  isTransparent ? 'hover:bg-white/15' : 'hover:bg-black/[0.04] dark:hover:bg-white/10'
                }`}
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/20"
                />
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#161D2A] rounded-2xl shadow-xl border border-black/[0.06] dark:border-white/[0.08] py-2 z-50 text-[#1C1C1E] dark:text-white"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-black/[0.06] dark:border-white/[0.08]">
                    <div className="text-xs font-bold">{currentUser.name}</div>
                    <div className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] truncate">
                      {currentUser.email}
                    </div>
                    <div className="mt-1 text-[10px] font-bold text-[#0E9F6E] uppercase tracking-wider">
                      {currentUser.role} Account
                    </div>
                  </div>

                  <div className="py-1">
                    <Link
                      to={
                        currentUser.role === 'admin'
                          ? '/admin/dashboard'
                          : currentUser.role === 'landlord'
                          ? '/landlord/dashboard'
                          : '/tenant/dashboard'
                      }
                      className="w-full text-left px-4 py-2 text-xs hover:bg-black/[0.03] dark:hover:bg-white/[0.05] flex items-center gap-2.5 font-bold"
                    >
                      <User className="w-3.5 h-3.5 text-[#0E9F6E]" />
                      <span>
                        {currentUser.role === 'admin'
                          ? 'Admin Console'
                          : currentUser.role === 'landlord'
                          ? 'Landlord Hub'
                          : 'Renter Dashboard'}
                      </span>
                    </Link>

                    {currentUser.role === 'tenant' && (
                      <>
                        <Link
                          to="/tenant/saved"
                          className="w-full text-left px-4 py-2 text-xs hover:bg-black/[0.03] dark:hover:bg-white/[0.05] flex items-center gap-2.5"
                        >
                          <Heart className="w-3.5 h-3.5 text-[#6B7280]" />
                          <span>Saved Homes ({savedPropertyIds.length})</span>
                        </Link>
                        <Link
                          to="/tenant/messages"
                          className="w-full text-left px-4 py-2 text-xs hover:bg-black/[0.03] dark:hover:bg-white/[0.05] flex items-center gap-2.5"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-[#6B7280]" />
                          <span>Messages</span>
                        </Link>
                      </>
                    )}
                  </div>

                  <div className="border-t border-black/[0.06] dark:border-white/[0.08] pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2.5 font-semibold cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-600" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                isTransparent
                  ? 'bg-white text-[#102A43] hover:bg-white/90'
                  : 'bg-black/[0.04] dark:bg-white/10 hover:bg-black/[0.08] text-[#1C1C1E] dark:text-white'
              }`}
            >
              Sign In
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-inherit cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#161D2A] border-b border-black/[0.08] dark:border-white/[0.08] p-5 space-y-3 text-xs">
          <Link
            to="/explore"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#1C1C1E] dark:text-white font-bold"
          >
            Explore Properties
          </Link>
          <Link
            to="/locations"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#1C1C1E] dark:text-white font-bold"
          >
            Locations
          </Link>

          {!currentUser && (
            <>
              <Link
                to="/how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-[#6B7280] dark:text-gray-300"
              >
                How it works
              </Link>
              <Link
                to="/for-landlords"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-[#6B7280] dark:text-gray-300"
              >
                For landlords
              </Link>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-[#0E9F6E] font-bold"
              >
                Sign In
              </Link>
            </>
          )}

          {currentUser && (
            <div className="pt-2 border-t border-black/10 dark:border-white/10 space-y-2">
              <Link
                to={
                  currentUser.role === 'admin'
                    ? '/admin/dashboard'
                    : currentUser.role === 'landlord'
                    ? '/landlord/dashboard'
                    : '/tenant/dashboard'
                }
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 font-bold text-[#0E9F6E]"
              >
                Go to Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left py-2 text-rose-600 font-bold"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
