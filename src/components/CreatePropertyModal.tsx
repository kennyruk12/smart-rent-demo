import React, { useState } from 'react';
import { Property, RwandaDistrict, PropertyType, Landlord } from '../types';
import { X, ArrowRight, ArrowLeft, Upload, Trash2, Check, Sparkles } from 'lucide-react';
import { 
  heroKigaliVilla, 
  kigaliKicukiroApt, 
  musanzeStoneHome, 
  rubavuKivuVilla, 
  kigaliNyarutaramaResidence 
} from '../data/mockData';

interface CreatePropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (property: Property) => void;
  currentLandlord: Landlord;
}

const PRESET_PHOTOS = [
  { url: kigaliKicukiroApt, label: 'Apartment' },
  { url: heroKigaliVilla, label: 'Villa' },
  { url: musanzeStoneHome, label: 'Stone House' },
  { url: rubavuKivuVilla, label: 'Lakeside' },
  { url: kigaliNyarutaramaResidence, label: 'Duplex' }
];

export const CreatePropertyModal: React.FC<CreatePropertyModalProps> = ({
  isOpen,
  onClose,
  onPublish,
  currentLandlord
}) => {
  const [step, setStep] = useState(1);

  // Form State
  const [title, setTitle] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyType>('Apartment');
  const [district, setDistrict] = useState<RwandaDistrict>('Kicukiro (Kigali)');
  const [neighborhood, setNeighborhood] = useState('Kicukiro Niboye');
  const [address, setAddress] = useState('KK 314 St, Niboye, Kigali');
  const [priceRwf, setPriceRwf] = useState<number>(350000);
  const [bedrooms, setBedrooms] = useState<number>(2);
  const [bathrooms, setBathrooms] = useState<number>(2);
  const [areaSqm, setAreaSqm] = useState<number>(85);
  const [furnished, setFurnished] = useState<'Fully Furnished' | 'Semi-Furnished' | 'Unfurnished'>('Fully Furnished');
  const [description, setDescription] = useState(
    'A tranquil, light-filled residence with scenic views of Mont Kigali, solar water heating, and steady water reserves.'
  );
  const [images, setImages] = useState<string[]>([kigaliKicukiroApt, heroKigaliVilla]);

  if (!isOpen) return null;

  const handlePublish = () => {
    const newProperty: Property = {
      id: `prop-${Date.now()}`,
      title: title || `Modern ${propertyType} in ${neighborhood}`,
      description,
      propertyType,
      district,
      neighborhood: neighborhood || 'Kigali',
      address,
      priceRwf: Number(priceRwf) || 350000,
      period: 'month',
      bedrooms: Number(bedrooms) || 1,
      bathrooms: Number(bathrooms) || 1,
      areaSqm: Number(areaSqm) || 75,
      furnished,
      availability: 'Available Now',
      featured: false,
      images: images.length > 0 ? images : [kigaliKicukiroApt],
      amenities: ['High-speed Fiber Wi-Fi', 'Water Reservoir', '24/7 Security Guard', 'Solar Water Heater'],
      waterBackup: true,
      powerBackup: true,
      securityGuard: true,
      parkingSpaces: 1,
      landlord: currentLandlord,
      createdAt: new Date().toISOString().split('T')[0],
      viewsCount: 1
    };
    onPublish(newProperty);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#FAFAF8] rounded-3xl max-w-2xl w-full p-8 sm:p-12 shadow-2xl relative my-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-black/[0.04] hover:bg-black/[0.08] text-[#1C1C1E] flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Minimalist Progress Indicator */}
        <div className="flex items-center gap-1.5 mb-8">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                s <= step ? 'bg-[#102A43]' : 'bg-black/[0.08]'
              }`}
            />
          ))}
        </div>

        {/* STEP 1: Tell us about your property */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#0E9F6E]">Step 1 of 5</span>
              <h2 className="text-3xl font-bold tracking-tight text-[#1C1C1E] mt-1">
                Tell us about your property
              </h2>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6B7280] mb-2">Title</label>
              <input
                type="text"
                placeholder="e.g. Modern Hillside Residence"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white rounded-2xl px-5 py-3.5 text-sm text-[#1C1C1E] border border-black/[0.08] focus:outline-none focus:ring-2 focus:ring-[#102A43]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6B7280] mb-2">Category</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Apartment', 'House', 'Villa', 'Duplex', 'Studio', 'Room'] as PropertyType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setPropertyType(type)}
                    className={`py-3 px-4 rounded-2xl text-xs font-semibold text-center transition-all cursor-pointer ${
                      propertyType === type
                        ? 'bg-[#102A43] text-white shadow-xs'
                        : 'bg-white text-[#1C1C1E] border border-black/[0.08] hover:bg-black/[0.02]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Where is it? */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#0E9F6E]">Step 2 of 5</span>
              <h2 className="text-3xl font-bold tracking-tight text-[#1C1C1E] mt-1">
                Where is it located?
              </h2>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6B7280] mb-2">District / Province</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value as RwandaDistrict)}
                className="w-full bg-white rounded-2xl px-5 py-3.5 text-sm font-medium text-[#1C1C1E] border border-black/[0.08] focus:outline-none focus:ring-2 focus:ring-[#102A43]"
              >
                <option value="Kicukiro (Kigali)">Kigali · Kicukiro</option>
                <option value="Gasabo (Kigali)">Kigali · Gasabo</option>
                <option value="Nyarugenge (Kigali)">Kigali · Nyarugenge</option>
                <option value="Musanze">Musanze</option>
                <option value="Rubavu (Gisenyi)">Rubavu · Lake Kivu</option>
                <option value="Huye (Butare)">Huye</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6B7280] mb-2">Neighborhood / Sector</label>
              <input
                type="text"
                placeholder="e.g. Niboye, Nyarutarama, Kimihurura..."
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full bg-white rounded-2xl px-5 py-3.5 text-sm text-[#1C1C1E] border border-black/[0.08] focus:outline-none focus:ring-2 focus:ring-[#102A43]"
              />
            </div>
          </div>
        )}

        {/* STEP 3: What does it cost? */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#0E9F6E]">Step 3 of 5</span>
              <h2 className="text-3xl font-bold tracking-tight text-[#1C1C1E] mt-1">
                What does it cost?
              </h2>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6B7280] mb-2">Monthly Rent (RWF)</label>
              <div className="relative">
                <input
                  type="number"
                  step="10000"
                  value={priceRwf}
                  onChange={(e) => setPriceRwf(Number(e.target.value))}
                  className="w-full bg-white rounded-2xl px-5 py-4 text-2xl font-bold text-[#102A43] border border-black/[0.08] focus:outline-none focus:ring-2 focus:ring-[#102A43] tabular-nums"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-medium text-[#6B7280]">
                  RWF / month
                </span>
              </div>
              <p className="text-xs text-[#0E9F6E] font-medium mt-2">
                100% Free on Smart Rent. Zero broker commissions.
              </p>
            </div>
          </div>
        )}

        {/* STEP 4: Show people what it looks like */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#0E9F6E]">Step 4 of 5</span>
              <h2 className="text-3xl font-bold tracking-tight text-[#1C1C1E] mt-1">
                Show people what it looks like
              </h2>
            </div>

            <div>
              <div className="text-xs font-semibold text-[#6B7280] mb-2">Sample Rwandan Home Photos</div>
              <div className="grid grid-cols-3 gap-2">
                {PRESET_PHOTOS.map((p, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      if (!images.includes(p.url)) setImages([...images, p.url]);
                    }}
                    className="relative aspect-[16/10] rounded-xl overflow-hidden cursor-pointer group"
                  >
                    <img src={p.url} alt={p.label} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-[11px] font-medium">
                      + {p.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto py-2">
              {images.map((img, idx) => (
                <div key={idx} className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 group">
                  <img src={img} alt="chosen" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  <button
                    onClick={() => setImages(images.filter((_, i) => i !== idx))}
                    className="absolute top-1 right-1 p-1 bg-black/60 rounded text-white hover:text-rose-400"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: Review your listing */}
        {step === 5 && (
          <div className="space-y-6 text-center py-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1C1E]">
              Ready to find your next tenant?
            </h2>
            <p className="text-sm text-[#6B7280] max-w-md mx-auto">
              Your property will be published to the Smart Rent marketplace for free. Verified tenants can message you directly.
            </p>

            <div className="p-5 bg-white rounded-2xl border border-black/[0.06] max-w-sm mx-auto text-left text-xs space-y-1.5">
              <div className="font-bold text-[#1C1C1E]">{title || `Modern ${propertyType}`}</div>
              <div className="text-[#6B7280]">{district} · {neighborhood}</div>
              <div className="text-sm font-bold text-[#102A43] tabular-nums pt-1">
                {new Intl.NumberFormat('en-RW').format(priceRwf)} RWF / mo
              </div>
            </div>
          </div>
        )}

        {/* Bottom Flow Navigation */}
        <div className="flex items-center justify-between pt-8 mt-8 border-t border-black/[0.06]">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#6B7280] hover:text-[#1C1C1E] flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-3 rounded-full bg-[#102A43] hover:bg-[#0d2135] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handlePublish}
              className="px-7 py-3 rounded-full bg-[#0E9F6E] hover:bg-[#0c8a5f] text-white text-xs font-bold cursor-pointer shadow-md transition-transform active:scale-98"
            >
              Publish for FREE
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
