import React from 'react';
import { useData } from '../../context/DataContext';
import { ShieldCheck, CheckCircle2, XCircle, Phone, Mail, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminLandlordsView: React.FC = () => {
  const { landlords, toggleLandlordVerification } = useData();

  const landlordList = Object.values(landlords);

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
          Landlords & Property Hosts ({landlordList.length})
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
          Validate NIDA identity status, property ownership, and monitor landlord compliance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {landlordList.map((landlord) => (
          <div
            key={landlord.id}
            className="p-6 rounded-3xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#161D2A] shadow-2xs flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={landlord.avatar}
                  alt={landlord.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover shrink-0 ring-1 ring-black/10"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm text-[#1C1C1E] dark:text-white">
                      {landlord.name}
                    </h3>
                    {landlord.verified ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#0E9F6E] text-[10px] font-bold">
                        ✓ Verified
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 text-[10px] font-bold">
                        Unverified
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">
                    {landlord.phone} · {landlord.email}
                  </div>
                </div>
              </div>

              <button
                onClick={() => toggleLandlordVerification(landlord.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                  landlord.verified
                    ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                    : 'bg-[#0E9F6E] text-white hover:bg-[#0b8058]'
                }`}
              >
                {landlord.verified ? 'Revoke Verification' : 'Verify NIDA'}
              </button>
            </div>

            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed line-clamp-2 mb-4">
              {landlord.bio}
            </p>

            <div className="pt-3 border-t border-black/[0.04] dark:border-white/[0.04] flex items-center justify-between text-xs text-[#6B7280] dark:text-gray-400">
              <span>Member: <strong>{landlord.memberSince}</strong></span>
              <span>Managed units: <strong>{landlord.totalProperties}</strong></span>
              <span>Response: <strong>{landlord.responseRate}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
