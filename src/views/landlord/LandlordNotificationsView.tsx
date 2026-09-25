import React from 'react';
import { useData } from '../../context/DataContext';
import { Bell, CheckCircle2, CheckCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LandlordNotificationsView: React.FC = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useData();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
            Landlord Notifications {unreadCount > 0 ? `(${unreadCount} Unread)` : ''}
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
            Direct alerts on new tenant applications, messages, and listing status.
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsAsRead}
            className="self-start sm:self-auto px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-[#0E9F6E] border border-emerald-200 dark:border-emerald-800 text-xs font-bold rounded-xl cursor-pointer hover:bg-emerald-100 transition-colors flex items-center gap-1.5"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark all as read</span>
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-[#161D2A] rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-2xs overflow-hidden">
        {notifications.length > 0 ? (
          <div className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => markNotificationAsRead(notif.id)}
                className={`p-5 flex items-start gap-4 transition-colors cursor-pointer ${
                  !notif.read ? 'bg-emerald-50/40 dark:bg-emerald-950/20' : 'hover:bg-black/[0.01] dark:hover:bg-white/[0.01]'
                }`}
              >
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-[#0E9F6E] flex items-center justify-center shrink-0">
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
                      View Request →
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
