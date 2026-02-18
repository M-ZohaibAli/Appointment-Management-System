"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Booking, Staff } from "@/lib/demoData";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCw,
  Printer,
  Star,
  Heart,
  ChevronRight,
  Bell,
  FileText,
  User,
  Sparkles,
  Search,
  Filter,
} from "lucide-react";

export default function CustomerDashboard() {
  const {
    currentUser,
    bookings,
    updateBookingStatus,
    rescheduleBooking,
    staff,
    businesses,
    favorites,
    toggleFavorite,
    addReview,
    notifications,
  } = useApp();

  // Active Tab
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "cancelled" | "rescheduled" | "favorites" | "invoices">("upcoming");

  // Modals
  const [rescheduleModal, setRescheduleModal] = useState<Booking | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState<string>("");
  const [rescheduleTime, setRescheduleTime] = useState<string>("11:00");

  const [reviewModal, setReviewModal] = useState<Booking | null>(null);
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>("");

  const [searchQuery, setSearchQuery] = useState("");

  // Customer's bookings
  const myBookings = bookings.filter(
    (b) => b.customerEmail.toLowerCase() === currentUser.email.toLowerCase() || b.customerId === currentUser.id || true
  );

  // Filter by search
  const searchedBookings = myBookings.filter((b) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return b.customerName.toLowerCase().includes(q) || b.id.toLowerCase().includes(q) || b.bookingDate.includes(q);
  });

  // Tab filtered
  const upcomingBookings = searchedBookings.filter((b) => b.status === "confirmed" || b.status === "pending");
  const pastBookings = searchedBookings.filter((b) => b.status === "completed");
  const cancelledBookings = searchedBookings.filter((b) => b.status === "cancelled" || b.status === "no_show");
  const rescheduledBookings = searchedBookings.filter((b) => b.notes?.includes("Rescheduled") || false);

  const favoriteStaff = staff.filter((st) => favorites.includes(st.id));

  // Helper to get Business Name
  const getBizName = (bizId: string) => {
    const found = businesses.find((b) => b.id === bizId);
    return found ? found.name : "Elite Service Branch";
  };

  // Helper to get Staff Name
  const getStaffName = (staffId: string) => {
    const found = staff.find((s) => s.id === staffId);
    return found ? found.name : "Professional Specialist";
  };

  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rescheduleModal || !rescheduleDate) return;
    
    // Compute endTime
    const [h, m] = rescheduleTime.split(":").map(Number);
    const endM = h * 60 + m + 45;
    const endStr = `${Math.floor(endM / 60).toString().padStart(2, "0")}:${(endM % 60).toString().padStart(2, "0")}`;

    rescheduleBooking(rescheduleModal.id, rescheduleDate, rescheduleTime, endStr);
    setRescheduleModal(null);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewModal) return;

    addReview({
      bookingId: reviewModal.id,
      businessId: reviewModal.businessId,
      serviceName: "Verified Online Service",
      staffName: getStaffName(reviewModal.staffId),
      rating: reviewRating,
      comment: reviewComment,
      customerName: currentUser.name,
    });

    // mark booking completed if confirmed
    updateBookingStatus(reviewModal.id, "completed");
    setReviewModal(null);
    setReviewComment("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Welcome Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 shadow-2xl mb-10 flex flex-col md:flex-row items-start md:items-center justify-between border border-slate-800 gap-6">
        <div className="flex items-center space-x-5">
          {currentUser.avatar ? (
            <img src={currentUser.avatar} alt="Avatar" className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-500 shadow-md" />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-indigo-600 flex items-center justify-center text-3xl text-white font-bold shadow-md">
              {currentUser.name.charAt(0)}
            </div>
          )}
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-400 bg-indigo-950/80 px-2.5 py-0.5 rounded border border-indigo-800">
              Customer Portal
            </span>
            <h1 className="text-3xl font-black text-white tracking-tight">Welcome back, {currentUser.name}!</h1>
            <p className="text-xs text-slate-400">
              Manage your upcoming sessions, access past payment invoices, and save your preferred providers.
            </p>
          </div>
        </div>

        <Link
          href="/book"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-4 rounded-2xl font-black text-xs shadow-lg shadow-indigo-500/25 transition-all shrink-0"
        >
          <span>+ Schedule New Booking</span>
        </Link>
      </div>

      {/* Tabs & Search Filter Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
        {/* Portal Tabs */}
        <div className="flex items-center overflow-x-auto bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200/80 max-w-full gap-1">
          {[
            { id: "upcoming", label: `Upcoming (${upcomingBookings.length})`, icon: Calendar },
            { id: "past", label: `Past (${pastBookings.length})`, icon: CheckCircle2 },
            { id: "cancelled", label: `Cancelled (${cancelledBookings.length})`, icon: XCircle },
            { id: "rescheduled", label: "Rescheduled", icon: RotateCw },
            { id: "favorites", label: `Favorites (${favoriteStaff.length})`, icon: Heart },
            { id: "invoices", label: "PDF Invoices", icon: FileText },
          ].map((t) => {
            const Icon = t.icon;
            const isSel = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all shrink-0 ${
                  isSel
                    ? "bg-slate-900 text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSel ? "text-indigo-400" : "text-slate-400"}`} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Quick Search Input */}
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search booking ID, service..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-indigo-500 outline-hidden shadow-xs"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold hover:text-slate-600">
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="min-h-[400px]">
        
        {/* UPCOMING / PAST / CANCELLED / RESCHEDULED BOOKINGS GRIDS */}
        {["upcoming", "past", "cancelled", "rescheduled"].includes(activeTab) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in">
            {(() => {
              const targetList =
                activeTab === "upcoming" ? upcomingBookings : activeTab === "past" ? pastBookings : activeTab === "cancelled" ? cancelledBookings : rescheduledBookings;

              if (targetList.length === 0) {
                return (
                  <div className="col-span-full py-16 bg-white rounded-3xl border border-slate-200/80 text-center space-y-3 shadow-xs">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mx-auto">
                      📅
                    </div>
                    <div className="text-sm font-bold text-slate-700">No {activeTab} appointments found</div>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      When you book sessions across any of our branches, they will populate right here.
                    </p>
                  </div>
                );
              }

              return targetList.map((bk) => {
                const isUpcoming = activeTab === "upcoming";
                const isPast = activeTab === "past";

                return (
                  <div key={bk.id} className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-md hover:shadow-xl transition-all space-y-6 flex flex-col justify-between relative overflow-hidden">
                    {bk.waitlist && (
                      <div className="absolute top-0 right-0 bg-amber-500 text-amber-950 text-[9px] font-black px-4 py-1 rounded-bl-xl uppercase tracking-widest">
                        Waitlist Active
                      </div>
                    )}

                    <div className="space-y-4">
                      {/* Top Header */}
                      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-black font-mono text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                            #{bk.id}
                          </span>
                          <span className="text-xs font-bold text-slate-800 truncate max-w-[150px]">
                            {getBizName(bk.businessId)}
                          </span>
                        </div>
                        <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                          bk.status === "confirmed" ? "bg-emerald-100 text-emerald-800" : bk.status === "completed" ? "bg-indigo-100 text-indigo-800" : "bg-rose-100 text-rose-800"
                        }`}>
                          {bk.status}
                        </span>
                      </div>

                      {/* Info lines */}
                      <div className="space-y-2">
                        <div className="text-base font-black text-slate-900">
                          {bk.serviceId === "srv-1" ? "Complete Dental Checkup & Scan" : bk.serviceId === "srv-2" ? "Diamond Laser Teeth Whitening" : bk.serviceId === "srv-3" ? "Executive Haircut & Restyling" : "Executive Consulting Session"}
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-slate-600 font-medium">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>Provider: <strong className="text-slate-800">{getStaffName(bk.staffId)}</strong></span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-slate-600 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Date: <strong className="font-mono text-slate-900">{bk.bookingDate}</strong></span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-slate-600 font-medium">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          <span>Time: <strong className="font-mono text-slate-900">{bk.startTime} - {bk.endTime}</strong></span>
                        </div>
                        {bk.videoMeetingUrl && (
                          <div className="pt-1">
                            <a href={bk.videoMeetingUrl} target="_blank" rel="noreferrer" className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-600 hover:underline">
                              <span>🎥 Virtual Live Room URL</span>
                              <span>↗</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="font-black text-sm text-slate-900 font-mono">${bk.totalPrice}</span>

                      <div className="flex items-center space-x-2">
                        {isUpcoming && (
                          <>
                            <button
                              onClick={() => {
                                setRescheduleModal(bk);
                                setRescheduleDate(bk.bookingDate);
                                setRescheduleTime(bk.startTime);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
                            >
                              Reschedule
                            </button>
                            <button
                              onClick={() => {
                                if (confirm("Are you absolutely sure you want to cancel this booking?")) {
                                  updateBookingStatus(bk.id, "cancelled");
                                }
                              }}
                              className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition-colors"
                            >
                              Cancel
                            </button>
                          </>
                        )}

                        {isPast && (
                          <button
                            onClick={() => setReviewModal(bk)}
                            className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center space-x-1 shadow-xs transition-colors"
                          >
                            <Star className="w-3.5 h-3.5 fill-white" />
                            <span>Leave Review</span>
                          </button>
                        )}

                        <button
                          onClick={() => window.print()}
                          title="Print Receipt"
                          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        )}

        {/* FAVORITE PROVIDERS TAB */}
        {activeTab === "favorites" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in">
            {favoriteStaff.length === 0 ? (
              <div className="col-span-full py-16 bg-white rounded-3xl border border-slate-200/80 text-center space-y-3">
                <Heart className="w-12 h-12 text-slate-300 mx-auto" />
                <div className="text-sm font-bold text-slate-700">No Favorite Providers Saved</div>
                <p className="text-xs text-slate-400">Click the heart icon on any staff member card to bookmark them for fast future bookings.</p>
              </div>
            ) : (
              favoriteStaff.map((st) => (
                <div key={st.id} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md space-y-4 relative">
                  <button
                    onClick={() => toggleFavorite(st.id)}
                    className="absolute top-4 right-4 text-rose-500 p-2 hover:bg-rose-50 rounded-full transition-colors"
                  >
                    <Heart className="w-5 h-5 fill-rose-500" />
                  </button>
                  <img src={st.avatar} alt={st.name} className="w-20 h-20 rounded-2xl object-cover shadow-xs" />
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">{st.name}</h3>
                    <div className="text-xs font-bold text-indigo-600">{st.role}</div>
                    <div className="flex items-center space-x-1 text-xs text-amber-500 font-bold mt-1">
                      ★ <span>{st.rating} rating</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2">{st.bio}</p>
                  <Link
                    href="/book"
                    className="w-full block py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs text-center transition-colors"
                  >
                    Book Appointment Now
                  </Link>
                </div>
              ))
            )}
          </div>
        )}

        {/* INVOICES & NOTIFICATIONS TAB */}
        {activeTab === "invoices" && (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-lg space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-black text-slate-900">Billing History & PDF Invoices</h2>
                <p className="text-xs text-slate-500">All successfully settled payment orders across our SaaS multi-tenant branches</p>
              </div>
              <button onClick={() => window.print()} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer">
                <Printer className="w-4 h-4" />
                <span>Export Summary PDF</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 uppercase tracking-wider text-[10px] text-slate-400">
                    <th className="pb-3 font-bold">Invoice ID</th>
                    <th className="pb-3 font-bold">Service / Description</th>
                    <th className="pb-3 font-bold">Tenant Branch</th>
                    <th className="pb-3 font-bold">Date Settled</th>
                    <th className="pb-3 font-bold">Status</th>
                    <th className="pb-3 font-bold text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {myBookings.map((bk) => (
                    <tr key={bk.id} className="hover:bg-slate-50">
                      <td className="py-4 font-mono font-bold text-indigo-600">INV-{bk.id}</td>
                      <td className="py-4 font-bold text-slate-900">Verified Online Booking Order</td>
                      <td className="py-4">{getBizName(bk.businessId)}</td>
                      <td className="py-4 font-mono">{bk.bookingDate}</td>
                      <td className="py-4">
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                          PAID
                        </span>
                      </td>
                      <td className="py-4 font-mono font-black text-right text-sm text-slate-900">${bk.totalPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* MODAL: RESCHEDULE BOOKING */}
      {rescheduleModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-black text-lg text-slate-900">Reschedule Booking #{rescheduleModal.id}</h3>
              <button onClick={() => setRescheduleModal(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleRescheduleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select New Date</label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select New Time Slot</label>
                <input
                  type="time"
                  required
                  value={rescheduleTime}
                  onChange={(e) => setRescheduleTime(e.target.value)}
                  className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-bold font-mono"
                />
              </div>

              <div className="pt-4 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setRescheduleModal(null)}
                  className="w-full py-3 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white font-extrabold text-xs rounded-xl shadow-lg hover:bg-indigo-700"
                >
                  Confirm Reschedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: LEAVE REVIEW */}
      {reviewModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-slate-200 space-y-6 text-center">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-black text-lg text-slate-900">Rate Your Experience</h3>
              <button onClick={() => setReviewModal(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-6">
              <div>
                <span className="text-xs font-bold text-slate-500 block mb-3">How was your session with {getStaffName(reviewModal.staffId)}?</span>
                <div className="flex justify-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className="p-1 hover:scale-125 transition-transform cursor-pointer"
                    >
                      <Star className={`w-8 h-8 ${star <= reviewRating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <textarea
                  rows={3}
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share your detailed feedback or praise for potential clients..."
                  className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-medium outline-hidden"
                ></textarea>
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setReviewModal(null)}
                  className="w-full py-3 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Skip
                </button>
                <button
                  type="submit"
                  className="w-full py-3 bg-amber-500 text-white font-extrabold text-xs rounded-xl shadow-lg hover:bg-amber-600"
                >
                  Submit 5-Star Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
