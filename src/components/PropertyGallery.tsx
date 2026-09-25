import React, { useState } from 'react';
import { Maximize2, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images, title }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-3">
      {/* Main Feature Image */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 group shadow-sm">
        <img
          src={images[selectedImageIndex] || images[0]}
          alt={`${title} - photo ${selectedImageIndex + 1}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-all duration-300"
        />

        {/* Fullscreen Button */}
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-slate-800 text-xs font-semibold px-3 py-2 rounded-lg shadow-md flex items-center gap-1.5 backdrop-blur-xs transition-transform active:scale-95 cursor-pointer"
        >
          <Maximize2 className="w-3.5 h-3.5 text-slate-600" />
          <span>View all {images.length} photos</span>
        </button>

        {/* Prev / Next controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Bar */}
      {images.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-thin">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImageIndex(idx)}
              className={`relative w-20 h-14 sm:w-24 sm:h-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                selectedImageIndex === idx
                  ? 'border-[#0B3D91] ring-2 ring-[#0B3D91]/20 scale-102'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt="thumbnail"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="w-full flex items-center justify-between text-white pb-3">
            <span className="text-sm font-medium text-slate-300">
              Photo {selectedImageIndex + 1} of {images.length}
            </span>
            <button
              onClick={() => setIsFullscreen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative max-w-5xl max-h-[80vh] flex items-center justify-center">
            <img
              src={images[selectedImageIndex]}
              alt={title}
              referrerPolicy="no-referrer"
              className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute -left-12 top-1/2 -translate-y-1/2 p-3 text-white hover:text-emerald-400 cursor-pointer hidden sm:block"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute -right-12 top-1/2 -translate-y-1/2 p-3 text-white hover:text-emerald-400 cursor-pointer hidden sm:block"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto py-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`w-14 h-10 rounded border transition-opacity cursor-pointer ${
                  selectedImageIndex === idx ? 'border-white opacity-100' : 'border-transparent opacity-40'
                }`}
              >
                <img src={img} alt="thumb" referrerPolicy="no-referrer" className="w-full h-full object-cover rounded" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
