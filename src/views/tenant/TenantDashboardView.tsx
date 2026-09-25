import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { PropertyCard } from '../../components/PropertyCard';
import { 
  Heart, 
  FileText, 
  MessageSquare, 
  Compass, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Building2,
  DollarSign,
  TrendingUp
} from 'lucide-react';

export const TenantDashboardView: React.FC = () => {
  const { currentUser } = useAuth();
  const { properties, savedPropertyIds, rentalRequests, conversations, toggleSaveProperty, isPropertySaved } = useData();
  const navigate = useNavigate();

  const savedProps = properties.filter(p => savedPropertyIds.includes(p.id));
  const myRequests = rentalRequests;
  const pendingRequests = myRequests.filter(r => r.status === 'Pending');

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
            Welcome back, {currentUser?.name.split(' ')[0]} 👋
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
            Track your rental applications, saved homes, and landlord messages in Kigali.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/tenant/explore"
            className="px-4 py-2 bg-[#102A43] dark:bg-emerald-600 hover:bg-[#0d2135] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Browse Homes</span>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-[#161D2A] p-5 rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center font-bold">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <Link to="/tenant/saved" className="text-[11px] font-bold text-rose-600 hover:underline">
              View All
            </Link>
          </div>
          <div className="text-xs text-[#6B7280] dark:text-gray-400">Saved Properties</div>
          <div className="text-2xl font-extrabold text-[#1C1C1E] dark:text-white tabular-nums">
            {savedPropertyIds.length} <span className="text-xs font-normal text-[#6B7280]">Homes</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#161D2A] p-5 rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <Link to="/tenant/requests" className="text-[11px] font-bold text-amber-600 hover:underline">
              View All
            </Link>
          </div>
          <div className="text-xs text-[#6B7280] dark:text-gray-400">Pending Requests</div>
          <div className="text-2xl font-extrabold text-[#1C1C1E] dark:text-white tabular-nums">
            {pendingRequests.length} <span className="text-xs font-normal text-[#6B7280]">Awaiting</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#161D2A] p-5 rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center font-bold">
              <MessageSquare className="w-5 h-5" />
            </div>
            <Link to="/tenant/messages" className="text-[11px] font-bold text-blue-600 hover:underline">
              Chat
            </Link>
          </div>
          <div className="text-xs text-[#6B7280] dark:text-gray-400">Landlord Conversations</div>
          <div className="text-2xl font-extrabold text-[#1C1C1E] dark:text-white tabular-nums">
            {conversations.length} <span className="text-xs font-normal text-[#6B7280]">Active</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#161D2A] p-5 rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-[#0E9F6E] flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-[#0E9F6E]">
              100% Saved
            </span>
          </div>
          <div className="text-xs text-[#6B7280] dark:text-gray-400">Broker Fees Saved</div>
          <div className="text-2xl font-extrabold text-[#0E9F6E] tabular-nums">
            350k+ <span className="text-xs font-normal text-[#6B7280]">RWF</span>
          </div>
        </div>
      </div>

      {/* Recent Applications Feed */}
      <div className="bg-white dark:bg-[#161D2A] rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-2xs p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#1C1C1E] dark:text-white">
              My Rental Applications
            </h2>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
              Direct lease requests submitted to Rwandan property owners
            </p>
          </div>
          <Link
            to="/tenant/requests"
            className="text-xs font-bold text-[#102A43] dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
          {myRequests.length > 0 ? (
            myRequests.slice(0, 3).map((req) => (
              <div key={req.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={req.propertyImage}
                    alt={req.propertyTitle}
                    referrerPolicy="no-referrer"
                    className="w-14 h-12 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <Link
                      to={`/tenant/requests/${req.id}`}
                      className="font-bold text-xs text-[#1C1C1E] dark:text-white hover:text-[#0E9F6E] line-clamp-1"
                    >
                      {req.propertyTitle}
                    </Link>
                    <div className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">
                      Move-in: {req.moveInDate} · Lease: {req.leaseDurationMonths} mo
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <div className="text-right">
                    <div className="text-xs font-extrabold text-[#102A43] dark:text-white tabular-nums">
                      {new Intl.NumberFormat('en-RW').format(req.propertyPrice)} RWF/mo
                    </div>
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      req.status === 'Approved' ? 'bg-emerald-50 dark:bg-emerald-950/60 text-[#0E9F6E]' :
                      req.status === 'Declined' ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600' :
                      'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400'
                    }`}>
                      {req.status}
                    </span>
                  </div>
                  <Link
                    to={`/tenant/requests/${req.id}`}
                    className="px-3 py-1.5 bg-[#F4F5F7] dark:bg-white/10 hover:bg-black/5 text-[#1C1C1E] dark:text-white text-xs font-semibold rounded-xl"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-[#6B7280] dark:text-[#9CA3AF]">
              You have not submitted any rental applications yet.
            </div>
          )}
        </div>
      </div>

      {/* Saved Properties Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#1C1C1E] dark:text-white">
              Saved Favorites ({savedProps.length})
            </h2>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
              Homes you bookmarked for review
            </p>
          </div>
          <Link
            to="/tenant/saved"
            className="text-xs font-bold text-[#102A43] dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>See All Saved</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {savedProps.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProps.slice(0, 3).map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isSaved={isPropertySaved(property.id)}
                onToggleSave={toggleSaveProperty}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-[#161D2A] rounded-3xl p-8 text-center border border-black/[0.06] dark:border-white/[0.08] space-y-2">
            <Heart className="w-8 h-8 text-[#6B7280] dark:text-gray-400 mx-auto" />
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
              No saved homes yet. Explore the marketplace and tap the heart icon on any home!
            </p>
            <div className="pt-2">
              <Link to="/tenant/explore" className="px-4 py-2 bg-[#102A43] text-white text-xs font-bold rounded-xl inline-block">
                Explore Homes
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
