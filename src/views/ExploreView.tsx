import React, { useState } from 'react';
import { Property, SearchFilterState } from '../types';
import { PropertyCard } from '../components/PropertyCard';
import { SlidersHorizontal, Search, X, RotateCcw } from 'lucide-react';

interface ExploreViewProps {
  properties: Property[];
  filters: SearchFilterState;
  onFilterChange: (updated: Partial<SearchFilterState>) => void;
  onResetFilters: () => void;
  savedPropertyIds: string[];
  onToggleSave: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  properties,
  filters,
  onFilterChange,
  onResetFilters,
  savedPropertyIds,
  onToggleSave,
  onSelectProperty
}) => {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Filter properties
  const filteredProperties = properties.filter((prop) => {
    if (filters.district && !prop.district.toLowerCase().includes(filters.district.toLowerCase())) {
      return false;
    }
    if (filters.propertyType && prop.propertyType !== filters.propertyType) {
      return false;
    }
    if (filters.minPrice && prop.priceRwf < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && prop.priceRwf > filters.maxPrice) {
      return false;
    }
    if (filters.bedrooms && filters.bedrooms !== 'Any') {
      if (filters.bedrooms === '4+' && prop.bedrooms < 4) return false;
      if (filters.bedrooms !== '4+' && prop.bedrooms !== Number(filters.bedrooms)) return false;
    }
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      const match =
        prop.title.toLowerCase().includes(q) ||
        prop.neighborhood.toLowerCase().includes(q) ||
        prop.district.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-black/[0.06]">
        <div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1C1E]">
            All residences
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            {filteredProperties.length} verified homes across Rwanda.
          </p>
        </div>

        {/* Minimal Search & Filter Pills */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Kigali, Musanze..."
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              className="bg-white rounded-full pl-9 pr-8 py-2 text-xs text-[#1C1C1E] border border-black/[0.08] focus:outline-none focus:ring-1 focus:ring-[#102A43] w-48 sm:w-64"
            />
            {filters.searchQuery && (
              <button
                onClick={() => onFilterChange({ searchQuery: '' })}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6B7280]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="px-4 py-2 rounded-full bg-white hover:bg-black/[0.04] border border-black/[0.08] text-xs font-semibold text-[#1C1C1E] flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Property Showcase Grid */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((prop) => (
            <PropertyCard
              key={prop.id}
              property={prop}
              isSaved={savedPropertyIds.includes(prop.id)}
              onToggleSave={onToggleSave}
              onSelect={onSelectProperty}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-black/[0.06] p-12 text-center max-w-md mx-auto my-12">
          <h3 className="text-base font-bold text-[#1C1C1E]">No homes found</h3>
          <p className="text-xs text-[#6B7280] mt-1">
            Try adjusting your search query or reset filters.
          </p>
          <button
            onClick={onResetFilters}
            className="mt-5 px-5 py-2.5 bg-[#102A43] text-white text-xs font-semibold rounded-full cursor-pointer inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset filters</span>
          </button>
        </div>
      )}

      {/* Minimal Filter Bottom Sheet / Side Panel */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-[#FAFAF8] h-full overflow-y-auto p-8 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
                <h3 className="text-xl font-bold text-[#1C1C1E]">Filters</h3>
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="w-8 h-8 rounded-full bg-black/[0.04] flex items-center justify-center text-[#1C1C1E] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* District */}
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] mb-2">Location</label>
                <select
                  value={filters.district}
                  onChange={(e) => onFilterChange({ district: e.target.value })}
                  className="w-full bg-white rounded-2xl px-4 py-3 text-xs font-medium text-[#1C1C1E] border border-black/[0.08]"
                >
                  <option value="">All Rwanda</option>
                  <option value="Kicukiro (Kigali)">Kigali · Kicukiro</option>
                  <option value="Gasabo (Kigali)">Kigali · Gasabo</option>
                  <option value="Nyarugenge (Kigali)">Kigali · Nyarugenge</option>
                  <option value="Musanze">Musanze</option>
                  <option value="Rubavu (Gisenyi)">Rubavu · Lake Kivu</option>
                  <option value="Huye (Butare)">Huye</option>
                </select>
              </div>

              {/* Home Type */}
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] mb-2">Home Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {['', 'Apartment', 'House', 'Villa', 'Duplex', 'Studio'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => onFilterChange({ propertyType: type })}
                      className={`py-2 px-3 text-xs rounded-xl font-medium text-center cursor-pointer transition-colors ${
                        filters.propertyType === type
                          ? 'bg-[#102A43] text-white'
                          : 'bg-white text-[#1C1C1E] border border-black/[0.08]'
                      }`}
                    >
                      {type || 'Any type'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] mb-2">Bedrooms</label>
                <div className="flex gap-2">
                  {['', '1', '2', '3', '4+'].map((beds) => (
                    <button
                      key={beds}
                      type="button"
                      onClick={() => onFilterChange({ bedrooms: beds })}
                      className={`flex-1 py-2 text-xs rounded-xl font-medium text-center cursor-pointer transition-colors ${
                        filters.bedrooms === beds
                          ? 'bg-[#102A43] text-white'
                          : 'bg-white text-[#1C1C1E] border border-black/[0.08]'
                      }`}
                    >
                      {beds || 'Any'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-black/[0.06] flex gap-3">
              <button
                onClick={() => {
                  onResetFilters();
                  setIsFilterDrawerOpen(false);
                }}
                className="flex-1 py-3 bg-white text-xs font-semibold text-[#1C1C1E] rounded-full border border-black/[0.08] cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="flex-1 py-3 bg-[#102A43] text-white text-xs font-semibold rounded-full cursor-pointer shadow-sm"
              >
                Show {filteredProperties.length} homes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
