import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { ArrowLeft, Trash2, CheckCircle2, ShieldCheck, MapPin, DollarSign } from 'lucide-react';

export const AdminPropertyDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { properties, togglePropertyAvailability, togglePropertyFeatured, deleteProperty } = useData();
  const navigate = useNavigate();

  const property = properties.find((p) => p.id === id);

  if (!property) {
    return <div className="p-8 text-center">Property not found.</div>;
  }

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-4xl mx-auto">
      <div>
        <Link
          to="/admin/properties"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#102A43] dark:hover:text-white mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to properties list</span>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
              {property.title}
            </h1>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1">
              {property.neighborhood}, {property.district} · Owner: {property.landlord.name}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => togglePropertyFeatured(property.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                property.featured
                  ? 'bg-amber-100 text-amber-900 font-extrabold'
                  : 'bg-black/5 dark:bg-white/10 text-[#6B7280]'
              }`}
            >
              {property.featured ? '★ Featured on Home' : '☆ Promote to Featured'}
            </button>
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#FAFAF8] dark:bg-[#111722]">
              <span className="text-[#6B7280] dark:text-gray-400">Monthly Rent</span>
              <div className="text-base font-extrabold text-[#102A43] dark:text-emerald-400 mt-1">
                {new Intl.NumberFormat('en-RW').format(property.priceRwf)} RWF
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAFAF8] dark:bg-[#111722]">
              <span className="text-[#6B7280] dark:text-gray-400">Status</span>
              <div className="text-base font-extrabold text-[#1C1C1E] dark:text-white mt-1">
                {property.availability}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAFAF8] dark:bg-[#111722]">
              <span className="text-[#6B7280] dark:text-gray-400">Bed / Bath</span>
              <div className="text-base font-extrabold text-[#1C1C1E] dark:text-white mt-1">
                {property.bedrooms} Bed · {property.bathrooms} Bath
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAFAF8] dark:bg-[#111722]">
              <span className="text-[#6B7280] dark:text-gray-400">Living Area</span>
              <div className="text-base font-extrabold text-[#1C1C1E] dark:text-white mt-1">
                {property.areaSqm} m²
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#6B7280] dark:text-gray-400 mb-2">
              Property Description
            </h3>
            <p className="text-xs text-[#1C1C1E] dark:text-gray-300 leading-relaxed">
              {property.description}
            </p>
          </div>

          <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
            <button
              onClick={() => togglePropertyAvailability(property.id)}
              className="px-4 py-2 bg-[#102A43] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Toggle Availability
            </button>
            <button
              onClick={() => {
                deleteProperty(property.id);
                navigate('/admin/properties');
              }}
              className="text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove Listing</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
