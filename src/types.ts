export type PropertyType = 'House' | 'Apartment' | 'Villa' | 'Duplex' | 'Studio' | 'Room';

export type RwandaDistrict = 
  | 'Kicukiro (Kigali)' 
  | 'Gasabo (Kigali)' 
  | 'Nyarugenge (Kigali)' 
  | 'Musanze' 
  | 'Rubavu (Gisenyi)' 
  | 'Huye (Butare)' 
  | 'Muhanga' 
  | 'Rwamagana';

export type AvailabilityStatus = 'Available Now' | 'Available Next Month' | 'Reserved' | 'Rented';

export interface Landlord {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
  memberSince: string;
  totalProperties: number;
  responseRate: string;
  responseTime: string;
  phone: string;
  email: string;
  bio: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  propertyType: PropertyType;
  district: RwandaDistrict;
  neighborhood: string;
  address: string;
  priceRwf: number;
  period: 'month' | 'year';
  bedrooms: number;
  bathrooms: number;
  areaSqm: number;
  furnished: 'Fully Furnished' | 'Semi-Furnished' | 'Unfurnished';
  availability: AvailabilityStatus;
  featured?: boolean;
  images: string[];
  amenities: string[];
  waterBackup: boolean;
  powerBackup: boolean;
  securityGuard: boolean;
  parkingSpaces: number;
  landlord: Landlord;
  createdAt: string;
  viewsCount: number;
}

export interface RentalRequest {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  propertyPrice: number;
  district: string;
  tenantName: string;
  tenantEmail: string;
  tenantPhone: string;
  moveInDate: string;
  leaseDurationMonths: number;
  occupantsCount: number;
  message: string;
  status: 'Pending' | 'Approved' | 'Declined';
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'tenant' | 'landlord' | 'admin';
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyPrice: number;
  propertyImage: string;
  landlord: Landlord;
  tenantName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

export interface SearchFilterState {
  searchQuery: string;
  cityOrProvince?: string;
  district: string;
  neighborhood?: string;
  propertyType: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: string;
  bathrooms: string;
  furnished: string;
  amenities: string[];
  availabilityOnly: boolean;
  waterBackupOnly?: boolean;
  powerBackupOnly?: boolean;
  securityGuardOnly?: boolean;
  verifiedLandlordOnly?: boolean;
  minAreaSqm?: number;
  sortBy: 'recommended' | 'price-asc' | 'price-desc' | 'newest' | 'area-desc';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'tenant' | 'landlord' | 'admin';
  avatar: string;
  verified: boolean;
}
