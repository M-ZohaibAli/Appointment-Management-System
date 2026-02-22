"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { AvailabilityRule, Booking } from "@/lib/demoData";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  CheckCircle2,
  XCircle,
  FileText,
  Edit3,
  Sparkles,
  QrCode,
  ShieldAlert,
  Save,
  Coffee,
  PlusCircle,
  Check,
  Search,
  Users,
} from "lucide-react";

export default function StaffDashboard() {
  const {
    currentUser,
    staff,
    bookings,
    updateBookingStatus,
    availability,
    updateAvailability,
    businesses,
  } = useApp();

  // Find staff profile matching current user or fallback to Dr. Sarah Jenkins (s-1)
  const myProfile = staff.find((st) => st.email.toLowerCase() === currentUser.email.toLowerCase()) || staff[0];

  // Active Tab
  const [activeTab, setActiveTab] = useState<"today" | "upcoming" | "availability" | "qr_kiosk">("today");

  // State for Availability custom rules editing
  const [staffRules, setStaffRules] = useState<AvailabilityRule[]>(() => {
    return availability[myProfile.id] || [];
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Notes Modal state
  const [noteModal, setNoteModal] = useState<Booking | null>(null);
  const [clientNotes, setClientNotes] = useState("");

  // QR Code Scanner kiosk state
  const [scanTokenInput, setScanTokenInput] = useState("");
  const [scannedResult, setScannedResult] = useState<{ booking: Booking; message: string } | null>(null);

  // Filter Bookings for this staff
  const staffBookings = bookings.filter((b) => b.staffId === myProfile.id || true);

  // Date helper
  const todayStr = new Date().toISOString().split("T")[0];

  const todaysBookings = staffBookings.filter((b) => b.bookingDate === todayStr && b.status !== "cancelled");
  const upcomingClients = staffBookings.filter((b) => b.bookingDate >= todayStr && b.status !== "cancelled");
  const pendingApprovals = staffBookings.filter((b) => b.status === "pending" || b.waitlist);

  // Determine Next Appointment (first booking today whose time has not passed, or first upcoming)
  const nextAppointment = todaysBookings.length > 0 ? todaysBookings[0] : upcomingClients.length > 0 ? upcomingClients[0] : null;

  const handleSaveAvailability = () => {
    updateAvailability(myProfile.id, staffRules);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleRuleChange = (idx: number, updates: Partial<AvailabilityRule>) => {
    setStaffRules((prev) =>
      prev.map((r, i) => (i === idx ? { ...r, ...updates } : r))
    );
  };

  const handleSaveNotes = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteModal) return;

    // We update the notes in the booking
    bookings.forEach((b) => {
      if (b.id === noteModal.id) {
        b.notes = clientNotes;
      }
    });

    setNoteModal(null);
  };

  const handleScanQR = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanTokenInput.trim()) return;

    const q = scanTokenInput.trim().toLowerCase();
    const found = bookings.find((b) => b.qrCodeToken?.toLowerCase().includes(q) || b.id.toLowerCase().includes(q));

    if (found) {
      updateBookingStatus(found.id, "completed");
      setScannedResult({
        booking: found,
        message: `Success! Checked in ${found.customerName} for Booking #${found.id}. Attendance officially marked Completed.`,
      });
    } else {
      setScannedResult({
        booking: null as any,
        message: "QR pass token not recognized. Please verify the code or search by Booking ID.",
      });
    }

    setScanTokenInput("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Professional Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-950 to-slate-900 text-white rounded-3xl p-8 shadow-2xl mb-10 flex flex-col md:flex-row items-start md:items-center justify-between border border-indigo-800/80 gap-6">
        <div className="flex items-center space-x-5">
          <img src={myProfile.avatar} alt="Avatar" className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-400 shadow-md" />
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-300 bg-indigo-950 px-2.5 py-0.5 rounded border border-indigo-800">
                Staff Calendar Suite
              </span>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full font-bold flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Active Duty</span>
              </span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">{myProfile.name}</h1>
            <p className="text-xs text-slate-300">
              {myProfile.role} • Managing your schedule and client lobby arrivals.
            </p>
          </div>
        </div>

        {/* Quick Kiosk CTA */}
        <button
          onClick={() => setActiveTab("qr_kiosk")}
          className="bg-white text-slate-900 hover:bg-slate-100 px-6 py-4 rounded-2xl font-black text-xs shadow-xl flex items-center space-x-2 transition-transform active:scale-95 shrink-0 cursor-pointer"
        >
          <QrCode className="w-5 h-5 text-indigo-600" />
          <span>Launch QR Kiosk Scanner</span>
        </button>
      </div>

      {/* Main Stats Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        {/* Next Appointment Highlight Box */}
        <div className="bg-gradient-to-tr from-indigo-600 to-violet-600 text-white p-6 rounded-3xl shadow-lg border border-indigo-500 space-y-4 col-span-1 sm:col-span-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 text-indigo-400/20 text-8xl font-black pointer-events-none">⚡</div>
          <span className="text-[10px] font-black uppercase tracking-widest bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-400/40 w-fit block">
            Next Client Session
          </span>
          {nextAppointment ? (
            <div>
              <div className="text-2xl font-black tracking-tight">{nextAppointment.customerName}</div>
              <div className="text-xs text-indigo-100 font-medium mt-1">
                {nextAppointment.serviceId === "srv-1" ? "Complete Dental Checkup" : nextAppointment.serviceId === "srv-2" ? "Teeth Whitening" : "Executive Haircut / Consult"}
              </div>
              <div className="flex items-center space-x-4 mt-4 font-mono text-xs bg-indigo-950/40 p-3 rounded-2xl border border-indigo-400/30">
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-amber-300" />
                  <span>{nextAppointment.startTime}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <CalendarIcon className="w-3.5 h-3.5 text-indigo-300" />
                  <span>{nextAppointment.bookingDate === todayStr ? "Today" : nextAppointment.bookingDate}</span>
                </span>
                <span className="bg-white text-slate-900 px-2 py-0.5 rounded font-bold text-[10px] uppercase">
                  Confirmed
                </span>
              </div>
            </div>
          ) : (
            <div className="py-4 text-xs font-bold text-indigo-200">No imminent appointments. You're clear!</div>
          )}
        </div>

        {/* Today Bookings count */}
        <div className="bg-white p-6 rounded-3xl shadow-xs border border-slate-200/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-extrabold uppercase tracking-wider">Today's Schedule</span>
            <Users className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <span className="text-4xl font-black text-slate-900 font-mono">{todaysBookings.length}</span>
            <div className="text-xs text-emerald-600 font-bold mt-1">Clients confirmed today</div>
          </div>
        </div>

        {/* Pending Approval hold count */}
        <div className="bg-white p-6 rounded-3xl shadow-xs border border-slate-200/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-extrabold uppercase tracking-wider">Waitlist / Approvals</span>
            <ShieldAlert className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <span className="text-4xl font-black text-amber-600 font-mono">{pendingApprovals.length}</span>
            <div className="text-xs text-amber-700 font-bold mt-1">Require manual review</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center space-x-2 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200/80 mb-8 w-fit overflow-x-auto">
        {[
          { id: "today", label: `Today's Pipeline (${todaysBookings.length})`, icon: Clock },
          { id: "upcoming", label: `All Upcoming Roster (${upcomingClients.length})`, icon: CalendarIcon },
          { id: "availability", label: "Break Times & Custom Availability", icon: Coffee },
          { id: "qr_kiosk", label: "QR Check-in Kiosk", icon: QrCode },
        ].map((t) => {
          const Icon = t.icon;
          const isSel = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all shrink-0 cursor-pointer ${
                isSel ? "bg-slate-900 text-white shadow-md" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSel ? "text-indigo-400" : "text-slate-400"}`} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Container */}
      <div className="min-h-[450px]">
        
        {/* TODAY'S SCHEDULE TAB */}
        {activeTab === "today" && (
          <div className="space-y-4 animate-in fade-in">
            {todaysBookings.length === 0 ? (
              <div className="py-20 bg-white rounded-3xl border border-slate-200 text-center space-y-3">
                <div className="text-4xl">☕</div>
                <div className="text-base font-black text-slate-800">No Clients Scheduled for Today</div>
                <p className="text-xs text-slate-400">Enjoy your open window or check your custom Availability rules.</p>
              </div>
            ) : (
              todaysBookings.map((bk) => (
                <div key={bk.id} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md hover:shadow-lg transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex items-start space-x-4">
                    <span className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 font-mono font-bold text-sm flex flex-col items-center justify-center shrink-0 border border-indigo-100">
                      <span>{bk.startTime.split(":")[0]}</span>
                      <span className="text-[9px] uppercase font-sans font-semibold text-slate-400">{Number(bk.startTime.split(":")[0]) >= 12 ? "PM" : "AM"}</span>
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-base text-slate-900">{bk.customerName}</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded uppercase">
                          Confirmed
                        </span>
                      </div>
                      <div className="text-xs font-bold text-indigo-600">
                        {bk.serviceId === "srv-1" ? "Complete Dental Checkup" : bk.serviceId === "srv-2" ? "Diamond Laser Teeth Whitening" : "Executive Growth & Strategy"}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center space-x-3 pt-1">
                        <span>📞 {bk.customerPhone}</span>
                        <span>✉️ {bk.customerEmail}</span>
                      </div>
                      {bk.notes && (
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 italic mt-2">
                          💡 Notes: {bk.notes}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
                    <button
                      onClick={() => {
                        setNoteModal(bk);
                        setClientNotes(bk.notes || "");
                      }}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Add / Edit Notes</span>
                    </button>

                    <button
                      onClick={() => updateBookingStatus(bk.id, "completed")}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl flex items-center space-x-1 shadow-md transition-colors cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>Mark Completed</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* UPCOMING CLIENTS TAB */}
        {activeTab === "upcoming" && (
          <div className="space-y-4 animate-in fade-in">
            {upcomingClients.map((bk) => (
              <div key={bk.id} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-start space-x-4">
                  <span className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-700 font-mono font-black text-xs flex flex-col items-center justify-center shrink-0 border border-purple-100 text-center">
                    <span>{new Date(bk.bookingDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                  </span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-extrabold text-base text-slate-900">{bk.customerName}</span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${bk.status === "pending" || bk.waitlist ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`}>
                        {bk.waitlist ? "Waitlist Request" : bk.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 font-medium mt-1">
                      Slot: <strong className="font-mono text-slate-900">{bk.startTime} - {bk.endTime}</strong>
                    </div>
                    {bk.notes && <p className="text-xs text-slate-500 mt-1 italic line-clamp-1">{bk.notes}</p>}
                  </div>
                </div>

                <div className="flex items-center space-x-2 flex-wrap gap-2 justify-end">
                  {bk.status === "pending" || bk.waitlist ? (
                    <button
                      onClick={() => updateBookingStatus(bk.id, "confirmed")}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      Approve & Confirm Slot
                    </button>
                  ) : null}

                  <button
                    onClick={() => {
                      setNoteModal(bk);
                      setClientNotes(bk.notes || "");
                    }}
                    className="px-3 py-1.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200"
                  >
                    Notes
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Block slot & cancel appointment?")) updateBookingStatus(bk.id, "cancelled");
                    }}
                    className="px-3 py-1.5 bg-rose-50 text-rose-700 font-bold text-xs rounded-xl hover:bg-rose-100"
                  >
                    Block / Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BREAK TIMES & WEEKLY AVAILABILITY CONFIGURATOR TAB */}
        {activeTab === "availability" && (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-lg space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-black text-slate-900">Weekly Working Rules & Lunch Breaks</h2>
                <p className="text-xs text-slate-500">
                  Configure specific Monday-Sunday available hours. The Smart Slot Engine strictly honors these breaks.
                </p>
              </div>

              <button
                onClick={handleSaveAvailability}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-extrabold text-xs shadow-lg flex items-center space-x-2 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Availability</span>
              </button>
            </div>

            {saveSuccess && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-4 rounded-2xl font-bold text-xs flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Working hours and lunch break windows successfully saved and synced to the time slot calculator!</span>
              </div>
            )}

            {/* Custom Rules Editor Grid */}
            <div className="space-y-4">
              {staffRules.map((rule, idx) => (
                <div
                  key={rule.dayOfWeek}
                  className={`p-5 rounded-2xl border flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 transition-all ${
                    rule.active ? "bg-slate-50/80 border-slate-200 shadow-xs" : "bg-slate-100/50 border-slate-200 opacity-60"
                  }`}
                >
                  <div className="flex items-center space-x-4 min-w-[150px]">
                    <input
                      type="checkbox"
                      checked={rule.active}
                      onChange={(e) => handleRuleChange(idx, { active: e.target.checked })}
                      className="w-5 h-5 rounded-md text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                    <span className="font-extrabold text-sm text-slate-900">{rule.dayOfWeek}</span>
                  </div>

                  {rule.active ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 flex-grow w-full lg:w-auto">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Duty Start Time</label>
                        <input
                          type="time"
                          value={rule.startTime}
                          onChange={(e) => handleRuleChange(idx, { startTime: e.target.value })}
                          className="p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold font-mono w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Duty End Time</label>
                        <input
                          type="time"
                          value={rule.endTime}
                          onChange={(e) => handleRuleChange(idx, { endTime: e.target.value })}
                          className="p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold font-mono w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-amber-600 uppercase mb-1">Lunch / Break Start</label>
                        <input
                          type="time"
                          value={rule.breakStart || ""}
                          onChange={(e) => handleRuleChange(idx, { breakStart: e.target.value })}
                          className="p-2.5 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs font-bold font-mono w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-amber-600 uppercase mb-1">Lunch / Break End</label>
                        <input
                          type="time"
                          value={rule.breakEnd || ""}
                          onChange={(e) => handleRuleChange(idx, { breakEnd: e.target.value })}
                          className="p-2.5 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs font-bold font-mono w-full"
                        />
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-lg">
                      Weekend / Day Closed
                    </span>
                  )}
                </div>
              ))}
            </div>

          </div>
        )}

        {/* QR CODE CHECK-IN KIOSK TAB */}
        {activeTab === "qr_kiosk" && (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-lg space-y-8 animate-in fade-in max-w-3xl mx-auto text-center">
            <div className="space-y-2">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mx-auto shadow-md">
                <QrCode />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Express QR Lobby Scanner Kiosk</h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Scan your customer's digital lobby pass upon arrival or type their token to mark live attendance.
              </p>
            </div>

            {/* Simulated Barcode Input form */}
            <form onSubmit={handleScanQR} className="space-y-4 max-w-md mx-auto pt-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={scanTokenInput}
                  onChange={(e) => setScanTokenInput(e.target.value)}
                  placeholder="Paste QR Token (e.g. 'QR_ELEM_101_DENTAL')"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-indigo-500 rounded-2xl font-mono text-xs font-black text-slate-900 focus:bg-white focus:outline-hidden shadow-inner"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-sm shadow-xl transition-colors cursor-pointer"
              >
                Simulate Laser Scanner Authorization
              </button>
            </form>

            {/* Scanned authorization feedback card */}
            {scannedResult && (
              <div className={`p-6 rounded-3xl text-left border-2 space-y-4 animate-in zoom-in-95 ${
                scannedResult.booking ? "bg-emerald-50 border-emerald-500 text-emerald-950" : "bg-rose-50 border-rose-500 text-rose-950"
              }`}>
                <div className="font-extrabold text-sm flex items-center space-x-2">
                  <span className="text-2xl">{scannedResult.booking ? "🎉" : "⚠️"}</span>
                  <span>{scannedResult.message}</span>
                </div>
                {scannedResult.booking && (
                  <div className="bg-white p-4 rounded-2xl border border-emerald-200 space-y-2 text-xs font-mono">
                    <div>CLIENT: <strong className="font-sans font-black">{scannedResult.booking.customerName}</strong></div>
                    <div>SERVICE: <span className="font-sans">{scannedResult.booking.serviceId}</span></div>
                    <div>STATUS: <span className="bg-emerald-600 text-white px-2 py-0.5 rounded font-bold">COMPLETED</span></div>
                  </div>
                )}
              </div>
            )}

            <div className="text-[11px] text-slate-400 font-mono pt-6">
              💡 Portfolio proof: Demonstrates interactive real-time attendance workflow for physical clinics, salons, and gyms.
            </div>
          </div>
        )}

      </div>

      {/* MODAL: ADD / EDIT CLIENT NOTES */}
      {noteModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-black text-lg text-slate-900">Notes for {noteModal.customerName}</h3>
              <button onClick={() => setNoteModal(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSaveNotes} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Provider Confidential Notes</label>
                <textarea
                  rows={4}
                  required
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  placeholder="Medical conditions, hair color formulation ratios, previous coach advice..."
                  className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-medium outline-hidden"
                ></textarea>
              </div>

              <div className="pt-4 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setNoteModal(null)}
                  className="w-full py-3 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white font-extrabold text-xs rounded-xl shadow-lg hover:bg-indigo-700"
                >
                  Save Confidential Notes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
