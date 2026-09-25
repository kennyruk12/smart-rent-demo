import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { ArrowLeft, Save, CheckCircle2 } from 'lucide-react';
import { RwandaDistrict, PropertyType } from '../../types';

export const LandlordEditPropertyView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { properties, updateProperty } = useData();
  const navigate = useNavigate();

  const property = properties.find((p) => p.id === id);

  const [title, setTitle] = useState(property?.title || '');
  const [priceRwf, setPriceRwf] = useState(property?.priceRwf || 350000);
  const [neighborhood, setNeighborhood] = useState(property?.neighborhood || '');
  const [district, setDistrict] = useState<RwandaDistrict>(property?.district || 'Kicukiro (Kigali)');
  const [bedrooms, setBedrooms] = useState(property?.bedrooms || 2);
  const [bathrooms, setBathrooms] = useState(property?.bathrooms || 2);
  const [areaSqm, setAreaSqm] = useState(property?.areaSqm || 90);
  const [description, setDescription] = useState(property?.description || '');
  const [saved, setSaved] = useState(false);

  if (!property) {
    return <div className="p-8 text-center">Property not found</div>;
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProperty(property.id, {
      title,
      priceRwf: Number(priceRwf),
      neighborhood,
      district,
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      areaSqm: Number(areaSqm),
      description
    });
    setSaved(true);
    setTimeout(() => {
      navigate(`/landlord/properties/${property.id}`);
    }, 1200);
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-3xl mx-auto">
      <div>
        <Link
          to={`/landlord/properties/${property.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#102A43] dark:hover:text-white mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to property management</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
          Edit Listing Details
        </h1>
      </div>

      <div className="bg-white dark:bg-[#161D2A] p-6 sm:p-8 rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-2xs">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs sm:text-sm font-semibold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200 mb-1">
                District
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value as RwandaDistrict)}
                className="w-full px-3.5 py-2.5 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs"
              >
                <option value="Kicukiro (Kigali)">Kicukiro (Kigali)</option>
                <option value="Gasabo (Kigali)">Gasabo (Kigali)</option>
                <option value="Nyarugenge (Kigali)">Nyarugenge (Kigali)</option>
                <option value="Musanze">Musanze</option>
                <option value="Rubavu (Gisenyi)">Rubavu (Gisenyi)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200 mb-1">
                Neighborhood
              </label>
              <input
                type="text"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200 mb-1">
                Monthly Rent (RWF)
              </label>
              <input
                type="number"
                step={10000}
                value={priceRwf}
                onChange={(e) => setPriceRwf(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200 mb-1">
                Bedrooms
              </label>
              <input
                type="number"
                value={bedrooms}
                onChange={(e) => setBedrooms(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200 mb-1">
                Area (m²)
              </label>
              <input
                type="number"
                value={areaSqm}
                onChange={(e) => setAreaSqm(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1C1C1E] dark:text-gray-200 mb-1">
              Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAFAF8] dark:bg-[#111722] text-[#1C1C1E] dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs"
            />
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              className="py-2.5 px-6 bg-[#0E9F6E] hover:bg-[#0b8058] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
            {saved && (
              <span className="text-xs text-[#0E9F6E] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Updated!
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
