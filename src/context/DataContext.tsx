import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property, RentalRequest, Conversation, Landlord, UserProfile } from '../types';
import { INITIAL_PROPERTIES, INITIAL_CONVERSATIONS, INITIAL_REQUESTS, LANDLORDS } from '../data/mockData';

export interface ReportItem {
  id: string;
  targetType: 'property' | 'landlord' | 'user';
  targetId: string;
  targetTitle: string;
  reason: string;
  details: string;
  reporterName: string;
  reporterEmail: string;
  status: 'Pending' | 'Resolved' | 'Dismissed';
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'request' | 'message' | 'system' | 'approval';
  read: boolean;
  createdAt: string;
  link?: string;
}

interface DataContextType {
  properties: Property[];
  landlords: Record<string, Landlord>;
  rentalRequests: RentalRequest[];
  conversations: Conversation[];
  savedPropertyIds: string[];
  reports: ReportItem[];
  notifications: NotificationItem[];
  platformNotice: { text: string; enabled: boolean };
  // Actions
  toggleSaveProperty: (id: string) => void;
  isPropertySaved: (id: string) => boolean;
  createProperty: (newProp: Omit<Property, 'id' | 'createdAt' | 'viewsCount'>) => Property;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  togglePropertyAvailability: (id: string) => void;
  togglePropertyFeatured: (id: string) => void;
  createRentalRequest: (requestData: Omit<RentalRequest, 'id' | 'createdAt' | 'status'>) => RentalRequest;
  updateRentalRequestStatus: (id: string, status: 'Pending' | 'Approved' | 'Declined') => void;
  cancelRentalRequest: (id: string) => void;
  sendMessage: (conversationId: string, text: string, sender: UserProfile) => void;
  startConversation: (property: Property, initialMessage: string, sender: UserProfile) => Conversation;
  toggleLandlordVerification: (landlordId: string) => void;
  createReport: (report: Omit<ReportItem, 'id' | 'createdAt' | 'status'>) => void;
  updateReportStatus: (id: string, status: 'Pending' | 'Resolved' | 'Dismissed') => void;
  updatePlatformNotice: (text: string, enabled: boolean) => void;
  markNotificationAsRead: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const saved = localStorage.getItem('smartrent_properties');
      return saved ? JSON.parse(saved) : INITIAL_PROPERTIES;
    } catch {
      return INITIAL_PROPERTIES;
    }
  });

  const [landlords, setLandlords] = useState<Record<string, Landlord>>(() => {
    try {
      const saved = localStorage.getItem('smartrent_landlords');
      return saved ? JSON.parse(saved) : LANDLORDS;
    } catch {
      return LANDLORDS;
    }
  });

  const [rentalRequests, setRentalRequests] = useState<RentalRequest[]>(() => {
    try {
      const saved = localStorage.getItem('smartrent_requests');
      return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
    } catch {
      return INITIAL_REQUESTS;
    }
  });

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    try {
      const saved = localStorage.getItem('smartrent_conversations');
      return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
    } catch {
      return INITIAL_CONVERSATIONS;
    }
  });

  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('smartrent_saved');
      return saved ? JSON.parse(saved) : ['prop-1'];
    } catch {
      return ['prop-1'];
    }
  });

  const [reports, setReports] = useState<ReportItem[]>(() => {
    try {
      const saved = localStorage.getItem('smartrent_reports');
      return saved ? JSON.parse(saved) : [
        {
          id: 'rep-1',
          targetType: 'property',
          targetId: 'prop-1',
          targetTitle: 'Modern 2-Bedroom Sunlit Apartment',
          reason: 'Information check',
          details: 'User requested verification of recent rent adjustments.',
          reporterName: 'David K.',
          reporterEmail: 'david.k@example.com',
          status: 'Pending',
          createdAt: '2026-09-24'
        }
      ];
    } catch {
      return [];
    }
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('smartrent_notifications');
      return saved ? JSON.parse(saved) : [
        {
          id: 'notif-1',
          userId: 'usr-tenant-1',
          title: 'Welcome to Smart Rent',
          message: 'Browse 100% verified homes in Rwanda with zero broker fees.',
          type: 'system',
          read: false,
          createdAt: 'Just now',
          link: '/explore'
        },
        {
          id: 'notif-2',
          userId: 'usr-landlord-1',
          title: 'New Rental Application',
          message: 'Kenny Mugabo submitted a rental request for Modern 2-Bedroom Sunlit Apartment.',
          type: 'request',
          read: false,
          createdAt: 'Yesterday',
          link: '/landlord/requests'
        }
      ];
    } catch {
      return [];
    }
  });

  const [platformNotice, setPlatformNotice] = useState<{ text: string; enabled: boolean }>(() => {
    try {
      const saved = localStorage.getItem('smartrent_notice');
      return saved ? JSON.parse(saved) : {
        text: '🇷🇼 Rwanda Zero-Broker-Fee Direct Rental Guarantee — Free listing for landlords and 100% direct agreements.',
        enabled: true
      };
    } catch {
      return {
        text: '🇷🇼 Rwanda Zero-Broker-Fee Direct Rental Guarantee — Free listing for landlords and 100% direct agreements.',
        enabled: true
      };
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('smartrent_properties', JSON.stringify(properties));
    } catch (e) {
      console.error(e);
    }
  }, [properties]);

  useEffect(() => {
    try {
      localStorage.setItem('smartrent_landlords', JSON.stringify(landlords));
    } catch (e) {
      console.error(e);
    }
  }, [landlords]);

  useEffect(() => {
    try {
      localStorage.setItem('smartrent_requests', JSON.stringify(rentalRequests));
    } catch (e) {
      console.error(e);
    }
  }, [rentalRequests]);

  useEffect(() => {
    try {
      localStorage.setItem('smartrent_conversations', JSON.stringify(conversations));
    } catch (e) {
      console.error(e);
    }
  }, [conversations]);

  useEffect(() => {
    try {
      localStorage.setItem('smartrent_saved', JSON.stringify(savedPropertyIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedPropertyIds]);

  useEffect(() => {
    try {
      localStorage.setItem('smartrent_reports', JSON.stringify(reports));
    } catch (e) {
      console.error(e);
    }
  }, [reports]);

  useEffect(() => {
    try {
      localStorage.setItem('smartrent_notifications', JSON.stringify(notifications));
    } catch (e) {
      console.error(e);
    }
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem('smartrent_notice', JSON.stringify(platformNotice));
    } catch (e) {
      console.error(e);
    }
  }, [platformNotice]);

  const toggleSaveProperty = (id: string) => {
    setSavedPropertyIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isPropertySaved = (id: string) => savedPropertyIds.includes(id);

  const createProperty = (newPropData: Omit<Property, 'id' | 'createdAt' | 'viewsCount'>): Property => {
    const newProperty: Property = {
      ...newPropData,
      id: `prop-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      viewsCount: 1
    };
    setProperties((prev) => [newProperty, ...prev]);
    return newProperty;
  };

  const updateProperty = (id: string, updates: Partial<Property>) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProperty = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  const togglePropertyAvailability = (id: string) => {
    setProperties((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const nextStatus = p.availability === 'Available Now' ? 'Rented' : 'Available Now';
        return { ...p, availability: nextStatus };
      })
    );
  };

  const togglePropertyFeatured = (id: string) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
  };

  const createRentalRequest = (requestData: Omit<RentalRequest, 'id' | 'createdAt' | 'status'>): RentalRequest => {
    const newRequest: RentalRequest = {
      ...requestData,
      id: `req-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };
    setRentalRequests((prev) => [newRequest, ...prev]);

    // Also add notification for landlord
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        userId: 'landlord',
        title: 'New Rental Request Received',
        message: `${requestData.tenantName} requested to rent "${requestData.propertyTitle}"`,
        type: 'request',
        read: false,
        createdAt: 'Just now',
        link: `/landlord/requests/${newRequest.id}`
      },
      ...prev
    ]);

    return newRequest;
  };

  const updateRentalRequestStatus = (id: string, status: 'Pending' | 'Approved' | 'Declined') => {
    setRentalRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const cancelRentalRequest = (id: string) => {
    setRentalRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const sendMessage = (conversationId: string, text: string, sender: UserProfile) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: sender.id,
      senderName: sender.name,
      senderRole: sender.role,
      text,
      timestamp: 'Just now',
      read: true
    };

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id !== conversationId) return conv;
        return {
          ...conv,
          lastMessage: text,
          lastMessageTime: 'Just now',
          messages: [...conv.messages, newMessage]
        };
      })
    );
  };

  const startConversation = (property: Property, initialMessage: string, sender: UserProfile): Conversation => {
    // Check if conversation already exists for this property
    const existing = conversations.find((c) => c.propertyId === property.id);
    if (existing) {
      if (initialMessage) {
        sendMessage(existing.id, initialMessage, sender);
      }
      return existing;
    }

    const newConv: Conversation = {
      id: `conv-${Date.now()}`,
      propertyId: property.id,
      propertyTitle: property.title,
      propertyPrice: property.priceRwf,
      propertyImage: property.images[0],
      landlord: property.landlord,
      tenantName: sender.name,
      lastMessage: initialMessage,
      lastMessageTime: 'Just now',
      unreadCount: 0,
      messages: [
        {
          id: `msg-${Date.now()}`,
          senderId: sender.id,
          senderName: sender.name,
          senderRole: sender.role,
          text: initialMessage,
          timestamp: 'Just now',
          read: true
        }
      ]
    };

    setConversations((prev) => [newConv, ...prev]);
    return newConv;
  };

  const toggleLandlordVerification = (landlordId: string) => {
    setLandlords((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((key) => {
        if (next[key].id === landlordId) {
          next[key] = { ...next[key], verified: !next[key].verified };
        }
      });
      return next;
    });
  };

  const createReport = (report: Omit<ReportItem, 'id' | 'createdAt' | 'status'>) => {
    const newReport: ReportItem = {
      ...report,
      id: `rep-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };
    setReports((prev) => [newReport, ...prev]);
  };

  const updateReportStatus = (id: string, status: 'Pending' | 'Resolved' | 'Dismissed') => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const updatePlatformNotice = (text: string, enabled: boolean) => {
    setPlatformNotice({ text, enabled });
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <DataContext.Provider
      value={{
        properties,
        landlords,
        rentalRequests,
        conversations,
        savedPropertyIds,
        reports,
        notifications,
        platformNotice,
        toggleSaveProperty,
        isPropertySaved,
        createProperty,
        updateProperty,
        deleteProperty,
        togglePropertyAvailability,
        togglePropertyFeatured,
        createRentalRequest,
        updateRentalRequestStatus,
        cancelRentalRequest,
        sendMessage,
        startConversation,
        toggleLandlordVerification,
        createReport,
        updateReportStatus,
        updatePlatformNotice,
        markNotificationAsRead
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
