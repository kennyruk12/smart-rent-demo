import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Building2, Calendar, Users, Send, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';

export const TenantNewRequestView: React.FC = () => {
  const [searchParams] = useSearchParams();
  const propertyId = searchParams.get('property') || '';
  const { properties, createRentalRequest } = useData();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const property = properties.find((p) => p.id === propertyId) || properties[0];

  const [moveInDate, setMoveInDate] = useState('2026-10-01');
  const [leaseDurationMonths, setLeaseDurationMonths] = useState(12);
  const [occupantsCount, setOccupantsCount] = useState(2);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !property) return;

    createRentalRequest({
      propertyId: property.id,
      propertyTitle: property.title,
      propertyImage: property.images[0],
      propertyPrice: property.priceRwf,
      district: property.district,
      tenantName: currentUser.name,
      tenantEmail: currentUser.email,
      tenantPhone: currentUser.phone,
      moveInDate,
      leaseDurationMonths,
      occupantsCount,
      message
    });

    setSubmitted(true);
    setTimeout(() => {
      navigate('/tenant/requests');
    }, 1500);
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-3xl mx-auto">
      <div>
        <Link
          to="/tenant/explore"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#102A43] dark:hover:text-white mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to explore</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
          Submit Rental Application
        </h1>
        <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1">
          Zero middleman fees. Your proposal goes straight to the Rwandan property owner.
        </p>
      </div>

      {property && (
        <div className="bg-white dark:bg-[#161D2A] p-5 rounded-3xl border border-black/[0.06] dark:border-white/[0.08] flex items-center gap-4">
          <img
            src={property.images[0]}
            alt={property.title}
            referrerPolicy="no-referrer"
            className="w-20 h-16 rounded-2xl object-cover shrink-0"
          />
          <div>
            <h3 className="text-sm font-bold text-[#1C1C1E] dark:text-white">{property.title}</h3>
            <div className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">{property.neighborhood}, {property.district}</div>
            <div className="text-xs font-extrabold text-[#102A43] dark:text-emerald-400 mt-1 tabular-nums">
              {new Intl.NumberFormat('en-RW').format(property.priceRwf)} RWF / month
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-[#161D2A] p-6 sm:p-8 rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-sm">
        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-[#0E9F6E] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#1C1C1E] dark:text-white">
              Application submitted successfully!
            </h3>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
              The landlord has received your proposal. Redirecting to your requests overview...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200 mb-1.5">
                  Desired Move-in Date
                </label>
                <input
                  type="date"
                  required
                  value={moveInDate}
                  onChange={(e) => setMoveInDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200 mb-1.5">
                  Lease Duration (Months)
                </label>
                <select
                  value={leaseDurationMonths}
                  onChange={(e) => setLeaseDurationMonths(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs"
                >
                  <option value={3}>3 Months</option>
                  <option value={6}>6 Months</option>
                  <option value={12}>12 Months (Standard)</option>
                  <option value={24}>24 Months (Long Term)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200 mb-1.5">
                  Occupants Count
                </label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={occupantsCount}
                  onChange={(e) => setOccupantsCount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200 mb-1.5">
                Note to Landlord / About Yourself
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Introduce yourself, your profession, and any questions about the residence..."
                className="w-full px-3.5 py-2.5 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#102A43] hover:bg-[#0d2135] text-white text-xs font-bold rounded-xl shadow-xs transition-transform active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Application Directly to Owner</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
