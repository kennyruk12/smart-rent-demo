import { Property, Landlord, Conversation, RentalRequest, RwandaDistrict } from '../types';

// Real high-fidelity generated images
import heroKigaliVilla from '../assets/images/hero_kigali_villa_1790260303083.jpg';
import kigaliKicukiroApt from '../assets/images/kigali_kicukiro_apt_1790260315652.jpg';
import musanzeStoneHome from '../assets/images/musanze_stone_home_1790260326296.jpg';
import rubavuKivuVilla from '../assets/images/rubavu_kivu_villa_1790260336658.jpg';
import kigaliNyarutaramaResidence from '../assets/images/kigali_nyarutarama_residence_1790260347015.jpg';

export { heroKigaliVilla, kigaliKicukiroApt, musanzeStoneHome, rubavuKivuVilla, kigaliNyarutaramaResidence };

export const LANDLORDS: Record<string, Landlord> = {
  jeanPaul: {
    id: 'lnd-1',
    name: 'Jean-Paul Habimana',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    verified: true,
    memberSince: 'March 2023',
    totalProperties: 4,
    responseRate: '98%',
    responseTime: '< 15 mins',
    phone: '+250 788 123 456',
    email: 'jp.habimana@smartrent.rw',
    bio: 'Property owner and developer based in Kigali with 8+ years managing modern apartments in Kicukiro and Nyarutarama.'
  },
  divineUwase: {
    id: 'lnd-2',
    name: 'Divine Uwase',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    verified: true,
    memberSince: 'November 2022',
    totalProperties: 3,
    responseRate: '100%',
    responseTime: '< 5 mins',
    phone: '+250 783 987 654',
    email: 'divine.uwase@smartrent.rw',
    bio: 'Hospitality professional offering clean, serviced lakeside properties and tranquil holiday villas.'
  },
  patrickMugabo: {
    id: 'lnd-3',
    name: 'Patrick Mugabo',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    verified: true,
    memberSince: 'January 2024',
    totalProperties: 2,
    responseRate: '95%',
    responseTime: '< 30 mins',
    phone: '+250 785 456 789',
    email: 'patrick.mugabo@smartrent.rw',
    bio: 'Civil engineer focused on climate-resilient, energy-efficient mountain homes in Northern Province.'
  },
  sandrineMutoni: {
    id: 'lnd-4',
    name: 'Sandrine Mutoni',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    verified: false,
    memberSince: 'August 2024',
    totalProperties: 1,
    responseRate: '88%',
    responseTime: '< 1 hour',
    phone: '+250 782 111 222',
    email: 'sandrine.m@smartrent.rw',
    bio: 'New host renting out a bright renovated apartment close to Kigali city centre and university campus.'
  }
};

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'Modern 2-Bedroom Sunlit Apartment',
    description: 'Crisp, contemporary 2-bedroom apartment situated in the high-demand residential neighborhood of Kicukiro Niboye. Features high ceilings, private balcony with unblocked views of Mont Kigali, solar water heating, and modern open-plan kitchen with granite counters. Comes with dedicated parking and 24/7 security guard.',
    propertyType: 'Apartment',
    district: 'Kicukiro (Kigali)',
    neighborhood: 'Niboye',
    address: 'KK 314 St, Niboye, Kicukiro, Kigali',
    priceRwf: 350000,
    period: 'month',
    bedrooms: 2,
    bathrooms: 2,
    areaSqm: 95,
    furnished: 'Semi-Furnished',
    availability: 'Available Now',
    featured: true,
    images: [
      kigaliKicukiroApt,
      heroKigaliVilla,
      kigaliNyarutaramaResidence
    ],
    amenities: [
      'High-speed Fiber Wi-Fi',
      'Water Reservoir (5,000L)',
      'Solar Water Heater',
      'Dedicated Gated Parking',
      '24/7 Security Guard',
      'Balcony with Scenic View',
      'Cashpower Meter Installed'
    ],
    waterBackup: true,
    powerBackup: true,
    securityGuard: true,
    parkingSpaces: 1,
    landlord: LANDLORDS.jeanPaul,
    createdAt: '2026-09-18',
    viewsCount: 342
  },
  {
    id: 'prop-2',
    title: 'Luxury 4-Bedroom Garden Villa in Nyarutarama',
    description: 'Architectural masterpiece in Kigali’s most prestigious embassy quarter. This expansive family residence features an open-concept living pavilion, manicured tropical gardens, private paved driveway, self-contained staff quarters, and backup generator. Walk to Kigali Golf Club and green walking paths.',
    propertyType: 'Villa',
    district: 'Gasabo (Kigali)',
    neighborhood: 'Nyarutarama',
    address: 'KG 9 Ave, Nyarutarama, Gasabo, Kigali',
    priceRwf: 1200000,
    period: 'month',
    bedrooms: 4,
    bathrooms: 4,
    areaSqm: 260,
    furnished: 'Fully Furnished',
    availability: 'Available Now',
    featured: true,
    images: [
      heroKigaliVilla,
      kigaliNyarutaramaResidence,
      kigaliKicukiroApt
    ],
    amenities: [
      'Private Landscaped Lawn',
      'Automated Security Gate',
      'Automatic Backup Generator',
      '10,000L Underground Water Tank',
      'Fiber Optic Ready',
      'Staff Quarters with Bath',
      'Covered Carport (3 cars)'
    ],
    waterBackup: true,
    powerBackup: true,
    securityGuard: true,
    parkingSpaces: 3,
    landlord: LANDLORDS.jeanPaul,
    createdAt: '2026-09-12',
    viewsCount: 684
  },
  {
    id: 'prop-3',
    title: 'Panoramic Lakeside Residence on Lake Kivu',
    description: 'Serene lakeside haven in Rubavu (Gisenyi) with direct vista over Lake Kivu. Includes expansive wooden sun terrace, breezy open dining area, tropical acacia trees, and cool evening lake breezes. Ideal for remote professionals or families seeking relaxed lakefront living.',
    propertyType: 'House',
    district: 'Rubavu (Gisenyi)',
    neighborhood: 'Gisenyi Waterfront',
    address: 'Lake Kivu Road, Rubavu, Western Province',
    priceRwf: 600000,
    period: 'month',
    bedrooms: 3,
    bathrooms: 2,
    areaSqm: 180,
    furnished: 'Fully Furnished',
    availability: 'Available Now',
    featured: true,
    images: [
      rubavuKivuVilla,
      heroKigaliVilla
    ],
    amenities: [
      'Direct Lake Kivu Views',
      'Wide Outdoor Veranda',
      'High-speed Wi-Fi',
      'Perimeter Wall & Guard',
      'Water Filtration & Storage',
      'Garden Patio'
    ],
    waterBackup: true,
    powerBackup: false,
    securityGuard: true,
    parkingSpaces: 2,
    landlord: LANDLORDS.divineUwase,
    createdAt: '2026-09-15',
    viewsCount: 489
  },
  {
    id: 'prop-4',
    title: 'Volcanic Stone Villa with Mountain Views',
    description: 'Built with authentic Musanze volcanic rock masonry, this cozy 3-bedroom mountain home offers thermal insulation, cozy hearth fireplace, flowering hydrangeas, and views of Mount Bisoke and Karisimbi. Located 5 minutes from Musanze town center in a peaceful residential lane.',
    propertyType: 'House',
    district: 'Musanze',
    neighborhood: 'Muhoza',
    address: 'Ruhengeri Way, Musanze, Northern Province',
    priceRwf: 450000,
    period: 'month',
    bedrooms: 3,
    bathrooms: 2,
    areaSqm: 160,
    furnished: 'Semi-Furnished',
    availability: 'Available Next Month',
    featured: true,
    images: [
      musanzeStoneHome,
      heroKigaliVilla
    ],
    amenities: [
      'Volcanic Stone Fireplace',
      'Flower Garden & Orchard',
      'Rainwater Harvesting System',
      'Carport for 2 Vehicles',
      'Fenced Compound',
      'Quiet Residential Lane'
    ],
    waterBackup: true,
    powerBackup: true,
    securityGuard: true,
    parkingSpaces: 2,
    landlord: LANDLORDS.patrickMugabo,
    createdAt: '2026-09-20',
    viewsCount: 275
  },
  {
    id: 'prop-5',
    title: 'Contemporary Duplex near Golf Course',
    description: 'Bright and minimalist duplex home in Gasabo with Scandinavian-meets-Rwandan interior finishes. Double-glazed quiet windows, master bedroom with en-suite walk-in wardrobe, and rooftop lounge overlooking the city skyline.',
    propertyType: 'Duplex',
    district: 'Gasabo (Kigali)',
    neighborhood: 'Kimihurura',
    address: 'KG 28 Ave, Kimihurura, Kigali',
    priceRwf: 750000,
    period: 'month',
    bedrooms: 3,
    bathrooms: 3,
    areaSqm: 175,
    furnished: 'Fully Furnished',
    availability: 'Available Now',
    featured: true,
    images: [
      kigaliNyarutaramaResidence,
      kigaliKicukiroApt
    ],
    amenities: [
      'Rooftop Terrace',
      'Walk to Cafes & Restaurants',
      'Solar Hot Water System',
      'Full Kitchen Equipment',
      'Smart Door Lock',
      'Night Guard'
    ],
    waterBackup: true,
    powerBackup: true,
    securityGuard: true,
    parkingSpaces: 2,
    landlord: LANDLORDS.sandrineMutoni,
    createdAt: '2026-09-21',
    viewsCount: 310
  },
  {
    id: 'prop-6',
    title: 'Cozy 1-Bedroom Studio near University',
    description: 'Efficient and spotless 1-bedroom studio located in Huye near the University of Rwanda. High-speed internet included in rent, private ensuite bathroom, kitchenette, and gated shared courtyard.',
    propertyType: 'Studio',
    district: 'Huye (Butare)',
    neighborhood: 'Ngoma',
    address: 'Universite Ave, Huye, Southern Province',
    priceRwf: 180000,
    period: 'month',
    bedrooms: 1,
    bathrooms: 1,
    areaSqm: 42,
    furnished: 'Fully Furnished',
    availability: 'Available Now',
    featured: false,
    images: [
      kigaliKicukiroApt,
      heroKigaliVilla
    ],
    amenities: [
      'High-speed Internet Included',
      'Private Water Tank',
      'Individual Cashpower',
      'Gated Courtyard',
      'Furnished Desk & Bed'
    ],
    waterBackup: true,
    powerBackup: false,
    securityGuard: false,
    parkingSpaces: 1,
    landlord: LANDLORDS.patrickMugabo,
    createdAt: '2026-09-22',
    viewsCount: 195
  }
];

export const RWANDA_LOCATIONS = [
  {
    name: 'Kigali',
    province: 'Capital City',
    propertiesCount: 42,
    description: 'Kicukiro, Gasabo, Nyarugenge & Kimihurura',
    image: heroKigaliVilla,
    districts: ['Kicukiro (Kigali)', 'Gasabo (Kigali)', 'Nyarugenge (Kigali)']
  },
  {
    name: 'Musanze',
    province: 'Northern Province',
    propertiesCount: 18,
    description: 'Volcanic vistas, mild climate & outdoor lifestyle',
    image: musanzeStoneHome,
    districts: ['Musanze']
  },
  {
    name: 'Rubavu',
    province: 'Western Province',
    propertiesCount: 14,
    description: 'Lake Kivu waterfront homes & tropical breeze',
    image: rubavuKivuVilla,
    districts: ['Rubavu (Gisenyi)']
  },
  {
    name: 'Huye',
    province: 'Southern Province',
    propertiesCount: 9,
    description: 'Historic cultural center & academic university district',
    image: kigaliKicukiroApt,
    districts: ['Huye (Butare)']
  },
  {
    name: 'Muhanga',
    province: 'Southern Province',
    propertiesCount: 7,
    description: 'Growing central commercial hub with accessible family homes',
    image: kigaliNyarutaramaResidence,
    districts: ['Muhanga']
  },
  {
    name: 'Rwamagana',
    province: 'Eastern Province',
    propertiesCount: 8,
    description: 'Scenic lakeside and green suburbs 40 mins from Kigali',
    image: heroKigaliVilla,
    districts: ['Rwamagana']
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    propertyId: 'prop-1',
    propertyTitle: 'Modern 2-Bedroom Sunlit Apartment',
    propertyPrice: 350000,
    propertyImage: kigaliKicukiroApt,
    landlord: LANDLORDS.jeanPaul,
    tenantName: 'Kenny Mugabo',
    lastMessage: 'Muraho Kenny! Yes, the water tank has an electric booster pump.',
    lastMessageTime: '10:45 AM',
    unreadCount: 1,
    messages: [
      {
        id: 'm-1',
        senderId: 'tenant-1',
        senderName: 'Kenny Mugabo',
        senderRole: 'tenant',
        text: 'Muraho Jean-Paul, I saw your 2-bedroom in Kicukiro Niboye. Is the water pressure steady during dry spells?',
        timestamp: '10:15 AM',
        read: true
      },
      {
        id: 'm-2',
        senderId: 'lnd-1',
        senderName: 'Jean-Paul Habimana',
        senderRole: 'landlord',
        text: 'Muraho Kenny! Yes, the water tank has an electric booster pump and a dedicated 5,000L reservoir. Would you like to schedule a walk-through this Saturday at 2:00 PM?',
        timestamp: '10:45 AM',
        read: false
      }
    ]
  },
  {
    id: 'conv-2',
    propertyId: 'prop-3',
    propertyTitle: 'Panoramic Lakeside Residence on Lake Kivu',
    propertyPrice: 600000,
    propertyImage: rubavuKivuVilla,
    landlord: LANDLORDS.divineUwase,
    tenantName: 'Kenny Mugabo',
    lastMessage: 'The lease can begin as early as the 1st of next month.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    messages: [
      {
        id: 'm-3',
        senderId: 'tenant-1',
        senderName: 'Kenny Mugabo',
        senderRole: 'tenant',
        text: 'Hello Divine, is the Lake Kivu villa pet-friendly? We have a well-trained golden retriever.',
        timestamp: 'Yesterday 3:20 PM',
        read: true
      },
      {
        id: 'm-4',
        senderId: 'lnd-2',
        senderName: 'Divine Uwase',
        senderRole: 'landlord',
        text: 'Hello Kenny! Yes, since the entire compound is fenced with grass lawn, pets are very welcome. The lease can begin as early as the 1st of next month.',
        timestamp: 'Yesterday 4:10 PM',
        read: true
      }
    ]
  }
];

export const INITIAL_REQUESTS: RentalRequest[] = [
  {
    id: 'req-101',
    propertyId: 'prop-1',
    propertyTitle: 'Modern 2-Bedroom Sunlit Apartment',
    propertyImage: kigaliKicukiroApt,
    propertyPrice: 350000,
    district: 'Kicukiro (Kigali)',
    tenantName: 'Kenny Mugabo',
    tenantEmail: 'kennytohne@gmail.com',
    tenantPhone: '+250 788 000 111',
    moveInDate: '2026-10-01',
    leaseDurationMonths: 12,
    occupantsCount: 2,
    message: 'We are a quiet working couple working in Kigali tech sector. Looking for a clean, long-term home.',
    status: 'Pending',
    createdAt: '2026-09-23'
  }
];

export const DEMO_USERS = {
  tenant: {
    id: 'usr-tenant-1',
    name: 'Kenny Mugabo',
    email: 'kennytohne@gmail.com',
    phone: '+250 788 123 789',
    role: 'tenant' as const,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    verified: true
  },
  landlord: {
    id: 'usr-landlord-1',
    name: 'Jean-Paul Habimana',
    email: 'jp.habimana@smartrent.rw',
    phone: '+250 788 123 456',
    role: 'landlord' as const,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    verified: true
  },
  admin: {
    id: 'usr-admin-1',
    name: 'Aline Uwase',
    email: 'admin@smartrent.rw',
    phone: '+250 788 999 000',
    role: 'admin' as const,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    verified: true
  }
};
