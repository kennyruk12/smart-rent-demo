import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { FileText, Check, X, Eye, Phone, Mail, Calendar } from 'lucide-react';

export const LandlordRequestsView: React.FC = () => {
  const { currentUser } = useAuth();
  const { rentalRequests, properties, updateRentalRequestStatus } = useData();

  const myProperties = properties.filter(
    (p) =>
      p.landlord.email.toLowerCase() === currentUser?.email.toLowerCase() ||
      p.landlord.name === currentUser?.name
  );
  const myPropIds = myProperties.map((p) => p.id);
  const myRequests = rentalRequests.filter((r) => myPropIds.includes(r.propertyId));

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
          Tenant Rental Applications ({myRequests.length})
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
          Review lease proposals, contact prospective tenants directly, and accept or decline requests.
        </p>
      </div>

      <div className="bg-white dark:bg-[#161D2A] rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-2xs overflow-hidden">
        {myRequests.length > 0 ? (
          <div className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
            {myRequests.map((req) => (
              <div
                key={req.id}
                className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-black/[0.01] dark:hover:bg-white/[0.01]"
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
                        {req.tenantName}
                      </span>
                      <span className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">applied for</span>
                      <span className="font-semibold text-xs text-[#102A43] dark:text-emerald-400">
                        {req.propertyTitle}
                      </span>
                    </div>
                    <div className="text-xs text-[#6B7280] dark:text-[#9CA3AF] flex flex-wrap items-center gap-4">
                      <span>Phone: <strong>{req.tenantPhone}</strong></span>
                      <span>Email: <strong>{req.tenantEmail}</strong></span>
                      <span>Move-in: <strong>{req.moveInDate}</strong></span>
                      <span>Duration: <strong>{req.leaseDurationMonths} months</strong></span>
                    </div>
                    {req.message && (
                      <p className="text-xs text-[#1C1C1E] dark:text-gray-300 italic bg-black/[0.02] dark:bg-white/[0.04] p-2 rounded-xl mt-1">
                        "{req.message}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                  <div className="text-right">
                    <div className="text-sm font-extrabold text-[#102A43] dark:text-white tabular-nums">
                      {new Intl.NumberFormat('en-RW').format(req.propertyPrice)} RWF/mo
                    </div>
                    <span
                      className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
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

                  <Link
                    to={`/landlord/requests/${req.id}`}
                    className="px-3.5 py-1.5 bg-[#F4F5F7] dark:bg-white/10 hover:bg-black/5 text-[#1C1C1E] dark:text-white text-xs font-semibold rounded-xl"
                  >
                    View
                  </Link>

                  {req.status === 'Pending' && (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateRentalRequestStatus(req.id, 'Approved')}
                        className="px-3 py-1.5 bg-[#0E9F6E] hover:bg-[#0b8058] text-white text-xs font-bold rounded-xl cursor-pointer"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => updateRentalRequestStatus(req.id, 'Declined')}
                        className="px-3 py-1.5 bg-black/5 dark:bg-white/10 text-[#1C1C1E] dark:text-white text-xs font-bold rounded-xl cursor-pointer"
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-16 text-center text-xs text-[#6B7280] dark:text-[#9CA3AF]">
            No rental applications received for your properties yet.
          </div>
        )}
      </div>
    </div>
  );
};
