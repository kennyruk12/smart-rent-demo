import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Home, DollarSign, Bed, SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import { SearchFilterState } from '../types';

interface SearchBarProps {
  initialValues?: Partial<SearchFilterState>;
  onSearch: (filters: Partial<SearchFilterState>) => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  initialValues = {},
  onSearch,
  className = ''
}) => {
  const [district, setDistrict] = useState(initialValues.district || '');
  const [propertyType, setPropertyType] = useState(initialValues.propertyType || '');
  const [priceTier, setPriceTier] = useState<string>('any');
  const [bedrooms, setBedrooms] = useState(initialValues.bedrooms || '');

  // Popover states
  const [activePopover, setActivePopover] = useState<'location' | 'type' | 'price' | 'beds' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActivePopover(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setActivePopover(null);

    let minPrice = 0;
    let maxPrice = 5000000;

    if (priceTier === 'under-300k') {
      maxPrice = 300000;
    } else if (priceTier === '300k-600k') {
      minPrice = 300000;
      maxPrice = 600000;
    } else if (priceTier === '600k-1m') {
      minPrice = 600000;
      maxPrice = 1000000;
    } else if (priceTier === 'above-1m') {
      minPrice = 1000000;
      maxPrice = 10000000;
    }

    onSearch({
      district,
      propertyType,
      bedrooms,
      minPrice,
      maxPrice
    });
  };

  const LOCATIONS = [
    { label: 'All Rwanda', value: '' },
    { label: 'Kigali · All', value: 'Kigali' },
    { label: 'Gasabo (Kigali)', value: 'Gasabo (Kigali)' },
    { label: 'Kicukiro (Kigali)', value: 'Kicukiro (Kigali)' },
    { label: 'Nyarugenge (Kigali)', value: 'Nyarugenge (Kigali)' },
    { label: 'Musanze (Northern)', value: 'Musanze' },
    { label: 'Rubavu (Lake Kivu)', value: 'Rubavu (Gisenyi)' },
    { label: 'Huye (Southern)', value: 'Huye (Butare)' },
  ];

  const PROPERTY_TYPES = [
    { label: 'Any home type', value: '' },
    { label: 'Apartment', value: 'Apartment' },
    { label: 'House', value: 'House' },
    { label: 'Luxury Villa', value: 'Villa' },
    { label: 'Duplex', value: 'Duplex' },
    { label: 'Studio / Room', value: 'Studio' },
  ];

  const PRICE_TIERS = [
    { label: 'Any price', value: 'any' },
    { label: 'Under 300k RWF', value: 'under-300k' },
    { label: '300k – 600k RWF', value: '300k-600k' },
    { label: '600k – 1M RWF', value: '600k-1m' },
    { label: '1M+ RWF', value: 'above-1m' },
  ];

  const BEDROOMS_OPTIONS = [
    { label: 'Any', value: '' },
    { label: '1+', value: '1' },
    { label: '2+', value: '2' },
    { label: '3+', value: '3' },
    { label: '4+', value: '4' },
  ];

  return (
    <div ref={containerRef} className={`w-full max-w-3xl mx-auto relative ${className}`}>
      {/* Apple-style floating minimal capsule search bar */}
      <div className="bg-white/95 backdrop-blur-2xl rounded-full p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-black/[0.08] flex items-center justify-between transition-all">
        {/* 1. Location Segment */}
        <button
          type="button"
          onClick={() => setActivePopover(activePopover === 'location' ? null : 'location')}
          className="flex-1 py-2 px-4 rounded-full hover:bg-black/[0.03] transition-colors text-left cursor-pointer flex flex-col justify-center min-w-0"
        >
          <span className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider truncate">
            Where
          </span>
          <span className="text-[13px] font-medium text-[#1C1C1E] truncate">
            {district ? district.split(' ')[0] : 'Kigali, Rwanda...'}
          </span>
        </button>

        <div className="h-7 w-[1px] bg-black/[0.08] shrink-0" />

        {/* 2. Property Type Segment */}
        <button
          type="button"
          onClick={() => setActivePopover(activePopover === 'type' ? null : 'type')}
          className="hidden sm:flex flex-1 py-2 px-4 rounded-full hover:bg-black/[0.03] transition-colors text-left cursor-pointer flex-col justify-center min-w-0"
        >
          <span className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider truncate">
            Home type
          </span>
          <span className="text-[13px] font-medium text-[#1C1C1E] truncate">
            {propertyType || 'Any type'}
          </span>
        </button>

        <div className="hidden sm:block h-7 w-[1px] bg-black/[0.08] shrink-0" />

        {/* 3. Price Segment */}
        <button
          type="button"
          onClick={() => setActivePopover(activePopover === 'price' ? null : 'price')}
          className="flex-1 py-2 px-4 rounded-full hover:bg-black/[0.03] transition-colors text-left cursor-pointer flex flex-col justify-center min-w-0"
        >
          <span className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider truncate">
            Price
          </span>
          <span className="text-[13px] font-medium text-[#1C1C1E] truncate">
            {priceTier === 'any' ? 'Any price' : PRICE_TIERS.find(p => p.value === priceTier)?.label}
          </span>
        </button>

        <div className="hidden md:block h-7 w-[1px] bg-black/[0.08] shrink-0" />

        {/* 4. Bedrooms Segment */}
        <button
          type="button"
          onClick={() => setActivePopover(activePopover === 'beds' ? null : 'beds')}
          className="hidden md:flex py-2 px-4 rounded-full hover:bg-black/[0.03] transition-colors text-left cursor-pointer flex-col justify-center min-w-0"
        >
          <span className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider truncate">
            Bedrooms
          </span>
          <span className="text-[13px] font-medium text-[#1C1C1E] truncate">
            {bedrooms ? `${bedrooms}+ beds` : 'Any'}
          </span>
        </button>

        {/* Search Icon Action Button */}
        <button
          onClick={() => handleSearchSubmit()}
          className="w-11 h-11 rounded-full bg-[#102A43] hover:bg-[#0E9F6E] text-white flex items-center justify-center shrink-0 transition-colors shadow-sm cursor-pointer ml-1"
          title="Search homes"
        >
          <Search className="w-4 h-4 stroke-[2.2]" />
        </button>
      </div>

      {/* Popovers for each segment */}
      {activePopover === 'location' && (
        <div className="absolute top-16 left-0 w-72 bg-white/95 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-black/[0.08] z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider">
            Popular Locations
          </div>
          <div className="space-y-0.5 mt-1">
            {LOCATIONS.map((loc) => (
              <button
                key={loc.value}
                onClick={() => {
                  setDistrict(loc.value);
                  setActivePopover(null);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between cursor-pointer transition-colors ${
                  district === loc.value ? 'bg-[#102A43] text-white font-medium' : 'hover:bg-black/[0.03] text-[#1C1C1E]'
                }`}
              >
                <span>{loc.label}</span>
                {district === loc.value && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {activePopover === 'type' && (
        <div className="absolute top-16 left-1/4 w-60 bg-white/95 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-black/[0.08] z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider">
            Property Type
          </div>
          <div className="space-y-0.5 mt-1">
            {PROPERTY_TYPES.map((pt) => (
              <button
                key={pt.value}
                onClick={() => {
                  setPropertyType(pt.value);
                  setActivePopover(null);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between cursor-pointer transition-colors ${
                  propertyType === pt.value ? 'bg-[#102A43] text-white font-medium' : 'hover:bg-black/[0.03] text-[#1C1C1E]'
                }`}
              >
                <span>{pt.label}</span>
                {propertyType === pt.value && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {activePopover === 'price' && (
        <div className="absolute top-16 right-16 w-60 bg-white/95 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-black/[0.08] z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider">
            Monthly Rent (RWF)
          </div>
          <div className="space-y-0.5 mt-1">
            {PRICE_TIERS.map((pt) => (
              <button
                key={pt.value}
                onClick={() => {
                  setPriceTier(pt.value);
                  setActivePopover(null);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between cursor-pointer transition-colors ${
                  priceTier === pt.value ? 'bg-[#102A43] text-white font-medium' : 'hover:bg-black/[0.03] text-[#1C1C1E]'
                }`}
              >
                <span>{pt.label}</span>
                {priceTier === pt.value && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {activePopover === 'beds' && (
        <div className="absolute top-16 right-0 w-52 bg-white/95 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-black/[0.08] z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider">
            Bedrooms
          </div>
          <div className="flex gap-1 p-2">
            {BEDROOMS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setBedrooms(opt.value);
                  setActivePopover(null);
                }}
                className={`flex-1 py-1.5 text-xs rounded-xl font-medium text-center transition-colors cursor-pointer ${
                  bedrooms === opt.value
                    ? 'bg-[#102A43] text-white'
                    : 'bg-black/[0.03] text-[#1C1C1E] hover:bg-black/[0.07]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
