"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import {
  Calendar,
  Clock,
  CreditCard,
  BarChart3,
  Sparkles,
  CheckCircle2,
  Users,
  ShieldCheck,
  Zap,
  PhoneCall,
  Smartphone,
  Globe,
  Star,
  ArrowRight,
  TrendingUp,
  Sliders,
  ChevronRight,
  Cpu,
  X,
} from "lucide-react";

export default function LandingPage() {
  const { businesses, setActiveBusinessId, activeBusiness, services, staff, availability } = useApp();
  const [selectedDemoBizId, setSelectedDemoBizId] = useState(businesses[0].id);
  const [pricingPlan, setPricingPlan] = useState<"monthly" | "annually">("annually");

  const activeDemoBiz = businesses.find((b) => b.id === selectedDemoBizId) || businesses[0];
  const demoServices = services.filter((s) => s.businessId === selectedDemoBizId);
  const demoStaff = staff.filter((s) => s.businessId === selectedDemoBizId);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 bg-gradient-to-b from-indigo-50/70 via-purple-50/30 to-white">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-100/80 text-indigo-800 text-xs font-bold border border-indigo-200/80 shadow-xs animate-in fade-in slide-in-from-bottom-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-spin" />
              <span>Institutional-Grade Booking & Appointment Platform SaaS</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-3">
              Instantly Automate Bookings For{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Any Service Business
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal max-w-3xl mx-auto">
              The flexible, multi-tenant scheduling logic platform built for medical clinics, luxury salons, executive coaches, consultants, and agencies. 
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <Link
                href="/book"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold text-base shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all group"
              >
                <span>Launch Interactive Demo</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/dashboard/customer"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-2xl bg-white text-slate-800 font-bold text-base shadow-md border border-slate-200 hover:bg-slate-50 transition-all"
              >
                <span>Test Customer Portal</span>
              </Link>
            </div>

            {/* Impressive proof stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 max-w-3xl mx-auto border-t border-slate-200/80 mt-12">
              <div className="text-center">
                <span className="block text-3xl font-black text-slate-900">100%</span>
                <span className="text-xs text-slate-500 font-medium">Multi-Tenant Brand Ready</span>
              </div>
              <div className="text-center">
                <span className="block text-3xl font-black text-indigo-600">Smart</span>
                <span className="text-xs text-slate-500 font-medium">Slot & Break Engine</span>
              </div>
              <div className="text-center">
                <span className="block text-3xl font-black text-slate-900">7-Step</span>
                <span className="text-xs text-slate-500 font-medium">High-Conversion Flow</span>
              </div>
              <div className="text-center">
                <span className="block text-3xl font-black text-emerald-600">Drizzle</span>
                <span className="text-xs text-slate-500 font-medium">PostgreSQL & Demo Fallback</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Multi-Tenant Business Showcase */}
      <section className="py-20 bg-slate-900 text-white relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/40 to-slate-900 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              White-Label Multi-Tenant Architecture
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              One Platform. Adaptable to Any Niche.
            </h2>
            <p className="text-slate-400 text-sm">
              Click any sample business below to see how our software instantly reconfigures its brand colors, logos, staff rosters, duration buffers, and specific services.
            </p>
          </div>

          {/* Business Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {businesses.map((biz) => {
              const isSel = biz.id === selectedDemoBizId;
              return (
                <button
                  key={biz.id}
                  onClick={() => {
                    setSelectedDemoBizId(biz.id);
                    setActiveBusinessId(biz.id);
                  }}
                  className={`flex items-center space-x-3 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all border ${
                    isSel
                      ? "bg-white text-slate-900 border-white shadow-xl scale-105"
                      : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800"
                  }`}
                >
                  <span className="text-xl">{biz.logo}</span>
                  <span>{biz.name}</span>
                </button>
              );
            })}
          </div>

          {/* Business Live Preview Box */}
          <div 
            className="bg-slate-800/90 rounded-3xl p-6 sm:p-10 border border-slate-700 shadow-2xl max-w-5xl mx-auto transition-all"
            style={{ borderTopColor: activeDemoBiz.brandColor, borderTopWidth: "6px" }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-8 border-b border-slate-700 mb-8">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <span className="text-4xl p-4 bg-slate-700/50 rounded-2xl shadow-inner">{activeDemoBiz.logo}</span>
                <div>
                  <h3 className="text-2xl font-black">{activeDemoBiz.name}</h3>
                  <div className="flex items-center space-x-2 mt-1 text-xs text-slate-400">
                    <span>📍 {activeDemoBiz.address}</span>
                    <span>•</span>
                    <span className="text-indigo-400 font-mono">{activeDemoBiz.domain}</span>
                  </div>
                </div>
              </div>
              <Link
                href="/book"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-extrabold text-xs text-white shadow-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: activeDemoBiz.brandColor }}
              >
                <span>Book With {activeDemoBiz.name}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Sample Services */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Configured Services ({demoServices.length})
                  </span>
                  <span className="text-[11px] text-emerald-400 flex items-center space-x-1 font-mono">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Calculated Buffer Included</span>
                  </span>
                </div>
                <div className="space-y-3">
                  {demoServices.map((srv) => (
                    <div key={srv.id} className="bg-slate-750 p-4 rounded-2xl border border-slate-700/80 hover:border-slate-600 transition-colors">
                      <div className="flex items-center justify-between font-bold text-sm">
                        <span>{srv.name}</span>
                        <span className="text-emerald-400">${srv.price}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{srv.description}</p>
                      <div className="flex items-center space-x-3 mt-3 text-[11px] text-slate-300">
                        <span className="flex items-center space-x-1 bg-slate-700 px-2.5 py-1 rounded-md">
                          <Clock className="w-3 h-3 text-indigo-400" />
                          <span>{srv.duration} min</span>
                        </span>
                        <span className="flex items-center space-x-1 bg-slate-700 px-2.5 py-1 rounded-md">
                          <Zap className="w-3 h-3 text-amber-400" />
                          <span>+{srv.bufferTime} min buffer</span>
                        </span>
                        <span className="bg-indigo-950/80 text-indigo-300 font-mono px-2 py-0.5 rounded text-[10px]">
                          {srv.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Staff */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Dedicated Staff Providers ({demoStaff.length})
                  </span>
                  <Link href="/dashboard/staff" className="text-xs text-indigo-400 hover:text-indigo-300">
                    View Schedule Matrix →
                  </Link>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {demoStaff.map((st) => (
                    <div key={st.id} className="flex items-center space-x-4 bg-slate-750 p-4 rounded-2xl border border-slate-700/80">
                      <img src={st.avatar} alt={st.name} className="w-14 h-14 rounded-2xl object-cover shadow-md" />
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-sm">{st.name}</h4>
                          <span className="flex items-center space-x-1 bg-amber-500/20 text-amber-300 text-xs px-2 py-0.5 rounded-full font-bold">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span>{st.rating}</span>
                          </span>
                        </div>
                        <div className="text-xs text-indigo-400 font-medium">{st.role}</div>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-1">{st.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Simulated Quick Audit info */}
                <div className="mt-6 bg-indigo-950/50 border border-indigo-800/80 rounded-2xl p-4 text-xs space-y-2">
                  <div className="font-bold text-indigo-200 flex items-center space-x-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>Why Clients Choose This Architecture</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Every tenant maintains independent isolated data, customized booking URLs, white-label PDF receipts, custom SMS reminders, and specific automated business rules.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Highlight: Smart Time Slot Engine Deep Dive */}
      <section className="py-20 bg-slate-100 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold border border-amber-200">
                <Cpu className="w-4 h-4 text-amber-600 animate-pulse" />
                <span>Core Engineering Showcase</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
                The Smart Time Slot Engine
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Most basic appointment systems just show crude 30-minute grids. Our scheduling engine mathematically computes availability by evaluating:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start space-x-3 p-3.5 bg-white rounded-2xl shadow-xs border border-slate-200/80">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-xs">Service Duration & Buffer</div>
                    <div className="text-[11px] text-slate-500">Auto-adds 15m cleanup windows</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3.5 bg-white rounded-2xl shadow-xs border border-slate-200/80">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-xs">Staff Custom Breaks</div>
                    <div className="text-[11px] text-slate-500">Perfect lunch hour isolation</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3.5 bg-white rounded-2xl shadow-xs border border-slate-200/80">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-xs">Real-Time Existing Bookings</div>
                    <div className="text-[11px] text-slate-500">Prevents any accidental double booking</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3.5 bg-white rounded-2xl shadow-xs border border-slate-200/80">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-xs">Dynamic Timezone & Hours</div>
                    <div className="text-[11px] text-slate-500">Adapts to exact Monday-Sunday rules</div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/book"
                  className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 font-extrabold text-sm"
                >
                  <span>Experience the Smart Engine in Action</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Simulated interactive visual of the engine calculation */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="text-xs font-extrabold text-slate-800 flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span>Engine Diagnostic Log - Monday Schedule</span>
                </span>
                <span className="font-mono text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  Dr. Jenkins (Dental)
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="font-bold text-emerald-900">09:00 AM - 09:45 AM</span>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-sans font-bold">
                    Available Slot
                  </span>
                </div>

                <div className="p-3 bg-slate-100 border border-slate-300 rounded-xl flex items-center justify-between opacity-75">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                    <span className="line-through text-slate-600">09:45 AM - 10:00 AM</span>
                  </div>
                  <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-sans">
                    +15m Sanitization Buffer
                  </span>
                </div>

                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span className="font-bold text-rose-900">10:00 AM - 10:45 AM</span>
                  </div>
                  <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-sans font-bold flex items-center space-x-1">
                    <span>🔒 Booked (Michael Chang)</span>
                  </span>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="font-bold text-amber-900">01:00 PM - 02:00 PM</span>
                  </div>
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-sans font-bold">
                    ☕ Doctor Lunch Break
                  </span>
                </div>
              </div>

              <div className="bg-indigo-50/80 rounded-2xl p-4 text-center text-xs text-indigo-900 font-medium">
                Clients love scheduling logic that feels lightning fast and respects their daily life.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              Complete Feature Arsenal
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
              Everything You Need to Run 10,000+ Appointments Monthly
            </h2>
            <p className="text-slate-600 text-base">
              Built to replace Calendly, Acuity, and SimplyBook with one unified SaaS architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/80 hover:shadow-xl hover:-translate-y-1 transition-all space-y-4 group">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Calendar />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">Professional Calendar Sync</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Flawless Day, Week, Month, and Agenda scheduling views. Google Calendar and iCal ready with automated blockouts.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/80 hover:shadow-xl hover:-translate-y-1 transition-all space-y-4 group">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <CreditCard />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">Instant Online Payments</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Accept credit cards, simulated Stripe checkouts, deposit holds, or allow trusted repeat customers to pay upon arrival.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/80 hover:shadow-xl hover:-translate-y-1 transition-all space-y-4 group">
              <div className="w-14 h-14 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center text-2xl group-hover:bg-pink-600 group-hover:text-white transition-colors">
                <Smartphone />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">Automated Reminders</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                24-hour, 1-hour, and 15-minute SMS & email reminder sequences. Reduces client no-shows by up to 78%.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/80 hover:shadow-xl hover:-translate-y-1 transition-all space-y-4 group">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <BarChart3 />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">Advanced Business Analytics</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Real-time charts tracking revenue trends, peak booking hours, staff member popularity, and customer cancellation ratios.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/80 hover:shadow-xl hover:-translate-y-1 transition-all space-y-4 group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Zap />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">Waitlist & Add-ons</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                If a desired time slot is completely booked, clients can join an automated waitlist. Includes coupon codes and group bookings.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/80 hover:shadow-xl hover:-translate-y-1 transition-all space-y-4 group">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Globe />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">QR Check-In & Video Links</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Generate dynamic QR codes for client lobby check-in or generate instant Google Meet links for remote coaching & consulting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400"> Flawless Execution</span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">How It Works in 4 Simple Steps</h2>
            <p className="text-slate-400 text-sm">Designed specifically for zero-friction client conversion.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-slate-800/80 p-8 rounded-3xl border border-slate-700 space-y-4 relative">
              <span className="absolute -top-4 -left-4 w-10 h-10 rounded-2xl bg-indigo-600 text-white font-black text-lg flex items-center justify-center shadow-lg">
                1
              </span>
              <h3 className="text-xl font-extrabold text-white pt-2">Choose Service</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Clients pick their desired appointment, whether it's a 45m Haircut or an intensive 60m Dental Hygiene scan.
              </p>
            </div>

            <div className="bg-slate-800/80 p-8 rounded-3xl border border-slate-700 space-y-4 relative">
              <span className="absolute -top-4 -left-4 w-10 h-10 rounded-2xl bg-purple-600 text-white font-black text-lg flex items-center justify-center shadow-lg">
                2
              </span>
              <h3 className="text-xl font-extrabold text-white pt-2">Select Time</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Our smart time slot engine filters out staff breaks, closed weekends, and existing calendar sessions instantly.
              </p>
            </div>

            <div className="bg-slate-800/80 p-8 rounded-3xl border border-slate-700 space-y-4 relative">
              <span className="absolute -top-4 -left-4 w-10 h-10 rounded-2xl bg-pink-600 text-white font-black text-lg flex items-center justify-center shadow-lg">
                3
              </span>
              <h3 className="text-xl font-extrabold text-white pt-2">Confirm & Pay</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Clients enter their details, apply discount coupon codes, and pay securely via Stripe simulation or pay at location.
              </p>
            </div>

            <div className="bg-slate-800/80 p-8 rounded-3xl border border-slate-700 space-y-4 relative">
              <span className="absolute -top-4 -left-4 w-10 h-10 rounded-2xl bg-emerald-600 text-white font-black text-lg flex items-center justify-center shadow-lg">
                4
              </span>
              <h3 className="text-xl font-extrabold text-white pt-2">Automated Sync</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Both provider and customer receive instant confirmation, PDF invoices, and automated SMS reminders prior to arrival.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600"> Client Success Stories</span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">Loved by 500+ Local Businesses</h2>
            <p className="text-slate-600 text-sm">See how business owners scaled their operations with our platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200/80 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex text-amber-400 space-x-1">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  "Switching our dental clinic to this platform brought our no-show rate down to virtually zero. The buffer time calculations are an absolute lifesaver for our hygienists."
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-6 border-t border-slate-100">
                <span className="text-3xl">🦷</span>
                <div>
                  <div className="font-extrabold text-sm">Dr. Arthur Pendelton</div>
                  <div className="text-xs text-slate-500">Founder, Elite Dental New York</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200/80 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex text-amber-400 space-x-1">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  "As a busy high-end salon, our stylists have crazy schedules. The multi-tenant architecture allowed us to run 3 different salon locations from one single admin dashboard!"
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-6 border-t border-slate-100">
                <span className="text-3xl">✨</span>
                <div>
                  <div className="font-extrabold text-sm">Michelle Gomez</div>
                  <div className="text-xs text-slate-500">Owner, Glow Salon & Spa LA</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200/80 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex text-amber-400 space-x-1">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  "Our virtual advisory calls are booked globally. The instant Google Meet links and automated timezone conversions make our consulting business look exceptionally professional."
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-6 border-t border-slate-100">
                <span className="text-3xl">💼</span>
                <div>
                  <div className="font-extrabold text-sm">Harrison Cross</div>
                  <div className="text-xs text-slate-500">Partner, Mindful SaaS Strategy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600"> Transparent Pricing</span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">Simple, Transparent Multi-Tenant SaaS Tiers</h2>
            
            {/* Billing Switcher */}
            <div className="inline-flex items-center p-1.5 bg-slate-100 rounded-2xl border border-slate-200 mx-auto mt-6">
              <button
                onClick={() => setPricingPlan("monthly")}
                className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all ${
                  pricingPlan === "monthly" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setPricingPlan("annually")}
                className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-1.5 ${
                  pricingPlan === "annually" ? "bg-indigo-600 text-white shadow-md" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>Annual Billing</span>
                <span className="bg-emerald-400 text-emerald-950 px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase">
                  Save 25%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Starter */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md flex flex-col justify-between">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  Starter Plan
                </span>
                <div className="mt-6 mb-2">
                  <span className="text-4xl font-black text-slate-900">
                    ${pricingPlan === "annually" ? "29" : "39"}
                  </span>
                  <span className="text-xs text-slate-500 font-medium"> / month</span>
                </div>
                <p className="text-xs text-slate-500 mb-8">Perfect for independent solopreneurs, freelance coaches, or tutors.</p>
                
                <ul className="space-y-4 text-xs font-medium text-slate-700 mb-8">
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>1 Active Business Location</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Up to 2 Staff Providers</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Unlimited Online Bookings</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Automated Email Reminders</span>
                  </li>
                  <li className="flex items-center space-x-2.5 opacity-40">
                    <X className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>SMS Reminders & Waitlists</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/book"
                className="w-full py-3.5 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs text-center hover:bg-slate-200 transition-colors"
              >
                Start 14-Day Free Trial
              </Link>
            </div>

            {/* Pro (Highlighted) */}
            <div className="bg-gradient-to-b from-slate-900 to-indigo-950 text-white p-8 rounded-3xl border-2 border-indigo-500 shadow-2xl flex flex-col justify-between relative scale-105 z-10">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-black text-[10px] px-4 py-1 rounded-full uppercase tracking-widest shadow-lg">
                Most Popular
              </div>

              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 border border-indigo-800/80 px-3 py-1 rounded-full">
                  Professional Plan
                </span>
                <div className="mt-6 mb-2">
                  <span className="text-5xl font-black text-white">
                    ${pricingPlan === "annually" ? "79" : "99"}
                  </span>
                  <span className="text-xs text-indigo-200 font-medium"> / month</span>
                </div>
                <p className="text-xs text-slate-300 mb-8">The standard choice for thriving clinics, luxury salons, and scaling consulting hubs.</p>
                
                <ul className="space-y-4 text-xs font-medium text-slate-200 mb-8">
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Up to 5 Tenant Businesses / Branches</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Unlimited Staff Providers</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Smart Time Slot Engine with Buffers</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>24h & 1h SMS / Push Reminders</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Waitlist, Add-ons & Discount Coupons</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>QR Code Lobby Check-in Scanner</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/book"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-black text-xs text-center shadow-lg hover:opacity-90 transition-opacity"
              >
                Go With Professional
              </Link>
            </div>

            {/* Enterprise */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md flex flex-col justify-between">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                  Enterprise Architecture
                </span>
                <div className="mt-6 mb-2">
                  <span className="text-4xl font-black text-slate-900">
                    ${pricingPlan === "annually" ? "199" : "249"}
                  </span>
                  <span className="text-xs text-slate-500 font-medium"> / month</span>
                </div>
                <p className="text-xs text-slate-500 mb-8">For franchise hospital chains, elite agency networks, and custom API white-label SaaS.</p>
                
                <ul className="space-y-4 text-xs font-medium text-slate-700 mb-8">
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Unlimited Tenant Locations</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Custom Brand Domain Sync</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Dedicated PostgreSQL Drizzle DB Instance</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Priority 24/7 Phone & Slack Support</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Custom EHR & Video Conferencing API</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/dashboard/admin"
                className="w-full py-3.5 rounded-xl bg-slate-900 text-white font-bold text-xs text-center hover:bg-slate-800 transition-colors"
              >
                Contact Enterprise Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
