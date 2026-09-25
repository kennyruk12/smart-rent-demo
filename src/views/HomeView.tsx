import React from 'react';
import { Property, SearchFilterState } from '../types';
import { HeroSlideshow } from '../components/HeroSlideshow';
import { PropertyShowcase } from '../components/PropertyShowcase';
import { LocationGallery } from '../components/LocationGallery';
import { PropertyCard } from '../components/PropertyCard';
import { RWANDA_LOCATIONS, heroKigaliVilla } from '../data/mockData';
import { ArrowRight, Search, ShieldCheck, KeyRound, MessageSquare } from 'lucide-react';

interface HomeViewProps {
  featuredProperties: Property[];
  savedPropertyIds: string[];
  onToggleSave: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onSearch: (filters: Partial<SearchFilterState>) => void;
  onSelectLocation: (district: string) => void;
  onOpenCreateProperty: () => void;
  onExploreAll: () => void;
  onDeepSearch?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  featuredProperties,
  savedPropertyIds,
  onToggleSave,
  onSelectProperty,
  onSearch,
  onSelectLocation,
  onOpenCreateProperty,
  onExploreAll,
  onDeepSearch
}) => {
  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* 1. CINEMATIC HERO SLIDESHOW (Auto-advancing with full controls) */}
      <HeroSlideshow
        properties={featuredProperties}
        onSelectProperty={onSelectProperty}
        onSearch={onSearch}
        onDeepSearch={onDeepSearch}
      />

      {/* 2. FEATURED RESIDENCE SLIDESHOW */}
      <section>
        <PropertyShowcase
          properties={featuredProperties}
          savedPropertyIds={savedPropertyIds}
          onToggleSave={onToggleSave}
          onSelectProperty={onSelectProperty}
        />
      </section>

      {/* 3. EXPLORE RWANDA — HORIZONTAL LOCATION GALLERY */}
      <section>
        <LocationGallery
          locations={RWANDA_LOCATIONS}
          onSelectLocation={onSelectLocation}
        />
      </section>

      {/* 4. HOW SMART RENT WORKS (Calm, 3-step interaction) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-[#0E9F6E] mb-2">
            Effortless Living
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1C1E]">
            How Smart Rent works
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-2">
            Three simple steps between you and your next home in Rwanda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          <div className="space-y-3">
            <div className="text-xs font-bold text-[#6B7280] tracking-widest uppercase">01</div>
            <h3 className="text-xl font-bold text-[#1C1C1E]">Search effortlessly</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Explore verified apartments and houses with clear pricing, genuine photography, and accurate utilities.
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold text-[#6B7280] tracking-widest uppercase">02</div>
            <h3 className="text-xl font-bold text-[#1C1C1E]">Connect directly</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Chat directly with property owners. Schedule visits, ask about water backup, and agree on lease terms.
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold text-[#6B7280] tracking-widest uppercase">03</div>
            <h3 className="text-xl font-bold text-[#1C1C1E]">Move in with peace</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Submit your move-in request directly through Smart Rent. No middleman broker deductions.
            </p>
          </div>
        </div>
      </section>

      {/* 5. LANDLORD SECTION (Split-screen photography + typography) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#102A43] text-white rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="p-8 sm:p-14 lg:p-16 space-y-6">
            <div className="inline-block text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
              For Rwandan Landlords
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Have a property to rent?
            </h2>

            <p className="text-sm text-white/80 leading-relaxed max-w-lg">
              List your property on Smart Rent for <span className="text-emerald-400 font-semibold">FREE</span>. Connect directly with verified prospective tenants looking for a home in Rwanda.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={onOpenCreateProperty}
                className="px-6 py-3.5 bg-white hover:bg-white/90 text-[#102A43] text-xs font-bold rounded-full transition-transform active:scale-98 shadow-md cursor-pointer"
              >
                List my property — It's free
              </button>
            </div>
          </div>

          <div className="relative h-72 sm:h-96 lg:h-full min-h-[380px]">
            <img
              src={featuredProperties[1]?.images[0] || heroKigaliVilla}
              alt="Rwanda residential architecture"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 6. CURATED COLLECTION PREVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-widest text-[#0E9F6E] mb-1">
              Fresh Listings
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1C1E]">
              Recently added
            </h2>
          </div>

          <button
            onClick={onExploreAll}
            className="text-xs font-semibold text-[#102A43] hover:text-[#0E9F6E] flex items-center gap-1 cursor-pointer group"
          >
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.slice(0, 3).map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isSaved={savedPropertyIds.includes(property.id)}
              onToggleSave={onToggleSave}
              onSelect={onSelectProperty}
            />
          ))}
        </div>
      </section>

      {/* 7. FINAL CALM CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-4 pt-12">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1C1E]">
          Your next home is closer than you think.
        </h2>
        <p className="text-sm text-[#6B7280] max-w-md mx-auto">
          Start exploring verified houses and apartments across Rwanda today.
        </p>
        <div className="pt-2">
          <button
            onClick={onExploreAll}
            className="px-7 py-3.5 bg-[#102A43] hover:bg-[#0d2135] text-white text-xs font-bold rounded-full transition-transform active:scale-98 shadow-md cursor-pointer"
          >
            Explore all homes
          </button>
        </div>
      </section>
    </div>
  );
};
