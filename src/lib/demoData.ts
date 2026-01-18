export interface User {
  id: string;
  name: string;
  email: string;
  role: 'guest' | 'customer' | 'staff' | 'admin';
  avatar?: string;
  createdAt: string;
}

export interface Business {
  id: string;
  name: string;
  logo: string;
  brandColor: string;
  domain: string;
  address: string;
  phone: string;
  category: string;
}

export interface Staff {
  id: string;
  businessId: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
  bio: string;
  rating: number;
}

export interface Service {
  id: string;
  businessId: string;
  name: string;
  description: string;
  duration: number; // minutes
  price: number;
  category: string;
  color: string;
  bufferTime: number; // minutes
}

export interface AvailabilityRule {
  dayOfWeek: string; // 'Monday', 'Tuesday', ...
  startTime: string; // '09:00'
  endTime: string; // '17:00'
  breakStart?: string; // '13:00'
  breakEnd?: string; // '14:00'
  active: boolean;
}

export interface Booking {
  id: string;
  businessId: string;
  serviceId: string;
  staffId: string;
  customerId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  bookingDate: string; // 'YYYY-MM-DD'
  startTime: string; // '10:00'
  endTime: string; // '10:30'
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show' | 'refunded';
  groupSize: number;
  recurringPattern?: 'none' | 'weekly' | 'monthly';
  couponCode?: string;
  discountAmount: number;
  totalPrice: number;
  waitlist: boolean;
  qrCodeToken: string;
  videoMeetingUrl?: string;
  notes?: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  provider: 'stripe' | 'paypal' | 'jazzcash' | 'easypaisa' | 'cash';
  status: 'pending' | 'paid' | 'refunded' | 'failed';
  receiptUrl?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  bookingId: string;
  businessId: string;
  serviceName: string;
  staffName: string;
  rating: number;
  comment: string;
  customerName: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  bookingId?: string;
  type: 'email' | 'sms' | 'push' | 'reminder';
  message: string;
  status: 'sent' | 'pending';
  sentAt: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  description: string;
}

export const INITIAL_USERS: User[] = [
  {
    id: 'u-1',
    name: 'Alex Rivera (Admin)',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    createdAt: '2025-01-15T08:30:00Z',
  },
  {
    id: 'u-2',
    name: 'Dr. Sarah Jenkins (Staff)',
    email: 'staff@example.com',
    role: 'staff',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150',
    createdAt: '2025-01-16T09:15:00Z',
  },
  {
    id: 'u-3',
    name: 'Michael Chang (Customer)',
    email: 'customer@example.com',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    createdAt: '2025-02-01T14:20:00Z',
  },
];

export const INITIAL_BUSINESSES: Business[] = [
  {
    id: 'b-1',
    name: 'Elite Dental Clinic',
    logo: '🦷',
    brandColor: '#0ea5e9',
    domain: 'elite-dental.appointpulse.com',
    address: '452 Medical Center Blvd, Suite 300, New York, NY',
    phone: '+1 (555) 234-5678',
    category: 'Clinics & Doctors',
  },
  {
    id: 'b-2',
    name: 'Glow Salon & Aesthetics',
    logo: '✨',
    brandColor: '#ec4899',
    domain: 'glow-salon.appointpulse.com',
    address: '789 Fashion Ave, Beverly Hills, CA',
    phone: '+1 (555) 890-1234',
    category: 'Salons & Spas',
  },
  {
    id: 'b-3',
    name: 'Pro Fitness Coaching',
    logo: '⚡',
    brandColor: '#f59e0b',
    domain: 'profitness.appointpulse.com',
    address: '102 Performance Way, Austin, TX',
    phone: '+1 (555) 432-8765',
    category: 'Fitness Coaches',
  },
  {
    id: 'b-4',
    name: 'Mindful Executive Consulting',
    logo: '💼',
    brandColor: '#8b5cf6',
    domain: 'mindful-consult.appointpulse.com',
    address: '500 Tech Plaza, Floor 14, San Francisco, CA',
    phone: '+1 (555) 678-9012',
    category: 'Consultants & Agencies',
  },
];

export const INITIAL_STAFF: Staff[] = [
  // Elite Dental
  {
    id: 's-1',
    businessId: 'b-1',
    name: 'Dr. Sarah Jenkins, DDS',
    email: 'staff@example.com',
    phone: '+1 (555) 234-5601',
    role: 'Lead Cosmetic Dentist',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150',
    bio: 'Over 12 years of crafting immaculate, confident smiles with state-of-the-art painless dentistry.',
    rating: 4.9,
  },
  {
    id: 's-2',
    businessId: 'b-1',
    name: 'Dr. Robert Vance, MD',
    email: 'robert.vance@example.com',
    phone: '+1 (555) 234-5602',
    role: 'Orthodontic Specialist',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150',
    bio: 'Specializing in Invisalign and advanced invisible alignment systems for adults and teens.',
    rating: 4.8,
  },
  // Glow Salon
  {
    id: 's-3',
    businessId: 'b-2',
    name: 'Elena Rostova',
    email: 'elena@glowsalon.com',
    phone: '+1 (555) 890-1201',
    role: 'Master Hair Stylist & Colorist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    bio: 'Celebrity stylist known for breathtaking balayage, custom botanical treatments, and precision styling.',
    rating: 5.0,
  },
  {
    id: 's-4',
    businessId: 'b-2',
    name: 'Marcus Bell',
    email: 'marcus@glowsalon.com',
    phone: '+1 (555) 890-1202',
    role: 'Elite Aesthetician & Barber',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
    bio: 'Expert in bespoke skin resurfacing, deep tissue scalp facials, and executive beard grooming.',
    rating: 4.9,
  },
  // Pro Fitness
  {
    id: 's-5',
    businessId: 'b-3',
    name: 'Jaxson "The Engine" Steele',
    email: 'jax@profitness.com',
    phone: '+1 (555) 432-8701',
    role: 'High-Performance Specialist',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150',
    bio: 'Former Olympic conditioning coach. Builds unstoppable endurance, functional strength, and bulletproof mobility.',
    rating: 4.9,
  },
  // Mindful Consulting
  {
    id: 's-6',
    businessId: 'b-4',
    name: 'Victoria Sterling',
    email: 'victoria@mindfulconsult.com',
    phone: '+1 (555) 678-9001',
    role: 'Principal SaaS Strategist',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    bio: 'Advised over 40 YC and venture-backed startups on go-to-market scaling, pricing logic, and rapid conversion funnels.',
    rating: 5.0,
  },
];

export const INITIAL_SERVICES: Service[] = [
  // Dental
  {
    id: 'srv-1',
    businessId: 'b-1',
    name: 'Complete Dental Checkup & Hygiene Scan',
    description: 'Comprehensive digital X-ray scan, professional ultrasonic plaque scaling, and enamel polishing.',
    duration: 45,
    price: 150,
    category: 'Dental Checkup',
    color: '#0ea5e9',
    bufferTime: 15,
  },
  {
    id: 'srv-2',
    businessId: 'b-1',
    name: 'Diamond Laser Teeth Whitening Session',
    description: 'Instant multi-shade brightening using active blue-spectrum phototherapy. Completely gentle on sensitive teeth.',
    duration: 60,
    price: 280,
    category: 'Cosmetic',
    color: '#38bdf8',
    bufferTime: 20,
  },
  // Salon
  {
    id: 'srv-3',
    businessId: 'b-2',
    name: 'Executive Haircut & Restyling',
    description: 'Personalized consultation, luxury shampoo scalp massage, precision scissor sculpt, and blowout styling.',
    duration: 45,
    price: 90,
    category: 'Haircut',
    color: '#ec4899',
    bufferTime: 15,
  },
  {
    id: 'srv-4',
    businessId: 'b-2',
    name: '24K Gold HydraFacial Infusion',
    description: 'Vortex exfoliation followed by antioxidant serum infusion and therapeutic LED peptide therapy.',
    duration: 60,
    price: 210,
    category: 'Skin & Spa',
    color: '#f43f5e',
    bufferTime: 15,
  },
  // Fitness
  {
    id: 'srv-5',
    businessId: 'b-3',
    name: '1-on-1 VIP Strength & Mobility Session',
    description: 'Highly customized biometric assessment followed by an explosive guided workout and myofascial recovery.',
    duration: 60,
    price: 130,
    category: 'Fitness Coaching',
    color: '#f59e0b',
    bufferTime: 15,
  },
  // Consulting
  {
    id: 'srv-6',
    businessId: 'b-4',
    name: 'Executive Growth & Product Pitch Audit',
    description: 'Intensive virtual strategy session to teardown your pricing tiers, conversion funnel, and investor slide deck.',
    duration: 60,
    price: 350,
    category: 'Business Coaching',
    color: '#8b5cf6',
    bufferTime: 15,
  },
  {
    id: 'srv-7',
    businessId: 'b-4',
    name: '30-Minute Rapid Discovery Call',
    description: 'Quick alignment check to explore advisory opportunities and high-leverage growth blueprints.',
    duration: 30,
    price: 100,
    category: 'Consultation',
    color: '#a855f7',
    bufferTime: 10,
  },
];

export const INITIAL_AVAILABILITY: Record<string, AvailabilityRule[]> = {
  // Dr. Sarah Jenkins (s-1)
  's-1': [
    { dayOfWeek: 'Monday', startTime: '09:00', endTime: '17:00', breakStart: '13:00', breakEnd: '14:00', active: true },
    { dayOfWeek: 'Tuesday', startTime: '10:00', endTime: '18:00', breakStart: '13:00', breakEnd: '14:00', active: true },
    { dayOfWeek: 'Wednesday', startTime: '09:00', endTime: '17:00', breakStart: '13:00', breakEnd: '14:00', active: true },
    { dayOfWeek: 'Thursday', startTime: '09:00', endTime: '17:00', breakStart: '13:00', breakEnd: '14:00', active: true },
    { dayOfWeek: 'Friday', startTime: '09:00', endTime: '15:00', breakStart: '12:00', breakEnd: '12:30', active: true },
    { dayOfWeek: 'Saturday', startTime: '10:00', endTime: '14:00', active: false }, // Weekend Closed
    { dayOfWeek: 'Sunday', startTime: '10:00', endTime: '14:00', active: false },
  ],
  // Elena Rostova (s-3)
  's-3': [
    { dayOfWeek: 'Monday', startTime: '10:00', endTime: '19:00', breakStart: '14:00', breakEnd: '15:00', active: true },
    { dayOfWeek: 'Tuesday', startTime: '10:00', endTime: '19:00', breakStart: '14:00', breakEnd: '15:00', active: true },
    { dayOfWeek: 'Wednesday', startTime: '10:00', endTime: '19:00', breakStart: '14:00', breakEnd: '15:00', active: true },
    { dayOfWeek: 'Thursday', startTime: '10:00', endTime: '20:00', breakStart: '15:00', breakEnd: '16:00', active: true },
    { dayOfWeek: 'Friday', startTime: '10:00', endTime: '20:00', breakStart: '15:00', breakEnd: '16:00', active: true },
    { dayOfWeek: 'Saturday', startTime: '09:00', endTime: '18:00', breakStart: '13:00', breakEnd: '14:00', active: true },
    { dayOfWeek: 'Sunday', startTime: '11:00', endTime: '16:00', active: false },
  ]
};

// Helper to get today's date and future dates in YYYY-MM-DD
const getFormattedDate = (offsetDays: number = 0): string => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
};

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-101',
    businessId: 'b-1',
    serviceId: 'srv-1',
    staffId: 's-1',
    customerId: 'u-3',
    customerName: 'Michael Chang',
    customerEmail: 'customer@example.com',
    customerPhone: '+1 (555) 345-6789',
    bookingDate: getFormattedDate(0), // Today
    startTime: '10:00',
    endTime: '10:45',
    status: 'confirmed',
    groupSize: 1,
    totalPrice: 150,
    discountAmount: 0,
    waitlist: false,
    qrCodeToken: 'QR_ELEM_101_DENTAL',
    notes: 'Patient requested extra numbing gel for sensitive gums.',
    createdAt: '2025-02-10T10:00:00Z',
  },
  {
    id: 'bk-102',
    businessId: 'b-1',
    serviceId: 'srv-2',
    staffId: 's-1',
    customerId: 'u-3',
    customerName: 'Michael Chang',
    customerEmail: 'customer@example.com',
    customerPhone: '+1 (555) 345-6789',
    bookingDate: getFormattedDate(1), // Tomorrow
    startTime: '14:30',
    endTime: '15:30',
    status: 'confirmed',
    groupSize: 1,
    couponCode: 'SAVE20',
    discountAmount: 56,
    totalPrice: 224,
    waitlist: false,
    qrCodeToken: 'QR_ELEM_102_WHITENING',
    notes: 'Preparing for wedding photos next weekend.',
    createdAt: '2025-02-11T11:20:00Z',
  },
  {
    id: 'bk-103',
    businessId: 'b-2',
    serviceId: 'srv-3',
    staffId: 's-3',
    customerName: 'Sophia Loren',
    customerEmail: 'sophia@example.com',
    customerPhone: '+1 (555) 765-4321',
    bookingDate: getFormattedDate(0), // Today
    startTime: '11:00',
    endTime: '11:45',
    status: 'completed',
    groupSize: 1,
    totalPrice: 90,
    discountAmount: 0,
    waitlist: false,
    qrCodeToken: 'QR_ELEM_103_SALON',
    createdAt: '2025-02-09T14:15:00Z',
  },
  {
    id: 'bk-104',
    businessId: 'b-4',
    serviceId: 'srv-6',
    staffId: 's-6',
    customerId: 'u-3',
    customerName: 'Michael Chang',
    customerEmail: 'customer@example.com',
    customerPhone: '+1 (555) 345-6789',
    bookingDate: getFormattedDate(2),
    startTime: '16:00',
    endTime: '17:00',
    status: 'confirmed',
    groupSize: 1,
    recurringPattern: 'weekly',
    totalPrice: 350,
    discountAmount: 0,
    waitlist: false,
    qrCodeToken: 'QR_ELEM_104_CONSULT',
    videoMeetingUrl: 'https://meet.google.com/abc-xyz-demo',
    notes: 'Weekly product strategy check-in. Reviewing Q3 OKRs.',
    createdAt: '2025-02-12T09:00:00Z',
  },
  {
    id: 'bk-105',
    businessId: 'b-3',
    serviceId: 'srv-5',
    staffId: 's-5',
    customerName: 'David Beckham',
    customerEmail: 'david@example.com',
    customerPhone: '+1 (555) 999-8888',
    bookingDate: getFormattedDate(-1), // Yesterday
    startTime: '09:00',
    endTime: '10:00',
    status: 'completed',
    groupSize: 1,
    totalPrice: 130,
    discountAmount: 0,
    waitlist: false,
    qrCodeToken: 'QR_ELEM_105_FITNESS',
    createdAt: '2025-02-08T08:00:00Z',
  },
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    bookingId: 'bk-103',
    businessId: 'b-2',
    serviceName: 'Executive Haircut & Restyling',
    staffName: 'Elena Rostova',
    rating: 5,
    comment: 'Elena is absolutely world-class! Best haircut and blowout I have ever had. The attention to detail is unmatched.',
    customerName: 'Sophia Loren',
    createdAt: getFormattedDate(-1),
  },
  {
    id: 'rev-2',
    bookingId: 'bk-105',
    businessId: 'b-3',
    serviceName: '1-on-1 VIP Strength & Mobility Session',
    staffName: 'Jaxson "The Engine" Steele',
    rating: 5,
    comment: 'Jaxson instantly diagnosed my knee pain and gave me an incredible routine. Feeling 10 years younger!',
    customerName: 'David Beckham',
    createdAt: getFormattedDate(-2),
  },
  {
    id: 'rev-3',
    bookingId: 'bk-101',
    businessId: 'b-1',
    serviceName: 'Complete Dental Checkup & Hygiene Scan',
    staffName: 'Dr. Sarah Jenkins, DDS',
    rating: 5,
    comment: 'Most painless and high-tech dental visit ever. Dr. Jenkins explained every step on the screen.',
    customerName: 'Alice Cooper',
    createdAt: getFormattedDate(-3),
  },
];

export const INITIAL_COUPONS: Coupon[] = [
  { code: 'SAVE20', discountPercent: 20, description: '20% off any appointment' },
  { code: 'SUMMER50', discountPercent: 50, description: '50% off seasonal special' },
  { code: 'VIPFREE', discountPercent: 100, description: '100% off complimentary session' },
];
