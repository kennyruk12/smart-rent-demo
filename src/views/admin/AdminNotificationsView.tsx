import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Megaphone, Bell, CheckCircle2 } from 'lucide-react';

export const AdminNotificationsView: React.FC = () => {
  const { platformNotice, updatePlatformNotice } = useData();

  const [text, setText] = useState(platformNotice.text);
  const [enabled, setEnabled] = useState(platformNotice.enabled);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updatePlatformNotice(text, enabled);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
          System Broadcast & Announcements
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
          Publish system-wide top banners visible to all tenants and landlords in Rwanda.
        </p>
      </div>

      <div className="bg-white dark:bg-[#161D2A] p-6 sm:p-8 rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-2xs space-y-6">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200 mb-1">
              Top Banner Message Text
            </label>
            <textarea
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs sm:text-sm"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAFAF8] dark:bg-[#111722] border border-black/[0.04] dark:border-white/[0.04]">
            <div>
              <div className="text-xs font-bold text-[#1C1C1E] dark:text-white">Enable Banner Broadcast</div>
              <div className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">Display banner at the top of all public pages</div>
            </div>
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="w-4 h-4 rounded text-[#0E9F6E]"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="py-2.5 px-6 bg-[#102A43] hover:bg-[#0d2135] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
            >
              Update Broadcast
            </button>
            {saved && (
              <span className="text-xs text-[#0E9F6E] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Broadcast updated live!
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
