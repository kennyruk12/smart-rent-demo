import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { MobileBottomNav } from '../../components/MobileBottomNav';
import { useData } from '../../context/DataContext';
import { Megaphone, X } from 'lucide-react';

export const PublicLayout: React.FC = () => {
  const { platformNotice } = useData();
  const [dismissNotice, setDismissNotice] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8] dark:bg-[#0B0F17] text-[#1C1C1E] dark:text-[#F3F4F6] transition-colors">
      {/* Optional Top Broadcast Banner */}
      {platformNotice.enabled && !dismissNotice && (
        <div className="bg-[#102A43] dark:bg-[#161D2A] text-white px-4 py-2 text-xs font-medium flex items-center justify-between z-50 border-b border-black/10">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-center w-full justify-center">
            <Megaphone className="w-3.5 h-3.5 text-[#0E9F6E] shrink-0" />
            <span className="line-clamp-1">{platformNotice.text}</span>
          </div>
          <button
            onClick={() => setDismissNotice(true)}
            aria-label="Close banner"
            className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded-full cursor-pointer text-white/80 shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Public Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};
