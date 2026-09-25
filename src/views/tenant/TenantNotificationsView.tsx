import React from 'react';
import { useData } from '../../context/DataContext';
import { Bell, CheckCircle2, Clock, MessageSquare, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TenantNotificationsView: React.FC = () => {
  const { notifications, markNotificationAsRead } = useData();

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
          Notifications ({notifications.length})
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
          Stay updated on your rental applications, messages, and platform updates.
        </p>
      </div>

      <div className="bg-white dark:bg-[#161D2A] rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-2xs overflow-hidden">
        {notifications.length > 0 ? (
          <div className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => markNotificationAsRead(notif.id)}
                className={`p-5 flex items-start gap-4 transition-colors cursor-pointer ${
                  !notif.read ? 'bg-blue-50/40 dark:bg-blue-950/20' : 'hover:bg-black/[0.01] dark:hover:bg-white/[0.01]'
                }`}
              >
                <div className="w-10 h-10 rounded-2xl bg-[#102A43]/10 dark:bg-white/10 text-[#102A43] dark:text-white flex items-center justify-center shrink-0">
                  <Bell className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xs sm:text-sm text-[#1C1C1E] dark:text-white">
                      {notif.title}
                    </h3>
                    <span className="text-[10px] text-[#6B7280] dark:text-gray-400">
                      {notif.createdAt}
                    </span>
                  </div>
                  <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1 leading-relaxed">
                    {notif.message}
                  </p>
                  {notif.link && (
                    <Link
                      to={notif.link}
                      className="inline-block mt-2 text-xs font-semibold text-[#0E9F6E] hover:underline"
                    >
                      View Details →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-xs text-[#6B7280]">
            No notifications logged at this time.
          </div>
        )}
      </div>
    </div>
  );
};
