import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { 
  Building2, 
  DollarSign, 
  FileText, 
  ShieldCheck, 
  TrendingUp, 
  ArrowUpRight, 
  Droplet, 
  Zap, 
  Shield, 
  PieChart, 
  Users, 
  AlertTriangle,
  Eye,
  CheckCircle2
} from 'lucide-react';

export const AdminDashboardOverview: React.FC = () => {
  const { properties, rentalRequests, landlords, reports } = useData();

  const analytics = useMemo(() => {
    const totalListings = properties.length;
    const availableListings = properties.filter((p) => p.availability === 'Available Now').length;
    const rentedListings = properties.filter((p) => p.availability === 'Rented').length;
    const featuredListings = properties.filter((p) => p.featured).length;

    const totalMonthlyVolumeRwf = properties.reduce((acc, p) => acc + p.priceRwf, 0);
    const avgMonthlyRentRwf = totalListings > 0 ? Math.round(totalMonthlyVolumeRwf / totalListings) : 0;

    const totalRequests = rentalRequests.length;
    const pendingRequests = rentalRequests.filter((r) => r.status === 'Pending').length;

    const landlordList = Object.values(landlords);
    const verifiedLandlords = landlordList.filter((l) => l.verified).length;
    const verificationRate = landlordList.length > 0 ? Math.round((verifiedLandlords / landlordList.length) * 100) : 100;

    const withWaterBackup = properties.filter((p) => p.waterBackup).length;
    const withPowerBackup = properties.filter((p) => p.powerBackup).length;
    const withSecurityGuard = properties.filter((p) => p.securityGuard).length;
    const waterCoverage = totalListings > 0 ? Math.round((withWaterBackup / totalListings) * 100) : 0;
    const powerCoverage = totalListings > 0 ? Math.round((withPowerBackup / totalListings) * 100) : 0;
    const securityCoverage = totalListings > 0 ? Math.round((withSecurityGuard / totalListings) * 100) : 0;

    const districtCounts: Record<string, { count: number; totalRent: number; avgRent: number }> = {};
    properties.forEach((p) => {
      const dist = p.district.split('(')[0].trim();
      if (!districtCounts[dist]) {
        districtCounts[dist] = { count: 0, totalRent: 0, avgRent: 0 };
      }
      districtCounts[dist].count += 1;
      districtCounts[dist].totalRent += p.priceRwf;
    });
    Object.keys(districtCounts).forEach((key) => {
      districtCounts[key].avgRent = Math.round(districtCounts[key].totalRent / districtCounts[key].count);
    });

    return {
      totalListings,
      availableListings,
      rentedListings,
      featuredListings,
      totalMonthlyVolumeRwf,
      avgMonthlyRentRwf,
      totalRequests,
      pendingRequests,
      landlordCount: landlordList.length,
      verifiedLandlords,
      verificationRate,
      waterCoverage,
      powerCoverage,
      securityCoverage,
      districtCounts
    };
  }, [properties, rentalRequests, landlords]);

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Overview Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
            Marketplace Command Center
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
            Real-time oversight of Rwandan residential listings, landlords, and tenant applications.
          </p>
        </div>
      </div>

      {/* 4 Highlight Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-[#161D2A] rounded-3xl p-5 border border-black/[0.06] dark:border-white/[0.08] shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#0E9F6E]">
              0% Commission
            </span>
          </div>
          <div>
            <div className="text-xs font-semibold text-[#6B7280] dark:text-gray-400">Monthly Marketplace GMV</div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#1C1C1E] dark:text-white tabular-nums">
              {(analytics.totalMonthlyVolumeRwf / 1000000).toFixed(1)}M <span className="text-xs font-bold text-[#6B7280]">RWF</span>
            </div>
          </div>
          <div className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">
            Avg: <strong>{new Intl.NumberFormat('en-RW').format(analytics.avgMonthlyRentRwf)} RWF</strong> / unit
          </div>
        </div>

        <div className="bg-white dark:bg-[#161D2A] rounded-3xl p-5 border border-black/[0.06] dark:border-white/[0.08] shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-[#0E9F6E] flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <Link to="/admin/properties" className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700">
              {analytics.availableListings} Ready
            </Link>
          </div>
          <div>
            <div className="text-xs font-semibold text-[#6B7280] dark:text-gray-400">Marketplace Inventory</div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#1C1C1E] dark:text-white tabular-nums">
              {analytics.totalListings} <span className="text-xs font-bold text-[#6B7280]">Units</span>
            </div>
          </div>
          <div className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">
            {analytics.featuredListings} featured · {analytics.rentedListings} leased
          </div>
        </div>

        <div className="bg-white dark:bg-[#161D2A] rounded-3xl p-5 border border-black/[0.06] dark:border-white/[0.08] shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <Link to="/admin/requests" className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
              {analytics.pendingRequests} Pending
            </Link>
          </div>
          <div>
            <div className="text-xs font-semibold text-[#6B7280] dark:text-gray-400">Lease Applications</div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#1C1C1E] dark:text-white tabular-nums">
              {analytics.totalRequests} <span className="text-xs font-bold text-[#6B7280]">Total</span>
            </div>
          </div>
          <div className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">
            Direct tenant proposals
          </div>
        </div>

        <div className="bg-white dark:bg-[#161D2A] rounded-3xl p-5 border border-black/[0.06] dark:border-white/[0.08] shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <Link to="/admin/landlords" className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700">
              NIDA Verified
            </Link>
          </div>
          <div>
            <div className="text-xs font-semibold text-[#6B7280] dark:text-gray-400">Landlord Trust Index</div>
            <div className="text-xl sm:text-2xl font-extrabold text-[#1C1C1E] dark:text-white tabular-nums">
              {analytics.verificationRate}%
            </div>
          </div>
          <div className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">
            {analytics.verifiedLandlords} of {analytics.landlordCount} hosts validated
          </div>
        </div>
      </div>

      {/* Row 2: Visual Chart & District Spread */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Price Density Bar Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#161D2A] rounded-3xl p-6 border border-black/[0.06] dark:border-white/[0.08] shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#1C1C1E] dark:text-white">
                Live Rental Value Spread (RWF)
              </h3>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                Distribution of monthly rents across active Rwandan listings
              </p>
            </div>
            <span className="text-xs font-semibold px-2 py-1 bg-black/5 dark:bg-white/10 rounded-lg">
              Live Feed
            </span>
          </div>

          <div className="h-52 w-full pt-4 flex items-end gap-3 justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-2">
            {properties.map((prop, idx) => {
              const maxPrice = Math.max(...properties.map((p) => p.priceRwf), 1);
              const heightPercent = Math.max(15, Math.round((prop.priceRwf / maxPrice) * 100));
              const isAvailable = prop.availability === 'Available Now';

              return (
                <div key={prop.id} className="flex-1 flex flex-col items-center gap-2 group relative">
                  <div className="w-full max-w-[28px] h-40 flex items-end justify-center">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-t-lg transition-all ${
                        isAvailable ? 'bg-[#102A43] dark:bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                    />
                  </div>
                  <span className="text-[10px] text-[#6B7280] dark:text-gray-400 truncate w-full text-center">
                    P{idx + 1}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-[#6B7280] dark:text-[#9CA3AF]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#102A43] dark:bg-emerald-500" />
                <span>Available Now</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-300 dark:bg-slate-700" />
                <span>Rented</span>
              </div>
            </div>
            <Link to="/admin/properties" className="text-[#0E9F6E] font-bold hover:underline">
              Inspect all properties →
            </Link>
          </div>
        </div>

        {/* District Breakdown */}
        <div className="bg-white dark:bg-[#161D2A] rounded-3xl p-6 border border-black/[0.06] dark:border-white/[0.08] shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#1C1C1E] dark:text-white">
              Geographic Distribution
            </h3>
            <PieChart className="w-4 h-4 text-[#6B7280]" />
          </div>

          <div className="space-y-3 pt-2">
            {Object.entries(analytics.districtCounts).map(([district, stats]) => {
              const share = Math.round((stats.count / analytics.totalListings) * 100);
              return (
                <div key={district} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#1C1C1E] dark:text-white">{district}</span>
                    <span className="text-[#6B7280] dark:text-gray-400">{stats.count} units ({share}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-black/[0.04] dark:bg-white/[0.05] overflow-hidden">
                    <div className="h-full bg-[#0E9F6E] rounded-full" style={{ width: `${share}%` }} />
                  </div>
                  <div className="text-[10px] text-[#6B7280] dark:text-gray-400 text-right">
                    Avg: {new Intl.NumberFormat('en-RW').format(stats.avgRent)} RWF
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Row 3: Infrastructure Matrix */}
      <div className="bg-white dark:bg-[#161D2A] rounded-3xl p-6 border border-black/[0.06] dark:border-white/[0.08] shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#1C1C1E] dark:text-white">
              Rwandan Living Infrastructure Compliance Matrix
            </h3>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
              Water reserves, generator backup, and 24/7 security presence across properties
            </p>
          </div>
          <span className="text-[11px] font-bold text-[#0E9F6E] px-2.5 py-1 rounded-full bg-[#0E9F6E]/10">
            Real Data Audit
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 space-y-2">
            <div className="flex items-center justify-between text-blue-900 dark:text-blue-300">
              <div className="flex items-center gap-1.5 font-bold text-xs">
                <Droplet className="w-4 h-4 text-blue-600" />
                <span>Water Backup Tank</span>
              </div>
              <span className="font-extrabold text-sm">{analytics.waterCoverage}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-blue-200 dark:bg-blue-900">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: `${analytics.waterCoverage}%` }} />
            </div>
            <div className="text-[10px] text-blue-800 dark:text-blue-400">
              Equipped with 5,000L+ reserve tanks
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 space-y-2">
            <div className="flex items-center justify-between text-amber-900 dark:text-amber-300">
              <div className="flex items-center gap-1.5 font-bold text-xs">
                <Zap className="w-4 h-4 text-amber-600" />
                <span>Backup Electricity</span>
              </div>
              <span className="font-extrabold text-sm">{analytics.powerCoverage}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-amber-200 dark:bg-amber-900">
              <div className="h-full bg-amber-600 rounded-full" style={{ width: `${analytics.powerCoverage}%` }} />
            </div>
            <div className="text-[10px] text-amber-800 dark:text-amber-400">
              Solar or diesel generator equipped
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 space-y-2">
            <div className="flex items-center justify-between text-emerald-900 dark:text-emerald-300">
              <div className="flex items-center gap-1.5 font-bold text-xs">
                <Shield className="w-4 h-4 text-[#0E9F6E]" />
                <span>24/7 Security Guard</span>
              </div>
              <span className="font-extrabold text-sm">{analytics.securityCoverage}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-emerald-200 dark:bg-emerald-900">
              <div className="h-full bg-[#0E9F6E] rounded-full" style={{ width: `${analytics.securityCoverage}%` }} />
            </div>
            <div className="text-[10px] text-emerald-800 dark:text-emerald-400">
              Guarded gated residential compounds
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
