import React from 'react';

interface SmartRentLogoProps {
  variant?: 'horizontal' | 'icon-only' | 'dark' | 'light' | 'app-icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
}

export const SmartRentLogo: React.FC<SmartRentLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  showTagline = true,
  className = '',
  onClick
}) => {
  const isLight = variant === 'light';
  const isIconOnly = variant === 'icon-only' || variant === 'app-icon';

  // Size dimensions
  const dimensions = {
    sm: { width: 30, height: 26, textClass: 'text-base font-bold' },
    md: { width: 38, height: 32, textClass: 'text-xl font-bold' },
    lg: { width: 48, height: 40, textClass: 'text-2xl font-extrabold' },
    xl: { width: 64, height: 54, textClass: 'text-3xl font-black' }
  }[size];

  const primaryNavy = isLight ? '#FFFFFF' : '#102A43';
  const accentTeal = '#0E9F6E';
  const sublineColor = isLight ? 'text-slate-300' : 'text-slate-400';

  // SVG Mark rendering the distinctive Smart Rent roof, chimney, 4 window panes and swooping teal foundation curve
  const LogoIcon = (
    <svg
      width={dimensions.width}
      height={dimensions.height}
      viewBox="0 0 100 85"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 ease-out group-hover:scale-102"
    >
      {/* Chimney */}
      <path
        d="M72 16V36L82 44V16H72Z"
        fill={primaryNavy}
      />
      
      {/* Deep Navy Pitched Roof */}
      <path
        d="M48 4L6 44L14 49L48 18L84 49L92 44L48 4Z"
        fill={primaryNavy}
      />

      {/* 4 Window Panes (grid) */}
      <rect x="36" y="32" width="10" height="9" rx="1.5" fill={primaryNavy} />
      <rect x="50" y="32" width="10" height="9" rx="1.5" fill={primaryNavy} />
      <rect x="36" y="45" width="10" height="9" rx="1.5" fill={primaryNavy} />
      <rect x="50" y="45" width="10" height="9" rx="1.5" fill={primaryNavy} />

      {/* Dynamic Swooshing Green Foundation Curve */}
      <path
        d="M6 72C24 64 54 66 94 48C76 66 40 76 6 72Z"
        fill={accentTeal}
      />
    </svg>
  );

  if (variant === 'app-icon') {
    return (
      <div 
        onClick={onClick}
        className={`w-11 h-11 rounded-2xl bg-[#102A43] shadow-sm flex items-center justify-center p-2 cursor-pointer transition-transform hover:scale-105 ${className}`}
      >
        <svg
          width="28"
          height="24"
          viewBox="0 0 100 85"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M72 16V36L82 44V16H72Z" fill="#FFFFFF" />
          <path d="M48 4L6 44L14 49L48 18L84 49L92 44L48 4Z" fill="#FFFFFF" />
          <rect x="36" y="32" width="10" height="9" rx="1.5" fill="#FFFFFF" />
          <rect x="50" y="32" width="10" height="9" rx="1.5" fill="#FFFFFF" />
          <rect x="36" y="45" width="10" height="9" rx="1.5" fill="#FFFFFF" />
          <rect x="50" y="45" width="10" height="9" rx="1.5" fill="#FFFFFF" />
          <path d="M6 72C24 64 54 66 94 48C76 66 40 76 6 72Z" fill="#0E9F6E" />
        </svg>
      </div>
    );
  }

  if (isIconOnly) {
    return (
      <div onClick={onClick} className={`inline-flex items-center cursor-pointer ${className}`}>
        {LogoIcon}
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`group inline-flex items-center gap-2.5 select-none cursor-pointer transition-opacity hover:opacity-85 ${className}`}
    >
      {LogoIcon}
      <div className="flex flex-col leading-none">
        <div className="flex items-center tracking-tight">
          <span className={`${dimensions.textClass} tracking-tight ${isLight ? 'text-white font-semibold' : 'text-[#102A43] font-semibold'}`}>
            Smart
          </span>
          <span className={`${dimensions.textClass} text-[#0E9F6E] ml-0.5 font-bold tracking-tight`}>
            Rent
          </span>
        </div>
        {showTagline && size !== 'sm' && (
          <span className={`text-[8.5px] font-medium tracking-[0.25em] uppercase mt-0.5 ${sublineColor}`}>
            Find · Book · Live
          </span>
        )}
      </div>
    </div>
  );
};
