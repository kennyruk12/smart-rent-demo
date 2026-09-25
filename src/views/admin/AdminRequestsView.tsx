import React from 'react';
import { useData } from '../../context/DataContext';
import { FileText, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminRequestsView: React.FC = () => {
  const { rentalRequests, updateRentalRequestStatus } = useData();

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
          All Rental Requests ({rentalRequests.length})
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
          Supervise tenant-to-landlord rental applications across all Rwandan properties.
        </p>
      </div>

      <div className="bg-white dark:bg-[#161D2A] rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-2xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-black/[0.06] dark:border-white/[0.08] bg-[#F4F5F7]/60 dark:bg-white/[0.02] text-[#6B7280] dark:text-gray-400 uppercase tracking-wider text-[10px] font-bold">
              <th className="py-3.5 px-6">Tenant & Property</th>
              <th className="py-3.5 px-4">Move-in Date</th>
              <th className="py-3.5 px-4">Duration</th>
              <th className="py-3.5 px-4">Rent</th>
              <th className="py-3.5 px-4 text-center">Status</th>
              <th className="py-3.5 px-6 text-right">Moderation Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
            {rentalRequests.map((req) => (
              <tr key={req.id} className="hover:bg-black/[0.01] dark:hover:bg-white/[0.02]">
                <td className="py-3.5 px-6">
                  <div className="font-bold text-[#1C1C1E] dark:text-white">{req.tenantName}</div>
                  <div className="text-[11px] text-[#0E9F6E]">{req.propertyTitle}</div>
                  <div className="text-[10px] text-[#6B7280]">{req.tenantPhone}</div>
                </td>

                <td className="py-3.5 px-4 font-medium text-[#1C1C1E] dark:text-white">
                  {req.moveInDate}
                </td>

                <td className="py-3.5 px-4 text-[#6B7280] dark:text-gray-300">
                  {req.leaseDurationMonths} months
                </td>

                <td className="py-3.5 px-4 font-bold text-[#102A43] dark:text-emerald-400 tabular-nums">
                  {new Intl.NumberFormat('en-RW').format(req.propertyPrice)} RWF
                </td>

                <td className="py-3.5 px-4 text-center">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      req.status === 'Approved'
                        ? 'bg-emerald-50 text-[#0E9F6E]'
                        : req.status === 'Declined'
                        ? 'bg-rose-50 text-rose-600'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {req.status}
                  </span>
                </td>

                <td className="py-3.5 px-6 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    {req.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => updateRentalRequestStatus(req.id, 'Approved')}
                          className="px-2.5 py-1 bg-[#0E9F6E] text-white rounded-lg font-bold cursor-pointer"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateRentalRequestStatus(req.id, 'Declined')}
                          className="px-2.5 py-1 bg-black/5 dark:bg-white/10 text-[#1C1C1E] dark:text-white rounded-lg font-bold cursor-pointer"
                        >
                          Decline
                        </button>
                      </>
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
