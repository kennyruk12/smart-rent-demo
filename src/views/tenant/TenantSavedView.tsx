import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { PropertyCard } from '../../components/PropertyCard';
import { Heart, Compass } from 'lucide-react';

export const TenantSavedView: React.FC = () => {
  const { properties, savedPropertyIds, toggleSaveProperty, isPropertySaved } = useData();

  const savedProperties = properties.filter((p) => savedPropertyIds.includes(p.id));

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
          Saved Properties ({savedProperties.length})
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
          Homes and apartments in Rwanda you have saved to your personal shortlist.
        </p>
      </div>

      {savedProperties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isSaved={isPropertySaved(property.id)}
              onToggleSave={toggleSaveProperty}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-[#161D2A] rounded-3xl p-16 text-center border border-black/[0.06] dark:border-white/[0.08] space-y-4">
          <div className="w-14 h-14 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-[#1C1C1E] dark:text-white">
            No saved homes yet
          </h3>
          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] max-w-sm mx-auto">
            Click the heart icon on any property while exploring Kigali, Musanze, or Rubavu to save it here.
          </p>
          <div className="pt-2">
            <Link
              to="/tenant/explore"
              className="px-5 py-2.5 bg-[#102A43] dark:bg-emerald-600 text-white text-xs font-bold rounded-xl inline-flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Marketplace</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
