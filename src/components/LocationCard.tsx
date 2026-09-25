import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface LocationCardProps {
  name: string;
  province: string;
  propertiesCount: number;
  description: string;
  image: string;
  onClick: () => void;
}

export const LocationCard: React.FC<LocationCardProps> = ({
  name,
  province,
  propertiesCount,
  description,
  image,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Background Image with slight zoom on hover */}
      <img
        src={image}
        alt={name}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
      />

      {/* Measured contrast scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />

      {/* Content overlay */}
      <div className="absolute inset-0 p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md">
            {province}
          </span>
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        <div>
          <h4 className="text-2xl font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
            {name}
          </h4>
          <p className="text-xs text-slate-200 mt-1 line-clamp-1">
            {description}
          </p>
          <div className="mt-2 text-xs font-semibold text-white/90 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span>{propertiesCount} available homes</span>
          </div>
        </div>
      </div>
    </div>
  );
};
