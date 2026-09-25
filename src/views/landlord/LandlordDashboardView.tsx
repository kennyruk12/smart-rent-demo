import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { 
  Building2, 
  DollarSign, 
  FileText, 
  MessageSquare, 
  Plus, 
  Eye, 
  TrendingUp, 
  ArrowUpRight, 
  Clock,
  CheckCircle2,
  Droplet,
  Zap,
  Shield
} from 'lucide-react';

export const LandlordDashboardView: React.FC = () => {
  const { currentUser } = useAuth();
  const { properties, rentalRequests, conversations, togglePropertyAvailability } = useData();

  const myProperties = useMemo(() => {
    return properties.filter(
      p => p.landlord.email.toLowerCase() === currentUser?.email.toLowerCase() ||
           p.landlord.name === currentUser?.name
    );
  }, [properties, currentUser]);

  const myPropIds = myProperties.map(p => p.id);
  const myRequests = rentalRequests.filter(r => myPropIds.includes(r.propertyId));
  const pendingRequests = myRequests.filter(r => r.status === 'Pending');

  const totalMonthlyGross = myProperties.reduce((acc, p) => acc + p.priceRwf, 0);
  const totalViews = myProperties.reduce((acc, p) => acc + (p.viewsCount || 0), 0);
  const availableCount = myProperties.filter(p => p.availability === 'Available Now').length;
  const occupancyRate = myProperties.length > 0 
    ? Math.round(((myProperties.length - availableCount) / myProperties.length) * 100) 
    : 0;

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
            Portfolio Overview
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
            Zero commission property supervision for Rwandan property owners.
          </p>
        </div>
        <Link
          to="/landlord/properties/new/basic"
          className="px-4 py-2.5 bg-[#0E9F6E] hover:bg-[#0b8058] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-transform active:scale-98 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ List Property (Free)</span>
        </Link>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-[#161D2A] p-5 rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#0E9F6E]">
              0% Deductions
            </span>
          </div>
          <div>
            <div className="text-xs text-[#6B7280] dark:text-gray-400">Total Portfolio Rent</div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#1C1C1E] dark:text-white tabular-nums tracking-tight">
              {new Intl.NumberFormat('en-RW').format(totalMonthlyGross)} <span className="text-xs font-normal text-[#6B7280]">RWF</span>
            </div>
          </div>
          <div className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">
            Across {myProperties.length} listed units
          </div>
        </div>

        <div className="bg-white dark:bg-[#161D2A] p-5 rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-[#0E9F6E] flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700">
              {availableCount} Available
            </span>
          </div>
          <div>
            <div className="text-xs text-[#6B7280] dark:text-gray-400">Occupancy Rate</div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#1C1C1E] dark:text-white tabular-nums tracking-tight">
              {occupancyRate}%
            </div>
          </div>
          <div className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">
            {myProperties.length - availableCount} leased units
          </div>
        </div>

        <div className="bg-white dark:bg-[#161D2A] p-5 rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <Link to="/landlord/requests" className="text-[11px] font-bold text-amber-600 hover:underline">
              {pendingRequests.length} Pending
            </Link>
          </div>
          <div>
            <div className="text-xs text-[#6B7280] dark:text-gray-400">Tenant Inquiries & Requests</div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#1C1C1E] dark:text-white tabular-nums tracking-tight">
              {myRequests.length} <span className="text-xs font-normal text-[#6B7280]">Total</span>
            </div>
          </div>
          <div className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">
            Direct tenant proposals
          </div>
        </div>

        <div className="bg-white dark:bg-[#161D2A] p-5 rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 flex items-center justify-center font-bold">
              <Eye className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300">
              Kigali Reach
            </span>
          </div>
          <div>
            <div className="text-xs text-[#6B7280] dark:text-gray-400">Tenant Views</div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#1C1C1E] dark:text-white tabular-nums tracking-tight">
              {totalViews} <span className="text-xs font-normal text-[#6B7280]">Views</span>
            </div>
          </div>
          <div className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">
            Direct organic renter interest
          </div>
        </div>
      </div>

      {/* Properties Table */}
      <div className="bg-white dark:bg-[#161D2A] rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-2xs overflow-hidden">
        <div className="p-6 border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#1C1C1E] dark:text-white">
              My Listed Properties ({myProperties.length})
            </h3>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
              All listings on Smart Rent are 100% free with zero agent commissions
            </p>
          </div>
          <Link
            to="/landlord/properties"
            className="text-xs font-bold text-[#0E9F6E] hover:underline"
          >
            Manage All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-black/[0.06] dark:border-white/[0.08] bg-[#F4F5F7]/60 dark:bg-white/[0.02] text-[#6B7280] dark:text-gray-400 uppercase tracking-wider text-[10px] font-bold">
                <th className="py-3 px-6">Property</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Rent</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Views</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
              {myProperties.map((prop) => (
                <tr key={prop.id} className="hover:bg-black/[0.01] dark:hover:bg-white/[0.02]">
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={prop.images[0]}
                        alt={prop.title}
                        referrerPolicy="no-referrer"
                        className="w-12 h-10 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <Link
                          to={`/landlord/properties/${prop.id}`}
                          className="font-bold text-[#1C1C1E] dark:text-white hover:text-[#0E9F6E] line-clamp-1"
                        >
                          {prop.title}
                        </Link>
                        <div className="text-[10px] text-[#6B7280] dark:text-[#9CA3AF]">
                          {prop.bedrooms} Bed · {prop.bathrooms} Bath · {prop.areaSqm} m²
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-medium text-[#1C1C1E] dark:text-white">
                    {prop.neighborhood}, {prop.district}
                  </td>

                  <td className="py-3.5 px-4 font-bold text-[#102A43] dark:text-white tabular-nums">
                    {new Intl.NumberFormat('en-RW').format(prop.priceRwf)} RWF
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => togglePropertyAvailability(prop.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                        prop.availability === 'Available Now'
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-[#0E9F6E]'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {prop.availability}
                    </button>
                  </td>

                  <td className="py-3.5 px-4 text-center font-bold text-[#6B7280] dark:text-gray-400">
                    {prop.viewsCount || 0}
                  </td>

                  <td className="py-3.5 px-6 text-right">
                    <Link
                      to={`/landlord/properties/${prop.id}`}
                      className="px-3 py-1.5 bg-[#F4F5F7] dark:bg-white/10 hover:bg-black/5 text-[#1C1C1E] dark:text-white font-semibold rounded-xl"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
