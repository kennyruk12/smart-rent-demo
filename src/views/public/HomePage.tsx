import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { HomeView } from '../HomeView';
import { Property, SearchFilterState } from '../../types';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { properties, savedPropertyIds, toggleSaveProperty } = useData();
  const { currentUser } = useAuth();

  const handleSelectProperty = (property: Property) => {
    navigate(`/properties/${property.id}`);
  };

  const handleToggleSave = (id: string) => {
    if (!currentUser) {
      navigate(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    toggleSaveProperty(id);
  };

  const handleSearch = (filters: Partial<SearchFilterState>) => {
    navigate(`/explore?q=${encodeURIComponent(filters.searchQuery || '')}&district=${encodeURIComponent(filters.district || 'All')}`);
  };

  const handleSelectLocation = (district: string) => {
    navigate(`/locations/${encodeURIComponent(district)}`);
  };

  const handleOpenCreateProperty = () => {
    if (!currentUser) {
      navigate('/signup/landlord');
    } else if (currentUser.role === 'landlord') {
      navigate('/landlord/properties/new/basic');
    } else {
      navigate('/for-landlords');
    }
  };

  return (
    <HomeView
      featuredProperties={properties}
      savedPropertyIds={savedPropertyIds}
      onToggleSave={handleToggleSave}
      onSelectProperty={handleSelectProperty}
      onSearch={handleSearch}
      onSelectLocation={handleSelectLocation}
      onOpenCreateProperty={handleOpenCreateProperty}
      onExploreAll={() => navigate('/explore')}
      onDeepSearch={() => navigate('/explore')}
    />
  );
};
