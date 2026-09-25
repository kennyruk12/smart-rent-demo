import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Building2, Eye, Trash2, CheckCircle2, Search, Star, Filter } from 'lucide-react';

export const AdminPropertiesView: React.FC = () => {
  const { properties, togglePropertyAvailability, togglePropertyFeatured, deleteProperty } = useData();

  const [search, setSearch] = useState('');
  const [districtFilter, setDistrictFilter] = useState('All');

  const filtered = properties.filter((p) => {
    const matchesSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.neighborhood.toLowerCase().includes(search.toLowerCase()) ||
      p.landlord.name.toLowerCase().includes(search.toLowerCase());
    const matchesDistrict = districtFilter === 'All' || p.district.includes(districtFilter);
    return matchesSearch && matchesDistrict;
  });

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
            All Rwandan Properties ({filtered.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
            Supervise active listings, audit descriptions, and manage featured property flags.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-[#6B7280] dark:text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title, neighborhood, owner..."
              className="pl-9 pr-4 py-2 bg-white dark:bg-[#161D2A] text-[#1C1C1E] dark:text-white text-xs border border-black/10 dark:border-white/10 rounded-xl"
            />
          </div>

          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-[#161D2A] text-[#1C1C1E] dark:text-white text-xs border border-black/10 dark:border-white/10 rounded-xl font-bold"
          >
            <option value="All">All Districts</option>
            <option value="Kicukiro">Kicukiro</option>
            <option value="Gasabo">Gasabo</option>
            <option value="Nyarugenge">Nyarugenge</option>
            <option value="Musanze">Musanze</option>
            <option value="Rubavu">Rubavu</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-[#161D2A] rounded-3xl border border-black/[0.06] dark:border-white/[0.08] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-black/[0.06] dark:border-white/[0.08] bg-[#F4F5F7]/60 dark:bg-white/[0.02] text-[#6B7280] dark:text-gray-400 uppercase tracking-wider text-[10px] font-bold">
                <th className="py-3.5 px-6">Property / Title</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Monthly Rent</th>
                <th className="py-3.5 px-4">Owner</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-center">Featured</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
              {filtered.map((prop) => (
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
                          to={`/admin/properties/${prop.id}`}
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

                  <td className="py-3.5 px-4 font-bold text-[#102A43] dark:text-emerald-400 tabular-nums">
                    {new Intl.NumberFormat('en-RW').format(prop.priceRwf)} RWF
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[#1C1C1E] dark:text-white">{prop.landlord.name}</div>
                    <div className="text-[10px] text-[#6B7280] dark:text-[#9CA3AF]">{prop.landlord.phone}</div>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => togglePropertyAvailability(prop.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                        prop.availability === 'Available Now'
                          ? 'bg-emerald-50 text-[#0E9F6E]'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {prop.availability}
                    </button>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => togglePropertyFeatured(prop.id)}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold cursor-pointer transition-colors ${
                        prop.featured
                          ? 'bg-amber-100 text-amber-900 font-extrabold'
                          : 'bg-black/5 dark:bg-white/10 text-[#6B7280]'
                      }`}
                    >
                      {prop.featured ? '★ Featured' : '☆ Standard'}
                    </button>
                  </td>

                  <td className="py-3.5 px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        to={`/admin/properties/${prop.id}`}
                        className="p-1.5 rounded-lg text-[#6B7280] hover:text-[#102A43] dark:hover:text-white hover:bg-black/5"
                        title="View details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => deleteProperty(prop.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                        title="Delete property"
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
    </div>
  );
};
