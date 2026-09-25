import React, { useState, useEffect } from 'react';
import { Property } from '../types';
import { ChevronLeft, ChevronRight, Heart, ArrowRight, Check } from 'lucide-react';

interface PropertyShowcaseProps {
  properties: Property[];
  savedPropertyIds: string[];
  onToggleSave: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertyShowcase: React.FC<PropertyShowcaseProps> = ({
  properties,
  savedPropertyIds,
  onToggleSave,
  onSelectProperty,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const featured = properties.slice(0, 5);

  // Auto progression every 7 seconds if not paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featured.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [featured.length, isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % featured.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + featured.length) % featured.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [featured.length]);

  const currentProp = featured[currentIndex];
  const isSaved = currentProp ? savedPropertyIds.includes(currentProp.id) : false;

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % featured.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + featured.length) % featured.length);

  if (!currentProp) return null;

  return (
    <div 
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-widest text-[#0E9F6E] mb-1">
            Featured Residence
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1C1E]">
            Homes worth seeing
          </h2>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="w-9 h-9 rounded-full bg-white hover:bg-black/[0.04] border border-black/[0.08] text-[#1C1C1E] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Previous property"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            className="w-9 h-9 rounded-full bg-white hover:bg-black/[0.04] border border-black/[0.08] text-[#1C1C1E] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Next property"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Large Showcase Canvas with peek of next */}
      <div className="relative rounded-3xl overflow-hidden bg-black aspect-[16/10] sm:aspect-[21/9] max-h-[560px] shadow-2xl group cursor-pointer"
        onClick={() => onSelectProperty(currentProp)}
      >
        {/* Full-bleed photography */}
        <img
          key={currentProp.id}
          src={currentProp.images[0]}
          alt={currentProp.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103 opacity-95"
        />

        {/* Scrim gradient for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

        {/* Top Badges */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full border border-white/20">
              {currentProp.propertyType}
            </span>
            <span className="bg-black/30 backdrop-blur-md text-emerald-400 text-[11px] font-medium px-3 py-1 rounded-full border border-emerald-500/30">
              {currentProp.availability}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(currentProp.id);
            }}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer"
            title={isSaved ? 'Remove from saved' : 'Save property'}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Bottom Details Panel */}
        <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 flex flex-col md:flex-row md:items-end justify-between gap-6 text-white">
          <div className="max-w-xl space-y-1.5">
            <div className="text-xs text-white/70 tracking-wide">
              {currentProp.district} · {currentProp.neighborhood}
            </div>
            <h3 className="text-xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
              {currentProp.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-white/80 pt-1">
              <span>{currentProp.bedrooms} bedrooms</span>
              <span>·</span>
              <span>{currentProp.bathrooms} bathrooms</span>
              <span>·</span>
              <span>{currentProp.areaSqm} m²</span>
              {currentProp.landlord.verified && (
                <>
                  <span>·</span>
                  <span className="text-emerald-400 font-medium">✓ Verified landlord</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div>
              <div className="text-[10px] text-white/60 uppercase tracking-widest font-medium">Rent</div>
              <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                {new Intl.NumberFormat('en-RW').format(currentProp.priceRwf)} RWF
                <span className="text-xs font-normal text-white/70 ml-1">/ mo</span>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectProperty(currentProp);
              }}
              className="px-5 py-3 rounded-full bg-white hover:bg-white/90 text-[#102A43] font-semibold text-xs transition-transform active:scale-98 flex items-center gap-1.5 shadow-lg cursor-pointer"
            >
              <span>View residence</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center items-center gap-2 mt-4">
        {featured.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              currentIndex === idx ? 'w-8 bg-[#102A43]' : 'w-2 bg-black/[0.12] hover:bg-black/[0.25]'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
