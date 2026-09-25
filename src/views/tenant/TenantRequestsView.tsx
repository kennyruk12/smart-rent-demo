import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { FileText, Clock, CheckCircle2, XCircle, ArrowRight, Eye, Trash2 } from 'lucide-react';

export const TenantRequestsView: React.FC = () => {
  const { rentalRequests, cancelRentalRequest } = useData();

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
          Rental Requests & Lease Status ({rentalRequests.length})
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
          Review your submitted lease proposals, landlord decisions, and move-in schedules.
        </p>
      </div>

      <div className="bg-white dark:bg-[#161D2A] rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-2xs overflow-hidden">
        {rentalRequests.length > 0 ? (
          <div className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
            {rentalRequests.map((req) => (
              <div
                key={req.id}
                className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={req.propertyImage}
                    alt={req.propertyTitle}
                    referrerPolicy="no-referrer"
                    className="w-16 h-14 rounded-2xl object-cover shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#1C1C1E] dark:text-white">
                        {req.propertyTitle}
                      </span>
                      <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">· {req.district}</span>
                    </div>
                    <div className="text-xs text-[#6B7280] dark:text-[#9CA3AF] flex flex-wrap items-center gap-4">
                      <span>Target Move-in: <strong>{req.moveInDate}</strong></span>
                      <span>Lease Duration: <strong>{req.leaseDurationMonths} months</strong></span>
                      <span>Occupants: <strong>{req.occupantsCount}</strong></span>
                    </div>
                    {req.message && (
                      <p className="text-xs text-[#1C1C1E] dark:text-gray-300 italic bg-black/[0.02] dark:bg-white/[0.04] p-2 rounded-xl mt-1 line-clamp-1">
                        "{req.message}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end md:self-center">
                  <div className="text-right">
                    <div className="text-sm font-extrabold text-[#102A43] dark:text-white tabular-nums">
                      {new Intl.NumberFormat('en-RW').format(req.propertyPrice)} RWF/mo
                    </div>
                    <span
                      className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full mt-1 ${
                        req.status === 'Approved'
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-[#0E9F6E]'
                          : req.status === 'Declined'
                          ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600'
                          : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400'
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/tenant/requests/${req.id}`}
                      className="px-3.5 py-1.5 bg-[#102A43] dark:bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </Link>

                    {req.status === 'Pending' && (
                      <button
                        onClick={() => cancelRentalRequest(req.id)}
                        title="Cancel this request"
                        className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-16 text-center text-xs text-[#6B7280] dark:text-[#9CA3AF] space-y-3">
            <FileText className="w-8 h-8 mx-auto text-[#6B7280] dark:text-gray-400" />
            <p>You have not submitted any rental applications yet.</p>
            <Link
              to="/tenant/explore"
              className="inline-block px-4 py-2 bg-[#102A43] text-white rounded-xl font-bold"
            >
              Browse Properties to Rent
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
