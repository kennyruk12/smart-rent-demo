import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { ExploreView } from '../ExploreView';
import { Property, SearchFilterState } from '../../types';

export const ExplorePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { properties, savedPropertyIds, toggleSaveProperty } = useData();
  const { currentUser } = useAuth();

  const [filters, setFilters] = useState<SearchFilterState>({
    searchQuery: searchParams.get('q') || '',
    district: searchParams.get('district') || '',
    propertyType: searchParams.get('type') || '',
    minPrice: 0,
    maxPrice: 3000000,
    bedrooms: 'Any',
    bathrooms: 'Any',
    furnished: 'Any',
    amenities: [],
    availabilityOnly: false,
    sortBy: 'recommended'
  });

  const handleFilterChange = (updated: Partial<SearchFilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      district: '',
      propertyType: '',
      minPrice: 0,
      maxPrice: 3000000,
      bedrooms: 'Any',
      bathrooms: 'Any',
      furnished: 'Any',
      amenities: [],
      availabilityOnly: false,
      sortBy: 'recommended'
    });
  };

  const handleToggleSave = (id: string) => {
    if (!currentUser) {
      navigate(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    toggleSaveProperty(id);
  };

  const handleSelectProperty = (property: Property) => {
    navigate(`/properties/${property.id}`);
  };

  return (
    <ExploreView
      properties={properties}
      filters={filters}
      onFilterChange={handleFilterChange}
      onResetFilters={handleResetFilters}
      savedPropertyIds={savedPropertyIds}
      onToggleSave={handleToggleSave}
      onSelectProperty={handleSelectProperty}
    />
  );
};
