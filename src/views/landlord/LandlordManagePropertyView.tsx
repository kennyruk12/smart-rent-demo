import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { ArrowLeft, Edit3, Eye, Trash2, CheckCircle2, DollarSign, Building2, MapPin } from 'lucide-react';

export const LandlordManagePropertyView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { properties, togglePropertyAvailability, deleteProperty } = useData();
  const navigate = useNavigate();

  const property = properties.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="p-8 text-center space-y-4">
        <h2 className="text-xl font-bold">Property not found</h2>
        <Link to="/landlord/properties" className="text-xs text-[#0E9F6E] underline">
          Back to properties
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-4xl mx-auto">
      <div>
        <Link
          to="/landlord/properties"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#102A43] dark:hover:text-white mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to properties</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
              {property.title}
            </h1>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1">
              {property.neighborhood}, {property.district} · Listed on {property.createdAt}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/landlord/properties/${property.id}/edit`}
              className="px-3.5 py-2 bg-[#102A43] text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </Link>
            <Link
              to={`/landlord/properties/${property.id}/preview`}
              className="px-3.5 py-2 bg-black/5 dark:bg-white/10 text-[#1C1C1E] dark:text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#161D2A] rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-2xs overflow-hidden">
        <div className="aspect-21/9 relative">
          <img
            src={property.images[0]}
            alt={property.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
            <div>
              <div className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">Current Availability Status</div>
              <div className="text-base font-bold text-[#1C1C1E] dark:text-white">{property.availability}</div>
            </div>
            <button
              onClick={() => togglePropertyAvailability(property.id)}
              className="px-4 py-2 bg-[#0E9F6E] hover:bg-[#0b8058] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Toggle to {property.availability === 'Available Now' ? 'Rented' : 'Available Now'}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#FAFAF8] dark:bg-[#111722]">
              <div className="text-[#6B7280] dark:text-[#9CA3AF]">Monthly Rent</div>
              <div className="text-sm font-extrabold text-[#102A43] dark:text-emerald-400 mt-1">
                {new Intl.NumberFormat('en-RW').format(property.priceRwf)} RWF
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAFAF8] dark:bg-[#111722]">
              <div className="text-[#6B7280] dark:text-[#9CA3AF]">Total Views</div>
              <div className="text-sm font-extrabold text-[#1C1C1E] dark:text-white mt-1">
                {property.viewsCount || 0} Views
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAFAF8] dark:bg-[#111722]">
              <div className="text-[#6B7280] dark:text-[#9CA3AF]">Layout</div>
              <div className="text-sm font-extrabold text-[#1C1C1E] dark:text-white mt-1">
                {property.bedrooms} Bed · {property.bathrooms} Bath
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAFAF8] dark:bg-[#111722]">
              <div className="text-[#6B7280] dark:text-[#9CA3AF]">Living Area</div>
              <div className="text-sm font-extrabold text-[#1C1C1E] dark:text-white mt-1">
                {property.areaSqm} m²
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-between items-center border-t border-black/[0.06] dark:border-white/[0.08]">
            <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
              Property ID: {property.id}
            </span>
            <button
              onClick={() => {
                deleteProperty(property.id);
                navigate('/landlord/properties');
              }}
              className="text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Property Listing</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
