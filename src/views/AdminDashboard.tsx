import React, { useState, useMemo } from 'react';
import { Property, RentalRequest, Conversation, UserProfile, Landlord } from '../types';
import { 
  Building2, 
  Users, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  Trash2, 
  Check, 
  X, 
  Search, 
  ExternalLink, 
  AlertCircle,
  TrendingUp,
  MapPin,
  Clock,
  Phone,
  Mail,
  SlidersHorizontal,
  Megaphone,
  LayoutDashboard,
  PieChart,
  BarChart3,
  Layers,
  CheckCircle2,
  DollarSign,
  Droplet,
  Zap,
  Shield,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Home,
  Compass,
  MessageSquare,
  Heart
} from 'lucide-react';
import { SmartRentLogo } from '../components/SmartRentLogo';

interface AdminDashboardProps {
  properties: Property[];
  rentalRequests: RentalRequest[];
  conversations: Conversation[];
  landlords: Record<string, Landlord>;
  currentUser: UserProfile;
  onSelectProperty: (property: Property) => void;
  onToggleAvailability: (propertyId: string) => void;
  onToggleFeatured: (propertyId: string) => void;
  onDeleteProperty: (propertyId: string) => void;
  onToggleLandlordVerification: (landlordId: string) => void;
  onUpdateRentalRequestStatus: (requestId: string, status: 'Pending' | 'Approved' | 'Declined') => void;
  onOpenCreateProperty: () => void;
  platformNotice: { text: string; enabled: boolean };
  onUpdatePlatformNotice: (text: string, enabled: boolean) => void;
  onNavigate?: (view: string) => void;
  onBackToMarketplace?: () => void;
  onLogout?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  properties,
  rentalRequests,
  conversations,
  landlords,
  currentUser,
  onSelectProperty,
  onToggleAvailability,
  onToggleFeatured,
  onDeleteProperty,
  onToggleLandlordVerification,
  onUpdateRentalRequestStatus,
  onOpenCreateProperty,
  platformNotice,
  onUpdatePlatformNotice,
  onNavigate,
  onBackToMarketplace,
  onLogout
}) => {
  // Sidebar navigation state (BankDash sideways layout)
  const [activeNav, setActiveNav] = useState<'overview' | 'listings' | 'requests' | 'users' | 'analytics' | 'settings'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [districtFilter, setDistrictFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Available Now' | 'Rented'>('All');
  
  // Platform notice editor
  const [noticeText, setNoticeText] = useState(platformNotice.text);
  const [noticeEnabled, setNoticeEnabled] = useState(platformNotice.enabled);
  const [noticeSaved, setNoticeSaved] = useState(false);

  // Time range selector (Fintech/BankDash style)
  const [timeRange, setTimeRange] = useState<'30d' | '90d' | 'all'>('30d');

  // ==========================================
  // REAL-TIME ACTUAL DATA ANALYTICS COMPUTATION
  // ==========================================
  const analytics = useMemo(() => {
    const totalListings = properties.length;
    const availableListings = properties.filter((p) => p.availability === 'Available Now').length;
    const rentedListings = properties.filter((p) => p.availability === 'Rented').length;
    const featuredListings = properties.filter((p) => p.featured).length;
    
    // Financial GMV Volume in RWF
    const totalMonthlyVolumeRwf = properties.reduce((acc, p) => acc + p.priceRwf, 0);
    const avgMonthlyRentRwf = totalListings > 0 ? Math.round(totalMonthlyVolumeRwf / totalListings) : 0;
    
    // Applications & Leases
    const totalRequests = rentalRequests.length;
    const pendingRequests = rentalRequests.filter((r) => r.status === 'Pending').length;
    const approvedRequests = rentalRequests.filter((r) => r.status === 'Approved').length;
    const declinedRequests = rentalRequests.filter((r) => r.status === 'Declined').length;
    
    // Landlord Verification Rate
    const landlordList = Object.values(landlords);
    const verifiedLandlords = landlordList.filter((l) => l.verified).length;
    const verificationRate = landlordList.length > 0 ? Math.round((verifiedLandlords / landlordList.length) * 100) : 100;
    
    // Infrastructure Compliance (Actual Data)
    const withWaterBackup = properties.filter((p) => p.waterBackup).length;
    const withPowerBackup = properties.filter((p) => p.powerBackup).length;
    const withSecurityGuard = properties.filter((p) => p.securityGuard).length;
    const waterCoverage = totalListings > 0 ? Math.round((withWaterBackup / totalListings) * 100) : 0;
    const powerCoverage = totalListings > 0 ? Math.round((withPowerBackup / totalListings) * 100) : 0;
    const securityCoverage = totalListings > 0 ? Math.round((withSecurityGuard / totalListings) * 100) : 0;

    // Furnishing Breakdown
    const fullyFurnished = properties.filter((p) => p.furnished === 'Fully Furnished').length;
    const semiFurnished = properties.filter((p) => p.furnished === 'Semi-Furnished').length;
    const unfurnished = properties.filter((p) => p.furnished === 'Unfurnished').length;

    // District Breakdown
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

    const totalViews = properties.reduce((acc, p) => acc + (p.viewsCount || 0), 0);

    return {
      totalListings,
      availableListings,
      rentedListings,
      featuredListings,
      totalMonthlyVolumeRwf,
      avgMonthlyRentRwf,
      totalRequests,
      pendingRequests,
      approvedRequests,
      declinedRequests,
      landlordCount: landlordList.length,
      verifiedLandlords,
      verificationRate,
      withWaterBackup,
      withPowerBackup,
      withSecurityGuard,
      waterCoverage,
      powerCoverage,
      securityCoverage,
      fullyFurnished,
      semiFurnished,
      unfurnished,
      districtCounts,
      totalViews
    };
  }, [properties, rentalRequests, landlords]);

  // Filtered properties for table
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.neighborhood.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q) ||
        p.landlord.name.toLowerCase().includes(q);
      
      const matchesDistrict = districtFilter === 'All' || p.district.includes(districtFilter);
      const matchesStatus = statusFilter === 'All' || p.availability === statusFilter;

      return matchesSearch && matchesDistrict && matchesStatus;
    });
  }, [properties, searchQuery, districtFilter, statusFilter]);

  const handleSaveNotice = () => {
    onUpdatePlatformNotice(noticeText, noticeEnabled);
    setNoticeSaved(true);
    setTimeout(() => setNoticeSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex flex-col md:flex-row text-[#1C1C1E] font-['Plus_Jakarta_Sans',sans-serif]">
      {/* ========================================================= */}
      {/* 1. BANKDASH SIDEWAYS SIDEBAR (Fixed / Sticky on Desktop)  */}
      {/* ========================================================= */}
      <aside className="w-full md:w-64 bg-white border-r border-black/[0.08] flex flex-col shrink-0 md:h-screen md:sticky md:top-0 z-30">
        {/* Brand Header */}
        <div className="p-6 border-b border-black/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#102A43] text-white flex items-center justify-center font-black text-lg shadow-sm">
              SR
            </div>
            <div>
              <div className="font-extrabold text-base tracking-tight text-[#102A43] leading-none">
                SmartRent
              </div>
              <div className="text-[10px] font-bold text-amber-700 uppercase tracking-widest mt-1">
                Admin Console
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] px-3 py-2">
            Main Management
          </div>

          <button
            onClick={() => setActiveNav('overview')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeNav === 'overview'
                ? 'bg-[#102A43] text-white shadow-xs'
                : 'text-[#6B7280] hover:text-[#1C1C1E] hover:bg-black/[0.03]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span className="flex-1 text-left">Dashboard</span>
            {analytics.pendingRequests > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500 text-white">
                {analytics.pendingRequests}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveNav('listings')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeNav === 'listings'
                ? 'bg-[#102A43] text-white shadow-xs'
                : 'text-[#6B7280] hover:text-[#1C1C1E] hover:bg-black/[0.03]'
            }`}
          >
            <Building2 className="w-4 h-4 shrink-0" />
            <span className="flex-1 text-left">All Listings</span>
            <span className="text-[11px] opacity-70">{properties.length}</span>
          </button>

          <button
            onClick={() => setActiveNav('requests')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeNav === 'requests'
                ? 'bg-[#102A43] text-white shadow-xs'
                : 'text-[#6B7280] hover:text-[#1C1C1E] hover:bg-black/[0.03]'
            }`}
          >
            <FileText className="w-4 h-4 shrink-0" />
            <span className="flex-1 text-left">Lease Requests</span>
            {analytics.pendingRequests > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-500" />
            )}
          </button>

          <button
            onClick={() => setActiveNav('users')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeNav === 'users'
                ? 'bg-[#102A43] text-white shadow-xs'
                : 'text-[#6B7280] hover:text-[#1C1C1E] hover:bg-black/[0.03]'
            }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            <span className="flex-1 text-left">Landlords & Hosts</span>
            <span className="text-[11px] opacity-70">{analytics.landlordCount}</span>
          </button>

          <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] px-3 pt-4 pb-2">
            Intelligence & System
          </div>

          <button
            onClick={() => setActiveNav('analytics')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeNav === 'analytics'
                ? 'bg-[#102A43] text-white shadow-xs'
                : 'text-[#6B7280] hover:text-[#1C1C1E] hover:bg-black/[0.03]'
            }`}
          >
            <BarChart3 className="w-4 h-4 shrink-0" />
            <span className="flex-1 text-left">Market Analytics</span>
          </button>

          <button
            onClick={() => setActiveNav('settings')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeNav === 'settings'
                ? 'bg-[#102A43] text-white shadow-xs'
                : 'text-[#6B7280] hover:text-[#1C1C1E] hover:bg-black/[0.03]'
            }`}
          >
            <Megaphone className="w-4 h-4 shrink-0" />
            <span className="flex-1 text-left">Notice & Broadcast</span>
          </button>

          {/* Sides of the Website accessible directly from sidebar */}
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] px-3 pt-4 pb-2">
            Website & Exploration
          </div>

          <button
            onClick={() => onNavigate ? onNavigate('explore') : onBackToMarketplace?.()}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer text-[#6B7280] hover:text-[#1C1C1E] hover:bg-black/[0.03]"
          >
            <Compass className="w-4 h-4 shrink-0 text-[#102A43]" />
            <span className="flex-1 text-left">Marketplace</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
          </button>

          <button
            onClick={() => onNavigate?.('deep-search')}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer text-[#6B7280] hover:text-[#1C1C1E] hover:bg-black/[0.03]"
          >
            <Search className="w-4 h-4 shrink-0 text-[#102A43]" />
            <span className="flex-1 text-left">Deep Research</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
          </button>

          <button
            onClick={() => onNavigate?.('messages')}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer text-[#6B7280] hover:text-[#1C1C1E] hover:bg-black/[0.03]"
          >
            <MessageSquare className="w-4 h-4 shrink-0 text-[#102A43]" />
            <span className="flex-1 text-left">Tenant Inquiries</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
          </button>

          <button
            onClick={() => onNavigate?.('home')}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer text-[#6B7280] hover:text-[#1C1C1E] hover:bg-black/[0.03]"
          >
            <Home className="w-4 h-4 shrink-0 text-[#102A43]" />
            <span className="flex-1 text-left">Homepage</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
          </button>
        </nav>

        {/* Sidebar Footer: User Card & Sign Out */}
        <div className="p-4 border-t border-black/[0.06] bg-black/[0.01] space-y-3">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-amber-500/20"
            />
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-[#1C1C1E] truncate">{currentUser.name}</div>
              <div className="text-[10px] text-amber-700 font-semibold uppercase tracking-wider">Super Administrator</div>
            </div>
          </div>

          <div className="pt-1 flex items-center justify-between gap-2 border-t border-black/[0.04]">
            {onBackToMarketplace && (
              <button
                onClick={onBackToMarketplace}
                className="text-[11px] text-[#6B7280] hover:text-[#102A43] font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Marketplace</span>
              </button>
            )}
            {onLogout && (
              <button
                onClick={onLogout}
                className="text-[11px] text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1 cursor-pointer ml-auto"
                title="Sign out of Admin Console"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* 2. MAIN CONTENT CANVAS (BankDash Style Dashboard Area)     */}
      {/* ========================================================= */}
      <main className="flex-1 min-w-0 flex flex-col overflow-y-auto">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-black/[0.06] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-20 shadow-2xs">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1C1C1E]">
                {activeNav === 'overview' && 'Marketplace Overview'}
                {activeNav === 'listings' && 'Listing Directory & Control'}
                {activeNav === 'requests' && 'Tenant Applications & Leases'}
                {activeNav === 'users' && 'Landlord Profiles & Verification'}
                {activeNav === 'analytics' && 'Rwandan Real Estate Analytics'}
                {activeNav === 'settings' && 'Platform Announcements'}
              </h1>
              <div className="text-xs text-[#6B7280] hidden sm:block">
                Smart Rent Rwanda Admin · Real-Time Platform Oversight
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search listings, landlords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3.5 py-2 bg-[#F4F5F7] rounded-xl text-xs border border-transparent focus:border-[#102A43] focus:bg-white focus:outline-none transition-all w-48 sm:w-64"
              />
            </div>

            {/* Primary Action Button */}
            <button
              onClick={onOpenCreateProperty}
              className="px-4 py-2 bg-[#102A43] hover:bg-[#0d2135] text-white text-xs font-bold rounded-xl transition-transform active:scale-95 shadow-xs cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <span>+ Add Listing</span>
            </button>
          </div>
        </header>

        {/* Dynamic Body based on Active Sidebar Navigation */}
        <div className="p-6 sm:p-8 space-y-8 flex-1">
          {/* ======================================================== */}
          {/* A. OVERVIEW & MAIN ANALYTICS VIEW                         */}
          {/* ======================================================== */}
          {(activeNav === 'overview' || activeNav === 'analytics') && (
            <>
              {/* Row 1: 4 BankDash Highlight Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* 1. Monthly Rent Flow (GMV) */}
                <div className="bg-white rounded-3xl p-5 border border-black/[0.06] shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 flex items-center gap-0.5">
                      <ArrowUpRight className="w-3 h-3" /> 0% Fees
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#6B7280]">Monthly Rental GMV</div>
                    <div className="text-xl sm:text-2xl font-extrabold text-[#1C1C1E] tracking-tight tabular-nums">
                      {(analytics.totalMonthlyVolumeRwf / 1000000).toFixed(1)}M <span className="text-xs font-bold text-[#6B7280]">RWF</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-[#6B7280]">
                    Avg: <strong>{new Intl.NumberFormat('en-RW').format(analytics.avgMonthlyRentRwf)} RWF</strong> / unit
                  </div>
                </div>

                {/* 2. Active Verified Listings */}
                <div className="bg-white rounded-3xl p-5 border border-black/[0.06] shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#0E9F6E] flex items-center justify-center font-bold">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                      {analytics.availableListings} Ready
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#6B7280]">Marketplace Inventory</div>
                    <div className="text-xl sm:text-2xl font-extrabold text-[#1C1C1E] tracking-tight tabular-nums">
                      {analytics.totalListings} <span className="text-xs font-bold text-[#6B7280]">Units</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-[#6B7280]">
                    {analytics.featuredListings} featured · {analytics.rentedListings} leased
                  </div>
                </div>

                {/* 3. Pending Lease Applications */}
                <div className="bg-white rounded-3xl p-5 border border-black/[0.06] shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      analytics.pendingRequests > 0 ? 'bg-amber-100 text-amber-800' : 'bg-black/[0.04] text-[#6B7280]'
                    }`}>
                      {analytics.pendingRequests} Action Required
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#6B7280]">Rental Requests</div>
                    <div className="text-xl sm:text-2xl font-extrabold text-[#1C1C1E] tracking-tight tabular-nums">
                      {analytics.totalRequests} <span className="text-xs font-bold text-[#6B7280]">Total</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-[#6B7280]">
                    {analytics.approvedRequests} approved · {analytics.declinedRequests} declined
                  </div>
                </div>

                {/* 4. Landlord Verification Index */}
                <div className="bg-white rounded-3xl p-5 border border-black/[0.06] shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                      NIDA Verified
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#6B7280]">Landlord Trust Index</div>
                    <div className="text-xl sm:text-2xl font-extrabold text-[#1C1C1E] tracking-tight tabular-nums">
                      {analytics.verificationRate}%
                    </div>
                  </div>
                  <div className="text-[11px] text-[#6B7280]">
                    {analytics.verifiedLandlords} of {analytics.landlordCount} hosts validated
                  </div>
                </div>
              </div>

              {/* Row 2: BankDash Visual Charts (Weekly Financial Flow + District Breakdown) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Visual Chart 1: Actual Rent Value Spread & Activity (2 Cols) */}
                <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-black/[0.06] shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-[#1C1C1E]">
                        Rental Volume & Price Density across Rwanda
                      </h3>
                      <p className="text-xs text-[#6B7280]">
                        Distribution of live property rent values in Rwandan Francs (RWF)
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-[#F4F5F7] p-1 rounded-xl text-[11px] font-semibold">
                      <span className="px-2.5 py-1 bg-white rounded-lg shadow-2xs text-[#102A43]">Live Inventory</span>
                    </div>
                  </div>

                  {/* SVG Bar Chart of Property Price Spread */}
                  <div className="h-56 w-full pt-4 flex items-end gap-3 justify-between border-b border-black/[0.06] pb-2">
                    {properties.map((prop, idx) => {
                      const maxPrice = Math.max(...properties.map((p) => p.priceRwf), 1);
                      const heightPercent = Math.max(15, Math.round((prop.priceRwf / maxPrice) * 100));
                      const isAvailable = prop.availability === 'Available Now';

                      return (
                        <div
                          key={prop.id}
                          className="flex-1 flex flex-col items-center gap-2 group relative cursor-pointer"
                          onClick={() => onSelectProperty(prop)}
                        >
                          {/* Tooltip on Hover */}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-16 bg-[#102A43] text-white p-2 rounded-xl text-[10px] pointer-events-none whitespace-nowrap z-10 shadow-lg">
                            <div className="font-bold">{prop.title}</div>
                            <div>{new Intl.NumberFormat('en-RW').format(prop.priceRwf)} RWF · {prop.district}</div>
                          </div>

                          <div className="w-full max-w-[28px] h-44 flex items-end justify-center">
                            <div
                              style={{ height: `${heightPercent}%` }}
                              className={`w-full rounded-t-lg transition-all duration-500 group-hover:brightness-110 ${
                                isAvailable ? 'bg-[#102A43]' : 'bg-slate-300'
                              }`}
                            />
                          </div>

                          <span className="text-[10px] text-[#6B7280] truncate w-full text-center font-medium">
                            P{idx + 1}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#6B7280] pt-1">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-sm bg-[#102A43]" />
                        <span>Available Now</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-sm bg-slate-300" />
                        <span>Currently Rented</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-[#102A43]">Total Views: {analytics.totalViews}</span>
                  </div>
                </div>

                {/* Visual Chart 2: District Distribution Breakdown (1 Col) */}
                <div className="bg-white rounded-3xl p-6 border border-black/[0.06] shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-[#1C1C1E]">District Breakdown</h3>
                      <p className="text-xs text-[#6B7280]">Inventory distribution</p>
                    </div>
                    <PieChart className="w-4 h-4 text-[#6B7280]" />
                  </div>

                  <div className="space-y-3 pt-2">
                    {Object.entries(analytics.districtCounts).map(([district, stats]) => {
                      const share = Math.round((stats.count / analytics.totalListings) * 100);
                      return (
                        <div key={district} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-[#1C1C1E]">{district}</span>
                            <span className="text-[#6B7280]">{stats.count} units ({share}%)</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-black/[0.04] overflow-hidden">
                            <div 
                              className="h-full bg-[#0E9F6E] rounded-full transition-all duration-500" 
                              style={{ width: `${share}%` }} 
                            />
                          </div>
                          <div className="text-[10px] text-[#6B7280] text-right">
                            Avg: {new Intl.NumberFormat('en-RW').format(stats.avgRent)} RWF/mo
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Row 3: Rwandan Infrastructure Compliance Matrix */}
              <div className="bg-white rounded-3xl p-6 border border-black/[0.06] shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#1C1C1E]">
                      Utility & Infrastructure Compliance Matrix
                    </h3>
                    <p className="text-xs text-[#6B7280]">
                      Key Rwandan living essentials verified across all active marketplace properties
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-[#0E9F6E] px-2.5 py-1 rounded-full bg-[#0E9F6E]/10">
                    Live Audit
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {/* Water Reserve Tank */}
                  <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2">
                    <div className="flex items-center justify-between text-blue-900">
                      <div className="flex items-center gap-1.5 font-bold text-xs">
                        <Droplet className="w-4 h-4 text-blue-600" />
                        <span>Water Backup Reserve</span>
                      </div>
                      <span className="font-extrabold text-sm">{analytics.waterCoverage}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-blue-200">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${analytics.waterCoverage}%` }} />
                    </div>
                    <div className="text-[10px] text-blue-800">
                      {analytics.withWaterBackup} of {analytics.totalListings} homes with 5,000L+ reserve tanks
                    </div>
                  </div>

                  {/* Power Backup Generator / Solar */}
                  <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-2">
                    <div className="flex items-center justify-between text-amber-900">
                      <div className="flex items-center gap-1.5 font-bold text-xs">
                        <Zap className="w-4 h-4 text-amber-600" />
                        <span>Backup Electricity</span>
                      </div>
                      <span className="font-extrabold text-sm">{analytics.powerCoverage}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-amber-200">
                      <div className="h-full bg-amber-600 rounded-full" style={{ width: `${analytics.powerCoverage}%` }} />
                    </div>
                    <div className="text-[10px] text-amber-800">
                      {analytics.withPowerBackup} of {analytics.totalListings} homes with solar/diesel generators
                    </div>
                  </div>

                  {/* 24/7 Gated Security Guard */}
                  <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2">
                    <div className="flex items-center justify-between text-emerald-900">
                      <div className="flex items-center gap-1.5 font-bold text-xs">
                        <Shield className="w-4 h-4 text-[#0E9F6E]" />
                        <span>24/7 Security Guard</span>
                      </div>
                      <span className="font-extrabold text-sm">{analytics.securityCoverage}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-emerald-200">
                      <div className="h-full bg-[#0E9F6E] rounded-full" style={{ width: `${analytics.securityCoverage}%` }} />
                    </div>
                    <div className="text-[10px] text-emerald-800">
                      {analytics.withSecurityGuard} of {analytics.totalListings} residences in guarded compounds
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ======================================================== */}
          {/* B. LISTINGS SUPERVISION & MANAGEMENT TABLE                */}
          {/* ======================================================== */}
          {(activeNav === 'overview' || activeNav === 'listings') && (
            <div className="bg-white rounded-3xl border border-black/[0.06] shadow-2xs overflow-hidden">
              <div className="p-6 border-b border-black/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-[#1C1C1E]">
                    Marketplace Properties Directory ({filteredProperties.length})
                  </h3>
                  <p className="text-xs text-[#6B7280]">
                    Direct admin control over status, verification badges, and featured properties
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={districtFilter}
                    onChange={(e) => setDistrictFilter(e.target.value)}
                    className="px-3 py-1.5 bg-[#F4F5F7] rounded-xl text-xs font-semibold text-[#1C1C1E] border border-transparent focus:outline-none cursor-pointer"
                  >
                    <option value="All">All Districts</option>
                    <option value="Kicukiro">Kicukiro</option>
                    <option value="Gasabo">Gasabo</option>
                    <option value="Nyarugenge">Nyarugenge</option>
                    <option value="Musanze">Musanze</option>
                    <option value="Rubavu">Rubavu</option>
                  </select>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="px-3 py-1.5 bg-[#F4F5F7] rounded-xl text-xs font-semibold text-[#1C1C1E] border border-transparent focus:outline-none cursor-pointer"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Available Now">Available Now</option>
                    <option value="Rented">Rented</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-black/[0.06] bg-[#F4F5F7]/60 text-[#6B7280] font-bold uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-6">Property / Title</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Monthly Rent</th>
                      <th className="py-3 px-4">Landlord</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-center">Featured</th>
                      <th className="py-3 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.04]">
                    {filteredProperties.map((prop) => (
                      <tr key={prop.id} className="hover:bg-black/[0.01] transition-colors">
                        {/* Property / Image */}
                        <td className="py-3 px-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={prop.images[0]}
                              alt={prop.title}
                              referrerPolicy="no-referrer"
                              className="w-12 h-10 object-cover rounded-xl shrink-0"
                            />
                            <div className="min-w-0">
                              <button
                                onClick={() => onSelectProperty(prop)}
                                className="font-bold text-[#1C1C1E] hover:text-[#102A43] text-left line-clamp-1 cursor-pointer"
                              >
                                {prop.title}
                              </button>
                              <div className="text-[10px] text-[#6B7280]">
                                {prop.bedrooms} Bed · {prop.bathrooms} Bath · {prop.areaSqm} m²
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Location */}
                        <td className="py-3 px-4">
                          <div className="font-semibold text-[#1C1C1E]">{prop.neighborhood}</div>
                          <div className="text-[10px] text-[#6B7280]">{prop.district}</div>
                        </td>

                        {/* Price */}
                        <td className="py-3 px-4 font-bold text-[#102A43] tabular-nums whitespace-nowrap">
                          {new Intl.NumberFormat('en-RW').format(prop.priceRwf)} RWF
                        </td>

                        {/* Landlord */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1.5">
                            <span className="font-medium text-[#1C1C1E]">{prop.landlord.name}</span>
                            {prop.landlord.verified && (
                              <span className="text-[#0E9F6E] font-bold text-[10px]">✓</span>
                            )}
                          </div>
                          <div className="text-[10px] text-[#6B7280]">{prop.landlord.phone}</div>
                        </td>

                        {/* Availability Toggle */}
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => onToggleAvailability(prop.id)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                              prop.availability === 'Available Now'
                                ? 'bg-emerald-50 text-[#0E9F6E] hover:bg-emerald-100'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {prop.availability}
                          </button>
                        </td>

                        {/* Featured Toggle */}
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => onToggleFeatured(prop.id)}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold cursor-pointer transition-colors ${
                              prop.featured
                                ? 'bg-amber-100 text-amber-900 font-extrabold'
                                : 'bg-black/[0.04] text-[#6B7280] hover:text-[#1C1C1E]'
                            }`}
                          >
                            {prop.featured ? '★ Featured' : '☆ Standard'}
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-6 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => onSelectProperty(prop)}
                              className="p-1.5 rounded-lg text-[#6B7280] hover:text-[#102A43] hover:bg-black/[0.04] cursor-pointer"
                              title="Inspect property"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onDeleteProperty(prop.id)}
                              className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 cursor-pointer"
                              title="Delete listing"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* C. RENTAL LEASE APPLICATIONS REVIEW QUEUE                 */}
          {/* ======================================================== */}
          {(activeNav === 'overview' || activeNav === 'requests') && (
            <div className="bg-white rounded-3xl border border-black/[0.06] shadow-2xs overflow-hidden">
              <div className="p-6 border-b border-black/[0.06] flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#1C1C1E]">
                    Tenant Rental Applications ({rentalRequests.length})
                  </h3>
                  <p className="text-xs text-[#6B7280]">
                    Supervise verified direct lease inquiries and agreements
                  </p>
                </div>
                {analytics.pendingRequests > 0 && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                    {analytics.pendingRequests} Pending Landlord Decision
                  </span>
                )}
              </div>

              <div className="divide-y divide-black/[0.04]">
                {rentalRequests.length > 0 ? (
                  rentalRequests.map((req) => (
                    <div key={req.id} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-black/[0.01]">
                      <div className="flex items-start gap-4">
                        <img
                          src={req.propertyImage}
                          alt={req.propertyTitle}
                          referrerPolicy="no-referrer"
                          className="w-16 h-14 object-cover rounded-2xl shrink-0"
                        />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-[#1C1C1E]">{req.tenantName}</span>
                            <span className="text-[11px] text-[#6B7280]">applied for</span>
                            <span className="font-semibold text-xs text-[#102A43]">{req.propertyTitle}</span>
                          </div>
                          <div className="text-xs text-[#6B7280] flex flex-wrap items-center gap-3">
                            <span>Phone: <strong>{req.tenantPhone}</strong></span>
                            <span>Email: <strong>{req.tenantEmail}</strong></span>
                            <span>Lease: <strong>{req.leaseDurationMonths} months</strong></span>
                            <span>Move-in: <strong>{req.moveInDate}</strong></span>
                          </div>
                          {req.message && (
                            <p className="text-xs text-[#1C1C1E] italic bg-black/[0.02] p-2 rounded-xl mt-1">
                              "{req.message}"
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end md:self-center">
                        <div className="text-right">
                          <div className="text-sm font-extrabold text-[#102A43] tabular-nums">
                            {new Intl.NumberFormat('en-RW').format(req.propertyPrice)} RWF
                          </div>
                          <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            req.status === 'Approved' ? 'bg-emerald-50 text-[#0E9F6E]' :
                            req.status === 'Declined' ? 'bg-rose-50 text-rose-600' :
                            'bg-amber-50 text-amber-700'
                          }`}>
                            {req.status}
                          </span>
                        </div>

                        {req.status === 'Pending' && (
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => onUpdateRentalRequestStatus(req.id, 'Approved')}
                              className="px-3 py-1.5 bg-[#0E9F6E] hover:bg-[#0b8058] text-white text-xs font-bold rounded-xl cursor-pointer"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => onUpdateRentalRequestStatus(req.id, 'Declined')}
                              className="px-3 py-1.5 bg-black/[0.05] hover:bg-black/[0.1] text-[#1C1C1E] text-xs font-bold rounded-xl cursor-pointer"
                            >
                              Decline
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-xs text-[#6B7280]">
                    No lease requests logged on the platform yet.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* D. LANDLORDS & HOSTS DIRECTORY                            */}
          {/* ======================================================== */}
          {(activeNav === 'overview' || activeNav === 'users') && (
            <div className="bg-white rounded-3xl border border-black/[0.06] shadow-2xs overflow-hidden">
              <div className="p-6 border-b border-black/[0.06] flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#1C1C1E]">
                    Rwandan Landlord Directory & Trust Status
                  </h3>
                  <p className="text-xs text-[#6B7280]">
                    Validate government ID verification and host integrity
                  </p>
                </div>
                <span className="text-xs font-bold text-[#102A43]">
                  {analytics.verifiedLandlords} of {analytics.landlordCount} Verified
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                {Object.values(landlords).map((landlord) => (
                  <div
                    key={landlord.id}
                    className="p-5 rounded-2xl border border-black/[0.06] bg-[#FAFAF8] flex items-start justify-between gap-4"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={landlord.avatar}
                        alt={landlord.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-full object-cover shrink-0 ring-1 ring-black/10"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-sm text-[#1C1C1E]">{landlord.name}</span>
                          {landlord.verified ? (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-[#0E9F6E] text-[10px] font-bold">
                              ✓ Verified
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold">
                              Unverified
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-[#6B7280]">{landlord.phone} · {landlord.email}</div>
                        <div className="text-[11px] text-[#6B7280]">{landlord.bio}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => onToggleLandlordVerification(landlord.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                        landlord.verified
                          ? 'bg-black/[0.04] text-[#6B7280] hover:text-rose-600'
                          : 'bg-[#0E9F6E] text-white hover:bg-[#0b8058]'
                      }`}
                    >
                      {landlord.verified ? 'Revoke' : 'Verify'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* E. PLATFORM BROADCAST & NOTICES                           */}
          {/* ======================================================== */}
          {activeNav === 'settings' && (
            <div className="bg-white rounded-3xl border border-black/[0.06] shadow-2xs p-6 sm:p-8 space-y-6 max-w-3xl">
              <div>
                <h3 className="text-base font-bold text-[#1C1C1E]">
                  Platform Broadcast & Banner Notification
                </h3>
                <p className="text-xs text-[#6B7280]">
                  Display a top-bar banner to all visitors and renters across Smart Rent Rwanda
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#1C1C1E] mb-1">
                    Announcement Banner Text
                  </label>
                  <textarea
                    rows={3}
                    value={noticeText}
                    onChange={(e) => setNoticeText(e.target.value)}
                    placeholder="e.g. Free verified listings for Rwandan property owners throughout 2026..."
                    className="w-full p-3.5 bg-[#F4F5F7] rounded-2xl border border-black/[0.08] text-xs text-[#1C1C1E] focus:outline-none focus:ring-1 focus:ring-[#102A43]"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAFAF8] border border-black/[0.06]">
                  <div>
                    <div className="text-xs font-bold text-[#1C1C1E]">Enable Banner on Homepage</div>
                    <div className="text-[11px] text-[#6B7280]">Visible to all incoming visitors</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={noticeEnabled}
                    onChange={(e) => setNoticeEnabled(e.target.checked)}
                    className="w-5 h-5 rounded text-[#102A43] cursor-pointer"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={handleSaveNotice}
                    className="px-6 py-2.5 bg-[#102A43] hover:bg-[#0d2135] text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    Save & Broadcast
                  </button>
                  {noticeSaved && (
                    <span className="text-xs text-[#0E9F6E] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Broadcast updated!
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
