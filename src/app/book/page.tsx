"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { Service, Staff } from "@/lib/demoData";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  CreditCard,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Tag,
  HelpCircle,
  QrCode,
  Video,
  Printer,
  ChevronDown,
  Layers,
  Users,
} from "lucide-react";

export default function InteractiveBookingFlow() {
  const {
    businesses,
    activeBusiness,
    setActiveBusinessId,
    services,
    staff,
    addBooking,
    getAvailableTimeSlots,
    validateCoupon,
    currentUser,
  } = useApp();
  const router = useRouter();

  // Multi-tenant business selection
  const [selectedBizId, setSelectedBizId] = useState<string>(activeBusiness.id);
  const curBiz = businesses.find((b) => b.id === selectedBizId) || activeBusiness;

  // Step state
  const [step, setStep] = useState<number>(1); // 1 to 7

  // Step 1: Service
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Step 2: Staff
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  // Step 3: Date
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  });

  // Step 4: Time Slot
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{ slot: string; endTime: string } | null>(null);

  // Step 5: Customer Information & Options
  const [customerName, setCustomerName] = useState<string>(currentUser.role === "customer" ? currentUser.name : "Alexander Wright");
  const [customerEmail, setCustomerEmail] = useState<string>(currentUser.role === "customer" ? currentUser.email : "alexander@example.com");
  const [customerPhone, setCustomerPhone] = useState<string>("+1 (555) 890-4321");
  const [groupSize, setGroupSize] = useState<number>(1);
  const [recurring, setRecurring] = useState<"none" | "weekly" | "monthly">("none");
  const [couponInput, setCouponInput] = useState<string>("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number } | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [joinWaitlist, setJoinWaitlist] = useState<boolean>(false);
  const [specialNotes, setSpecialNotes] = useState<string>("");

  // Step 6: Payment
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "skip" | "paypal" | "card">("stripe");
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);

  // Step 7: Final Confirmation state
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  // Filtered lists
  const bizServices = useMemo(() => services.filter((s) => s.businessId === selectedBizId), [services, selectedBizId]);
  const bizStaff = useMemo(() => {
    if (!selectedService) return staff.filter((st) => st.businessId === selectedBizId);
    return staff.filter((st) => st.businessId === selectedBizId);
  }, [staff, selectedBizId, selectedService]);

  // Smart Available Time Slots for Date & Staff
  const timeSlots = useMemo(() => {
    if (!selectedStaff || !selectedService) return [];
    return getAvailableTimeSlots(selectedStaff.id, selectedService.id, selectedDate);
  }, [selectedStaff, selectedService, selectedDate, getAvailableTimeSlots]);

  // Calculations
  const basePrice = (selectedService ? selectedService.price : 0) * groupSize;
  const discountAmount = appliedCoupon ? (basePrice * appliedCoupon.discountPercent) / 100 : 0;
  const totalPrice = Math.max(0, basePrice - discountAmount);

  // Handlers
  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 7));
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleApplyCoupon = () => {
    setCouponError(null);
    if (!couponInput.trim()) return;
    const validated = validateCoupon(couponInput);
    if (validated) {
      setAppliedCoupon({ code: validated.code, discountPercent: validated.discountPercent });
    } else {
      setCouponError("Invalid or expired discount code. Try 'SAVE20'");
    }
  };

  const handleCompleteBooking = async () => {
    if (!selectedService || !selectedStaff || !selectedTimeSlot) return;

    setIsProcessingPayment(true);

    // simulate 1s Stripe token verification
    await new Promise((res) => setTimeout(res, 900));

    const newBk = await addBooking({
      businessId: selectedBizId,
      serviceId: selectedService.id,
      staffId: selectedStaff.id,
      customerName,
      customerEmail,
      customerPhone,
      bookingDate: selectedDate,
      startTime: selectedTimeSlot.slot,
      endTime: selectedTimeSlot.endTime,
      groupSize,
      recurringPattern: recurring === "none" ? undefined : recurring,
      couponCode: appliedCoupon ? appliedCoupon.code : undefined,
      discountAmount,
      totalPrice,
      waitlist: joinWaitlist,
      videoMeetingUrl: selectedService.category.includes("Coaching") || selectedService.category.includes("Consult") ? "https://meet.google.com/flex-book-demo" : undefined,
      notes: specialNotes,
    });

    setIsProcessingPayment(false);
    setConfirmedBooking(newBk);
    setStep(7);
  };

  // Helper for formatting date display
  const formatDisplayDate = (dStr: string) => {
    try {
      const parts = dStr.split("-");
      const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      return d.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" });
    } catch {
      return dStr;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header & Step Wizard Bar */}
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              7-Step High-Conversion SaaS Engine
            </span>
            <h1 className="text-3xl font-black text-slate-900 mt-3 flex items-center space-x-3">
              <span>Book Appointment</span>
            </h1>
          </div>

          {/* Tenant Business Switcher */}
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-2xl shadow-xs border border-slate-200">
            <span className="text-xl">{curBiz.logo}</span>
            <select
              value={selectedBizId}
              onChange={(e) => {
                setSelectedBizId(e.target.value);
                setActiveBusinessId(e.target.value);
                setSelectedService(null);
                setSelectedStaff(null);
                setSelectedTimeSlot(null);
                setStep(1);
              }}
              className="bg-transparent text-xs font-bold text-slate-800 focus:outline-hidden cursor-pointer py-1"
            >
              {businesses.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.category})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Progress Timeline */}
        <div className="flex items-center justify-between pt-6 overflow-x-auto gap-2">
          {[
            { id: 1, label: "Service" },
            { id: 2, label: "Staff" },
            { id: 3, label: "Date" },
            { id: 4, label: "Time Slot" },
            { id: 5, label: "Client Info" },
            { id: 6, label: "Payment" },
            { id: 7, label: "Confirmed" },
          ].map((item) => {
            const isDone = step > item.id;
            const isCur = step === item.id;
            return (
              <div key={item.id} className="flex items-center space-x-2 shrink-0">
                <div
                  className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center transition-all ${
                    isDone
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                      : isCur
                      ? "bg-indigo-600 text-white ring-4 ring-indigo-100 shadow-md scale-110"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {isDone ? "✓" : item.id}
                </div>
                <span className={`text-xs hidden md:inline font-bold ${isCur ? "text-indigo-600" : "text-slate-500"}`}>
                  {item.label}
                </span>
                {item.id < 7 && <div className="w-4 sm:w-8 h-0.5 bg-slate-200 hidden sm:block"></div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 sm:p-10 min-h-[500px] flex flex-col justify-between">
        
        {/* STEP 1: CHOOSE SERVICE */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Step 1: Choose Desired Service</h2>
                <p className="text-xs text-slate-500">Select what you'd like to schedule at {curBiz.name}</p>
              </div>
              <span className="text-xs bg-slate-100 px-3 py-1 rounded-full font-mono font-semibold text-slate-600">
                {bizServices.length} options available
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bizServices.map((srv) => {
                const isSelected = selectedService?.id === srv.id;
                return (
                  <button
                    key={srv.id}
                    onClick={() => {
                      setSelectedService(srv);
                      // auto select first staff if null
                      const matchingStaff = staff.filter((st) => st.businessId === selectedBizId);
                      if (!selectedStaff && matchingStaff.length > 0) setSelectedStaff(matchingStaff[0]);
                    }}
                    className={`p-5 rounded-2xl text-left border-2 transition-all flex flex-col justify-between ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50/60 shadow-lg ring-2 ring-indigo-600/20 scale-[1.01]"
                        : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <span className="font-extrabold text-base text-slate-900">{srv.name}</span>
                        <span className="font-black text-emerald-600 text-base ml-2 font-mono">${srv.price}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">{srv.description}</p>
                    </div>

                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200/60 text-xs">
                      <div className="flex items-center space-x-3 text-slate-600 font-medium">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5 text-indigo-600" />
                          <span>{srv.duration} mins</span>
                        </span>
                        <span className="text-[10px] bg-slate-200/80 px-2 py-0.5 rounded text-slate-700 font-mono">
                          +{srv.bufferTime}m setup buffer
                        </span>
                      </div>
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${isSelected ? "bg-indigo-600 text-white" : "bg-slate-200 text-transparent"}`}>
                        ✓
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: CHOOSE STAFF PROVIDER */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Step 2: Select Your Staff Specialist</h2>
                <p className="text-xs text-slate-500">Pick a professional from our expert roster</p>
              </div>
              <span className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-semibold">
                Optional - or pick anyone
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bizStaff.map((st) => {
                const isSelected = selectedStaff?.id === st.id;
                return (
                  <button
                    key={st.id}
                    onClick={() => setSelectedStaff(st)}
                    className={`p-5 rounded-2xl text-left border-2 transition-all flex items-center space-x-4 ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50/60 shadow-lg ring-2 ring-indigo-600/20 scale-[1.01]"
                        : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
                    }`}
                  >
                    <img src={st.avatar} alt={st.name} className="w-16 h-16 rounded-2xl object-cover shadow-xs shrink-0" />
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-sm text-slate-900">{st.name}</span>
                        <span className="flex items-center space-x-1 bg-amber-100 text-amber-800 text-[11px] px-2 py-0.5 rounded-full font-bold">
                          ★ {st.rating}
                        </span>
                      </div>
                      <div className="text-xs text-indigo-600 font-bold mt-0.5">{st.role}</div>
                      <p className="text-[11px] text-slate-500 mt-1.5 line-clamp-2">{st.bio}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: PICK DATE */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Step 3: Pick Desired Appointment Date</h2>
              <p className="text-xs text-slate-500">Our calendar automatically computes real-time provider availability</p>
            </div>

            <div className="max-w-md mx-auto bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-inner space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-800 flex items-center space-x-2">
                  <CalendarIcon className="w-4 h-4 text-indigo-600" />
                  <span>Choose Date</span>
                </span>
                <span className="text-xs bg-white px-3 py-1 rounded-lg border font-mono">
                  {formatDisplayDate(selectedDate)}
                </span>
              </div>

              <div>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-4 bg-white rounded-2xl border-2 border-indigo-500 text-base font-extrabold text-slate-800 shadow-md focus:outline-hidden cursor-pointer"
                />
              </div>

              <div className="text-center">
                <div className="text-[11px] text-slate-500">Quick Date Presets</div>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  {[0, 1, 2, 3].map((offset) => {
                    const d = new Date();
                    d.setDate(d.getDate() + offset);
                    const dStr = d.toISOString().split("T")[0];
                    const label = offset === 0 ? "Today" : offset === 1 ? "Tomorrow" : d.toLocaleDateString("en-US", { weekday: "short" });
                    return (
                      <button
                        key={offset}
                        onClick={() => setSelectedDate(dStr)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs border ${
                          selectedDate === dStr ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: CHOOSE TIME SLOT (Smart Time Slot Engine) */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Step 4: Smart Time Slot Engine</h2>
                <p className="text-xs text-slate-500">
                  Showing computed slots for <span className="font-bold text-indigo-600">{selectedStaff?.name}</span> on <span className="font-mono">{formatDisplayDate(selectedDate)}</span>
                </p>
              </div>

              {/* Engine Badge */}
              <div className="flex items-center space-x-2 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-xl text-xs text-indigo-800 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-spin" />
                <span>Logic: Breaks & +{selectedService?.bufferTime}m buffer isolated</span>
              </div>
            </div>

            {/* Time Slot Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[350px] overflow-y-auto p-1">
              {timeSlots.length === 0 ? (
                <div className="col-span-full py-12 text-center text-slate-400 font-medium text-sm">
                  No slots computed for this date. Please try another day.
                </div>
              ) : (
                timeSlots.map((ts, idx) => {
                  const isAvailable = ts.status === "available";
                  const isBreak = ts.status === "break";
                  const isBooked = ts.status === "booked";
                  const isSelected = selectedTimeSlot?.slot === ts.slot;

                  return (
                    <button
                      key={idx}
                      disabled={!isAvailable}
                      onClick={() => setSelectedTimeSlot({ slot: ts.slot, endTime: ts.endTime })}
                      className={`p-3.5 rounded-2xl text-center font-mono font-bold text-xs border transition-all relative group flex flex-col items-center justify-center ${
                        isSelected
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-lg scale-105"
                          : isAvailable
                          ? "bg-white text-slate-800 border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 cursor-pointer shadow-xs"
                          : isBreak
                          ? "bg-amber-50/60 text-amber-700 border-amber-200/80 cursor-not-allowed opacity-75"
                          : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through"
                      }`}
                    >
                      <span className="text-sm">{ts.slot}</span>
                      <span className={`text-[9px] mt-0.5 font-sans font-normal ${isSelected ? "text-indigo-200" : isAvailable ? "text-slate-500" : "text-amber-800"}`}>
                        {isAvailable ? `Until ${ts.endTime}` : ts.reason}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Waitlist option notice */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3 text-xs text-slate-700">
                <AlertCircle className="w-4 h-4 text-indigo-600" />
                <span>Don't see your desired time slot Open?</span>
              </div>
              <button
                onClick={() => {
                  setJoinWaitlist(true);
                  setSelectedTimeSlot({ slot: "09:00 (Waitlist)", endTime: "10:00" });
                  setStep(5);
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors"
              >
                Join Auto-Waitlist
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: CUSTOMER INFORMATION & ADD-ONS */}
        {step === 5 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Step 5: Customer Details & Preferences</h2>
              <p className="text-xs text-slate-500">Provide contact information for automated SMS / email booking reminders</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Details Input */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Michael Chang"
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address (For PDF Receipts)</label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="michael@example.com"
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number (For 1h / 15m SMS Reminders)</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-hidden font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Special Appointment Notes (Optional)</label>
                  <textarea
                    rows={2}
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    placeholder="Any specific requests or conditions?"
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-hidden"
                  ></textarea>
                </div>
              </div>

              {/* Right Advanced Options (Group, Recurring, Coupon) */}
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 space-y-5">
                <span className="text-xs font-black uppercase tracking-wider text-slate-600 block">Advanced Add-ons</span>
                
                {/* Group size */}
                <div className="flex items-center justify-between p-3 bg-white rounded-2xl border border-slate-200">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-bold text-slate-800">Group Attendees</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setGroupSize((prev) => Math.max(1, prev - 1))}
                      className="w-7 h-7 rounded-lg bg-slate-100 font-bold text-xs hover:bg-slate-200"
                    >
                      -
                    </button>
                    <span className="font-mono font-bold text-xs">{groupSize}</span>
                    <button
                      onClick={() => setGroupSize((prev) => Math.min(10, prev + 1))}
                      className="w-7 h-7 rounded-lg bg-slate-100 font-bold text-xs hover:bg-slate-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Recurring Options */}
                <div className="flex items-center justify-between p-3 bg-white rounded-2xl border border-slate-200">
                  <div className="flex items-center space-x-2">
                    <Layers className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-bold text-slate-800">Recurring Pattern</span>
                  </div>
                  <select
                    value={recurring}
                    onChange={(e) => setRecurring(e.target.value as any)}
                    className="bg-slate-100 text-xs font-bold p-1.5 rounded-lg border-none focus:outline-hidden cursor-pointer"
                  >
                    <option value="none">One-Time Only</option>
                    <option value="weekly">Weekly Session</option>
                    <option value="monthly">Monthly Session</option>
                  </select>
                </div>

                {/* Coupon Discount */}
                <div className="space-y-2 pt-2 border-t border-slate-200/80">
                  <label className="block text-xs font-bold text-slate-700">Promo / Gift Coupon Code</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Enter 'SAVE20'"
                      className="flex-grow p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono uppercase font-bold outline-hidden"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-extrabold transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedCoupon && (
                    <div className="text-[11px] font-bold text-emerald-600 flex items-center space-x-1 mt-1 font-mono">
                      <span>✓ Applied code {appliedCoupon.code} (-{appliedCoupon.discountPercent}%)</span>
                    </div>
                  )}
                  {couponError && <div className="text-[11px] font-bold text-rose-500 mt-1">{couponError}</div>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: SECURE PAYMENT OR SKIP */}
        {step === 6 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Step 6: Payment & Authorization</h2>
              <p className="text-xs text-slate-500">Secure simulated Stripe authorization for {curBiz.name}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Payment Methods */}
              <div className="lg:col-span-7 space-y-3">
                <span className="text-xs font-black uppercase tracking-wider text-slate-600 block mb-2">Select Payment Method</span>
                
                <button
                  onClick={() => setPaymentMethod("stripe")}
                  className={`w-full p-4 rounded-2xl text-left border-2 flex items-center justify-between transition-all ${
                    paymentMethod === "stripe" ? "border-indigo-600 bg-indigo-50/50 font-bold" : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">💳</span>
                    <div>
                      <div className="text-xs font-extrabold text-slate-900">Simulated Stripe Secure Checkout</div>
                      <div className="text-[10px] text-slate-500">Instant test token charge</div>
                    </div>
                  </div>
                  {paymentMethod === "stripe" && <span className="text-indigo-600 font-bold">✓</span>}
                </button>

                <button
                  onClick={() => setPaymentMethod("skip")}
                  className={`w-full p-4 rounded-2xl text-left border-2 flex items-center justify-between transition-all ${
                    paymentMethod === "skip" ? "border-indigo-600 bg-indigo-50/50 font-bold" : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🏛️</span>
                    <div>
                      <div className="text-xs font-extrabold text-slate-900">Pay Upon Arrival / In-Store Cash</div>
                      <div className="text-[10px] text-slate-500">Skip online payment today</div>
                    </div>
                  </div>
                  {paymentMethod === "skip" && <span className="text-indigo-600 font-bold">✓</span>}
                </button>

                {/* Simulated Credit Card Box */}
                {paymentMethod === "stripe" && (
                  <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-4 shadow-lg mt-4 animate-in fade-in">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Simulated Credit Card</span>
                      <span className="font-mono text-[10px] bg-slate-800 px-2 py-0.5 rounded text-emerald-400">TEST MODE Active</span>
                    </div>
                    <div>
                      <span className="block text-sm font-mono tracking-widest text-slate-200">4242 •••• •••• 4242</span>
                      <div className="flex justify-between items-center mt-3 text-[10px] text-slate-400 font-mono">
                        <span>EXPIRES: 12/28</span>
                        <span>CVC: 123</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary Box */}
              <div className="lg:col-span-5 bg-slate-50 p-6 rounded-3xl border border-slate-200/80 space-y-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 block border-b border-slate-200 pb-2">Booking Breakdown</span>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-600">{selectedService?.name}</span>
                    <span className="font-mono font-bold">${selectedService?.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Specialist Provider</span>
                    <span className="font-bold text-slate-900">{selectedStaff?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Date & Slot</span>
                    <span className="font-mono font-bold">{selectedTimeSlot?.slot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Group Size</span>
                    <span className="font-mono font-bold">x{groupSize}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Promo ({appliedCoupon.code})</span>
                      <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-3 border-t border-slate-200 font-black text-sm text-slate-900">
                    <span>Total Final Amount</span>
                    <span className="text-indigo-600 font-mono">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  disabled={isProcessingPayment}
                  onClick={handleCompleteBooking}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-sm shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center space-x-2 transition-all cursor-pointer mt-4"
                >
                  {isProcessingPayment ? (
                    <>
                      <Sparkles className="w-5 h-5 animate-spin" />
                      <span>Authorizing Stripe Token...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5" />
                      <span>Confirm & Generate Booking #{Math.floor(1000 + Math.random() * 9000)}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: SUCCESS CONFIRMATION & QR LOBBY PASS */}
        {step === 7 && confirmedBooking && (
          <div className="text-center space-y-6 max-w-2xl mx-auto py-6 animate-in fade-in zoom-in-95">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mx-auto shadow-xl">
              ✓
            </div>

            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Booking Officially Confirmed
              </span>
              <h2 className="text-3xl font-black text-slate-900">You're All Set, {confirmedBooking.customerName.split(" ")[0]}!</h2>
              <p className="text-xs text-slate-600">
                Confirmation email & calendar invitation sent to <span className="font-bold">{confirmedBooking.customerEmail}</span>
              </p>
            </div>

            {/* Impressive Digital Pass Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
                <div>
                  <span className="text-[10px] text-indigo-400 font-mono tracking-widest uppercase block">Booking ID Pass</span>
                  <span className="text-2xl font-black font-mono tracking-tight">{confirmedBooking.id}</span>
                </div>
                <div className="flex items-center space-x-2 bg-slate-800 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Status: {confirmedBooking.status.toUpperCase()}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-slate-800 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Service</span>
                  <span className="font-bold">{selectedService?.name}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Specialist</span>
                  <span className="font-bold">{selectedStaff?.name}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Date & Slot</span>
                  <span className="font-mono font-bold text-emerald-400">{confirmedBooking.startTime}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Amount</span>
                  <span className="font-mono font-bold">${confirmedBooking.totalPrice}</span>
                </div>
              </div>

              {/* QR Lobby Simulation */}
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-white p-2 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                    <QrCode className="w-16 h-16 text-slate-900" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-extrabold text-white flex items-center space-x-1.5">
                      <span>Express Lobby QR Check-In</span>
                    </span>
                    <p className="text-[11px] text-slate-400">Scan this code at our reception kiosk upon arrival to mark instant attendance.</p>
                  </div>
                </div>

                {confirmedBooking.videoMeetingUrl && (
                  <Link
                    href={`/meet/${confirmedBooking.id}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs px-5 py-3 rounded-xl transition-all shadow-md shrink-0"
                  >
                    <Video className="w-4 h-4" />
                    <span>Join Online Session Room</span>
                  </Link>
                )}
              </div>
            </div>

            {/* Bottom Actions (Dashboard, Print, iCal) */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <Link
                href="/dashboard/customer"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl transition-colors shadow-sm"
              >
                <span>View Customer Portal Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => window.print()}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-slate-500" />
                <span>Download PDF Receipt</span>
              </button>
            </div>
          </div>
        )}

        {/* BOTTOM NAVIGATION CTA WIZARD BAR */}
        {step < 7 && (
          <div className="flex items-center justify-between pt-8 border-t border-slate-200/80 mt-10">
            <button
              disabled={step === 1}
              onClick={handlePrev}
              className={`inline-flex items-center space-x-2 px-6 py-3 rounded-2xl font-bold text-xs transition-all ${
                step === 1 ? "opacity-30 cursor-not-allowed text-slate-400" : "bg-slate-100 hover:bg-slate-200 text-slate-800 cursor-pointer"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            {step < 6 ? (
              <button
                onClick={handleNext}
                className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-lg shadow-indigo-500/25 transition-all cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
