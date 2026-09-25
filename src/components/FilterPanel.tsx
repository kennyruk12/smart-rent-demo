import React from 'react';
import { SearchFilterState } from '../types';
import { SlidersHorizontal, RotateCcw, Check, X } from 'lucide-react';

interface FilterPanelProps {
  filters: SearchFilterState;
  onChange: (updated: Partial<SearchFilterState>) => void;
  onReset: () => void;
  totalResults: number;
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

const COMMON_AMENITIES = [
  'High-speed Fiber Wi-Fi',
  'Water Reservoir (5,000L)',
  'Solar Water Heater',
  'Automatic Backup Generator',
  'Dedicated Gated Parking',
  '24/7 Security Guard',
  'Balcony with Scenic View',
  'Cashpower Meter Installed'
];

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onChange,
  onReset,
  totalResults,
  isMobile = false,
  onCloseMobile
}) => {
  const toggleAmenity = (amenity: string) => {
    const exists = filters.amenities.includes(amenity);
    const updated = exists
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    onChange({ amenities: updated });
  };

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#0B3D91]" />
          <h3 className="text-sm font-bold text-slate-900">Filter Properties</h3>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-slate-500 hover:text-[#0B3D91] flex items-center gap-1 cursor-pointer font-medium"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Location / District */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Location
        </label>
        <select
          value={filters.district}
          onChange={(e) => onChange({ district: e.target.value })}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#0B3D91] transition-colors"
        >
          <option value="">All Rwanda</option>
          <option value="Kicukiro (Kigali)">Kigali · Kicukiro</option>
          <option value="Gasabo (Kigali)">Kigali · Gasabo</option>
          <option value="Nyarugenge (Kigali)">Kigali · Nyarugenge</option>
          <option value="Musanze">Musanze</option>
          <option value="Rubavu (Gisenyi)">Rubavu · Lake Kivu</option>
          <option value="Huye (Butare)">Huye</option>
          <option value="Muhanga">Muhanga</option>
          <option value="Rwamagana">Rwamagana</option>
        </select>
      </div>

      {/* Property Type */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Property Type
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {['All', 'Apartment', 'House', 'Villa', 'Duplex', 'Studio'].map((type) => {
            const isSelected = (type === 'All' && !filters.propertyType) || filters.propertyType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => onChange({ propertyType: type === 'All' ? '' : type })}
                className={`py-1.5 px-2 text-xs rounded-lg font-medium transition-colors text-center cursor-pointer ${
                  isSelected
                    ? 'bg-[#0B3D91] text-white'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60'
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range in RWF */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Monthly Rent (RWF)
          </label>
          <span className="text-xs font-semibold text-[#0B3D91] tabular-nums">
            Max: {new Intl.NumberFormat('en-RW').format(filters.maxPrice)} RWF
          </span>
        </div>
        <input
          type="range"
          min="150000"
          max="2500000"
          step="50000"
          value={filters.maxPrice}
          onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
          className="w-full accent-[#10B981] cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-slate-400 mt-1">
          <span>150k</span>
          <span>1M</span>
          <span>2.5M+ RWF</span>
        </div>
      </div>

      {/* Bedrooms */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Bedrooms
        </label>
        <div className="flex gap-1.5">
          {['Any', '1', '2', '3', '4+'].map((beds) => {
            const isSelected = (beds === 'Any' && !filters.bedrooms) || filters.bedrooms === beds;
            return (
              <button
                key={beds}
                type="button"
                onClick={() => onChange({ bedrooms: beds === 'Any' ? '' : beds })}
                className={`flex-1 py-1.5 text-xs rounded-lg font-medium transition-colors text-center cursor-pointer ${
                  isSelected
                    ? 'bg-[#0B3D91] text-white'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60'
                }`}
              >
                {beds}
              </button>
            );
          })}
        </div>
      </div>

      {/* Furnished Status */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Furnishing
        </label>
        <select
          value={filters.furnished}
          onChange={(e) => onChange({ furnished: e.target.value })}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#0B3D91]"
        >
          <option value="">Any Furnishing</option>
          <option value="Fully Furnished">Fully Furnished</option>
          <option value="Semi-Furnished">Semi-Furnished</option>
          <option value="Unfurnished">Unfurnished</option>
        </select>
      </div>

      {/* Essential Amenities */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Key Amenities
        </label>
        <div className="space-y-2">
          {COMMON_AMENITIES.map((amenity) => {
            const checked = filters.amenities.includes(amenity);
            return (
              <label
                key={amenity}
                className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer select-none hover:text-slate-900"
              >
                <div
                  onClick={() => toggleAmenity(amenity)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    checked
                      ? 'bg-[#10B981] border-[#10B981] text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {checked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span onClick={() => toggleAmenity(amenity)}>{amenity}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Verified / Available Only */}
      <div className="pt-2 border-t border-slate-100">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-xs font-semibold text-slate-800">Only Available Now</span>
          <input
            type="checkbox"
            checked={filters.availabilityOnly}
            onChange={(e) => onChange({ availabilityOnly: e.target.checked })}
            className="w-4 h-4 accent-[#10B981] rounded cursor-pointer"
          />
        </label>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
        <div className="w-full max-w-md bg-white h-full overflow-y-auto p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">Filters</h2>
              <button
                onClick={onCloseMobile}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            {content}
          </div>

          <div className="pt-6 mt-6 border-t border-slate-200">
            <button
              onClick={onCloseMobile}
              className="w-full py-3 bg-[#0B3D91] text-white font-bold text-sm rounded-xl"
            >
              Show {totalResults} Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <aside className="w-72 shrink-0 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs h-fit sticky top-24">
      {content}
    </aside>
  );
};
