import React from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { SmartRentLogo } from '../../components/SmartRentLogo';
import { ThemeToggle } from '../../components/ThemeToggle';
import { 
  LayoutDashboard, 
  Compass, 
  Heart, 
  FileText, 
  MessageSquare, 
  Bell, 
  User, 
  Settings, 
  LogOut,
  ExternalLink,
  ShieldCheck,
  Home
} from 'lucide-react';

export const TenantLayout: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { savedPropertyIds, rentalRequests, conversations, notifications } = useData();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const pendingRequestsCount = rentalRequests.filter(r => r.status === 'Pending').length;
  const unreadMessagesCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);
  const unreadNotifCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { to: '/tenant/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/tenant/explore', label: 'Explore Homes', icon: Compass },
    { to: '/tenant/saved', label: 'Saved Properties', icon: Heart, count: savedPropertyIds.length },
    { to: '/tenant/requests', label: 'Rental Requests', icon: FileText, count: pendingRequestsCount },
    { to: '/tenant/messages', label: 'Messages', icon: MessageSquare, count: unreadMessagesCount },
    { to: '/tenant/notifications', label: 'Notifications', icon: Bell, count: unreadNotifCount },
    { to: '/tenant/profile', label: 'Profile', icon: User },
    { to: '/tenant/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F4F5F7] dark:bg-[#0B0F17] flex flex-col md:flex-row text-[#1C1C1E] dark:text-[#F3F4F6] font-['Plus_Jakarta_Sans',sans-serif] transition-colors">
      {/* 1. Sideways Navigation Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-[#161D2A] border-r border-black/[0.08] dark:border-white/[0.08] flex flex-col shrink-0 md:h-screen md:sticky md:top-0 z-30 transition-colors">
        {/* Brand Header */}
        <div className="p-6 border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
          <Link to="/tenant/dashboard" className="flex items-center gap-2.5">
            <SmartRentLogo variant="icon-only" size="sm" />
            <div>
              <div className="font-extrabold text-base tracking-tight text-[#102A43] dark:text-white leading-none">
                Smart<span className="text-[#0E9F6E]">Rent</span>
              </div>
              <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mt-1">
                Tenant Portal
              </div>
            </div>
          </Link>
          <ThemeToggle />
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400 px-3 py-1.5">
            Renter Menu
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/tenant/dashboard'}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#102A43] text-white shadow-xs'
                      : 'text-[#6B7280] dark:text-gray-400 hover:text-[#1C1C1E] dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.05]'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.count !== undefined && item.count > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#0E9F6E] text-white">
                    {item.count}
                  </span>
                )}
              </NavLink>
            );
          })}

          <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] dark:text-gray-400 px-3 pt-4 pb-1.5">
            Public Website
          </div>
          <Link
            to="/explore"
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-2xl text-xs font-semibold text-[#6B7280] dark:text-gray-400 hover:text-[#1C1C1E] dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.05]"
          >
            <Compass className="w-4 h-4 text-[#0E9F6E]" />
            <span>Public Marketplace</span>
            <ExternalLink className="w-3 h-3 ml-auto opacity-40" />
          </Link>
        </nav>

        {/* Footer Profile & Logout */}
        <div className="p-4 border-t border-black/[0.06] dark:border-white/[0.08] bg-black/[0.01] dark:bg-white/[0.02] space-y-3">
          <div className="flex items-center gap-3">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
              alt={currentUser?.name}
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500/20"
            />
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-[#1C1C1E] dark:text-white truncate">
                {currentUser?.name}
              </div>
              <div className="text-[10px] text-[#0E9F6E] font-semibold flex items-center gap-1">
                <span>Verified Renter</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-black/[0.04] dark:border-white/[0.04]">
            <Link
              to="/"
              className="text-[11px] text-[#6B7280] dark:text-gray-400 hover:text-[#102A43] dark:hover:text-white font-semibold flex items-center gap-1"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <button
              onClick={handleLogout}
              className="text-[11px] text-rose-600 dark:text-rose-400 hover:text-rose-800 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
