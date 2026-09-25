import React, { useState } from 'react';
import { Property } from '../types';
import { Heart, CheckCircle2, Bed, Bath, ArrowUpRight } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  isSaved?: boolean;
  onToggleSave?: (propertyId: string) => void;
  onSelect?: (property: Property) => void;
  viewMode?: 'grid' | 'list';
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isSaved = false,
  onToggleSave,
  onSelect,
  viewMode = 'grid'
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const formattedPrice = new Intl.NumberFormat('en-RW').format(property.priceRwf);

  if (viewMode === 'list') {
    return (
      <div
        onClick={() => onSelect && onSelect(property)}
        className="group bg-white rounded-2xl border border-black/[0.06] hover:border-black/[0.12] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer flex flex-col sm:flex-row"
      >
        <div className="relative w-full sm:w-72 h-52 sm:h-auto shrink-0 overflow-hidden bg-black/[0.03]">
          <img
            src={property.images[0]}
            alt={property.title}
            onLoad={() => setImageLoaded(true)}
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave && onToggleSave(property.id);
            }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#1C1C1E] flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
            title={isSaved ? 'Remove from saved' : 'Save home'}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-medium text-[#6B7280] tracking-tight mb-1">
              {property.district} · {property.neighborhood} · {property.propertyType}
            </div>

            <h3 className="text-base sm:text-lg font-semibold text-[#1C1C1E] group-hover:text-[#102A43] transition-colors line-clamp-1">
              {property.title}
            </h3>

            <p className="mt-1 text-xs text-[#6B7280] line-clamp-2 leading-relaxed font-normal">
              {property.description}
            </p>
          </div>

          <div className="pt-4 border-t border-black/[0.04] mt-4 flex items-end justify-between">
            <div className="flex items-center gap-3 text-xs text-[#6B7280]">
              <span>{property.bedrooms} beds</span>
              <span>·</span>
              <span>{property.bathrooms} baths</span>
              <span>·</span>
              <span>{property.areaSqm} m²</span>
            </div>

            <div className="text-right">
              <div className="text-base sm:text-lg font-bold text-[#102A43] tabular-nums">
                {formattedPrice} RWF
                <span className="text-xs font-normal text-[#6B7280] ml-1">/ mo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div
      onClick={() => onSelect && onSelect(property)}
      className="group bg-white rounded-3xl border border-black/[0.06] hover:border-black/[0.12] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col"
    >
      {/* Large 16:10 photograph */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/[0.03]">
        <img
          src={property.images[0]}
          alt={property.title}
          onLoad={() => setImageLoaded(true)}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave && onToggleSave(property.id);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#1C1C1E] flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
          title={isSaved ? 'Remove from saved' : 'Save home'}
        >
          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        <div className="absolute bottom-3 left-3">
          <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-0.5 rounded-full">
            {property.propertyType}
          </span>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[11px] font-medium text-[#6B7280] tracking-tight mb-1">
            {property.district} · {property.neighborhood}
          </div>

          <h3 className="text-base font-semibold text-[#1C1C1E] group-hover:text-[#102A43] transition-colors line-clamp-1">
            {property.title}
          </h3>

          <div className="flex items-center gap-2 text-xs text-[#6B7280] mt-2">
            <span>{property.bedrooms} beds</span>
            <span>·</span>
            <span>{property.bathrooms} baths</span>
            <span>·</span>
            <span>{property.areaSqm} m²</span>
          </div>
        </div>

        <div className="pt-4 border-t border-black/[0.04] mt-4 flex items-baseline justify-between">
          <div className="text-base sm:text-lg font-bold text-[#102A43] tabular-nums">
            {formattedPrice} RWF
            <span className="text-xs font-normal text-[#6B7280] ml-1">/ mo</span>
          </div>

          {property.landlord.verified && (
            <span className="text-[11px] font-medium text-[#0E9F6E]">
              Verified
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
