import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { PropertyDetailView } from '../PropertyDetailView';
import { ArrowLeft } from 'lucide-react';

export const LandlordPreviewPropertyView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { properties, savedPropertyIds, toggleSaveProperty } = useData();

  const property = properties.find((p) => p.id === id);

  if (!property) {
    return <div className="p-8 text-center">Property not found</div>;
  }

  return (
    <div className="relative">
      <div className="bg-[#102A43] text-white px-4 py-2.5 text-xs font-semibold flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-amber-400 text-black text-[10px] font-extrabold uppercase">
            Preview Mode
          </span>
          <span>This is how prospective tenants view your listing on Smart Rent Rwanda.</span>
        </div>
        <Link
          to={`/landlord/properties/${property.id}`}
          className="text-xs text-white hover:underline flex items-center gap-1 font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit Preview</span>
        </Link>
      </div>

      <PropertyDetailView
        property={property}
        currentUser={null}
        onBack={() => {}}
        onToggleSave={toggleSaveProperty}
        isSaved={savedPropertyIds.includes(property.id)}
        onRequestRent={() => {}}
        onOpenChat={() => {}}
      />
    </div>
  );
};
