import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { AlertTriangle, CheckCircle2, XCircle, Eye } from 'lucide-react';

export const AdminReportsView: React.FC = () => {
  const { reports, updateReportStatus } = useData();

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
          Platform Reports & Flags ({reports.length})
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
          Review community reports regarding inaccurate listings, middleman solicitations, or safety concerns.
        </p>
      </div>

      <div className="bg-white dark:bg-[#161D2A] rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-2xs overflow-hidden">
        {reports.length > 0 ? (
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-black/[0.06] dark:border-white/[0.08] bg-[#F4F5F7]/60 dark:bg-white/[0.02] text-[#6B7280] dark:text-gray-400 uppercase tracking-wider text-[10px] font-bold">
                <th className="py-3.5 px-6">Report Subject</th>
                <th className="py-3.5 px-4">Reason</th>
                <th className="py-3.5 px-4">Reporter</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
              {reports.map((rep) => (
                <tr key={rep.id} className="hover:bg-black/[0.01] dark:hover:bg-white/[0.02]">
                  <td className="py-3.5 px-6 font-bold text-[#1C1C1E] dark:text-white">
                    {rep.targetTitle}
                  </td>
                  <td className="py-3.5 px-4 text-[#6B7280] dark:text-gray-300">
                    {rep.reason}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[#1C1C1E] dark:text-white">{rep.reporterName}</div>
                    <div className="text-[10px] text-[#6B7280]">{rep.reporterEmail}</div>
                  </td>
                  <td className="py-3.5 px-4 text-[#6B7280]">
                    {rep.createdAt}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        rep.status === 'Resolved'
                          ? 'bg-emerald-50 text-[#0E9F6E]'
                          : rep.status === 'Dismissed'
                          ? 'bg-slate-100 text-slate-700'
                          : 'bg-rose-50 text-rose-600'
                      }`}
                    >
                      {rep.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        to={`/admin/reports/${rep.id}`}
                        className="px-2.5 py-1 bg-black/5 dark:bg-white/10 rounded-lg font-semibold"
                      >
                        Inspect
                      </Link>
                      {rep.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => updateReportStatus(rep.id, 'Resolved')}
                            className="px-2.5 py-1 bg-[#0E9F6E] text-white rounded-lg font-bold cursor-pointer"
                          >
                            Resolve
                          </button>
                          <button
                            onClick={() => updateReportStatus(rep.id, 'Dismissed')}
                            className="px-2.5 py-1 bg-black/5 text-[#1C1C1E] dark:text-white rounded-lg font-bold cursor-pointer"
                          >
                            Dismiss
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-16 text-center text-xs text-[#6B7280]">
            No reports logged on the platform.
          </div>
        )}
      </div>
    </div>
  );
};
