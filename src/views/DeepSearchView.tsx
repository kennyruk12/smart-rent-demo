import React, { useState, useMemo } from 'react';
import { Property, SearchFilterState } from '../types';
import { PropertyCard } from '../components/PropertyCard';
import { 
  Search, 
  SlidersHorizontal, 
  RotateCcw, 
  MapPin, 
  Building2, 
  Droplet, 
  Zap, 
  ShieldCheck, 
  Check, 
  X, 
  Sparkles, 
  Layers, 
  List, 
  Grid3X3, 
  Share2, 
  ArrowUpDown,
  Car,
  Wifi,
  Sun,
  Maximize2,
  Bed,
  Bath,
  BadgeCheck,
  TrendingDown,
  Info
} from 'lucide-react';

interface DeepSearchViewProps {
  properties: Property[];
  savedPropertyIds: string[];
  onToggleSave: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onOpenCreateProperty?: () => void;
  onShareSearch?: () => void;
}

// Preset Rwandan cities & provinces
const RWANDA_REGIONS = [
  { id: 'all', label: 'All Rwanda' },
  { id: 'kigali', label: 'Kigali City', districts: ['Kicukiro (Kigali)', 'Gasabo (Kigali)', 'Nyarugenge (Kigali)'] },
  { id: 'northern', label: 'Northern (Musanze)', districts: ['Musanze'] },
  { id: 'western', label: 'Western (Rubavu/Kivu)', districts: ['Rubavu (Gisenyi)'] },
  { id: 'southern', label: 'Southern (Huye/Muhanga)', districts: ['Huye (Butare)', 'Muhanga'] },
  { id: 'eastern', label: 'Eastern (Rwamagana)', districts: ['Rwamagana'] }
];

const RWANDA_DISTRICTS = [
  'All Districts',
  'Kicukiro (Kigali)',
  'Gasabo (Kigali)',
  'Nyarugenge (Kigali)',
  'Musanze',
  'Rubavu (Gisenyi)',
  'Huye (Butare)',
  'Muhanga',
  'Rwamagana'
];

const POPULAR_NEIGHBORHOODS = [
  'Nyarutarama',
  'Kimihurura',
  'Kibagabaga',
  'Kacyiru',
  'Niboye',
  'Gacuriro',
  'Kiyovu',
  'Kinigi',
  'Lake Kivu'
];

const QUICK_PRESETS = [
  { label: 'Water + Power Backup', query: 'backup' },
  { label: 'Furnished < 500K RWF', query: 'furnished' },
  { label: 'Nyarutarama Villas', query: 'Nyarutarama' },
  { label: 'Musanze Mountain Homes', query: 'Musanze' },
  { label: 'Lake Kivu Waterfront', query: 'Kivu' },
  { label: 'Modern Kicukiro Apts', query: 'Kicukiro' }
];

export const DeepSearchView: React.FC<DeepSearchViewProps> = ({
  properties,
  savedPropertyIds,
  onToggleSave,
  onSelectProperty,
  onShareSearch
}) => {
  // Search and Advanced Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
  const [propertyType, setPropertyType] = useState('All');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [bedrooms, setBedrooms] = useState('Any');
  const [bathrooms, setBathrooms] = useState('Any');
  const [furnished, setFurnished] = useState('Any');
  
  // Specific Rwandan Infrastructure Filters
  const [waterBackupOnly, setWaterBackupOnly] = useState(false);
  const [powerBackupOnly, setPowerBackupOnly] = useState(false);
  const [securityGuardOnly, setSecurityGuardOnly] = useState(false);
  const [parkingOnly, setParkingOnly] = useState(false);
  const [verifiedLandlordOnly, setVerifiedLandlordOnly] = useState(false);
  const [availableNowOnly, setAvailableNowOnly] = useState(false);
  const [minAreaSqm, setMinAreaSqm] = useState<number | ''>('');
  
  // View & Sort State
  const [viewMode, setViewMode] = useState<'grid' | 'detailed'>('grid');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'newest' | 'area-desc'>('recommended');
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedRegion('all');
    setSelectedDistrict('All Districts');
    setSelectedNeighborhood('');
    setPropertyType('All');
    setMinPrice('');
    setMaxPrice('');
    setBedrooms('Any');
    setBathrooms('Any');
    setFurnished('Any');
    setWaterBackupOnly(false);
    setPowerBackupOnly(false);
    setSecurityGuardOnly(false);
    setParkingOnly(false);
    setVerifiedLandlordOnly(false);
    setAvailableNowOnly(false);
    setMinAreaSqm('');
    setSortBy('recommended');
  };

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery) count++;
    if (selectedRegion !== 'all') count++;
    if (selectedDistrict !== 'All Districts') count++;
    if (selectedNeighborhood) count++;
    if (propertyType !== 'All') count++;
    if (minPrice !== '') count++;
    if (maxPrice !== '') count++;
    if (bedrooms !== 'Any') count++;
    if (bathrooms !== 'Any') count++;
    if (furnished !== 'Any') count++;
    if (waterBackupOnly) count++;
    if (powerBackupOnly) count++;
    if (securityGuardOnly) count++;
    if (parkingOnly) count++;
    if (verifiedLandlordOnly) count++;
    if (availableNowOnly) count++;
    if (minAreaSqm !== '') count++;
    return count;
  }, [
    searchQuery,
    selectedRegion,
    selectedDistrict,
    selectedNeighborhood,
    propertyType,
    minPrice,
    maxPrice,
    bedrooms,
    bathrooms,
    furnished,
    waterBackupOnly,
    powerBackupOnly,
    securityGuardOnly,
    parkingOnly,
    verifiedLandlordOnly,
    availableNowOnly,
    minAreaSqm
  ]);

  // Deep Filter Engine
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // 1. Text Query (Search across title, description, address, neighborhood, landlord, amenities)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = prop.title.toLowerCase().includes(q);
        const inDesc = prop.description.toLowerCase().includes(q);
        const inNeigh = prop.neighborhood.toLowerCase().includes(q);
        const inDistrict = prop.district.toLowerCase().includes(q);
        const inAddress = prop.address.toLowerCase().includes(q);
        const inLandlord = prop.landlord.name.toLowerCase().includes(q);
        const inAmenities = prop.amenities.some((a) => a.toLowerCase().includes(q));

        if (!inTitle && !inDesc && !inNeigh && !inDistrict && !inAddress && !inLandlord && !inAmenities) {
          return false;
        }
      }

      // 2. Region / Province filter
      if (selectedRegion !== 'all') {
        const regionObj = RWANDA_REGIONS.find((r) => r.id === selectedRegion);
        if (regionObj && regionObj.districts) {
          const inRegion = regionObj.districts.some((d) => prop.district.includes(d) || prop.district === d);
          if (!inRegion) return false;
        }
      }

      // 3. District filter
      if (selectedDistrict !== 'All Districts') {
        if (!prop.district.toLowerCase().includes(selectedDistrict.toLowerCase())) {
          return false;
        }
      }

      // 4. Specific Neighborhood
      if (selectedNeighborhood) {
        if (!prop.neighborhood.toLowerCase().includes(selectedNeighborhood.toLowerCase())) {
          return false;
        }
      }

      // 5. Property Type
      if (propertyType !== 'All') {
        if (prop.propertyType !== propertyType) {
          return false;
        }
      }

      // 6. Price Bounds
      if (minPrice !== '' && prop.priceRwf < Number(minPrice)) {
        return false;
      }
      if (maxPrice !== '' && prop.priceRwf > Number(maxPrice)) {
        return false;
      }

      // 7. Bedrooms
      if (bedrooms !== 'Any') {
        if (bedrooms === '4+' && prop.bedrooms < 4) return false;
        if (bedrooms !== '4+' && prop.bedrooms !== Number(bedrooms)) return false;
      }

      // 8. Bathrooms
      if (bathrooms !== 'Any') {
        if (bathrooms === '3+' && prop.bathrooms < 3) return false;
        if (bathrooms !== '3+' && prop.bathrooms !== Number(bathrooms)) return false;
      }

      // 9. Furnishing
      if (furnished !== 'Any') {
        if (prop.furnished !== furnished) {
          return false;
        }
      }

      // 10. Water Backup (Reservoir Tank)
      if (waterBackupOnly && !prop.waterBackup) {
        return false;
      }

      // 11. Power Backup (Generator / Solar)
      if (powerBackupOnly && !prop.powerBackup) {
        return false;
      }

      // 12. 24/7 Security Guard
      if (securityGuardOnly && !prop.securityGuard) {
        return false;
      }

      // 13. Dedicated Parking
      if (parkingOnly && (!prop.parkingSpaces || prop.parkingSpaces < 1)) {
        return false;
      }

      // 14. Verified Landlord
      if (verifiedLandlordOnly && !prop.landlord.verified) {
        return false;
      }

      // 15. Availability Now
      if (availableNowOnly && prop.availability !== 'Available Now') {
        return false;
      }

      // 16. Area Sqm
      if (minAreaSqm !== '' && prop.areaSqm < Number(minAreaSqm)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceRwf - b.priceRwf;
      if (sortBy === 'price-desc') return b.priceRwf - a.priceRwf;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'area-desc') return b.areaSqm - a.areaSqm;
      // Recommended: featured first, then views
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.viewsCount - a.viewsCount;
    });
  }, [
    properties,
    searchQuery,
    selectedRegion,
    selectedDistrict,
    selectedNeighborhood,
    propertyType,
    minPrice,
    maxPrice,
    bedrooms,
    bathrooms,
    furnished,
    waterBackupOnly,
    powerBackupOnly,
    securityGuardOnly,
    parkingOnly,
    verifiedLandlordOnly,
    availableNowOnly,
    minAreaSqm,
    sortBy
  ]);

  // Real-time market analytics for filtered slice
  const marketStats = useMemo(() => {
    if (filteredProperties.length === 0) {
      return { count: 0, avgPrice: 0, minPrice: 0, maxPrice: 0, waterCoverage: 0, powerCoverage: 0 };
    }
    const prices = filteredProperties.map((p) => p.priceRwf);
    const sum = prices.reduce((acc, val) => acc + val, 0);
    const avg = Math.round(sum / filteredProperties.length);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const withWater = filteredProperties.filter((p) => p.waterBackup).length;
    const withPower = filteredProperties.filter((p) => p.powerBackup).length;

    return {
      count: filteredProperties.length,
      avgPrice: avg,
      minPrice: min,
      maxPrice: max,
      waterCoverage: Math.round((withWater / filteredProperties.length) * 100),
      powerCoverage: Math.round((withPower / filteredProperties.length) * 100)
    };
  }, [filteredProperties]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }
    onShareSearch?.();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24 space-y-8">
      {/* 1. Header & Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/[0.06] pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#102A43]/10 text-[#102A43] text-[10px] font-bold uppercase tracking-wider">
              Deep Property Research Engine
            </span>
            <span className="text-xs text-[#6B7280]">
              Instant search across all 30 districts in Rwanda
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1C1E]">
            Research homes in Rwanda
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] max-w-2xl">
            Query residences by exact neighborhood, backup utilities, floor area, and verified landlord credentials.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-end">
          <button
            onClick={handleShare}
            className="px-4 py-2 bg-white hover:bg-black/[0.02] border border-black/[0.08] text-[#1C1C1E] text-xs font-semibold rounded-full flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs"
            title="Share search criteria"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link copied!' : 'Share search'}</span>
          </button>
          
          {activeFiltersCount > 0 && (
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-black/[0.04] hover:bg-black/[0.08] text-[#6B7280] hover:text-[#1C1C1E] text-xs font-semibold rounded-full flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset all ({activeFiltersCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Primary Deep Search Bar & Presets */}
      <div className="bg-white rounded-3xl border border-black/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.03)] p-4 sm:p-6 space-y-4">
        {/* Large Input with Icon & Quick Actions */}
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-[#6B7280] absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by keywords, neighborhood (e.g. Nyarutarama, Niboye), or specific features (e.g. backup generator, lake view)..."
            className="w-full pl-12 pr-12 py-3.5 bg-[#FAFAF8] rounded-2xl border border-black/[0.08] text-sm text-[#1C1C1E] placeholder:text-[#6B7280]/70 focus:outline-none focus:ring-2 focus:ring-[#102A43]/20 focus:border-[#102A43] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 p-1 rounded-full text-[#6B7280] hover:text-[#1C1C1E] hover:bg-black/[0.06] cursor-pointer transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 text-xs">
          <span className="text-[11px] font-semibold text-[#6B7280] whitespace-nowrap">Quick research:</span>
          {QUICK_PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => setSearchQuery(preset.query)}
              className={`px-3 py-1 rounded-full border text-xs whitespace-nowrap transition-all cursor-pointer ${
                searchQuery === preset.query
                  ? 'bg-[#102A43] text-white border-[#102A43] font-semibold'
                  : 'bg-[#FAFAF8] hover:bg-black/[0.04] text-[#1C1C1E] border-black/[0.06]'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Multi-Tier Rwandan Geographic Selector */}
      <div className="bg-white rounded-3xl border border-black/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.03)] p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#0E9F6E]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C1C1E]">
              Geographic Region & District
            </h3>
          </div>
          <span className="text-[11px] text-[#6B7280]">Select city or province</span>
        </div>

        {/* Region / Province Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {RWANDA_REGIONS.map((region) => {
            const isActive = selectedRegion === region.id;
            return (
              <button
                key={region.id}
                onClick={() => {
                  setSelectedRegion(region.id);
                  setSelectedDistrict('All Districts');
                }}
                className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#102A43] text-white shadow-xs'
                    : 'bg-[#FAFAF8] text-[#6B7280] hover:text-[#1C1C1E] hover:bg-black/[0.04]'
                }`}
              >
                {region.label}
              </button>
            );
          })}
        </div>

        {/* District & Neighborhood Sub-selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {/* Specific District Selector */}
          <div>
            <label className="block text-[11px] font-semibold text-[#6B7280] mb-1">
              District in Rwanda
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAFAF8] rounded-xl border border-black/[0.08] text-xs text-[#1C1C1E] focus:outline-none focus:ring-1 focus:ring-[#102A43] cursor-pointer"
            >
              {RWANDA_DISTRICTS.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
          </div>

          {/* Specific Neighborhood Sector Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-[#6B7280] mb-1">
              Neighborhood / Sector Keyword
            </label>
            <input
              type="text"
              placeholder="e.g. Nyarutarama, Niboye, Kinigi..."
              value={selectedNeighborhood}
              onChange={(e) => setSelectedNeighborhood(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAFAF8] rounded-xl border border-black/[0.08] text-xs text-[#1C1C1E] focus:outline-none focus:ring-1 focus:ring-[#102A43]"
            />
          </div>

          {/* Popular Neighborhood Pill Shortcuts */}
          <div className="sm:col-span-2 lg:col-span-1">
            <label className="block text-[11px] font-semibold text-[#6B7280] mb-1">
              Popular Hubs
            </label>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_NEIGHBORHOODS.slice(0, 5).map((nh) => (
                <button
                  key={nh}
                  onClick={() => setSelectedNeighborhood(selectedNeighborhood === nh ? '' : nh)}
                  className={`px-2.5 py-1 text-[11px] rounded-lg border transition-colors cursor-pointer ${
                    selectedNeighborhood === nh
                      ? 'bg-[#0E9F6E]/15 border-[#0E9F6E] text-[#0E9F6E] font-bold'
                      : 'bg-[#FAFAF8] border-black/[0.06] text-[#6B7280] hover:text-[#1C1C1E]'
                  }`}
                >
                  {nh}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Advanced Technical Filters Panel */}
      <div className="bg-white rounded-3xl border border-black/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.03)] p-5 sm:p-6 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#102A43]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C1C1E]">
              Advanced Real Estate Parameters
            </h3>
            {activeFiltersCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#0E9F6E]/15 text-[#0E9F6E] text-[10px] font-bold">
                {activeFiltersCount} active
              </span>
            )}
          </div>

          <button
            onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
            className="text-xs font-semibold text-[#102A43] hover:underline cursor-pointer"
          >
            {isFiltersExpanded ? 'Hide filter details' : 'Show full parameters'}
          </button>
        </div>

        {isFiltersExpanded && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Row 1: Price Matrix & Quick Brackets */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-semibold text-[#6B7280]">
                  Monthly Rent Range (RWF)
                </label>
                <div className="flex items-center gap-1.5 text-xs">
                  <button
                    onClick={() => { setMinPrice(''); setMaxPrice(350000); }}
                    className="px-2.5 py-0.5 rounded-md bg-[#FAFAF8] border border-black/[0.06] text-[10px] text-[#6B7280] hover:text-[#1C1C1E] cursor-pointer"
                  >
                    &lt; 350K
                  </button>
                  <button
                    onClick={() => { setMinPrice(350000); setMaxPrice(700000); }}
                    className="px-2.5 py-0.5 rounded-md bg-[#FAFAF8] border border-black/[0.06] text-[10px] text-[#6B7280] hover:text-[#1C1C1E] cursor-pointer"
                  >
                    350K - 700K
                  </button>
                  <button
                    onClick={() => { setMinPrice(700000); setMaxPrice(1400000); }}
                    className="px-2.5 py-0.5 rounded-md bg-[#FAFAF8] border border-black/[0.06] text-[10px] text-[#6B7280] hover:text-[#1C1C1E] cursor-pointer"
                  >
                    700K - 1.4M
                  </button>
                  <button
                    onClick={() => { setMinPrice(1400000); setMaxPrice(''); }}
                    className="px-2.5 py-0.5 rounded-md bg-[#FAFAF8] border border-black/[0.06] text-[10px] text-[#6B7280] hover:text-[#1C1C1E] cursor-pointer"
                  >
                    1.4M+
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#6B7280]">Min</span>
                  <input
                    type="number"
                    placeholder="0 RWF"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : '')}
                    className="w-full pl-12 pr-3 py-2.5 bg-[#FAFAF8] rounded-xl border border-black/[0.08] text-xs text-[#1C1C1E] focus:outline-none focus:ring-1 focus:ring-[#102A43]"
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#6B7280]">Max</span>
                  <input
                    type="number"
                    placeholder="2,500,000+ RWF"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : '')}
                    className="w-full pl-12 pr-3 py-2.5 bg-[#FAFAF8] rounded-xl border border-black/[0.08] text-xs text-[#1C1C1E] focus:outline-none focus:ring-1 focus:ring-[#102A43]"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Property Type, Bedrooms, Bathrooms, Furnishing */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#6B7280] mb-1">
                  Property Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAFAF8] rounded-xl border border-black/[0.08] text-xs text-[#1C1C1E] focus:outline-none focus:ring-1 focus:ring-[#102A43] cursor-pointer"
                >
                  <option value="All">All Types</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa / Standalone</option>
                  <option value="House">House</option>
                  <option value="Duplex">Duplex</option>
                  <option value="Studio">Studio</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#6B7280] mb-1">
                  Bedrooms
                </label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAFAF8] rounded-xl border border-black/[0.08] text-xs text-[#1C1C1E] focus:outline-none focus:ring-1 focus:ring-[#102A43] cursor-pointer"
                >
                  <option value="Any">Any Bedrooms</option>
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4+">4+ Bedrooms</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#6B7280] mb-1">
                  Bathrooms
                </label>
                <select
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAFAF8] rounded-xl border border-black/[0.08] text-xs text-[#1C1C1E] focus:outline-none focus:ring-1 focus:ring-[#102A43] cursor-pointer"
                >
                  <option value="Any">Any Bathrooms</option>
                  <option value="1">1 Bathroom</option>
                  <option value="2">2 Bathrooms</option>
                  <option value="3+">3+ Bathrooms</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#6B7280] mb-1">
                  Furnishing
                </label>
                <select
                  value={furnished}
                  onChange={(e) => setFurnished(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAFAF8] rounded-xl border border-black/[0.08] text-xs text-[#1C1C1E] focus:outline-none focus:ring-1 focus:ring-[#102A43] cursor-pointer"
                >
                  <option value="Any">Any Furnishing</option>
                  <option value="Fully Furnished">Fully Furnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Unfurnished">Unfurnished</option>
                </select>
              </div>
            </div>

            {/* Row 3: Essential Rwandan Infrastructure Switches */}
            <div className="pt-2 border-t border-black/[0.04]">
              <div className="text-[11px] font-bold text-[#1C1C1E] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <span>Rwandan Infrastructure & Utility Essentials</span>
                <span className="text-[10px] font-normal text-[#6B7280] normal-case">(Click to enforce)</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {/* 1. Water Reservoir */}
                <button
                  type="button"
                  onClick={() => setWaterBackupOnly(!waterBackupOnly)}
                  className={`p-2.5 rounded-xl border text-left flex items-start gap-2 transition-all cursor-pointer ${
                    waterBackupOnly
                      ? 'bg-blue-50/80 border-blue-500 text-blue-900 shadow-2xs'
                      : 'bg-[#FAFAF8] border-black/[0.06] text-[#6B7280] hover:text-[#1C1C1E]'
                  }`}
                >
                  <Droplet className={`w-4 h-4 shrink-0 mt-0.5 ${waterBackupOnly ? 'text-blue-600' : 'text-[#6B7280]'}`} />
                  <div>
                    <div className="text-[11px] font-bold leading-tight">Water Tank</div>
                    <div className="text-[9px] opacity-75">5,000L+ reserve</div>
                  </div>
                </button>

                {/* 2. Power Backup */}
                <button
                  type="button"
                  onClick={() => setPowerBackupOnly(!powerBackupOnly)}
                  className={`p-2.5 rounded-xl border text-left flex items-start gap-2 transition-all cursor-pointer ${
                    powerBackupOnly
                      ? 'bg-amber-50/80 border-amber-500 text-amber-900 shadow-2xs'
                      : 'bg-[#FAFAF8] border-black/[0.06] text-[#6B7280] hover:text-[#1C1C1E]'
                  }`}
                >
                  <Zap className={`w-4 h-4 shrink-0 mt-0.5 ${powerBackupOnly ? 'text-amber-600' : 'text-[#6B7280]'}`} />
                  <div>
                    <div className="text-[11px] font-bold leading-tight">Backup Power</div>
                    <div className="text-[9px] opacity-75">Generator / Solar</div>
                  </div>
                </button>

                {/* 3. 24/7 Security Guard */}
                <button
                  type="button"
                  onClick={() => setSecurityGuardOnly(!securityGuardOnly)}
                  className={`p-2.5 rounded-xl border text-left flex items-start gap-2 transition-all cursor-pointer ${
                    securityGuardOnly
                      ? 'bg-emerald-50/80 border-[#0E9F6E] text-emerald-900 shadow-2xs'
                      : 'bg-[#FAFAF8] border-black/[0.06] text-[#6B7280] hover:text-[#1C1C1E]'
                  }`}
                >
                  <ShieldCheck className={`w-4 h-4 shrink-0 mt-0.5 ${securityGuardOnly ? 'text-[#0E9F6E]' : 'text-[#6B7280]'}`} />
                  <div>
                    <div className="text-[11px] font-bold leading-tight">24/7 Guard</div>
                    <div className="text-[9px] opacity-75">Gated compound</div>
                  </div>
                </button>

                {/* 4. Dedicated Parking */}
                <button
                  type="button"
                  onClick={() => setParkingOnly(!parkingOnly)}
                  className={`p-2.5 rounded-xl border text-left flex items-start gap-2 transition-all cursor-pointer ${
                    parkingOnly
                      ? 'bg-slate-100 border-slate-700 text-slate-900 shadow-2xs'
                      : 'bg-[#FAFAF8] border-black/[0.06] text-[#6B7280] hover:text-[#1C1C1E]'
                  }`}
                >
                  <Car className={`w-4 h-4 shrink-0 mt-0.5 ${parkingOnly ? 'text-slate-800' : 'text-[#6B7280]'}`} />
                  <div>
                    <div className="text-[11px] font-bold leading-tight">Parking</div>
                    <div className="text-[9px] opacity-75">Gated parking</div>
                  </div>
                </button>

                {/* 5. Verified Landlord */}
                <button
                  type="button"
                  onClick={() => setVerifiedLandlordOnly(!verifiedLandlordOnly)}
                  className={`p-2.5 rounded-xl border text-left flex items-start gap-2 transition-all cursor-pointer ${
                    verifiedLandlordOnly
                      ? 'bg-indigo-50/80 border-indigo-500 text-indigo-900 shadow-2xs'
                      : 'bg-[#FAFAF8] border-black/[0.06] text-[#6B7280] hover:text-[#1C1C1E]'
                  }`}
                >
                  <BadgeCheck className={`w-4 h-4 shrink-0 mt-0.5 ${verifiedLandlordOnly ? 'text-indigo-600' : 'text-[#6B7280]'}`} />
                  <div>
                    <div className="text-[11px] font-bold leading-tight">Verified Host</div>
                    <div className="text-[9px] opacity-75">ID validated</div>
                  </div>
                </button>

                {/* 6. Immediate Move-in */}
                <button
                  type="button"
                  onClick={() => setAvailableNowOnly(!availableNowOnly)}
                  className={`p-2.5 rounded-xl border text-left flex items-start gap-2 transition-all cursor-pointer ${
                    availableNowOnly
                      ? 'bg-rose-50/80 border-rose-500 text-rose-900 shadow-2xs'
                      : 'bg-[#FAFAF8] border-black/[0.06] text-[#6B7280] hover:text-[#1C1C1E]'
                  }`}
                >
                  <Check className={`w-4 h-4 shrink-0 mt-0.5 ${availableNowOnly ? 'text-rose-600' : 'text-[#6B7280]'}`} />
                  <div>
                    <div className="text-[11px] font-bold leading-tight">Available Now</div>
                    <div className="text-[9px] opacity-75">Ready today</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Row 4: Minimum Floor Area (Sqm) */}
            <div className="pt-2 border-t border-black/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-[11px] font-semibold text-[#6B7280] flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Minimum Surface Living Area:</span>
                <span className="font-bold text-[#1C1C1E]">
                  {minAreaSqm ? `${minAreaSqm} m²` : 'Any size'}
                </span>
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto">
                {['', '50', '80', '120', '180', '250'].map((sqm) => (
                  <button
                    key={sqm}
                    onClick={() => setMinAreaSqm(sqm ? Number(sqm) : '')}
                    className={`px-3 py-1 text-xs rounded-lg border transition-colors cursor-pointer ${
                      String(minAreaSqm) === sqm
                        ? 'bg-[#102A43] text-white border-[#102A43] font-bold'
                        : 'bg-[#FAFAF8] border-black/[0.06] text-[#6B7280] hover:text-[#1C1C1E]'
                    }`}
                  >
                    {sqm ? `${sqm}+ m²` : 'Any'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. Real-Time Market Intelligence Bar */}
      <div className="bg-[#102A43] text-white rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="text-xs uppercase font-semibold text-[#0E9F6E] tracking-wider flex items-center justify-center md:justify-start gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Research Analytics for Selected Criteria</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold tracking-tight">
            {marketStats.count} {marketStats.count === 1 ? 'Residence' : 'Residences'} Available
          </div>
          <p className="text-xs text-white/70">
            Average rent: <strong className="text-white">{marketStats.avgPrice.toLocaleString()} RWF/mo</strong> ·
            Spread: {marketStats.minPrice.toLocaleString()} – {marketStats.maxPrice.toLocaleString()} RWF
          </p>
        </div>

        <div className="flex items-center gap-4 text-center">
          <div className="px-4 py-2 bg-white/10 rounded-2xl backdrop-blur-xs">
            <div className="text-lg font-bold text-white">{marketStats.waterCoverage}%</div>
            <div className="text-[10px] text-white/70">Water Backup</div>
          </div>
          <div className="px-4 py-2 bg-white/10 rounded-2xl backdrop-blur-xs">
            <div className="text-lg font-bold text-white">{marketStats.powerCoverage}%</div>
            <div className="text-[10px] text-white/70">Power Backup</div>
          </div>
          <div className="px-4 py-2 bg-white/10 rounded-2xl backdrop-blur-xs">
            <div className="text-lg font-bold text-[#0E9F6E]">0 RWF</div>
            <div className="text-[10px] text-white/70">Agent Fees</div>
          </div>
        </div>
      </div>

      {/* 6. Results Header & View Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div className="text-xs text-[#6B7280]">
          Showing <span className="font-bold text-[#1C1C1E]">{filteredProperties.length}</span> matching homes across Rwanda
        </div>

        <div className="flex items-center gap-3">
          {/* Sort By Select */}
          <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white px-2.5 py-1.5 rounded-xl border border-black/[0.08] text-xs font-semibold text-[#1C1C1E] focus:outline-none cursor-pointer"
            >
              <option value="recommended">Recommended & Views</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="area-desc">Floor Area: Largest First</option>
              <option value="newest">Newest Listings</option>
            </select>
          </div>

          {/* Grid vs Detailed List Toggle */}
          <div className="flex bg-black/[0.04] p-0.5 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-[#102A43] shadow-xs' : 'text-[#6B7280]'
              }`}
              title="Grid view"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('detailed')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'detailed' ? 'bg-white text-[#102A43] shadow-xs' : 'text-[#6B7280]'
              }`}
              title="Detailed research list view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 7. Results Gallery: Grid vs Detailed View */}
      {filteredProperties.length > 0 ? (
        viewMode === 'grid' ? (
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
          /* Detailed Editorial List View for In-Depth Research */
          <div className="space-y-4">
            {filteredProperties.map((prop) => {
              const isSaved = savedPropertyIds.includes(prop.id);
              const formattedPrice = new Intl.NumberFormat('en-RW').format(prop.priceRwf);
              return (
                <div
                  key={prop.id}
                  onClick={() => onSelectProperty(prop)}
                  className="bg-white rounded-3xl border border-black/[0.06] p-5 sm:p-6 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col md:flex-row gap-6 group"
                >
                  {/* Photo Preview */}
                  <div className="relative w-full md:w-72 lg:w-80 h-52 shrink-0 rounded-2xl overflow-hidden bg-black/[0.04]">
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    {prop.featured && (
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-[#102A43]">
                        Featured
                      </span>
                    )}
                    <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-white font-medium">
                      {prop.images.length} photos
                    </span>
                  </div>

                  {/* Deep Details Column */}
                  <div className="flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-[11px] uppercase font-bold text-[#0E9F6E] tracking-wider flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{prop.neighborhood}, {prop.district}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-base sm:text-lg font-bold text-[#102A43] tabular-nums">
                            {formattedPrice} RWF
                          </div>
                          <div className="text-[10px] text-[#6B7280]">/ {prop.period} · 0% commission</div>
                        </div>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-[#1C1C1E] group-hover:text-[#102A43] transition-colors line-clamp-1">
                        {prop.title}
                      </h3>

                      <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed">
                        {prop.description}
                      </p>
                    </div>

                    {/* Technical Specs Row */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#6B7280] py-2 border-y border-black/[0.04]">
                      <span className="flex items-center gap-1 font-medium text-[#1C1C1E]">
                        <Bed className="w-3.5 h-3.5 text-[#6B7280]" />
                        {prop.bedrooms} {prop.bedrooms === 1 ? 'Bed' : 'Beds'}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1 font-medium text-[#1C1C1E]">
                        <Bath className="w-3.5 h-3.5 text-[#6B7280]" />
                        {prop.bathrooms} {prop.bathrooms === 1 ? 'Bath' : 'Baths'}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1 font-medium text-[#1C1C1E]">
                        <Maximize2 className="w-3.5 h-3.5 text-[#6B7280]" />
                        {prop.areaSqm} m²
                      </span>
                      <span>·</span>
                      <span>{prop.furnished}</span>
                    </div>

                    {/* Infrastructure & Landlord Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px]">
                      <div className="flex items-center gap-2">
                        {prop.waterBackup && (
                          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-semibold flex items-center gap-1">
                            <Droplet className="w-2.5 h-2.5" /> Water Backup
                          </span>
                        )}
                        {prop.powerBackup && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-semibold flex items-center gap-1">
                            <Zap className="w-2.5 h-2.5" /> Power Backup
                          </span>
                        )}
                        {prop.securityGuard && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold flex items-center gap-1">
                            <ShieldCheck className="w-2.5 h-2.5" /> 24/7 Guard
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-[#6B7280]">
                        <span>Host: <strong className="text-[#1C1C1E]">{prop.landlord.name}</strong></span>
                        {prop.landlord.verified && (
                          <span className="text-[#0E9F6E] font-bold text-[10px]">✓ Verified</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-black/[0.06] p-12 text-center max-w-lg mx-auto space-y-4 my-8">
          <div className="w-12 h-12 rounded-full bg-black/[0.04] text-[#1C1C1E] flex items-center justify-center mx-auto">
            <Search className="w-5 h-5 text-[#6B7280]" />
          </div>
          <h3 className="text-base font-bold text-[#1C1C1E]">
            No residences matched your criteria
          </h3>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Try loosening the price brackets, expanding the district search, or clearing specific utility requirements.
          </p>
          <div className="pt-2">
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 bg-[#102A43] hover:bg-[#0d2135] text-white text-xs font-semibold rounded-full cursor-pointer transition-transform active:scale-98"
            >
              Reset all filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
