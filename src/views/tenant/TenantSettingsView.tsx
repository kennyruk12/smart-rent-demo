import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Bell, Lock, Shield, CheckCircle2 } from 'lucide-react';
import { ThemeToggle } from '../../components/ThemeToggle';

export const TenantSettingsView: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
          Account Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
          Customize notifications, appearance, and privacy preferences.
        </p>
      </div>

      <div className="bg-white dark:bg-[#161D2A] p-6 sm:p-8 rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-2xs space-y-6">
        {/* Appearance Mode */}
        <div className="flex items-center justify-between pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
          <div>
            <h3 className="text-sm font-bold text-[#1C1C1E] dark:text-white">Interface Theme</h3>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
              Toggle between modern light mode and dark mode
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6B7280] dark:text-gray-400">
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </span>
            <ThemeToggle className="bg-black/5 dark:bg-white/10" />
          </div>
        </div>

        {/* Notifications */}
        <div className="space-y-4 pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
          <h3 className="text-sm font-bold text-[#1C1C1E] dark:text-white">Notification Preferences</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-[#1C1C1E] dark:text-white">Email Alerts for Landlord Replies</div>
              <div className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">Get email updates when a landlord accepts or responds</div>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-4 h-4 rounded text-[#0E9F6E] focus:ring-[#0E9F6E]"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-[#1C1C1E] dark:text-white">SMS Notification for Urgent Confirmations</div>
              <div className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">Receive text message on Rwandan number</div>
            </div>
            <input
              type="checkbox"
              checked={smsAlerts}
              onChange={(e) => setSmsAlerts(e.target.checked)}
              className="w-4 h-4 rounded text-[#0E9F6E] focus:ring-[#0E9F6E]"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="py-2.5 px-6 bg-[#102A43] hover:bg-[#0d2135] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
          >
            Save Preferences
          </button>
          {saved && (
            <span className="text-xs text-[#0E9F6E] font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Settings saved!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
