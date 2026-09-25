import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

interface LocationGalleryProps {
  locations: Array<{
    name: string;
    province: string;
    propertiesCount: number;
    description: string;
    image: string;
    districts: string[];
  }>;
  onSelectLocation: (district: string) => void;
}

export const LocationGallery: React.FC<LocationGalleryProps> = ({
  locations,
  onSelectLocation
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-widest text-[#0E9F6E] mb-1">
            Regions of Rwanda
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1C1E]">
            Explore Rwanda
          </h2>
          <p className="text-xs text-[#6B7280] mt-1">
            Browse homes across Kigali and the provinces.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-9 h-9 rounded-full bg-white hover:bg-black/[0.04] border border-black/[0.08] text-[#1C1C1E] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-9 h-9 rounded-full bg-white hover:bg-black/[0.04] border border-black/[0.08] text-[#1C1C1E] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal smooth scrolling panels */}
      <div 
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-1"
      >
        {locations.map((loc) => (
          <div
            key={loc.name}
            onClick={() => onSelectLocation(loc.districts[0])}
            className="group relative w-72 sm:w-80 h-96 shrink-0 rounded-3xl overflow-hidden cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-2xl transition-all duration-500"
          >
            {/* Image */}
            <img
              src={loc.image}
              alt={loc.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Subtle scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-300 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  {loc.province}
                </span>

                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-tight text-white mb-1 group-hover:text-emerald-300 transition-colors">
                  {loc.name}
                </h3>
                <p className="text-xs text-white/70 line-clamp-1 mb-2">
                  {loc.description}
                </p>
                <div className="text-xs font-medium text-emerald-400">
                  {loc.propertiesCount} available residences →
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
