import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, ShieldCheck, Calendar } from 'lucide-react';
import { DEMO_USERS } from '../../data/mockData';

export const AdminUserDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Find user by id
  const user = Object.values(DEMO_USERS).find((u) => u.id === id) || {
    id: id || 'usr-detail',
    name: 'Platform User',
    email: 'user@smartrent.rw',
    phone: '+250 788 123 456',
    role: 'tenant',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    verified: true
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-4xl mx-auto">
      <div>
        <Link
          to="/admin/users"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#102A43] dark:hover:text-white mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to user management</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
          User Account Details: {user.name}
        </h1>
      </div>

      <div className="bg-white dark:bg-[#161D2A] p-6 sm:p-8 rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-2xs space-y-6">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-bold text-[#1C1C1E] dark:text-white">{user.name}</h2>
            <div className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">{user.email}</div>
            <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#0E9F6E] capitalize">
              Role: {user.role} · Verified
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#FAFAF8] dark:bg-[#111722] space-y-1">
            <span className="text-[#6B7280] dark:text-gray-400">Phone Number</span>
            <div className="font-bold text-[#1C1C1E] dark:text-white">{user.phone}</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#FAFAF8] dark:bg-[#111722] space-y-1">
            <span className="text-[#6B7280] dark:text-gray-400">Account ID</span>
            <div className="font-bold text-[#1C1C1E] dark:text-white">{user.id}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
