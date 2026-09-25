import React, { useState, useEffect, useRef } from 'react';
import { Property, SearchFilterState } from '../types';
import { SearchBar } from './SearchBar';
import { ChevronLeft, ChevronRight, ArrowUpRight, Pause, Play, MapPin, SlidersHorizontal } from 'lucide-react';

interface HeroSlideshowProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onSearch: (filters: Partial<SearchFilterState>) => void;
  onDeepSearch?: () => void;
}

export const HeroSlideshow: React.FC<HeroSlideshowProps> = ({
  properties,
  onSelectProperty,
  onSearch,
  onDeepSearch
}) => {
  // Use properties that have rich high-res images
  const slides = properties.slice(0, 5);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const timerRef = useRef<number | null>(null);

  const SLIDE_DURATION = 6000; // 6 seconds

  // Auto-advance
  useEffect(() => {
    if (isPaused || slides.length === 0) return;

    timerRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slides.length, isPaused, currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentProperty = slides[currentIndex] || properties[0];

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      goToNext(); // swipe left -> next
    } else if (diff < -50) {
      goToPrev(); // swipe right -> prev
    }
    setTouchStartX(null);
  };

  return (
    <section 
      className="relative h-[88vh] min-h-[640px] max-h-[920px] w-full flex flex-col justify-between pt-24 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Featured rental homes slideshow"
    >
      {/* Slides Background Images with Smooth Cross-Fade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.images[0]}
                alt={slide.title}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover object-center transform transition-transform duration-[7000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
              {/* Apple-grade subtle cinematic lighting & vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/55" />
            </div>
          );
        })}
      </div>

      {/* Top Controls: Slide counter, Pause toggle, Prev/Next buttons */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          {/* Slide dots with progress indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/15 text-white text-[11px] font-medium">
            <span className="font-semibold text-[#0E9F6E]">0{currentIndex + 1}</span>
            <span className="opacity-40">/</span>
            <span className="opacity-70">0{slides.length}</span>
            
            <div className="w-px h-3 bg-white/20 mx-1" />

            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 transition-all rounded-full cursor-pointer ${
                  i === currentIndex ? 'w-5 bg-[#0E9F6E]' : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Pause / Play Toggle */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-md border border-white/15 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
            title={isPaused ? 'Play' : 'Pause'}
          >
            {isPaused ? <Play className="w-3 h-3 fill-current ml-0.5" /> : <Pause className="w-3 h-3 fill-current" />}
          </button>
        </div>

        {/* Prev / Next Nav Pills */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={goToPrev}
            className="w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/15 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={goToNext}
            className="w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/15 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Middle Hero Content: Brand Headline & Active Property Feature Banner */}
      <div className="relative z-20 max-w-5xl mx-auto w-full my-auto text-center space-y-4 pt-4 pb-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-[11px] font-medium tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0E9F6E] animate-pulse" />
          <span>Zero Commission Rental Marketplace in Rwanda</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08] text-balance">
          Find a place you'll love to call home.
        </h1>

        <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto font-normal leading-relaxed text-balance">
          Discover verified apartments and villas across Kigali and Rwanda. Connect directly with landlords for free.
        </p>

        {/* Interactive Active Slide Callout Pill */}
        {currentProperty && (
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => onSelectProperty(currentProperty)}
              className="group inline-flex items-center gap-3.5 px-4 py-2 rounded-2xl bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-left transition-all duration-200 cursor-pointer shadow-lg hover:border-white/35"
            >
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-semibold text-[#0E9F6E] tracking-wider flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5" />
                  {currentProperty.neighborhood}, {currentProperty.district.split(' ')[0]}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-white/95 truncate max-w-[200px] sm:max-w-[300px]">
                  {currentProperty.title}
                </span>
              </div>

              <div className="h-7 w-px bg-white/20" />

              <div className="flex flex-col items-end">
                <span className="text-xs sm:text-sm font-bold text-white">
                  {currentProperty.priceRwf.toLocaleString()} RWF
                </span>
                <span className="text-[10px] text-white/70">/ {currentProperty.period}</span>
              </div>

              <div className="w-6 h-6 rounded-full bg-white/15 text-white flex items-center justify-center group-hover:bg-[#0E9F6E] group-hover:text-white transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Base: Floating Search Product */}
      <div className="relative z-20 w-full mb-1">
        <SearchBar onSearch={onSearch} />
        {onDeepSearch && (
          <div className="mt-2.5 text-center">
            <button
              onClick={onDeepSearch}
              className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white underline underline-offset-4 decoration-white/40 hover:decoration-white cursor-pointer transition-colors"
            >
              <SlidersHorizontal className="w-3 h-3 text-[#0E9F6E]" />
              <span>Need specific utilities, districts or advanced parameters? Open Deep Research Engine →</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
