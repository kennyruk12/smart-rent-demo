import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { ArrowLeft, Check, X, Phone, Mail, Calendar, User, Building2 } from 'lucide-react';

export const LandlordRequestDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { rentalRequests, updateRentalRequestStatus } = useData();
  const navigate = useNavigate();

  const request = rentalRequests.find((r) => r.id === id);

  if (!request) {
    return <div className="p-8 text-center">Rental request not found.</div>;
  }

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-4xl mx-auto">
      <div>
        <Link
          to="/landlord/requests"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#102A43] dark:hover:text-white mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to requests</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
              Application from {request.tenantName}
            </h1>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1">
              For {request.propertyTitle} · Received {request.createdAt}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold self-start sm:self-auto ${
              request.status === 'Approved'
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-[#0E9F6E]'
                : request.status === 'Declined'
                ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600'
                : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400'
            }`}
          >
            {request.status}
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-[#161D2A] rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-2xs p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-[#1C1C1E] dark:text-white">Tenant Details</h3>
            <div className="space-y-2 text-[#6B7280] dark:text-gray-300">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#0E9F6E]" />
                <span>Full Name: <strong className="text-[#1C1C1E] dark:text-white">{request.tenantName}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0E9F6E]" />
                <span>Phone: <strong className="text-[#1C1C1E] dark:text-white">{request.tenantPhone}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0E9F6E]" />
                <span>Email: <strong className="text-[#1C1C1E] dark:text-white">{request.tenantEmail}</strong></span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-sm text-[#1C1C1E] dark:text-white">Proposed Lease Terms</h3>
            <div className="space-y-2 text-[#6B7280] dark:text-gray-300">
              <div>Desired Move-in: <strong className="text-[#1C1C1E] dark:text-white">{request.moveInDate}</strong></div>
              <div>Lease Duration: <strong className="text-[#1C1C1E] dark:text-white">{request.leaseDurationMonths} months</strong></div>
              <div>Occupants: <strong className="text-[#1C1C1E] dark:text-white">{request.occupantsCount} people</strong></div>
              <div>Offered Rent: <strong className="text-[#0E9F6E]">{new Intl.NumberFormat('en-RW').format(request.propertyPrice)} RWF / mo</strong></div>
            </div>
          </div>
        </div>

        {request.message && (
          <div className="p-4 rounded-2xl bg-[#FAFAF8] dark:bg-[#111722] border border-black/[0.04] dark:border-white/[0.04]">
            <div className="font-bold text-xs text-[#1C1C1E] dark:text-white mb-1">Tenant Note:</div>
            <p className="text-xs text-[#6B7280] dark:text-gray-300 italic">
              "{request.message}"
            </p>
          </div>
        )}

        {request.status === 'Pending' && (
          <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center gap-3">
            <button
              onClick={() => {
                updateRentalRequestStatus(request.id, 'Approved');
                navigate('/landlord/requests');
              }}
              className="px-6 py-2.5 bg-[#0E9F6E] hover:bg-[#0b8058] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Accept & Approve Application</span>
            </button>
            <button
              onClick={() => {
                updateRentalRequestStatus(request.id, 'Declined');
                navigate('/landlord/requests');
              }}
              className="px-6 py-2.5 bg-black/5 dark:bg-white/10 hover:bg-black/10 text-[#1C1C1E] dark:text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>Decline</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
