import React, { useState, useMemo } from 'react';
import { Property, RentalRequest, Conversation, UserProfile } from '../types';
import { 
  Building2, 
  Users, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  X, 
  Search, 
  Plus,
  Eye, 
  MessageSquare, 
  ArrowUpRight,
  TrendingUp,
  MapPin,
  Clock,
  Phone,
  Mail,
  DollarSign,
  Droplet,
  Zap,
  Shield,
  LayoutDashboard,
  BarChart3,
  PieChart,
  Home,
  LogOut,
  Bed,
  Bath,
  Maximize2,
  Compass,
  Heart
} from 'lucide-react';

interface LandlordDashboardProps {
  currentUser: UserProfile | null;
  landlordProperties: Property[];
  incomingRequests: RentalRequest[];
  conversations: Conversation[];
  onAddNewProperty: () => void;
  onToggleAvailability: (propertyId: string) => void;
  onAcceptRequest: (requestId: string) => void;
  onDeclineRequest: (requestId: string) => void;
  onOpenChat: (convId?: string) => void;
  onSelectProperty: (property: Property) => void;
  onOpenAuthModal?: () => void;
  onNavigate?: (view: string) => void;
  onBackToMarketplace?: () => void;
  onLogout?: () => void;
}

export const LandlordDashboard: React.FC<LandlordDashboardProps> = ({
  currentUser,
  landlordProperties,
  incomingRequests,
  conversations,
  onAddNewProperty,
  onToggleAvailability,
  onAcceptRequest,
  onDeclineRequest,
  onOpenChat,
  onSelectProperty,
  onOpenAuthModal,
  onNavigate,
  onBackToMarketplace,
  onLogout
}) => {
  // Navigation inside Landlord Sideways dashboard
  const [activeNav, setActiveNav] = useState<'overview' | 'properties' | 'requests' | 'messages' | 'analytics'>('overview');
  const [propertySearch, setPropertySearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Available Now' | 'Rented'>('All');

  // Guard: If not signed in as Landlord, prompt for legitimate sign in
  if (!currentUser || currentUser.role !== 'landlord') {
    return (
      <div className="min-h-screen bg-[#F4F5F7] flex items-center justify-center p-6 text-center font-['Plus_Jakarta_Sans',sans-serif]">
        <div className="max-w-md w-full bg-white rounded-3xl border border-black/[0.08] shadow-lg p-8 space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#102A43]/10 text-[#102A43] flex items-center justify-center mx-auto font-bold">
            <Building2 className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-[#1C1C1E]">Landlord Access Required</h2>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Please sign in with a verified Landlord account to list properties for free, inspect inquiries, and manage your rental portfolio.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenAuthModal}
              className="px-6 py-2.5 bg-[#102A43] hover:bg-[#0d2135] text-white text-xs font-semibold rounded-full cursor-pointer transition-transform active:scale-95 shadow-sm"
            >
              Sign In as Landlord
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // REAL-TIME ACTUAL DATA ANALYTICS FOR LANDLORD
  // ==========================================
  const analytics = useMemo(() => {
    const totalUnits = landlordProperties.length;
    const availableUnits = landlordProperties.filter((p) => p.availability === 'Available Now').length;
    const rentedUnits = landlordProperties.filter((p) => p.availability === 'Rented').length;
    const occupancyRate = totalUnits > 0 ? Math.round((rentedUnits / totalUnits) * 100) : 0;
    
    // Monthly gross rental volume for this landlord
    const monthlyGrossRwf = landlordProperties.reduce((acc, p) => acc + p.priceRwf, 0);
    const realizedRwf = landlordProperties.filter((p) => p.availability === 'Rented').reduce((acc, p) => acc + p.priceRwf, 0);

    // Potential 1-month brokerage fee saved by using SmartRent 0% fee platform
    const brokerFeeSavedRwf = monthlyGrossRwf;

    // Total tenant views
    const totalViews = landlordProperties.reduce((acc, p) => acc + (p.viewsCount || 0), 0);

    // Requests for this landlord's properties
    const myPropertyIds = landlordProperties.map((p) => p.id);
    const myRequests = incomingRequests.filter((r) => myPropertyIds.includes(r.propertyId));
    const pendingRequests = myRequests.filter((r) => r.status === 'Pending').length;
    const approvedRequests = myRequests.filter((r) => r.status === 'Approved').length;

    // Infrastructure metrics
    const waterReserveCount = landlordProperties.filter((p) => p.waterBackup).length;
    const powerBackupCount = landlordProperties.filter((p) => p.powerBackup).length;
    const securityGuardCount = landlordProperties.filter((p) => p.securityGuard).length;

    return {
      totalUnits,
      availableUnits,
      rentedUnits,
      occupancyRate,
      monthlyGrossRwf,
      realizedRwf,
      brokerFeeSavedRwf,
      totalViews,
      myRequests,
      pendingRequests,
      approvedRequests,
      waterReserveCount,
      powerBackupCount,
      securityGuardCount
    };
  }, [landlordProperties, incomingRequests]);

  // Filtered properties
  const filteredProperties = useMemo(() => {
    return landlordProperties.filter((p) => {
      const q = propertySearch.toLowerCase().trim();
      const matchesSearch = !q || p.title.toLowerCase().includes(q) || p.neighborhood.toLowerCase().includes(q);
      const matchesStatus = statusFilter === 'All' || p.availability === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [landlordProperties, propertySearch, statusFilter]);

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex flex-col md:flex-row text-[#1C1C1E] font-['Plus_Jakarta_Sans',sans-serif]">
      {/* ========================================================= */}
      {/* 1. BANKDASH SIDEWAYS SIDEBAR (Fixed / Sticky on Desktop)  */}
      {/* ========================================================= */}
      <aside className="w-full md:w-64 bg-white border-r border-black/[0.08] flex flex-col shrink-0 md:h-screen md:sticky md:top-0 z-30">
        {/* Brand Header */}
        <div className="p-6 border-b border-black/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0E9F6E] text-white flex items-center justify-center font-black text-lg shadow-sm">
              LH
            </div>
            <div>
              <div className="font-extrabold text-base tracking-tight text-[#102A43] leading-none">
                SmartRent
              </div>
              <div className="text-[10px] font-bold text-[#0E9F6E] uppercase tracking-widest mt-1">
                Landlord Hub
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] px-3 py-2">
            Portfolio Management
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
            <span className="flex-1 text-left">Overview</span>
            {analytics.pendingRequests > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#0E9F6E] text-white">
                {analytics.pendingRequests}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveNav('properties')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeNav === 'properties'
                ? 'bg-[#102A43] text-white shadow-xs'
                : 'text-[#6B7280] hover:text-[#1C1C1E] hover:bg-black/[0.03]'
            }`}
          >
            <Building2 className="w-4 h-4 shrink-0" />
            <span className="flex-1 text-left">My Properties</span>
            <span className="text-[11px] opacity-70">{landlordProperties.length}</span>
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
            <span className="flex-1 text-left">Rental Requests</span>
            {analytics.pendingRequests > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#0E9F6E]" />
            )}
          </button>

          <button
            onClick={() => setActiveNav('messages')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeNav === 'messages'
                ? 'bg-[#102A43] text-white shadow-xs'
                : 'text-[#6B7280] hover:text-[#1C1C1E] hover:bg-black/[0.03]'
            }`}
          >
            <MessageSquare className="w-4 h-4 shrink-0" />
            <span className="flex-1 text-left">Tenant Inquiries</span>
            <span className="text-[11px] opacity-70">{conversations.length}</span>
          </button>

          <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] px-3 pt-4 pb-2">
            Financial & Insights
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
            <span className="flex-1 text-left">Performance Analytics</span>
          </button>

          {/* Sides of the Website accessible directly from Landlord sidebar */}
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] px-3 pt-4 pb-2">
            Website & Exploration
          </div>

          <button
            onClick={() => onNavigate ? onNavigate('explore') : onBackToMarketplace?.()}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer text-[#6B7280] hover:text-[#1C1C1E] hover:bg-black/[0.03]"
          >
            <Compass className="w-4 h-4 shrink-0 text-[#102A43]" />
            <span className="flex-1 text-left">Explore Marketplace</span>
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
            onClick={() => onNavigate?.('saved')}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer text-[#6B7280] hover:text-[#1C1C1E] hover:bg-black/[0.03]"
          >
            <Heart className="w-4 h-4 shrink-0 text-[#102A43]" />
            <span className="flex-1 text-left">Saved Bookmarks</span>
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

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-black/[0.06] bg-black/[0.01] space-y-3">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-[#0E9F6E]/20"
            />
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-[#1C1C1E] truncate">{currentUser.name}</div>
              <div className="text-[10px] text-[#0E9F6E] font-semibold flex items-center gap-1">
                <span>✓ Verified Landlord</span>
              </div>
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
                title="Sign out of Landlord Hub"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* 2. MAIN CONTENT CANVAS                                    */}
      {/* ========================================================= */}
      <main className="flex-1 min-w-0 flex flex-col overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-black/[0.06] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-20 shadow-2xs">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1C1C1E]">
              {activeNav === 'overview' && 'Portfolio Overview & Metrics'}
              {activeNav === 'properties' && 'My Property Listings'}
              {activeNav === 'requests' && 'Tenant Rental Applications'}
              {activeNav === 'messages' && 'Tenant Inquiries & Conversations'}
              {activeNav === 'analytics' && 'Earnings & Performance Analytics'}
            </h1>
            <div className="text-xs text-[#6B7280] hidden sm:block">
              Smart Rent Rwanda · Zero Commission Property Supervision
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search my properties..."
                value={propertySearch}
                onChange={(e) => setPropertySearch(e.target.value)}
                className="pl-9 pr-3.5 py-2 bg-[#F4F5F7] rounded-xl text-xs border border-transparent focus:border-[#102A43] focus:bg-white focus:outline-none transition-all w-48 sm:w-56"
              />
            </div>

            <button
              onClick={onAddNewProperty}
              className="px-4 py-2 bg-[#102A43] hover:bg-[#0d2135] text-white text-xs font-bold rounded-xl transition-transform active:scale-95 shadow-xs cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>List Property</span>
            </button>
          </div>
        </header>

        {/* Dynamic Body */}
        <div className="p-6 sm:p-8 space-y-8 flex-1">
          {/* ======================================================== */}
          {/* A. OVERVIEW & ACTUAL DATA ANALYTICS CARDS                 */}
          {/* ======================================================== */}
          {(activeNav === 'overview' || activeNav === 'analytics') && (
            <>
              {/* Row 1: 4 Highlight Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* 1. Monthly Portfolio Rent */}
                <div className="bg-white rounded-3xl p-5 border border-black/[0.06] shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                      0% Fees
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#6B7280]">Total Portfolio Rent</div>
                    <div className="text-xl sm:text-2xl font-extrabold text-[#1C1C1E] tracking-tight tabular-nums">
                      {new Intl.NumberFormat('en-RW').format(analytics.monthlyGrossRwf)} <span className="text-xs font-bold text-[#6B7280]">RWF</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-[#6B7280]">
                    Across {analytics.totalUnits} managed residences
                  </div>
                </div>

                {/* 2. Occupancy Rate */}
                <div className="bg-white rounded-3xl p-5 border border-black/[0.06] shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#0E9F6E] flex items-center justify-center font-bold">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                      {analytics.availableUnits} Available
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#6B7280]">Portfolio Occupancy</div>
                    <div className="text-xl sm:text-2xl font-extrabold text-[#1C1C1E] tracking-tight tabular-nums">
                      {analytics.occupancyRate}%
                    </div>
                  </div>
                  <div className="text-[11px] text-[#6B7280]">
                    {analytics.rentedUnits} leased · {analytics.availableUnits} seeking tenants
                  </div>
                </div>

                {/* 3. Total Tenant Views */}
                <div className="bg-white rounded-3xl p-5 border border-black/[0.06] shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                      <Eye className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
                      High Reach
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#6B7280]">Prospective Renter Views</div>
                    <div className="text-xl sm:text-2xl font-extrabold text-[#1C1C1E] tracking-tight tabular-nums">
                      {analytics.totalViews} <span className="text-xs font-bold text-[#6B7280]">Views</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-[#6B7280]">
                    Direct organic traffic from Kigali
                  </div>
                </div>

                {/* 4. Broker Commission Saved */}
                <div className="bg-white rounded-3xl p-5 border border-black/[0.06] shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#0E9F6E] flex items-center justify-center font-bold">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Saved 100%
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#6B7280]">Broker Fees Saved</div>
                    <div className="text-xl sm:text-2xl font-extrabold text-[#0E9F6E] tracking-tight tabular-nums">
                      {new Intl.NumberFormat('en-RW').format(analytics.brokerFeeSavedRwf)} <span className="text-xs font-bold text-[#6B7280]">RWF</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-[#6B7280]">
                    Direct landlord contract, zero intermediary cut
                  </div>
                </div>
              </div>

              {/* Row 2: Visual Chart of Portfolio Units by Price & Status */}
              <div className="bg-white rounded-3xl p-6 border border-black/[0.06] shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#1C1C1E]">
                      Portfolio Monthly Revenue Matrix
                    </h3>
                    <p className="text-xs text-[#6B7280]">
                      Active monthly rent values and status across your listed units
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#102A43]" />
                      <span>Available Now</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-slate-300" />
                      <span>Leased Unit</span>
                    </div>
                  </div>
                </div>

                {/* SVG Bar Chart for Landlord's Units */}
                <div className="h-52 w-full pt-4 flex items-end gap-4 justify-start border-b border-black/[0.06] pb-2 overflow-x-auto">
                  {landlordProperties.map((prop, idx) => {
                    const maxP = Math.max(...landlordProperties.map((p) => p.priceRwf), 1);
                    const heightPercent = Math.max(20, Math.round((prop.priceRwf / maxP) * 100));
                    const isAvailable = prop.availability === 'Available Now';

                    return (
                      <div
                        key={prop.id}
                        onClick={() => onSelectProperty(prop)}
                        className="w-28 flex flex-col items-center gap-2 group cursor-pointer shrink-0"
                      >
                        <div className="w-full h-40 flex items-end justify-center">
                          <div
                            style={{ height: `${heightPercent}%` }}
                            className={`w-14 rounded-t-xl transition-all duration-300 group-hover:brightness-110 flex items-center justify-center ${
                              isAvailable ? 'bg-[#102A43]' : 'bg-slate-300'
                            }`}
                          >
                            <span className="text-[10px] text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                              {(prop.priceRwf / 1000).toFixed(0)}k
                            </span>
                          </div>
                        </div>
                        <div className="text-center w-full">
                          <div className="text-xs font-bold text-[#1C1C1E] truncate">{prop.title}</div>
                          <div className="text-[10px] text-[#6B7280]">{prop.neighborhood}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* ======================================================== */}
          {/* B. MY PROPERTIES MANAGEMENT TABLE                         */}
          {/* ======================================================== */}
          {(activeNav === 'overview' || activeNav === 'properties') && (
            <div className="bg-white rounded-3xl border border-black/[0.06] shadow-2xs overflow-hidden">
              <div className="p-6 border-b border-black/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-[#1C1C1E]">
                    My Properties ({filteredProperties.length})
                  </h3>
                  <p className="text-xs text-[#6B7280]">
                    Manage availability, view tenant count, and update listing status
                  </p>
                </div>

                <div className="flex items-center gap-2">
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

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-black/[0.06] bg-[#F4F5F7]/60 text-[#6B7280] font-bold uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-6">Residence</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Monthly Rent</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-center">Views</th>
                      <th className="py-3 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.04]">
                    {filteredProperties.map((prop) => (
                      <tr key={prop.id} className="hover:bg-black/[0.01] transition-colors">
                        <td className="py-3 px-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={prop.images[0]}
                              alt={prop.title}
                              referrerPolicy="no-referrer"
                              className="w-14 h-11 object-cover rounded-xl shrink-0"
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

                        <td className="py-3 px-4">
                          <div className="font-semibold text-[#1C1C1E]">{prop.neighborhood}</div>
                          <div className="text-[10px] text-[#6B7280]">{prop.district}</div>
                        </td>

                        <td className="py-3 px-4 font-bold text-[#102A43] tabular-nums whitespace-nowrap">
                          {new Intl.NumberFormat('en-RW').format(prop.priceRwf)} RWF
                        </td>

                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => onToggleAvailability(prop.id)}
                            className={`px-3 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                              prop.availability === 'Available Now'
                                ? 'bg-emerald-50 text-[#0E9F6E] hover:bg-emerald-100'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {prop.availability}
                          </button>
                        </td>

                        <td className="py-3 px-4 text-center font-bold text-[#6B7280]">
                          {prop.viewsCount || 0}
                        </td>

                        <td className="py-3 px-6 text-right">
                          <button
                            onClick={() => onSelectProperty(prop)}
                            className="px-3 py-1.5 bg-[#F4F5F7] hover:bg-black/[0.06] text-[#102A43] text-xs font-semibold rounded-xl cursor-pointer"
                          >
                            Inspect
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* C. TENANT APPLICATIONS QUEUE                              */}
          {/* ======================================================== */}
          {(activeNav === 'overview' || activeNav === 'requests') && (
            <div className="bg-white rounded-3xl border border-black/[0.06] shadow-2xs overflow-hidden">
              <div className="p-6 border-b border-black/[0.06] flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#1C1C1E]">
                    Incoming Rental Applications ({analytics.myRequests.length})
                  </h3>
                  <p className="text-xs text-[#6B7280]">
                    Review verified applications directly submitted by prospective tenants
                  </p>
                </div>
                {analytics.pendingRequests > 0 && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0E9F6E]/10 text-[#0E9F6E]">
                    {analytics.pendingRequests} Awaiting Your Decision
                  </span>
                )}
              </div>

              <div className="divide-y divide-black/[0.04]">
                {analytics.myRequests.length > 0 ? (
                  analytics.myRequests.map((req) => (
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
                            <span>Duration: <strong>{req.leaseDurationMonths} months</strong></span>
                            <span>Move-in: <strong>{req.moveInDate}</strong></span>
                          </div>
                          {req.message && (
                            <p className="text-xs text-[#1C1C1E] italic bg-black/[0.02] p-2.5 rounded-xl mt-1">
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
                              onClick={() => onAcceptRequest(req.id)}
                              className="px-3.5 py-1.5 bg-[#0E9F6E] hover:bg-[#0b8058] text-white text-xs font-bold rounded-xl cursor-pointer"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => onDeclineRequest(req.id)}
                              className="px-3.5 py-1.5 bg-black/[0.05] hover:bg-black/[0.1] text-[#1C1C1E] text-xs font-bold rounded-xl cursor-pointer"
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
                    No rental applications received yet for your properties.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* D. DIRECT TENANT MESSAGES                                */}
          {/* ======================================================== */}
          {activeNav === 'messages' && (
            <div className="bg-white rounded-3xl border border-black/[0.06] shadow-2xs p-6 space-y-4">
              <h3 className="text-base font-bold text-[#1C1C1E]">
                Direct Tenant Conversations ({conversations.length})
              </h3>
              <div className="divide-y divide-black/[0.04]">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => onOpenChat(conv.id)}
                    className="py-4 flex items-center justify-between gap-4 hover:bg-black/[0.01] cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={conv.propertyImage}
                        alt={conv.propertyTitle}
                        referrerPolicy="no-referrer"
                        className="w-12 h-10 object-cover rounded-xl"
                      />
                      <div>
                        <div className="font-bold text-xs text-[#1C1C1E]">{conv.tenantName}</div>
                        <div className="text-[11px] text-[#6B7280]">{conv.propertyTitle}</div>
                        <div className="text-[11px] text-[#102A43] truncate max-w-md">{conv.lastMessage}</div>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 bg-[#102A43] text-white text-xs font-semibold rounded-xl">
                      Open Chat
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
