import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { ArrowLeft, Clock, CheckCircle2, XCircle, MapPin, Building2, User, Phone, Mail, Calendar } from 'lucide-react';

export const TenantRequestDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { rentalRequests, properties, cancelRentalRequest } = useData();
  const navigate = useNavigate();

  const request = rentalRequests.find((r) => r.id === id);
  const property = request ? properties.find((p) => p.id === request.propertyId) : null;

  if (!request) {
    return (
      <div className="p-8 text-center space-y-4">
        <h2 className="text-xl font-bold">Request not found</h2>
        <Link to="/tenant/requests" className="text-xs text-[#0E9F6E] underline">
          Return to requests list
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-4xl mx-auto">
      <div>
        <Link
          to="/tenant/requests"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#102A43] dark:hover:text-white mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all requests</span>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
              Rental Application #{request.id}
            </h1>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1">
              Submitted on {request.createdAt} · Direct Landlord Lease
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
            Status: {request.status}
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-[#161D2A] rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-2xs overflow-hidden">
        <div className="p-6 flex items-center gap-4 border-b border-black/[0.06] dark:border-white/[0.08]">
          <img
            src={request.propertyImage}
            alt={request.propertyTitle}
            referrerPolicy="no-referrer"
            className="w-20 h-16 rounded-2xl object-cover shrink-0"
          />
          <div>
            <h3 className="text-base font-bold text-[#1C1C1E] dark:text-white">
              {request.propertyTitle}
            </h3>
            <div className="text-xs text-[#6B7280] dark:text-[#9CA3AF] flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#0E9F6E]" />
              <span>{request.district}</span>
            </div>
            <div className="text-sm font-extrabold text-[#102A43] dark:text-emerald-400 mt-1 tabular-nums">
              {new Intl.NumberFormat('en-RW').format(request.propertyPrice)} RWF / month
            </div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div className="space-y-3">
            <h4 className="font-bold text-[#1C1C1E] dark:text-white text-sm">
              Your Application Terms
            </h4>
            <div className="space-y-2 text-[#6B7280] dark:text-gray-300">
              <div>Proposed Move-in: <strong className="text-[#1C1C1E] dark:text-white">{request.moveInDate}</strong></div>
              <div>Lease Term: <strong className="text-[#1C1C1E] dark:text-white">{request.leaseDurationMonths} months</strong></div>
              <div>Occupants: <strong className="text-[#1C1C1E] dark:text-white">{request.occupantsCount} people</strong></div>
              <div>Tenant Contact: <strong className="text-[#1C1C1E] dark:text-white">{request.tenantPhone}</strong></div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-[#1C1C1E] dark:text-white text-sm">
              Personal Message to Landlord
            </h4>
            <p className="p-3 rounded-2xl bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-gray-300 italic border border-black/[0.04] dark:border-white/[0.04]">
              "{request.message || 'No additional message was attached.'}"
            </p>
          </div>
        </div>

        {request.status === 'Pending' && (
          <div className="p-6 bg-[#FAFAF8] dark:bg-[#111722] border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
            <div className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
              Waiting for owner review. You can withdraw your request if your plans change.
            </div>
            <button
              onClick={() => {
                cancelRentalRequest(request.id);
                navigate('/tenant/requests');
              }}
              className="px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold rounded-xl cursor-pointer"
            >
              Cancel Request
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
