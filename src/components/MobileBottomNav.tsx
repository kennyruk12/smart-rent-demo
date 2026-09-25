import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home, Compass, Heart, MessageSquare, User, Building2, Shield, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export const MobileBottomNav: React.FC = () => {
  const { currentUser } = useAuth();
  const { savedPropertyIds, conversations } = useData();

  const unreadMessagesCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAFAF8]/95 dark:bg-[#0B0F17]/95 backdrop-blur-xl border-t border-black/[0.06] dark:border-white/[0.08] py-2 px-2 flex items-center justify-around shadow-sm transition-colors">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-col items-center py-1 text-[10px] font-semibold transition-colors ${
            isActive ? 'text-[#0E9F6E]' : 'text-[#6B7280] dark:text-gray-400'
          }`
        }
      >
        <Home className="w-4 h-4 mb-0.5" />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/explore"
        className={({ isActive }) =>
          `flex flex-col items-center py-1 text-[10px] font-semibold transition-colors ${
            isActive ? 'text-[#0E9F6E]' : 'text-[#6B7280] dark:text-gray-400'
          }`
        }
      >
        <Compass className="w-4 h-4 mb-0.5" />
        <span>Explore</span>
      </NavLink>

      {currentUser?.role === 'tenant' ? (
        <>
          <NavLink
            to="/tenant/saved"
            className={({ isActive }) =>
              `relative flex flex-col items-center py-1 text-[10px] font-semibold transition-colors ${
                isActive ? 'text-rose-500' : 'text-[#6B7280] dark:text-gray-400'
              }`
            }
          >
            <Heart className="w-4 h-4 mb-0.5" />
            <span>Saved</span>
            {savedPropertyIds.length > 0 && (
              <span className="absolute top-0.5 right-1 w-1.5 h-1.5 rounded-full bg-rose-500" />
            )}
          </NavLink>

          <NavLink
            to="/tenant/dashboard"
            className={({ isActive }) =>
              `flex flex-col items-center py-1 text-[10px] font-semibold transition-colors ${
                isActive ? 'text-[#0E9F6E]' : 'text-[#6B7280] dark:text-gray-400'
              }`
            }
          >
            <User className="w-4 h-4 mb-0.5" />
            <span>Dashboard</span>
          </NavLink>
        </>
      ) : currentUser?.role === 'landlord' ? (
        <NavLink
          to="/landlord/dashboard"
          className={({ isActive }) =>
            `flex flex-col items-center py-1 text-[10px] font-semibold transition-colors ${
              isActive ? 'text-[#0E9F6E]' : 'text-[#6B7280] dark:text-gray-400'
            }`
          }
        >
          <Building2 className="w-4 h-4 mb-0.5" />
          <span>Landlord</span>
        </NavLink>
      ) : currentUser?.role === 'admin' ? (
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex flex-col items-center py-1 text-[10px] font-semibold transition-colors ${
              isActive ? 'text-amber-600' : 'text-[#6B7280] dark:text-gray-400'
            }`
          }
        >
          <Shield className="w-4 h-4 mb-0.5" />
          <span>Admin</span>
        </NavLink>
      ) : (
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `flex flex-col items-center py-1 text-[10px] font-semibold transition-colors ${
              isActive ? 'text-[#0E9F6E]' : 'text-[#6B7280] dark:text-gray-400'
            }`
          }
        >
          <LogIn className="w-4 h-4 mb-0.5" />
          <span>Sign In</span>
        </NavLink>
      )}
    </nav>
  );
};
