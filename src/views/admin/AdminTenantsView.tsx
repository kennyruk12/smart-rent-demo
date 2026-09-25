import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { User, Phone, Mail, FileText } from 'lucide-react';
import { DEMO_USERS } from '../../data/mockData';

export const AdminTenantsView: React.FC = () => {
  const { rentalRequests } = useData();

  const tenants = [
    {
      id: DEMO_USERS.tenant.id,
      name: DEMO_USERS.tenant.name,
      email: DEMO_USERS.tenant.email,
      phone: DEMO_USERS.tenant.phone,
      activeRequests: rentalRequests.length,
      joined: 'September 2026'
    },
    {
      id: 't-2',
      name: 'Ange Ishimwe',
      email: 'ange.ishimwe@example.rw',
      phone: '+250 782 345 678',
      activeRequests: 1,
      joined: 'August 2026'
    },
    {
      id: 't-3',
      name: 'Eric Ndayisaba',
      email: 'eric.n@example.rw',
      phone: '+250 789 987 654',
      activeRequests: 0,
      joined: 'July 2026'
    }
  ];

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
          Registered Tenants ({tenants.length})
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
          Active prospective renters seeking residential properties in Rwanda.
        </p>
      </div>

      <div className="bg-white dark:bg-[#161D2A] rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-2xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-black/[0.06] dark:border-white/[0.08] bg-[#F4F5F7]/60 dark:bg-white/[0.02] text-[#6B7280] dark:text-gray-400 uppercase tracking-wider text-[10px] font-bold">
              <th className="py-3.5 px-6">Tenant</th>
              <th className="py-3.5 px-4">Phone</th>
              <th className="py-3.5 px-4">Active Requests</th>
              <th className="py-3.5 px-4">Joined</th>
              <th className="py-3.5 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
            {tenants.map((t) => (
              <tr key={t.id} className="hover:bg-black/[0.01] dark:hover:bg-white/[0.02]">
                <td className="py-3.5 px-6">
                  <div className="font-bold text-[#1C1C1E] dark:text-white">{t.name}</div>
                  <div className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">{t.email}</div>
                </td>
                <td className="py-3.5 px-4 text-[#6B7280] dark:text-gray-300 font-medium">{t.phone}</td>
                <td className="py-3.5 px-4 font-bold text-[#0E9F6E]">{t.activeRequests}</td>
                <td className="py-3.5 px-4 text-[#6B7280] dark:text-gray-400">{t.joined}</td>
                <td className="py-3.5 px-6 text-right">
                  <Link
                    to={`/admin/users/${t.id}`}
                    className="px-3 py-1 bg-black/5 dark:bg-white/10 text-[#1C1C1E] dark:text-white font-semibold rounded-lg"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
