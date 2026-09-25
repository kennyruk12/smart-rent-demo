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
  showTagline = false,
  className = '',
  onClick
}) => {
  const isLight = variant === 'light';
  const isIconOnly = variant === 'icon-only' || variant === 'app-icon';

  // Sizing dimensions
  const dimensions = {
    sm: { width: 28, height: 24, textClass: 'text-base font-bold' },
    md: { width: 34, height: 29, textClass: 'text-xl font-bold' },
    lg: { width: 42, height: 36, textClass: 'text-2xl font-extrabold' },
    xl: { width: 54, height: 46, textClass: 'text-3xl font-black' }
  }[size];

  // SVG Mark rendering the distinctive Smart Rent roof, chimney, 4 window panes and swooping teal foundation curve
  const LogoIcon = (
    <svg
      width={dimensions.width}
      height={dimensions.height}
      viewBox="0 0 100 85"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-200 ease-out group-hover:scale-105"
    >
      {/* Chimney */}
      <path
        d="M72 16V36L82 44V16H72Z"
        fill={isLight ? '#FFFFFF' : 'currentColor'}
        className={isLight ? '' : 'text-[#102A43] dark:text-white'}
      />

      {/* Deep Navy Pitched Roof */}
      <path
        d="M48 4L6 44L14 49L48 18L84 49L92 44L48 4Z"
        fill={isLight ? '#FFFFFF' : 'currentColor'}
        className={isLight ? '' : 'text-[#102A43] dark:text-white'}
      />

      {/* 4 Window Panes (grid) */}
      <rect
        x="36"
        y="32"
        width="10"
        height="9"
        rx="1.5"
        fill={isLight ? '#FFFFFF' : 'currentColor'}
        className={isLight ? '' : 'text-[#102A43] dark:text-white'}
      />
      <rect
        x="50"
        y="32"
        width="10"
        height="9"
        rx="1.5"
        fill={isLight ? '#FFFFFF' : 'currentColor'}
        className={isLight ? '' : 'text-[#102A43] dark:text-white'}
      />
      <rect
        x="36"
        y="45"
        width="10"
        height="9"
        rx="1.5"
        fill={isLight ? '#FFFFFF' : 'currentColor'}
        className={isLight ? '' : 'text-[#102A43] dark:text-white'}
      />
      <rect
        x="50"
        y="45"
        width="10"
        height="9"
        rx="1.5"
        fill={isLight ? '#FFFFFF' : 'currentColor'}
        className={isLight ? '' : 'text-[#102A43] dark:text-white'}
      />

      {/* Dynamic Swooshing Green Foundation Curve */}
      <path
        d="M6 72C24 64 54 66 94 48C76 66 40 76 6 72Z"
        fill="#0E9F6E"
      />
    </svg>
  );

  if (variant === 'app-icon') {
    return (
      <div
        onClick={onClick}
        className={`w-10 h-10 rounded-2xl bg-[#102A43] shadow-xs flex items-center justify-center p-2 cursor-pointer transition-transform hover:scale-105 shrink-0 ${className}`}
      >
        <svg
          width="24"
          height="21"
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
      <div onClick={onClick} className={`inline-flex items-center justify-center shrink-0 ${className}`}>
        {LogoIcon}
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`group inline-flex items-center gap-2 select-none cursor-pointer transition-opacity hover:opacity-90 ${className}`}
    >
      {LogoIcon}
      <div className="flex flex-col leading-none">
        <div className="flex items-center tracking-tight">
          <span
            className={`${dimensions.textClass} tracking-tight ${
              isLight ? 'text-white' : 'text-[#102A43] dark:text-white'
            }`}
          >
            Smart
          </span>
          <span className={`${dimensions.textClass} text-[#0E9F6E] ml-0.5 tracking-tight font-extrabold`}>
            Rent
          </span>
        </div>
        {showTagline && (
          <span className={`text-[8px] font-semibold tracking-[0.2em] uppercase mt-0.5 ${isLight ? 'text-slate-300' : 'text-[#6B7280] dark:text-gray-400'}`}>
            Direct · Zero Fees
          </span>
        )}
      </div>
    </div>
  );
};
