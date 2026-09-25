import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ThemeToggle } from '../../components/ThemeToggle';
import { CheckCircle2, ShieldCheck, Sun, Moon, Bell } from 'lucide-react';

export const LandlordSettingsView: React.FC = () => {
  const { isDark } = useTheme();
  const [instantAlerts, setInstantAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
          Landlord Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
          Configure notifications, dark mode, and security rules for your listings.
        </p>
      </div>

      <div className="bg-white dark:bg-[#161D2A] p-6 sm:p-8 rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-2xs space-y-6">
        {/* Appearance Mode */}
        <div className="flex items-center justify-between pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
          <div>
            <h3 className="text-sm font-bold text-[#1C1C1E] dark:text-white">Interface Appearance</h3>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
              Toggle between daylight mode and dark mode
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6B7280] dark:text-gray-400">
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </span>
            <ThemeToggle className="bg-black/5 dark:bg-white/10" />
          </div>
        </div>

        {/* Instant Tenant Inquiries */}
        <div className="space-y-4 pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
          <h3 className="text-sm font-bold text-[#1C1C1E] dark:text-white">Inquiry Alerts</h3>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-[#1C1C1E] dark:text-white">Direct SMS Alert on New Application</div>
              <div className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">Receive instant SMS to review incoming tenant applications</div>
            </div>
            <input
              type="checkbox"
              checked={instantAlerts}
              onChange={(e) => setInstantAlerts(e.target.checked)}
              className="w-4 h-4 rounded text-[#0E9F6E] focus:ring-[#0E9F6E]"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-[#1C1C1E] dark:text-white">WhatsApp Application Digest</div>
              <div className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">Receive weekly summary of views and lease proposals</div>
            </div>
            <input
              type="checkbox"
              checked={whatsappAlerts}
              onChange={(e) => setWhatsappAlerts(e.target.checked)}
              className="w-4 h-4 rounded text-[#0E9F6E] focus:ring-[#0E9F6E]"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="py-2.5 px-6 bg-[#0E9F6E] hover:bg-[#0b8058] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
          >
            Save Settings
          </button>
          {saved && (
            <span className="text-xs text-[#0E9F6E] font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Preferences saved!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
