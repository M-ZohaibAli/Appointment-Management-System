"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  User,
  Business,
  Staff,
  Service,
  AvailabilityRule,
  Booking,
  Review,
  Notification,
  Coupon,
  INITIAL_USERS,
  INITIAL_BUSINESSES,
  INITIAL_STAFF,
  INITIAL_SERVICES,
  INITIAL_AVAILABILITY,
  INITIAL_BOOKINGS,
  INITIAL_REVIEWS,
  INITIAL_COUPONS,
} from "@/lib/demoData";

interface AppContextType {
  // Current Authentication & Mode
  currentUser: User;
  setCurrentUser: (user: User) => void;
  switchRole: (role: 'guest' | 'customer' | 'staff' | 'admin') => void;
  dbMode: 'demo' | 'postgres';
  setDbMode: (mode: 'demo' | 'postgres') => void;
  
  // Active Tenant / Business
  businesses: Business[];
  activeBusiness: Business;
  setActiveBusinessId: (id: string) => void;
  addBusiness: (b: Omit<Business, 'id'>) => void;
  updateBusiness: (id: string, updates: Partial<Business>) => void;

  // Services
  services: Service[];
  addService: (s: Omit<Service, 'id'>) => void;
  updateService: (id: string, s: Partial<Service>) => void;
  deleteService: (id: string) => void;

  // Staff
  staff: Staff[];
  addStaff: (st: Omit<Staff, 'id'>) => void;
  updateStaff: (id: string, updates: Partial<Staff>) => void;
  deleteStaff: (id: string) => void;

  // Availability
  availability: Record<string, AvailabilityRule[]>;
  updateAvailability: (staffId: string, rules: AvailabilityRule[]) => void;

  // Bookings
  bookings: Booking[];
  addBooking: (b: Omit<Booking, 'id' | 'createdAt' | 'status' | 'qrCodeToken'>) => Promise<Booking>;
  updateBookingStatus: (bookingId: string, status: Booking['status']) => void;
  rescheduleBooking: (bookingId: string, newDate: string, newStartTime: string, newEndTime: string) => void;
  
  // Favorites & Reviews
  favorites: string[]; // staff ids
  toggleFavorite: (staffId: string) => void;
  reviews: Review[];
  addReview: (r: Omit<Review, 'id' | 'createdAt'>) => void;

  // Coupons
  coupons: Coupon[];
  validateCoupon: (code: string) => Coupon | null;

  // Notifications
  notifications: Notification[];
  addNotification: (n: Omit<Notification, 'id' | 'sentAt'>) => void;
  
  // Smart time slot logic simulation helper
  getAvailableTimeSlots: (staffId: string, serviceId: string, dateStr: string) => { slot: string; endTime: string; status: 'available' | 'booked' | 'break'; reason?: string }[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "flexbook_app_state_v1";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isHydrated, setIsHydrated] = useState(false);
  
  // State definitions
  const [currentUser, setCurrentUserState] = useState<User>(INITIAL_USERS[2]); // Customer default
  const [dbMode, setDbModeState] = useState<'demo' | 'postgres'>('demo');
  const [businesses, setBusinesses] = useState<Business[]>(INITIAL_BUSINESSES);
  const [activeBusinessId, setActiveBusinessIdState] = useState<string>(INITIAL_BUSINESSES[0].id);
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [staff, setStaff] = useState<Staff[]>(INITIAL_STAFF);
  const [availability, setAvailability] = useState<Record<string, AvailabilityRule[]>>(INITIAL_AVAILABILITY);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [favorites, setFavorites] = useState<string[]>(['s-1']);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Hydrate from LocalStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.currentUser) setCurrentUserState(parsed.currentUser);
          if (parsed.dbMode) setDbModeState(parsed.dbMode);
          if (parsed.businesses) setBusinesses(parsed.businesses);
          if (parsed.activeBusinessId) setActiveBusinessIdState(parsed.activeBusinessId);
          if (parsed.services) setServices(parsed.services);
          if (parsed.staff) setStaff(parsed.staff);
          if (parsed.availability) setAvailability(parsed.availability);
          if (parsed.bookings) setBookings(parsed.bookings);
          if (parsed.favorites) setFavorites(parsed.favorites);
          if (parsed.reviews) setReviews(parsed.reviews);
          if (parsed.notifications) setNotifications(parsed.notifications);
        } catch (err) {
          console.error("Failed to restore state", err);
        }
      }
      setIsHydrated(true);
    }
  }, []);

  // Save state to LocalStorage
  useEffect(() => {
    if (isHydrated && typeof window !== 'undefined') {
      const toSave = {
        currentUser,
        dbMode,
        businesses,
        activeBusinessId,
        services,
        staff,
        availability,
        bookings,
        favorites,
        reviews,
        notifications,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(toSave));
    }
  }, [
    isHydrated,
    currentUser,
    dbMode,
    businesses,
    activeBusinessId,
    services,
    staff,
    availability,
    bookings,
    favorites,
    reviews,
    notifications,
  ]);

  const activeBusiness = businesses.find((b) => b.id === activeBusinessId) || businesses[0];

  const switchRole = (role: 'guest' | 'customer' | 'staff' | 'admin') => {
    if (role === 'guest') {
      setCurrentUserState({
        id: 'u-guest',
        name: 'Guest User',
        email: 'guest@example.com',
        role: 'guest',
        createdAt: new Date().toISOString(),
      });
    } else if (role === 'customer') {
      setCurrentUserState(INITIAL_USERS[2]);
    } else if (role === 'staff') {
      setCurrentUserState(INITIAL_USERS[1]);
    } else if (role === 'admin') {
      setCurrentUserState(INITIAL_USERS[0]);
    }
  };

  const addBusiness = (b: Omit<Business, 'id'>) => {
    const newId = 'b-' + Date.now();
    const newBiz: Business = { ...b, id: newId };
    setBusinesses((prev) => [...prev, newBiz]);
    setActiveBusinessIdState(newId);
  };

  const updateBusiness = (id: string, updates: Partial<Business>) => {
    setBusinesses((prev) => prev.map((biz) => (biz.id === id ? { ...biz, ...updates } : biz)));
  };

  const addService = (s: Omit<Service, 'id'>) => {
    const newSrv: Service = { ...s, id: 'srv-' + Date.now() };
    setServices((prev) => [...prev, newSrv]);
  };

  const updateService = (id: string, updates: Partial<Service>) => {
    setServices((prev) => prev.map((srv) => (srv.id === id ? { ...srv, ...updates } : srv)));
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const addStaff = (st: Omit<Staff, 'id'>) => {
    const newSt: Staff = { ...st, id: 's-' + Date.now() };
    setStaff((prev) => [...prev, newSt]);
    // add default availability
    setAvailability((prev) => ({
      ...prev,
      [newSt.id]: [
        { dayOfWeek: 'Monday', startTime: '09:00', endTime: '17:00', active: true },
        { dayOfWeek: 'Tuesday', startTime: '09:00', endTime: '17:00', active: true },
        { dayOfWeek: 'Wednesday', startTime: '09:00', endTime: '17:00', active: true },
        { dayOfWeek: 'Thursday', startTime: '09:00', endTime: '17:00', active: true },
        { dayOfWeek: 'Friday', startTime: '09:00', endTime: '17:00', active: true },
        { dayOfWeek: 'Saturday', startTime: '10:00', endTime: '14:00', active: false },
        { dayOfWeek: 'Sunday', startTime: '10:00', endTime: '14:00', active: false },
      ],
    }));
  };

  const updateStaff = (id: string, updates: Partial<Staff>) => {
    setStaff((prev) => prev.map((st) => (st.id === id ? { ...st, ...updates } : st)));
  };

  const deleteStaff = (id: string) => {
    setStaff((prev) => prev.filter((st) => st.id !== id));
  };

  const updateAvailability = (staffId: string, rules: AvailabilityRule[]) => {
    setAvailability((prev) => ({ ...prev, [staffId]: rules }));
  };

  const addBooking = async (b: Omit<Booking, 'id' | 'createdAt' | 'status' | 'qrCodeToken'>): Promise<Booking> => {
    const newId = 'bk-' + Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      ...b,
      id: newId,
      status: b.waitlist ? 'pending' : 'confirmed',
      qrCodeToken: `QR_APP_TOKEN_${newId}_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    setBookings((prev) => [newBooking, ...prev]);

    // Push simulated notification
    const msg = b.waitlist 
      ? `You joined the waitlist for ${newBooking.customerName} on ${newBooking.bookingDate}.` 
      : `Confirmed! Booking #${newId} for ${newBooking.customerName} on ${newBooking.bookingDate} at ${newBooking.startTime}.`;
    
    setNotifications((prev) => [
      {
        id: 'notif-' + Date.now(),
        userId: currentUser.id,
        bookingId: newId,
        type: b.waitlist ? 'reminder' : 'email',
        message: msg,
        status: 'sent',
        sentAt: new Date().toISOString(),
      },
      ...prev,
    ]);

    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: Booking['status']) => {
    setBookings((prev) =>
      prev.map((bk) => {
        if (bk.id === bookingId) {
          const updated = { ...bk, status };
          // send notif
          setNotifications((nPrev) => [
            {
              id: 'notif-' + Date.now(),
              userId: currentUser.id,
              bookingId,
              type: 'email',
              message: `Your booking #${bookingId} status changed to ${status.toUpperCase()}.`,
              status: 'sent',
              sentAt: new Date().toISOString(),
            },
            ...nPrev,
          ]);
          return updated;
        }
        return bk;
      })
    );
  };

  const rescheduleBooking = (bookingId: string, newDate: string, newStartTime: string, newEndTime: string) => {
    setBookings((prev) =>
      prev.map((bk) => {
        if (bk.id === bookingId) {
          return {
            ...bk,
            bookingDate: newDate,
            startTime: newStartTime,
            endTime: newEndTime,
            status: 'confirmed',
          };
        }
        return bk;
      })
    );
  };

  const toggleFavorite = (staffId: string) => {
    setFavorites((prev) =>
      prev.includes(staffId) ? prev.filter((id) => id !== staffId) : [...prev, staffId]
    );
  };

  const addReview = (r: Omit<Review, 'id' | 'createdAt'>) => {
    const newRev: Review = { ...r, id: 'rev-' + Date.now(), createdAt: new Date().toISOString().split('T')[0] };
    setReviews((prev) => [newRev, ...prev]);
  };

  const validateCoupon = (code: string): Coupon | null => {
    const found = coupons.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
    return found || null;
  };

  const addNotification = (n: Omit<Notification, 'id' | 'sentAt'>) => {
    setNotifications((prev) => [
      { ...n, id: 'notif-' + Date.now(), sentAt: new Date().toISOString() },
      ...prev,
    ]);
  };

  // SMART TIME SLOT ENGINE
  // Calculates exact Available Slots, Blocked Slots, Break Times, Existing Appointments, Service Duration, Buffer Time
  const getAvailableTimeSlots = (staffId: string, serviceId: string, dateStr: string) => {
    const stRules = availability[staffId];
    if (!stRules) return [];

    // determine day of week
    const dateObj = new Date(dateStr);
    const dayIndex = dateObj.getUTCDay(); // 0 is Sunday, 1 Monday...
    const daysMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = daysMap[dayIndex];

    const rule = stRules.find((r) => r.dayOfWeek.toLowerCase() === dayName.toLowerCase());
    if (!rule || !rule.active) {
      return [{ slot: '00:00', endTime: '00:00', status: 'booked' as const, reason: `Staff closed on ${dayName}s` }];
    }

    const srv = services.find((s) => s.id === serviceId);
    const duration = srv ? srv.duration : 30;
    const buffer = srv ? srv.bufferTime : 10;
    const totalStep = duration + buffer;

    // parse start time and end time
    const [startH, startM] = rule.startTime.split(':').map(Number);
    const [endH, endM] = rule.endTime.split(':').map(Number);
    let currentMins = startH * 60 + startM;
    const endMins = endH * 60 + endM;

    // parse break start and end
    let breakStartMins = -1;
    let breakEndMins = -1;
    if (rule.breakStart && rule.breakEnd) {
      const [bsH, bsM] = rule.breakStart.split(':').map(Number);
      const [beH, beM] = rule.breakEnd.split(':').map(Number);
      breakStartMins = bsH * 60 + bsM;
      breakEndMins = beH * 60 + beM;
    }

    // get existing bookings for this staff on this date
    const existingBks = bookings.filter(
      (b) => b.staffId === staffId && b.bookingDate === dateStr && b.status !== 'cancelled'
    );

    const slots = [];

    while (currentMins + duration <= endMins) {
      const slotStartH = Math.floor(currentMins / 60);
      const slotStartM = currentMins % 60;
      const slotEndMins = currentMins + duration;
      const slotEndH = Math.floor(slotEndMins / 60);
      const slotEndM = slotEndMins % 60;

      const formatTime = (h: number, m: number) => `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
      const slotStr = formatTime(slotStartH, slotStartM);
      const endStr = formatTime(slotEndH, slotEndM);

      // Check if slot falls in break time
      const fallsInBreak =
        breakStartMins !== -1 &&
        (currentMins >= breakStartMins && currentMins < breakEndMins ||
         slotEndMins > breakStartMins && slotEndMins <= breakEndMins);

      // Check if slot overlaps with any existing booking
      let overlapBooking = null;
      for (const eb of existingBks) {
        const [ebSH, ebSM] = eb.startTime.split(':').map(Number);
        const [ebEH, ebEM] = eb.endTime.split(':').map(Number);
        const ebStartMins = ebSH * 60 + ebSM;
        const ebEndMins = ebEH * 60 + ebEM;

        if (
          (currentMins >= ebStartMins && currentMins < ebEndMins) ||
          (slotEndMins > ebStartMins && slotEndMins <= ebEndMins) ||
          (currentMins <= ebStartMins && slotEndMins >= ebEndMins)
        ) {
          overlapBooking = eb;
          break;
        }
      }

      if (fallsInBreak) {
        slots.push({ slot: slotStr, endTime: endStr, status: 'break' as const, reason: 'Staff Break / Lunch' });
      } else if (overlapBooking) {
        slots.push({ slot: slotStr, endTime: endStr, status: 'booked' as const, reason: `Booked (${overlapBooking.serviceId ? 'Client Appointment' : 'Busy'})` });
      } else {
        slots.push({ slot: slotStr, endTime: endStr, status: 'available' as const });
      }

      // Step forward by duration + buffer
      currentMins += totalStep;
    }

    return slots;
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser: setCurrentUserState,
        switchRole,
        dbMode,
        setDbMode: setDbModeState,
        businesses,
        activeBusiness,
        setActiveBusinessId: setActiveBusinessIdState,
        addBusiness,
        updateBusiness,
        services,
        addService,
        updateService,
        deleteService,
        staff,
        addStaff,
        updateStaff,
        deleteStaff,
        availability,
        updateAvailability,
        bookings,
        addBooking,
        updateBookingStatus,
        rescheduleBooking,
        favorites,
        toggleFavorite,
        reviews,
        addReview,
        coupons,
        validateCoupon,
        notifications,
        addNotification,
        getAvailableTimeSlots,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
};
