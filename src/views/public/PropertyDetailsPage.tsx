import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { PropertyDetailView } from '../PropertyDetailView';

export const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();
  const { properties, savedPropertyIds, toggleSaveProperty, startConversation } = useData();

  const property = properties.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-36 text-center space-y-4">
        <h2 className="text-2xl font-bold">Property Not Found</h2>
        <p className="text-xs text-[#6B7280]">
          The property you are looking for may have been rented or removed.
        </p>
        <button
          onClick={() => navigate('/explore')}
          className="px-6 py-2.5 bg-[#102A43] text-white text-xs font-bold rounded-xl"
        >
          Explore Available Homes
        </button>
      </div>
    );
  }

  const handleToggleSave = (propId: string) => {
    if (!isAuthenticated || !currentUser) {
      navigate(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    toggleSaveProperty(propId);
  };

  const handleRequestRent = () => {
    if (!isAuthenticated || !currentUser) {
      navigate(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    if (currentUser.role === 'tenant') {
      navigate(`/tenant/requests/new?property=${property.id}`);
    } else {
      navigate('/tenant/dashboard');
    }
  };

  const handleContactLandlord = () => {
    if (!isAuthenticated || !currentUser) {
      navigate(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    if (currentUser.role === 'tenant') {
      const conv = startConversation(property, `Hello ${property.landlord.name}, I am interested in renting ${property.title}.`, currentUser);
      navigate(`/tenant/messages/${conv.id}`);
    } else if (currentUser.role === 'landlord') {
      navigate(`/landlord/messages`);
    } else {
      navigate(`/admin/messages`);
    }
  };

  return (
    <PropertyDetailView
      property={property}
      currentUser={currentUser}
      onBack={() => navigate('/explore')}
      isSaved={savedPropertyIds.includes(property.id)}
      onToggleSave={handleToggleSave}
      onRequestRent={handleRequestRent}
      onOpenChat={handleContactLandlord}
    />
  );
};
