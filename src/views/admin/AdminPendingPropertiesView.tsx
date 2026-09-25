import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Clock, CheckCircle2, XCircle, Eye, Building2 } from 'lucide-react';

export const AdminPendingPropertiesView: React.FC = () => {
  const { properties, togglePropertyFeatured, deleteProperty } = useData();

  // Standard properties eligible for promotion / audit
  const pendingAudit = properties.filter((p) => !p.featured);

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
          Properties Audit Queue ({pendingAudit.length})
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
          Review listings submitted by landlords for compliance with zero-fee direct rental standards.
        </p>
      </div>

      <div className="bg-white dark:bg-[#161D2A] rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-2xs overflow-hidden">
        {pendingAudit.length > 0 ? (
          <div className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
            {pendingAudit.map((prop) => (
              <div
                key={prop.id}
                className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-black/[0.01] dark:hover:bg-white/[0.01]"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={prop.images[0]}
                    alt={prop.title}
                    referrerPolicy="no-referrer"
                    className="w-16 h-14 rounded-2xl object-cover shrink-0"
                  />
                  <div>
                    <div className="font-bold text-sm text-[#1C1C1E] dark:text-white">
                      {prop.title}
                    </div>
                    <div className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                      {prop.neighborhood}, {prop.district} · Owner: <strong>{prop.landlord.name}</strong>
                    </div>
                    <div className="text-xs font-extrabold text-[#102A43] dark:text-emerald-400 mt-1 tabular-nums">
                      {new Intl.NumberFormat('en-RW').format(prop.priceRwf)} RWF / mo
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                  <Link
                    to={`/admin/properties/${prop.id}`}
                    className="px-3.5 py-1.5 bg-[#F4F5F7] dark:bg-white/10 hover:bg-black/5 text-[#1C1C1E] dark:text-white text-xs font-semibold rounded-xl"
                  >
                    Inspect
                  </Link>
                  <button
                    onClick={() => togglePropertyFeatured(prop.id)}
                    className="px-3.5 py-1.5 bg-[#0E9F6E] hover:bg-[#0b8058] text-white text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Approve / Feature
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-16 text-center text-xs text-[#6B7280]">
            All listings have been audited and featured.
          </div>
        )}
      </div>
    </div>
  );
};
