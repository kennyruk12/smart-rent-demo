import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Building2, Plus, Eye, Edit3, Trash2, ExternalLink } from 'lucide-react';

export const LandlordPropertiesView: React.FC = () => {
  const { currentUser } = useAuth();
  const { properties, togglePropertyAvailability, deleteProperty } = useData();

  const myProperties = properties.filter(
    (p) =>
      p.landlord.email.toLowerCase() === currentUser?.email.toLowerCase() ||
      p.landlord.name === currentUser?.name
  );

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
            My Properties ({myProperties.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
            Manage your units, update availability, or edit specs and photos.
          </p>
        </div>
        <Link
          to="/landlord/properties/new/basic"
          className="px-4 py-2.5 bg-[#0E9F6E] hover:bg-[#0b8058] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add New Unit (Free)</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myProperties.map((prop) => (
          <div
            key={prop.id}
            className="bg-white dark:bg-[#161D2A] rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-xs overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-16/10">
                <img
                  src={prop.images[0]}
                  alt={prop.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => togglePropertyAvailability(prop.id)}
                  className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full cursor-pointer shadow-xs ${
                    prop.availability === 'Available Now'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-800 text-white'
                  }`}
                >
                  {prop.availability}
                </button>
              </div>

              <div className="p-5 space-y-2">
                <div className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                  {prop.neighborhood}, {prop.district}
                </div>
                <h3 className="font-bold text-sm text-[#1C1C1E] dark:text-white line-clamp-1">
                  {prop.title}
                </h3>
                <div className="text-sm font-extrabold text-[#102A43] dark:text-white tabular-nums">
                  {new Intl.NumberFormat('en-RW').format(prop.priceRwf)} RWF / mo
                </div>
                <div className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] pt-1">
                  {prop.bedrooms} Bed · {prop.bathrooms} Bath · {prop.areaSqm} m² · {prop.furnished}
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#FAFAF8] dark:bg-[#111722] border-t border-black/[0.04] dark:border-white/[0.04] flex items-center justify-between text-xs">
              <Link
                to={`/landlord/properties/${prop.id}`}
                className="font-bold text-[#102A43] dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Manage</span>
              </Link>

              <div className="flex items-center gap-2">
                <Link
                  to={`/landlord/properties/${prop.id}/edit`}
                  className="p-1.5 rounded-lg text-[#6B7280] hover:text-[#102A43] dark:hover:text-white hover:bg-black/5"
                  title="Edit details"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to={`/landlord/properties/${prop.id}/preview`}
                  className="p-1.5 rounded-lg text-[#6B7280] hover:text-[#102A43] dark:hover:text-white hover:bg-black/5"
                  title="Preview"
                >
                  <Eye className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => deleteProperty(prop.id)}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                  title="Delete listing"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
