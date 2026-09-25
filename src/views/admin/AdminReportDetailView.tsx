import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { ArrowLeft, Check, X, AlertTriangle } from 'lucide-react';

export const AdminReportDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { reports, updateReportStatus } = useData();
  const navigate = useNavigate();

  const report = reports.find((r) => r.id === id);

  if (!report) {
    return <div className="p-8 text-center">Report not found.</div>;
  }

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-4xl mx-auto">
      <div>
        <Link
          to="/admin/reports"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#102A43] dark:hover:text-white mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to reports list</span>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
              Report #{report.id}
            </h1>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1">
              Logged on {report.createdAt} by {report.reporterName}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              report.status === 'Resolved'
                ? 'bg-emerald-50 text-[#0E9F6E]'
                : report.status === 'Dismissed'
                ? 'bg-slate-100 text-slate-700'
                : 'bg-rose-50 text-rose-600'
            }`}
          >
            {report.status}
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-[#161D2A] p-6 sm:p-8 rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-2xs space-y-6 text-xs">
        <div>
          <span className="text-[#6B7280] dark:text-gray-400">Target Item:</span>
          <div className="font-bold text-sm text-[#1C1C1E] dark:text-white mt-0.5">
            {report.targetTitle} (ID: {report.targetId})
          </div>
        </div>

        <div>
          <span className="text-[#6B7280] dark:text-gray-400">Report Reason:</span>
          <div className="font-bold text-sm text-[#1C1C1E] dark:text-white mt-0.5">
            {report.reason}
          </div>
        </div>

        <div>
          <span className="text-[#6B7280] dark:text-gray-400">Detailed Explanation:</span>
          <p className="p-4 rounded-2xl bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-gray-300 mt-1 leading-relaxed">
            {report.details}
          </p>
        </div>

        {report.status === 'Pending' && (
          <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center gap-3">
            <button
              onClick={() => {
                updateReportStatus(report.id, 'Resolved');
                navigate('/admin/reports');
              }}
              className="px-5 py-2.5 bg-[#0E9F6E] hover:bg-[#0b8058] text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Mark as Resolved</span>
            </button>
            <button
              onClick={() => {
                updateReportStatus(report.id, 'Dismissed');
                navigate('/admin/reports');
              }}
              className="px-5 py-2.5 bg-black/5 dark:bg-white/10 text-[#1C1C1E] dark:text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>Dismiss Report</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
