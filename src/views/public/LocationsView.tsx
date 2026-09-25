import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { PropertyCard } from '../../components/PropertyCard';
import { MapPin, ArrowRight, Building2, Compass, ShieldCheck } from 'lucide-react';
import { RwandaDistrict } from '../../types';

export const LocationsView: React.FC = () => {
  const { location } = useParams<{ location?: string }>();
  const { properties, toggleSaveProperty, isPropertySaved } = useData();

  const locationsList: { name: RwandaDistrict; label: string; count: number; desc: string }[] = [
    {
      name: 'Kicukiro (Kigali)',
      label: 'Kicukiro, Kigali',
      count: properties.filter(p => p.district === 'Kicukiro (Kigali)').length,
      desc: 'Niboye, Kagarama, and Kanombe — popular for families, calm residential avenues, and quick airport access.'
    },
    {
      name: 'Gasabo (Kigali)',
      label: 'Gasabo, Kigali',
      count: properties.filter(p => p.district === 'Gasabo (Kigali)').length,
      desc: 'Nyarutarama, Kimihurura, and Gacuriro — prime diplomatic villas, luxury apartments, and top embassies.'
    },
    {
      name: 'Nyarugenge (Kigali)',
      label: 'Nyarugenge, Kigali',
      count: properties.filter(p => p.district === 'Nyarugenge (Kigali)').length,
      desc: 'Kiyovu, Nyamirambo, and CBD — rich cultural heritage, financial hub, and panoramic hilltop vistas.'
    },
    {
      name: 'Musanze',
      label: 'Musanze, Northern Province',
      count: properties.filter(p => p.district === 'Musanze').length,
      desc: 'Foothills of the Virunga Volcanoes — stone chalets, eco-lodges, and cool highland mountain weather.'
    },
    {
      name: 'Rubavu (Gisenyi)',
      label: 'Rubavu, Western Province',
      count: properties.filter(p => p.district === 'Rubavu (Gisenyi)').length,
      desc: 'Lake Kivu shoreline — lakeside residences, holiday retreats, and pleasant resort ambiance.'
    }
  ];

  // If a location parameter is passed, show filtered properties for that district
  if (location) {
    const decoded = decodeURIComponent(location);
    const matchedDistrict = locationsList.find(
      l => l.name.toLowerCase().includes(decoded.toLowerCase()) || l.label.toLowerCase().includes(decoded.toLowerCase())
    );

    const districtProperties = properties.filter(
      p => p.district.toLowerCase().includes(decoded.toLowerCase()) ||
           (matchedDistrict && p.district === matchedDistrict.name)
    );

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 space-y-8">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#6B7280] dark:text-[#9CA3AF] mb-2">
            <Link to="/locations" className="hover:underline">Locations</Link>
            <span>/</span>
            <span className="text-[#102A43] dark:text-emerald-400 font-semibold">{matchedDistrict?.label || decoded}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
            Properties in {matchedDistrict?.label || decoded}
          </h1>
          <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1.5 max-w-2xl">
            {matchedDistrict?.desc || `Explore verified direct homes available for rent in ${decoded}, Rwanda.`}
          </p>
        </div>

        {districtProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {districtProperties.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                isSaved={isPropertySaved(property.id)}
                onToggleSave={toggleSaveProperty}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-[#161D2A] rounded-3xl p-12 text-center border border-black/[0.06] dark:border-white/[0.08] space-y-3">
            <MapPin className="w-8 h-8 text-[#6B7280] dark:text-gray-400 mx-auto" />
            <h3 className="text-base font-bold text-[#1C1C1E] dark:text-white">
              No current listings in this area
            </h3>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
              Check back soon or explore all properties across Kigali.
            </p>
            <div className="pt-2">
              <Link to="/explore" className="px-5 py-2.5 bg-[#102A43] text-white text-xs font-bold rounded-xl inline-block">
                View All Properties
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }

  // All Locations Overview
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 space-y-12">
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0E9F6E]">
          Rwanda Geographic Coverage
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
          Explore Rwandan Neighborhoods & Districts
        </h1>
        <p className="text-sm sm:text-base text-[#6B7280] dark:text-[#9CA3AF]">
          Discover residential communities across Kigali and provincial hubs. All verified with direct landlord contact.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locationsList.map((loc) => (
          <Link
            key={loc.name}
            to={`/locations/${encodeURIComponent(loc.name)}`}
            className="group bg-white dark:bg-[#161D2A] p-6 rounded-3xl border border-black/[0.06] dark:border-white/[0.08] hover:border-[#102A43] dark:hover:border-emerald-500 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-[#0E9F6E] flex items-center justify-center font-bold">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10 text-[#1C1C1E] dark:text-white">
                  {loc.count} {loc.count === 1 ? 'Home' : 'Homes'}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#1C1C1E] dark:text-white group-hover:text-[#0E9F6E] transition-colors mb-2">
                {loc.label}
              </h3>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                {loc.desc}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between text-xs font-bold text-[#102A43] dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>View Homes</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
