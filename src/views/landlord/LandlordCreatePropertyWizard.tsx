import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Layers, 
  Image as ImageIcon, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  UploadCloud,
  Check
} from 'lucide-react';
import { PropertyType, RwandaDistrict } from '../../types';
import heroKigaliVilla from '../../assets/images/hero_kigali_villa_1790260303083.jpg';
import kigaliKicukiroApt from '../../assets/images/kigali_kicukiro_apt_1790260315652.jpg';
import musanzeStoneHome from '../../assets/images/musanze_stone_home_1790260326296.jpg';

export const LandlordCreatePropertyWizard: React.FC = () => {
  const { step = 'basic' } = useParams<{ step?: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { createProperty, landlords } = useData();

  // Multi-step form state
  const [formData, setFormData] = useState({
    title: '',
    propertyType: 'Apartment' as PropertyType,
    district: 'Kicukiro (Kigali)' as RwandaDistrict,
    neighborhood: '',
    address: '',
    priceRwf: 350000,
    bedrooms: 2,
    bathrooms: 2,
    areaSqm: 85,
    furnished: 'Semi-Furnished' as 'Fully Furnished' | 'Semi-Furnished' | 'Unfurnished',
    waterBackup: true,
    powerBackup: true,
    securityGuard: true,
    parkingSpaces: 1,
    description: '',
    images: [kigaliKicukiroApt, heroKigaliVilla],
    amenities: ['Water Reservoir (5,000L)', 'Dedicated Parking', 'Cashpower Meter', '24/7 Security Guard']
  });

  const stepsList = [
    { id: 'basic', label: '1. Basic Info' },
    { id: 'location', label: '2. Location' },
    { id: 'pricing', label: '3. Pricing' },
    { id: 'details', label: '4. Specs & Amenities' },
    { id: 'photos', label: '5. Photos' },
    { id: 'review', label: '6. Review' },
    { id: 'published', label: '7. Published' },
  ];

  const handleNext = (nextStep: string) => {
    navigate(`/landlord/properties/new/${nextStep}`);
  };

  const handlePublish = () => {
    // Current landlord object
    const landlordObj = Object.values(landlords).find(
      l => l.email.toLowerCase() === currentUser?.email.toLowerCase()
    ) || {
      id: currentUser?.id || 'lnd-new',
      name: currentUser?.name || 'Landlord',
      avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      verified: true,
      memberSince: 'Today',
      totalProperties: 1,
      responseRate: '100%',
      responseTime: '< 15 mins',
      phone: currentUser?.phone || '+250 788 000 000',
      email: currentUser?.email || 'owner@smartrent.rw',
      bio: 'Verified Rwandan property owner listing directly with 0% broker fee.'
    };

    createProperty({
      title: formData.title || `${formData.bedrooms}-Bedroom ${formData.propertyType} in ${formData.neighborhood || formData.district}`,
      description: formData.description || `Beautiful modern ${formData.propertyType.toLowerCase()} located in ${formData.neighborhood || formData.district}. Equipped with water reserve tank, secure gated perimeter, and ample parking. Direct landlord lease.`,
      propertyType: formData.propertyType,
      district: formData.district,
      neighborhood: formData.neighborhood || 'Kigali Residential Area',
      address: formData.address || 'Street KK 400, Kigali, Rwanda',
      priceRwf: Number(formData.priceRwf),
      period: 'month',
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      areaSqm: Number(formData.areaSqm),
      furnished: formData.furnished,
      availability: 'Available Now',
      featured: true,
      images: formData.images,
      amenities: formData.amenities,
      waterBackup: formData.waterBackup,
      powerBackup: formData.powerBackup,
      securityGuard: formData.securityGuard,
      parkingSpaces: Number(formData.parkingSpaces),
      landlord: landlordObj
    });

    navigate('/landlord/properties/new/published');
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-4xl mx-auto">
      {/* Wizard Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#0E9F6E]">
            100% Free Listing
          </span>
          <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">Zero Commission Guarantee</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
          List a New Rwandan Property
        </h1>
      </div>

      {/* Step Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
        {stepsList.map((s, idx) => {
          const isCurrent = step === s.id;
          const isPast = stepsList.findIndex(item => item.id === step) > idx;
          return (
            <div
              key={s.id}
              className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all ${
                isCurrent
                  ? 'border-[#0E9F6E] bg-emerald-50/60 dark:bg-emerald-950/40 text-[#0E9F6E]'
                  : isPast
                  ? 'border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-[#1C1C1E] dark:text-gray-300'
                  : 'border-transparent text-[#6B7280] dark:text-gray-500'
              }`}
            >
              <div className="truncate">{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Form Steps */}
      <div className="bg-white dark:bg-[#161D2A] p-6 sm:p-8 rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-2xs space-y-6">
        {/* STEP 1: BASIC INFO */}
        {step === 'basic' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#1C1C1E] dark:text-white">
              Step 1: Basic Property Information
            </h3>

            <div>
              <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200 mb-1.5">
                Listing Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Modern Sunlit 3-Bedroom Villa with Garden"
                className="w-full px-3.5 py-2.5 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200 mb-1.5">
                Property Type
              </label>
              <select
                value={formData.propertyType}
                onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as PropertyType })}
                className="w-full px-3.5 py-2.5 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs sm:text-sm"
              >
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Villa">Villa</option>
                <option value="Duplex">Duplex</option>
                <option value="Studio">Studio</option>
                <option value="Room">Room</option>
              </select>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => handleNext('location')}
                className="px-6 py-2.5 bg-[#102A43] hover:bg-[#0d2135] text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                <span>Continue to Location</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: LOCATION */}
        {step === 'location' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#1C1C1E] dark:text-white">
              Step 2: Property Location in Rwanda
            </h3>

            <div>
              <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200 mb-1.5">
                District / Region
              </label>
              <select
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value as RwandaDistrict })}
                className="w-full px-3.5 py-2.5 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs sm:text-sm"
              >
                <option value="Kicukiro (Kigali)">Kicukiro (Kigali)</option>
                <option value="Gasabo (Kigali)">Gasabo (Kigali)</option>
                <option value="Nyarugenge (Kigali)">Nyarugenge (Kigali)</option>
                <option value="Musanze">Musanze (Northern Province)</option>
                <option value="Rubavu (Gisenyi)">Rubavu / Gisenyi (Western Province)</option>
                <option value="Huye (Butare)">Huye / Butare (Southern Province)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200 mb-1.5">
                Neighborhood
              </label>
              <input
                type="text"
                value={formData.neighborhood}
                onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                placeholder="e.g. Niboye, Nyarutarama, Kimihurura, Kagarama"
                className="w-full px-3.5 py-2.5 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200 mb-1.5">
                Street Address / Landmark
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="e.g. KK 314 St, Near Niboye Sector Office"
                className="w-full px-3.5 py-2.5 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs sm:text-sm"
              />
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleNext('basic')}
                className="px-4 py-2 border border-black/10 text-xs font-bold rounded-xl"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => handleNext('pricing')}
                className="px-6 py-2.5 bg-[#102A43] text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                <span>Continue to Pricing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PRICING */}
        {step === 'pricing' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#1C1C1E] dark:text-white">
              Step 3: Rental Rate (Rwandan Francs)
            </h3>

            <div>
              <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200 mb-1.5">
                Monthly Rent (RWF)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step={10000}
                  value={formData.priceRwf}
                  onChange={(e) => setFormData({ ...formData, priceRwf: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-sm font-bold"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#6B7280]">
                  RWF / month
                </span>
              </div>
              <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] mt-1.5">
                Formatted: <strong>{new Intl.NumberFormat('en-RW').format(formData.priceRwf)} RWF</strong>. No commission deductions.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-300">
              <div className="font-bold mb-1">0% Commission Guaranteed</div>
              <p className="text-[11px] leading-relaxed">
                Smart Rent does not deduct fees from rent payments. You receive the full agreed amount directly from the tenant.
              </p>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleNext('location')}
                className="px-4 py-2 border border-black/10 text-xs font-bold rounded-xl"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => handleNext('details')}
                className="px-6 py-2.5 bg-[#102A43] text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                <span>Continue to Specifications</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: SPECS & AMENITIES */}
        {step === 'details' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#1C1C1E] dark:text-white">
              Step 4: Specifications & Rwandan Utilities
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200 mb-1">Bedrooms</label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200 mb-1">Bathrooms</label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200 mb-1">Living Area (m²)</label>
                <input
                  type="number"
                  min={20}
                  max={1000}
                  value={formData.areaSqm}
                  onChange={(e) => setFormData({ ...formData, areaSqm: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200 mb-1.5">
                Furnishing Level
              </label>
              <select
                value={formData.furnished}
                onChange={(e) => setFormData({ ...formData, furnished: e.target.value as any })}
                className="w-full px-3.5 py-2 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs"
              >
                <option value="Fully Furnished">Fully Furnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>
            </div>

            <div className="space-y-2 pt-2">
              <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200">
                Key Rwandan Living Infrastructure
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="flex items-center gap-2 p-3 rounded-xl border border-black/10 dark:border-white/10 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.waterBackup}
                    onChange={(e) => setFormData({ ...formData, waterBackup: e.target.checked })}
                    className="w-4 h-4 rounded text-[#0E9F6E]"
                  />
                  <span className="text-xs font-medium">Water Reserve Tank (5kL)</span>
                </label>
                <label className="flex items-center gap-2 p-3 rounded-xl border border-black/10 dark:border-white/10 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.powerBackup}
                    onChange={(e) => setFormData({ ...formData, powerBackup: e.target.checked })}
                    className="w-4 h-4 rounded text-[#0E9F6E]"
                  />
                  <span className="text-xs font-medium">Backup Generator / Solar</span>
                </label>
                <label className="flex items-center gap-2 p-3 rounded-xl border border-black/10 dark:border-white/10 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.securityGuard}
                    onChange={(e) => setFormData({ ...formData, securityGuard: e.target.checked })}
                    className="w-4 h-4 rounded text-[#0E9F6E]"
                  />
                  <span className="text-xs font-medium">24/7 Security Guard</span>
                </label>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleNext('pricing')}
                className="px-4 py-2 border border-black/10 text-xs font-bold rounded-xl"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => handleNext('photos')}
                className="px-6 py-2.5 bg-[#102A43] text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                <span>Continue to Photos</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: PHOTOS */}
        {step === 'photos' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#1C1C1E] dark:text-white">
              Step 5: Multiple Property Photos
            </h3>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
              Upload crisp, sunlit photos of your Rwandan property. High resolution photos receive 3x more direct tenant inquiries.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {formData.images.map((img, i) => (
                <div key={i} className="relative rounded-2xl overflow-hidden aspect-4/3 group">
                  <img src={img} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-[#102A43]/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {i === 0 ? 'Main Photo' : `Photo ${i + 1}`}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl border-2 border-dashed border-black/15 dark:border-white/15 text-center space-y-2">
              <UploadCloud className="w-8 h-8 text-[#0E9F6E] mx-auto" />
              <div className="text-xs font-bold text-[#1C1C1E] dark:text-white">Upload more images</div>
              <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">
                JPG, PNG up to 10MB each. Verified real photography only.
              </p>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleNext('details')}
                className="px-4 py-2 border border-black/10 text-xs font-bold rounded-xl"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => handleNext('review')}
                className="px-6 py-2.5 bg-[#102A43] text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                <span>Continue to Review</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: REVIEW */}
        {step === 'review' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#1C1C1E] dark:text-white">
                Step 6: Review & Confirmation
              </h3>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                Review all details before publishing free to the marketplace.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAFAF8] dark:bg-[#111722] border border-black/[0.06] dark:border-white/[0.06] space-y-3 text-xs">
              <div className="flex justify-between border-b pb-2 dark:border-white/10">
                <span className="text-[#6B7280]">Title:</span>
                <span className="font-bold text-[#1C1C1E] dark:text-white">{formData.title || 'Modern Residence'}</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-white/10">
                <span className="text-[#6B7280]">Location:</span>
                <span className="font-bold text-[#1C1C1E] dark:text-white">{formData.neighborhood}, {formData.district}</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-white/10">
                <span className="text-[#6B7280]">Rent:</span>
                <span className="font-bold text-[#0E9F6E]">{new Intl.NumberFormat('en-RW').format(formData.priceRwf)} RWF / mo</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-white/10">
                <span className="text-[#6B7280]">Type & Specs:</span>
                <span className="font-bold text-[#1C1C1E] dark:text-white">{formData.bedrooms} Bed · {formData.bathrooms} Bath · {formData.propertyType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Platform Listing Fee:</span>
                <span className="font-bold text-[#0E9F6E] uppercase">0 RWF (Free Forever)</span>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleNext('photos')}
                className="px-4 py-2 border border-black/10 text-xs font-bold rounded-xl"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handlePublish}
                className="px-8 py-3 bg-[#0E9F6E] hover:bg-[#0b8058] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Publish Listing Free Now</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 7: PUBLISHED */}
        {step === 'published' && (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-[#0E9F6E] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-[#1C1C1E] dark:text-white">
              Property Successfully Published!
            </h2>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] max-w-md mx-auto">
              Your property is now live on Smart Rent Rwanda with zero broker commission. Verified prospective tenants can now submit rental applications.
            </p>
            <div className="pt-4 flex items-center justify-center gap-3">
              <Link
                to="/landlord/properties"
                className="px-6 py-2.5 bg-[#102A43] hover:bg-[#0d2135] text-white text-xs font-bold rounded-xl"
              >
                Go to My Properties
              </Link>
              <Link
                to="/explore"
                className="px-6 py-2.5 bg-[#F4F5F7] dark:bg-white/10 hover:bg-black/5 text-[#1C1C1E] dark:text-white text-xs font-bold rounded-xl"
              >
                View on Marketplace
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
