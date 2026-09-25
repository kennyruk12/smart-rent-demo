import React, { useState, useEffect } from 'react';
import { Property, UserProfile } from '../types';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  Check, 
  MessageSquare, 
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react';

interface PropertyDetailViewProps {
  property: Property;
  onBack: () => void;
  currentUser: UserProfile | null;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onRequestRent: (property: Property) => void;
  onOpenChat: (property: Property) => void;
}

export const PropertyDetailView: React.FC<PropertyDetailViewProps> = ({
  property,
  onBack,
  currentUser,
  isSaved,
  onToggleSave,
  onRequestRent,
  onOpenChat
}) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Keyboard navigation for fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullscreen(false);
      if (e.key === 'ArrowRight') setActivePhotoIndex((prev) => (prev + 1) % property.images.length);
      if (e.key === 'ArrowLeft') setActivePhotoIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [property.images.length]);

  const formattedPrice = new Intl.NumberFormat('en-RW').format(property.priceRwf);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-28">
      {/* Top Breadcrumb & Share Actions */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] hover:text-[#1C1C1E] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All homes</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="w-9 h-9 rounded-full bg-white hover:bg-black/[0.04] border border-black/[0.08] text-[#1C1C1E] flex items-center justify-center transition-colors cursor-pointer"
            title="Share property"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onToggleSave(property.id)}
            className="w-9 h-9 rounded-full bg-white hover:bg-black/[0.04] border border-black/[0.08] text-[#1C1C1E] flex items-center justify-center transition-colors cursor-pointer"
            title={isSaved ? 'Remove from saved' : 'Save home'}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* 1. EDITORIAL IMMERSIVE IMAGE GALLERY */}
      <div className="space-y-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Main Large Hero Image (3 cols) */}
          <div 
            onClick={() => setIsFullscreen(true)}
            className="md:col-span-3 relative aspect-[16/10] rounded-3xl overflow-hidden bg-black/[0.03] cursor-pointer group shadow-sm"
          >
            <img
              src={property.images[activePhotoIndex]}
              alt={property.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreen(true);
              }}
              className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1.5 opacity-90 hover:opacity-100"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>{activePhotoIndex + 1} of {property.images.length}</span>
            </button>
          </div>

          {/* Supporting Thumbnails Column */}
          <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto no-scrollbar">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhotoIndex(idx)}
                className={`relative flex-1 aspect-[16/10] md:h-auto min-w-[120px] rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
                  activePhotoIndex === idx ? 'border-[#102A43] opacity-100' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. EDITORIAL LAYOUT (Story left, sticky primary action right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column (8 cols) — Clean Editorial content */}
        <div className="lg:col-span-8 space-y-12">
          {/* Title & Key metadata */}
          <div>
            <div className="text-xs font-semibold text-[#6B7280] tracking-wide mb-1">
              {property.district} · {property.neighborhood}
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1C1E] leading-tight">
              {property.title}
            </h1>

            {/* Price hierarchy */}
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#102A43] tabular-nums">
                {formattedPrice} RWF
              </span>
              <span className="text-sm font-medium text-[#6B7280]">/ month</span>
            </div>

            {/* Quick Specs */}
            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-[#1C1C1E] pt-4 border-t border-black/[0.06]">
              <div><span className="font-bold">{property.bedrooms}</span> bedrooms</div>
              <span className="text-[#6B7280]">·</span>
              <div><span className="font-bold">{property.bathrooms}</span> bathrooms</div>
              <span className="text-[#6B7280]">·</span>
              <div><span className="font-bold">{property.areaSqm}</span> m²</div>
              <span className="text-[#6B7280]">·</span>
              <div>{property.furnished}</div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#1C1C1E] tracking-tight">About this home</h2>
            <p className="text-sm text-[#6B7280] leading-relaxed font-normal whitespace-pre-line text-pretty">
              {property.description}
            </p>
          </div>

          {/* Amenities without excess cards */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#1C1C1E] tracking-tight">Features & Utilities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#1C1C1E]">
              {property.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2.5 py-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0E9F6E]" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Landlord Profile */}
          <div className="pt-8 border-t border-black/[0.06] flex items-start gap-4">
            <img
              src={property.landlord.avatar}
              alt={property.landlord.name}
              referrerPolicy="no-referrer"
              className="w-14 h-14 rounded-full object-cover ring-1 ring-black/10"
            />
            <div className="space-y-1">
              <div className="text-xs text-[#6B7280]">Property hosted by</div>
              <div className="text-base font-bold text-[#1C1C1E] flex items-center gap-1.5">
                <span>{property.landlord.name}</span>
                {property.landlord.verified && (
                  <span className="text-xs font-semibold text-[#0E9F6E]">✓ Verified</span>
                )}
              </div>
              <p className="text-xs text-[#6B7280] max-w-md leading-relaxed">
                {property.landlord.bio}
              </p>
              <div className="text-[11px] text-[#6B7280] pt-1">
                Member since {property.landlord.memberSince} · Responds {property.landlord.responseTime}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols) — Sticky Action Module */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 hidden lg:block">
          <div className="bg-white rounded-3xl border border-black/[0.06] p-7 shadow-[0_4px_24px_rgba(0,0,0,0.04)] space-y-6">
            <div>
              <div className="text-xs text-[#6B7280]">Monthly Rent</div>
              <div className="text-3xl font-bold text-[#102A43] tabular-nums mt-0.5">
                {formattedPrice} RWF
                <span className="text-xs font-normal text-[#6B7280] ml-1">/ month</span>
              </div>
              <div className="text-[11px] text-[#0E9F6E] font-medium mt-1">
                Zero agent fees · Free for tenants
              </div>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => onOpenChat(property)}
                className="w-full py-3.5 bg-[#102A43] hover:bg-[#0d2135] text-white text-xs font-bold rounded-full transition-transform active:scale-98 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#0E9F6E]" />
                <span>Message landlord</span>
              </button>

              <button
                onClick={() => onRequestRent(property)}
                className="w-full py-3.5 bg-black/[0.04] hover:bg-black/[0.07] text-[#1C1C1E] text-xs font-semibold rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#6B7280]" />
                <span>Request to rent</span>
              </button>

              {!currentUser && (
                <div className="text-[10px] text-amber-700 bg-amber-500/10 p-2 rounded-xl text-center font-medium">
                  Sign in required to request rent or message
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-black/[0.04] text-[11px] text-[#6B7280] text-center">
              Available: <span className="font-semibold text-[#1C1C1E]">{property.availability}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-black/[0.06] px-5 py-3.5 flex items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="text-[11px] text-[#6B7280]">Rent</div>
          <div className="text-base font-bold text-[#102A43] tabular-nums">
            {formattedPrice} RWF
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenChat(property)}
            className="px-4 py-2.5 bg-[#102A43] text-white text-xs font-bold rounded-full cursor-pointer"
          >
            Message
          </button>
          <button
            onClick={() => onRequestRent(property)}
            className="px-4 py-2.5 bg-black/[0.05] text-[#1C1C1E] text-xs font-semibold rounded-full cursor-pointer"
          >
            Request to rent
          </button>
        </div>
      </div>

      {/* Fullscreen Minimalist Lightbox (Escape closes) */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-between p-6 animate-in fade-in duration-200">
          <div className="w-full flex items-center justify-between text-white/70 text-xs">
            <span>{activePhotoIndex + 1} of {property.images.length}</span>
            <button
              onClick={() => setIsFullscreen(false)}
              className="p-2 rounded-full hover:bg-white/10 text-white cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative max-w-5xl max-h-[80vh] flex items-center justify-center">
            <img
              src={property.images[activePhotoIndex]}
              alt={property.title}
              referrerPolicy="no-referrer"
              className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl"
            />
            {property.images.length > 1 && (
              <>
                <button
                  onClick={() => setActivePhotoIndex((prev) => (prev - 1 + property.images.length) % property.images.length)}
                  className="absolute -left-12 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 text-white cursor-pointer hidden sm:block"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
                <button
                  onClick={() => setActivePhotoIndex((prev) => (prev + 1) % property.images.length)}
                  className="absolute -right-12 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 text-white cursor-pointer hidden sm:block"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              </>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto py-2">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhotoIndex(idx)}
                className={`w-12 h-8 rounded-lg overflow-hidden border transition-opacity cursor-pointer ${
                  activePhotoIndex === idx ? 'border-white opacity-100' : 'border-transparent opacity-40'
                }`}
              >
                <img src={img} alt="thumb" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
