import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { DEMO_USERS } from '../../data/mockData';
import { User, ShieldCheck, UserX, UserCheck, Eye, Search, Filter } from 'lucide-react';

export const AdminUsersView: React.FC = () => {
  const { landlords } = useData();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'All' | 'tenant' | 'landlord' | 'admin'>('All');

  // Combine demo users and landlords
  const [userList, setUserList] = useState([
    {
      id: DEMO_USERS.tenant.id,
      name: DEMO_USERS.tenant.name,
      email: DEMO_USERS.tenant.email,
      phone: DEMO_USERS.tenant.phone,
      role: 'tenant',
      status: 'Active',
      joined: 'September 2026'
    },
    {
      id: DEMO_USERS.landlord.id,
      name: DEMO_USERS.landlord.name,
      email: DEMO_USERS.landlord.email,
      phone: DEMO_USERS.landlord.phone,
      role: 'landlord',
      status: 'Active',
      joined: 'March 2023'
    },
    {
      id: DEMO_USERS.admin.id,
      name: DEMO_USERS.admin.name,
      email: DEMO_USERS.admin.email,
      phone: DEMO_USERS.admin.phone,
      role: 'admin',
      status: 'Active',
      joined: 'January 2023'
    },
    {
      id: 'usr-2',
      name: 'Divine Uwase',
      email: 'divine.uwase@smartrent.rw',
      phone: '+250 783 987 654',
      role: 'landlord',
      status: 'Active',
      joined: 'November 2022'
    },
    {
      id: 'usr-3',
      name: 'Patrick Mugabo',
      email: 'patrick.mugabo@smartrent.rw',
      phone: '+250 785 456 789',
      role: 'landlord',
      status: 'Active',
      joined: 'January 2024'
    }
  ]);

  const toggleUserStatus = (userId: string) => {
    setUserList((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextStatus = u.status === 'Active' ? 'Suspended' : 'Active';
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  const filtered = userList.filter((u) => {
    const matchesSearch =
      !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
            User Management ({filtered.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
            Supervise all platform tenants, landlords, and administrative accounts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-[#6B7280] dark:text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search user by name or email..."
              className="pl-9 pr-4 py-2 bg-white dark:bg-[#161D2A] text-[#1C1C1E] dark:text-white text-xs border border-black/10 dark:border-white/10 rounded-xl"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as any)}
            className="px-3 py-2 bg-white dark:bg-[#161D2A] text-[#1C1C1E] dark:text-white text-xs border border-black/10 dark:border-white/10 rounded-xl font-bold"
          >
            <option value="All">All Roles</option>
            <option value="tenant">Tenants</option>
            <option value="landlord">Landlords</option>
            <option value="admin">Administrators</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-[#161D2A] rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-2xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-black/[0.06] dark:border-white/[0.08] bg-[#F4F5F7]/60 dark:bg-white/[0.02] text-[#6B7280] dark:text-gray-400 uppercase tracking-wider text-[10px] font-bold">
              <th className="py-3.5 px-6">User</th>
              <th className="py-3.5 px-4">Role</th>
              <th className="py-3.5 px-4">Phone</th>
              <th className="py-3.5 px-4">Joined</th>
              <th className="py-3.5 px-4 text-center">Status</th>
              <th className="py-3.5 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
            {filtered.map((user) => (
              <tr key={user.id} className="hover:bg-black/[0.01] dark:hover:bg-white/[0.02]">
                <td className="py-3.5 px-6">
                  <div className="font-bold text-[#1C1C1E] dark:text-white">{user.name}</div>
                  <div className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">{user.email}</div>
                </td>

                <td className="py-3.5 px-4">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                      user.role === 'admin'
                        ? 'bg-amber-100 text-amber-800'
                        : user.role === 'landlord'
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-[#0E9F6E]'
                        : 'bg-blue-100 dark:bg-blue-950/60 text-blue-700'
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="py-3.5 px-4 text-[#6B7280] dark:text-gray-300 font-medium">
                  {user.phone}
                </td>

                <td className="py-3.5 px-4 text-[#6B7280] dark:text-gray-400">
                  {user.joined}
                </td>

                <td className="py-3.5 px-4 text-center">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      user.status === 'Active'
                        ? 'bg-emerald-50 text-[#0E9F6E]'
                        : 'bg-rose-50 text-rose-600'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="py-3.5 px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/admin/users/${user.id}`}
                      className="px-2.5 py-1 bg-black/5 dark:bg-white/10 text-[#1C1C1E] dark:text-white rounded-lg font-semibold"
                    >
                      Details
                    </Link>
                    {user.role !== 'admin' && (
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer ${
                          user.status === 'Active'
                            ? 'text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40'
                            : 'text-[#0E9F6E] hover:bg-emerald-50'
                        }`}
                      >
                        {user.status === 'Active' ? 'Suspend' : 'Unsuspend'}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
