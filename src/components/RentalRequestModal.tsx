import React, { useState } from 'react';
import { Property, RentalRequest, UserProfile } from '../types';
import { X, Check } from 'lucide-react';

interface RentalRequestModalProps {
  property: Property;
  currentUser: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (request: Omit<RentalRequest, 'id' | 'createdAt' | 'status'>) => void;
}

export const RentalRequestModal: React.FC<RentalRequestModalProps> = ({
  property,
  currentUser,
  isOpen,
  onClose,
  onSubmit
}) => {
  const [moveInDate, setMoveInDate] = useState('2026-10-01');
  const [leaseDurationMonths, setLeaseDurationMonths] = useState(12);
  const [occupantsCount, setOccupantsCount] = useState(2);
  const [tenantName, setTenantName] = useState(currentUser.name);
  const [tenantEmail, setTenantEmail] = useState(currentUser.email);
  const [tenantPhone, setTenantPhone] = useState(currentUser.phone || '+250 788 000 111');
  const [message, setMessage] = useState(
    `Hello ${property.landlord.name}, I would love to arrange a visit and discuss moving forward with "${property.title}".`
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      propertyId: property.id,
      propertyTitle: property.title,
      propertyImage: property.images[0],
      propertyPrice: property.priceRwf,
      district: property.district,
      tenantName,
      tenantEmail,
      tenantPhone,
      moveInDate,
      leaseDurationMonths,
      occupantsCount,
      message
    });
    onClose();
  };

  const formattedPrice = new Intl.NumberFormat('en-RW').format(property.priceRwf);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#FAFAF8] rounded-3xl max-w-lg w-full p-8 sm:p-10 shadow-2xl relative my-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-black/[0.04] hover:bg-black/[0.08] text-[#1C1C1E] flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1 mb-6">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#0E9F6E]">Direct Application</span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1C1E]">
            Request to rent
          </h2>
          <p className="text-xs text-[#6B7280]">
            Sent directly to {property.landlord.name}.
          </p>
        </div>

        {/* Minimal Property Info */}
        <div className="flex items-center gap-3.5 p-3.5 bg-white rounded-2xl border border-black/[0.06] mb-6">
          <img
            src={property.images[0]}
            alt={property.title}
            referrerPolicy="no-referrer"
            className="w-12 h-12 rounded-xl object-cover shrink-0"
          />
          <div className="min-w-0">
            <div className="text-xs font-bold text-[#1C1C1E] truncate">{property.title}</div>
            <div className="text-[11px] text-[#6B7280]">{property.district}</div>
            <div className="text-xs font-bold text-[#102A43] tabular-nums mt-0.5">
              {formattedPrice} RWF <span className="font-normal text-[#6B7280]">/ month</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#6B7280] mb-1">Your Full Name</label>
            <input
              type="text"
              required
              value={tenantName}
              onChange={(e) => setTenantName(e.target.value)}
              className="w-full bg-white rounded-xl px-4 py-2.5 text-xs text-[#1C1C1E] border border-black/[0.08] focus:outline-none focus:ring-1 focus:ring-[#102A43]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#6B7280] mb-1">Phone Number</label>
              <input
                type="tel"
                required
                value={tenantPhone}
                onChange={(e) => setTenantPhone(e.target.value)}
                className="w-full bg-white rounded-xl px-4 py-2.5 text-xs text-[#1C1C1E] border border-black/[0.08] focus:outline-none focus:ring-1 focus:ring-[#102A43]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#6B7280] mb-1">Move-in Date</label>
              <input
                type="date"
                required
                value={moveInDate}
                onChange={(e) => setMoveInDate(e.target.value)}
                className="w-full bg-white rounded-xl px-4 py-2.5 text-xs text-[#1C1C1E] border border-black/[0.08] focus:outline-none focus:ring-1 focus:ring-[#102A43]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#6B7280] mb-1">Message to Landlord</label>
            <textarea
              rows={3}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-white rounded-xl px-4 py-2 text-xs text-[#1C1C1E] border border-black/[0.08] focus:outline-none focus:ring-1 focus:ring-[#102A43]"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-xs font-semibold text-[#6B7280] hover:text-[#1C1C1E] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#102A43] hover:bg-[#0d2135] text-white font-bold text-xs rounded-full transition-transform active:scale-98 shadow-sm cursor-pointer"
            >
              Submit request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
