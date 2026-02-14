"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Business, Service, Staff, Booking } from "@/lib/demoData";
import {
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  PieChart,
  Briefcase,
  Sliders,
  PlusCircle,
  Edit3,
  Trash2,
  Sparkles,
  Layers,
  Search,
  CheckCircle2,
  XCircle,
  Palette,
  Globe,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";

export default function AdminSaaSDashboard() {
  const {
    businesses,
    activeBusiness,
    setActiveBusinessId,
    addBusiness,
    updateBusiness,
    services,
    addService,
    updateService,
    deleteService,
    staff,
    addStaff,
    deleteStaff,
    bookings,
    updateBookingStatus,
    currentUser,
  } = useApp();

  // Active View Tab
  const [activeTab, setActiveTab] = useState<"analytics" | "services" | "staff" | "bookings" | "whitelabel">("analytics");

  // Selected Tenant filter for Admin views
  const [adminBizId, setAdminBizId] = useState<string>(activeBusiness.id);
  const curAdminBiz = businesses.find((b) => b.id === adminBizId) || businesses[0];

  // Modals state
  const [newBizModal, setNewBizModal] = useState(false);
  const [newBizName, setNewBizName] = useState("");
  const [newBizLogo, setNewBizLogo] = useState("⚡");
  const [newBizColor, setNewBizColor] = useState("#3b82f6");
  const [newBizCategory, setNewBizCategory] = useState("Consulting Hub");

  const [newSrvModal, setNewSrvModal] = useState(false);
  const [editSrvModal, setEditSrvModal] = useState<Service | null>(null);
  const [srvName, setSrvName] = useState("");
  const [srvDesc, setSrvDesc] = useState("");
  const [srvDuration, setSrvDuration] = useState(45);
  const [srvPrice, setSrvPrice] = useState(120);
  const [srvCategory, setSrvCategory] = useState("Premium Session");
  const [srvBuffer, setSrvBuffer] = useState(15);

  const [newStaffModal, setNewStaffModal] = useState(false);
  const [staffName, setStaffName] = useState("");
  const [staffEmail, setStaffEmail] = useState("");
  const [staffPhone, setStaffPhone] = useState("");
  const [staffRole, setStaffRole] = useState("Executive Partner");
  const [staffBio, setStaffBio] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  // Data pre-filters
  const filteredBookings = bookings.filter((b) => b.businessId === adminBizId || adminBizId === "all");
  const filteredServices = services.filter((s) => s.businessId === adminBizId || adminBizId === "all");
  const filteredStaff = staff.filter((st) => st.businessId === adminBizId || adminBizId === "all");

  // KPI Statistics calculations
  const totalBookingsCount = filteredBookings.length;
  const totalRevenue = filteredBookings.filter((b) => b.status === "confirmed" || b.status === "completed").reduce((acc, b) => acc + b.totalPrice, 0);
  const upcomingCount = filteredBookings.filter((b) => b.status === "confirmed" || b.status === "pending").length;
  const totalCustomers = new Set(filteredBookings.map((b) => b.customerEmail)).size;
  const conversionRate = 64.8; // simulated highly realistic SaaS conversion rate

  const handleCreateBusiness = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBizName.trim()) return;

    addBusiness({
      name: newBizName,
      logo: newBizLogo,
      brandColor: newBizColor,
      category: newBizCategory,
      domain: `${newBizName.toLowerCase().replace(/[^a-z0-9]/g, "")}.appointpulse.com`,
      address: "100 Innovation Plaza, Floor 4, Suite 400",
      phone: "+1 (555) 999-0001",
    });

    setNewBizModal(false);
    setNewBizName("");
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!srvName.trim()) return;

    addService({
      businessId: adminBizId === "all" ? businesses[0].id : adminBizId,
      name: srvName,
      description: srvDesc,
      duration: srvDuration,
      price: srvPrice,
      category: srvCategory,
      color: curAdminBiz.brandColor,
      bufferTime: srvBuffer,
    });

    setNewSrvModal(false);
    resetSrvForm();
  };

  const handleUpdateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editSrvModal || !srvName.trim()) return;

    updateService(editSrvModal.id, {
      name: srvName,
      description: srvDesc,
      duration: srvDuration,
      price: srvPrice,
      category: srvCategory,
      bufferTime: srvBuffer,
    });

    setEditSrvModal(null);
    resetSrvForm();
  };

  const resetSrvForm = () => {
    setSrvName("");
    setSrvDesc("");
    setSrvDuration(45);
    setSrvPrice(120);
    setSrvCategory("Premium Session");
    setSrvBuffer(15);
  };

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffName.trim()) return;

    addStaff({
      businessId: adminBizId === "all" ? businesses[0].id : adminBizId,
      name: staffName,
      email: staffEmail || "specialist@example.com",
      phone: staffPhone || "+1 (555) 000-0000",
      role: staffRole,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      bio: staffBio || "Expert specialist committed to absolute client excellence.",
      rating: 5.0,
    });

    setNewStaffModal(false);
    setStaffName("");
    setStaffEmail("");
    setStaffPhone("");
    setStaffBio("");
  };

  // Helper to get Staff Name for bookings table
  const getStaffName = (staffId: string) => {
    const f = staff.find((s) => s.id === staffId);
    return f ? f.name : "Professional Provider";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Multi-Business Switcher & Admin Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-indigo-950 text-white rounded-3xl p-8 shadow-2xl mb-10 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-xs font-mono font-black uppercase tracking-widest bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1 rounded-full shadow-lg">
            👑 Executive Admin SaaS Portal
          </span>
          <h1 className="text-3xl font-black text-white tracking-tight pt-2">Multi-Tenant Management Hub</h1>
          <p className="text-xs text-slate-300">
            Supervise global revenue, tenant configuration, smart time slot rules, and multi-business analytics.
          </p>
        </div>

        {/* Tenant Filter Selector */}
        <div className="flex items-center space-x-3 bg-slate-800/90 p-2.5 rounded-2xl border border-slate-700 shadow-md">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider pl-2">Branch:</span>
          <select
            value={adminBizId}
            onChange={(e) => setAdminBizId(e.target.value)}
            className="bg-slate-900 text-white text-xs font-extrabold px-4 py-2 rounded-xl border border-slate-700 cursor-pointer outline-hidden"
          >
            <option value="all">All Tenant Branches Combined 🌐</option>
            {businesses.map((b) => (
              <option key={b.id} value={b.id}>
                {b.logo} {b.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => setNewBizModal(true)}
            title="Create New Tenant Business"
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Stats Sequence */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">Total Bookings</span>
            <Calendar className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <span className="text-3xl font-black text-slate-900 font-mono">{totalBookingsCount}</span>
            <div className="text-[10px] text-emerald-600 font-bold mt-1">↗ +14.2% from last month</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">Total Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <span className="text-3xl font-black text-slate-900 font-mono">${totalRevenue.toFixed(2)}</span>
            <div className="text-[10px] text-emerald-600 font-bold mt-1">↗ Highly Profitable</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">Upcoming Hold</span>
            <TrendingUp className="w-4 h-4 text-purple-600" />
          </div>
          <div>
            <span className="text-3xl font-black text-slate-900 font-mono">{upcomingCount}</span>
            <div className="text-[10px] text-purple-600 font-bold mt-1">Confirmed Sessions</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">Unique Clients</span>
            <Users className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <span className="text-3xl font-black text-slate-900 font-mono">{totalCustomers}</span>
            <div className="text-[10px] text-amber-600 font-bold mt-1">Active Accounts</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">Conversion Ratio</span>
            <PieChart className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <span className="text-3xl font-black text-indigo-600 font-mono">{conversionRate}%</span>
            <div className="text-[10px] text-slate-500 font-bold mt-1">Powered by 7-step flow</div>
          </div>
        </div>
      </div>

      {/* Admin Tab Nav Bar */}
      <div className="flex items-center space-x-2 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200/80 mb-8 overflow-x-auto w-fit">
        {[
          { id: "analytics", label: "Interactive Analytics & Trends", icon: BarChart3 },
          { id: "services", label: `Services Setup (${filteredServices.length})`, icon: Briefcase },
          { id: "staff", label: `Staff Providers (${filteredStaff.length})`, icon: Users },
          { id: "bookings", label: `All Bookings Engine (${filteredBookings.length})`, icon: Layers },
          { id: "whitelabel", label: "White Label Business Customizer", icon: Palette },
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

      {/* Main Container */}
      <div className="min-h-[500px]">
        
        {/* ANALYTICS & VISUAL CHARTS TAB */}
        {activeTab === "analytics" && (
          <div className="space-y-8 animate-in fade-in">
            {/* Charts Row 1: Bookings Per Day & Revenue Trends */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Bookings Per Day Chart */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">Bookings Per Day (Last 7 Days)</h3>
                    <p className="text-[11px] text-slate-500">Volume across scheduled multi-tenant dates</p>
                  </div>
                  <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded">SVG Peak Sync</span>
                </div>

                {/* SVG Beautiful Bar Graph */}
                <div className="h-56 flex items-end justify-between pt-6 px-2 gap-3">
                  {[
                    { day: "Mon", count: 12, height: "60%" },
                    { day: "Tue", count: 18, height: "90%" },
                    { day: "Wed", count: 14, height: "70%" },
                    { day: "Thu", count: 20, height: "100%" },
                    { day: "Fri", count: 16, height: "80%" },
                    { day: "Sat", count: 8, height: "40%" },
                    { day: "Sun", count: 5, height: "25%" },
                  ].map((bar) => (
                    <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                      <span className="text-[10px] font-mono font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        {bar.count}
                      </span>
                      <div
                        className="w-full bg-gradient-to-t from-indigo-600 to-purple-500 rounded-xl group-hover:from-indigo-500 group-hover:to-purple-400 transition-all shadow-md group-hover:scale-y-105"
                        style={{ height: bar.height }}
                      ></div>
                      <span className="text-xs font-bold text-slate-500">{bar.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Revenue Trends Chart */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">Revenue Growth Matrix ($)</h3>
                    <p className="text-[11px] text-slate-500">Gross transaction settlements</p>
                  </div>
                  <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">Highly Stable</span>
                </div>

                {/* Simulated Visual Graph bars */}
                <div className="h-56 flex items-end justify-between pt-6 px-2 gap-3">
                  {[
                    { month: "Sep", val: "$2.4K", height: "40%" },
                    { month: "Oct", val: "$3.1K", height: "55%" },
                    { month: "Nov", val: "$3.8K", height: "70%" },
                    { month: "Dec", val: "$5.2K", height: "95%" },
                    { month: "Jan", val: "$4.9K", height: "85%" },
                    { month: "Feb", val: "$5.8K", height: "100%" },
                  ].map((bar) => (
                    <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                      <span className="text-[10px] font-mono font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        {bar.val}
                      </span>
                      <div
                        className="w-full bg-gradient-to-t from-emerald-600 to-teal-500 rounded-xl group-hover:from-emerald-500 group-hover:to-teal-400 transition-all shadow-md group-hover:scale-y-105"
                        style={{ height: bar.height }}
                      ></div>
                      <span className="text-xs font-bold text-slate-500">{bar.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Charts Row 2: Most Popular Services & Top Staff Profile Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Most Popular Services list */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-5">
                <h3 className="font-extrabold text-base text-slate-900 border-b border-slate-100 pb-3">Most Popular Booked Services</h3>
                <div className="space-y-4">
                  {[
                    { name: "Complete Dental Checkup & Hygiene Scan", percent: 84, color: "#0ea5e9" },
                    { name: "Executive Haircut & Restyling", percent: 72, color: "#ec4899" },
                    { name: "1-on-1 VIP Strength & Mobility Session", percent: 60, color: "#f59e0b" },
                    { name: "Executive Growth & Pitch Audit", percent: 45, color: "#8b5cf6" },
                  ].map((srv, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-slate-800">
                        <span>{srv.name}</span>
                        <span className="font-mono">{srv.percent}% demand</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${srv.percent}%`, backgroundColor: srv.color }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Staff Members */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-5">
                <h3 className="font-extrabold text-base text-slate-900 border-b border-slate-100 pb-3">Top Staff Members Ranking</h3>
                <div className="space-y-4">
                  {staff.slice(0, 4).map((st) => (
                    <div key={st.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200/60">
                      <div className="flex items-center space-x-3 truncate">
                        <img src={st.avatar} alt={st.name} className="w-10 h-10 rounded-xl object-cover" />
                        <div className="truncate">
                          <div className="font-extrabold text-xs text-slate-900 truncate">{st.name}</div>
                          <div className="text-[10px] text-indigo-600 font-semibold">{st.role}</div>
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <span className="bg-amber-100 text-amber-800 text-[11px] font-black px-2.5 py-1 rounded-full">
                          ★ {st.rating}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SERVICE MANAGEMENT TAB */}
        {activeTab === "services" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
              <div>
                <h2 className="text-lg font-black text-slate-900">Service Customization Engine</h2>
                <p className="text-xs text-slate-500">Business owners can instantly create offerings with custom buffer cleanup times</p>
              </div>

              <button
                onClick={() => {
                  resetSrvForm();
                  setNewSrvModal(true);
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-2xl font-extrabold text-xs shadow-lg flex items-center space-x-2 transition-all cursor-pointer shrink-0"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Add New Service</span>
              </button>
            </div>

            {/* Services List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((srv) => (
                <div key={srv.id} className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-md hover:shadow-xl transition-all space-y-4 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-1.5" style={{ backgroundColor: srv.color }}></div>

                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-black text-base text-slate-900">{srv.name}</h3>
                      <span className="font-black text-base text-emerald-600 font-mono ml-2">${srv.price}</span>
                    </div>

                    <div className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded w-fit">
                      {srv.category}
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">{srv.description}</p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-3 text-slate-600 font-medium font-mono">
                      <span>⏱️ {srv.duration}m</span>
                      <span>+⏳ {srv.bufferTime}m buf</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setEditSrvModal(srv);
                          setSrvName(srv.name);
                          setSrvDesc(srv.description);
                          setSrvDuration(srv.duration);
                          setSrvPrice(srv.price);
                          setSrvCategory(srv.category);
                          setSrvBuffer(srv.bufferTime);
                        }}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 transition-colors"
                        title="Edit Service"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete service "${srv.name}" forever?`)) deleteService(srv.id);
                        }}
                        className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                        title="Delete Service"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STAFF MANAGEMENT TAB */}
        {activeTab === "staff" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
              <div>
                <h2 className="text-lg font-black text-slate-900">Staff & Provider Roster</h2>
                <p className="text-xs text-slate-500">Supervise professionals, specialists, and coaches across multi-tenant branches</p>
              </div>

              <button
                onClick={() => setNewStaffModal(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-2xl font-extrabold text-xs shadow-lg flex items-center space-x-2 transition-all cursor-pointer shrink-0"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Add New Staff Member</span>
              </button>
            </div>

            {/* Staff List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStaff.map((st) => (
                <div key={st.id} className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-md space-y-4 flex flex-col justify-between">
                  <div className="flex items-center space-x-4">
                    <img src={st.avatar} alt={st.name} className="w-16 h-16 rounded-2xl object-cover shadow-xs" />
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900">{st.name}</h3>
                      <div className="text-xs font-bold text-indigo-600">{st.role}</div>
                      <div className="text-[11px] text-amber-500 font-extrabold mt-1">★ {st.rating} verified score</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2">{st.bio}</p>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-mono">{st.email}</span>
                    <button
                      onClick={() => {
                        if (confirm(`Remove provider ${st.name} from business roster?`)) deleteStaff(st.id);
                      }}
                      className="text-rose-500 hover:text-rose-700 font-bold flex items-center space-x-1 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ALL BOOKINGS TAB */}
        {activeTab === "bookings" && (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-lg space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-black text-slate-900">Platform-Wide Bookings & Status Workflow</h2>
                <p className="text-xs text-slate-500">Supervise and transition statuses: Pending, Confirmed, Completed, Cancelled, No Show, Refunded</p>
              </div>

              {/* Quick Search */}
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter client, phone or status..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-hidden"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 uppercase tracking-wider text-[10px] text-slate-400">
                    <th className="pb-3 font-bold">Booking ID</th>
                    <th className="pb-3 font-bold">Client / Contact</th>
                    <th className="pb-3 font-bold">Staff Provider</th>
                    <th className="pb-3 font-bold">Date & Time</th>
                    <th className="pb-3 font-bold">Status</th>
                    <th className="pb-3 font-bold text-right">Amount</th>
                    <th className="pb-3 font-bold text-right">Change Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredBookings
                    .filter((b) => {
                      if (!searchQuery) return true;
                      const q = searchQuery.toLowerCase();
                      return b.customerName.toLowerCase().includes(q) || b.status.toLowerCase().includes(q) || b.id.toLowerCase().includes(q) || b.customerPhone.includes(q);
                    })
                    .map((bk) => (
                      <tr key={bk.id} className="hover:bg-slate-50">
                        <td className="py-4 font-mono font-bold text-indigo-600">#{bk.id}</td>
                        <td className="py-4">
                          <div className="font-black text-slate-900">{bk.customerName}</div>
                          <div className="text-[10px] text-slate-500">{bk.customerPhone} • {bk.customerEmail}</div>
                        </td>
                        <td className="py-4 font-bold text-slate-800">{getStaffName(bk.staffId)}</td>
                        <td className="py-4 font-mono">
                          <div>{bk.bookingDate}</div>
                          <div className="text-[10px] text-slate-500">{bk.startTime} - {bk.endTime}</div>
                        </td>
                        <td className="py-4">
                          <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                            bk.status === "confirmed" ? "bg-emerald-100 text-emerald-800" : bk.status === "completed" ? "bg-indigo-100 text-indigo-800" : bk.status === "pending" ? "bg-amber-100 text-amber-800" : "bg-rose-100 text-rose-800"
                          }`}>
                            {bk.status}
                          </span>
                        </td>
                        <td className="py-4 font-mono font-black text-right text-sm text-slate-900">${bk.totalPrice}</td>
                        <td className="py-4 text-right">
                          <select
                            value={bk.status}
                            onChange={(e) => updateBookingStatus(bk.id, e.target.value as any)}
                            className="bg-slate-100 text-xs font-bold px-2 py-1 rounded-lg border border-slate-300 cursor-pointer focus:outline-hidden"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="no_show">No Show</option>
                            <option value="refunded">Refunded</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* WHITE LABEL SUPPORT & BUSINESS SETTINGS TAB */}
        {activeTab === "whitelabel" && (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-lg space-y-8 animate-in fade-in max-w-4xl mx-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-black text-slate-900">White Label Support & Multi-Tenant Customizer</h2>
                <p className="text-xs text-slate-500">
                  Custom branding instantly updates customer-facing booking portals, custom domain links, and PDF invoices.
                </p>
              </div>
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[11px] font-bold px-3 py-1 rounded-full">
                Custom Domain Ready 🌐
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Form */}
              <div className="space-y-4">
                <span className="text-xs font-black uppercase tracking-wider text-slate-600 block">Edit Active Tenant Branding</span>
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Business Name</label>
                  <input
                    type="text"
                    value={curAdminBiz.name}
                    onChange={(e) => updateBusiness(curAdminBiz.id, { name: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Brand Hex Color</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={curAdminBiz.brandColor}
                      onChange={(e) => updateBusiness(curAdminBiz.id, { brandColor: e.target.value })}
                      className="w-12 h-12 rounded-xl border border-slate-300 cursor-pointer p-1 bg-white shadow-xs"
                    />
                    <input
                      type="text"
                      value={curAdminBiz.brandColor}
                      onChange={(e) => updateBusiness(curAdminBiz.id, { brandColor: e.target.value })}
                      className="flex-grow p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold uppercase outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Brand Logo / Emoji Icon</label>
                  <input
                    type="text"
                    value={curAdminBiz.logo}
                    onChange={(e) => updateBusiness(curAdminBiz.id, { logo: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-lg font-bold outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Custom Brand Domain Proxy</label>
                  <div className="relative">
                    <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={curAdminBiz.domain}
                      onChange={(e) => updateBusiness(curAdminBiz.id, { domain: e.target.value })}
                      className="w-full pl-10 pr-4 p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold text-indigo-600 outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Instant Interactive Live Card Preview */}
              <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl space-y-6 border flex flex-col justify-between" style={{ borderTopColor: curAdminBiz.brandColor, borderTopWidth: "6px" }}>
                <div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>LIVE WHITE-LABEL PREVIEW</span>
                    <span className="text-emerald-400 font-bold">● SSL Secured</span>
                  </div>

                  <div className="flex items-center space-x-3 mt-6">
                    <span className="text-3xl p-3 bg-slate-800 rounded-2xl shadow-inner">{curAdminBiz.logo}</span>
                    <div>
                      <h4 className="text-2xl font-black tracking-tight">{curAdminBiz.name}</h4>
                      <div className="text-[11px] text-indigo-300 font-mono">{curAdminBiz.domain}</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                    This is exactly how your premium checkout portal will look to your VIP customers. Fully branded to your unique aesthetic.
                  </p>
                </div>

                <div 
                  className="py-3 rounded-xl font-extrabold text-xs text-white text-center shadow-lg"
                  style={{ backgroundColor: curAdminBiz.brandColor }}
                >
                  Simulated White-Label CTA Button
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* MODAL: CREATE NEW BUSINESS TENANT */}
      {newBizModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-black text-lg text-slate-900">Create New Business Tenant</h3>
              <button onClick={() => setNewBizModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleCreateBusiness} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Business Niche Name</label>
                <input
                  type="text"
                  required
                  value={newBizName}
                  onChange={(e) => setNewBizName(e.target.value)}
                  placeholder="e.g. Pro Yoga Academy"
                  className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Logo / Emoji</label>
                  <input
                    type="text"
                    required
                    value={newBizLogo}
                    onChange={(e) => setNewBizLogo(e.target.value)}
                    className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-base font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Brand Color</label>
                  <input
                    type="color"
                    value={newBizColor}
                    onChange={(e) => setNewBizColor(e.target.value)}
                    className="w-full h-12 rounded-2xl border border-slate-300 cursor-pointer p-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category / Industry</label>
                <input
                  type="text"
                  required
                  value={newBizCategory}
                  onChange={(e) => setNewBizCategory(e.target.value)}
                  placeholder="e.g. Fitness Coaching"
                  className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-bold"
                />
              </div>

              <div className="pt-4 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setNewBizModal(false)}
                  className="w-full py-3 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white font-extrabold text-xs rounded-xl shadow-lg hover:bg-indigo-700"
                >
                  Launch New Tenant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATE NEW SERVICE */}
      {newSrvModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-black text-lg text-slate-900">Create New Service</h3>
              <button onClick={() => setNewSrvModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleCreateService} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  value={srvName}
                  onChange={(e) => setSrvName(e.target.value)}
                  placeholder="e.g. Master Balayage & Botanical Gloss"
                  className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Description</label>
                <textarea
                  rows={2}
                  value={srvDesc}
                  onChange={(e) => setSrvDesc(e.target.value)}
                  placeholder="What is included during the visit?"
                  className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-medium outline-hidden"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Duration (Mins)</label>
                  <input
                    type="number"
                    required
                    value={srvDuration}
                    onChange={(e) => setSrvDuration(Number(e.target.value))}
                    className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-bold font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    required
                    value={srvPrice}
                    onChange={(e) => setSrvPrice(Number(e.target.value))}
                    className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-bold font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={srvCategory}
                    onChange={(e) => setSrvCategory(e.target.value)}
                    placeholder="e.g. Hair Care"
                    className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-indigo-600 mb-1">Buffer Time (Mins)</label>
                  <input
                    type="number"
                    required
                    value={srvBuffer}
                    onChange={(e) => setSrvBuffer(Number(e.target.value))}
                    className="w-full p-3.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded-2xl text-xs font-bold font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setNewSrvModal(false)}
                  className="w-full py-3 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white font-extrabold text-xs rounded-xl shadow-lg hover:bg-indigo-700"
                >
                  Create Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT SERVICE */}
      {editSrvModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-black text-lg text-slate-900">Edit Service</h3>
              <button onClick={() => setEditSrvModal(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleUpdateService} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  value={srvName}
                  onChange={(e) => setSrvName(e.target.value)}
                  className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Description</label>
                <textarea
                  rows={2}
                  value={srvDesc}
                  onChange={(e) => setSrvDesc(e.target.value)}
                  className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-medium outline-hidden"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Duration (Mins)</label>
                  <input
                    type="number"
                    required
                    value={srvDuration}
                    onChange={(e) => setSrvDuration(Number(e.target.value))}
                    className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-bold font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    required
                    value={srvPrice}
                    onChange={(e) => setSrvPrice(Number(e.target.value))}
                    className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-bold font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={srvCategory}
                    onChange={(e) => setSrvCategory(e.target.value)}
                    className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-indigo-600 mb-1">Buffer Time (Mins)</label>
                  <input
                    type="number"
                    required
                    value={srvBuffer}
                    onChange={(e) => setSrvBuffer(Number(e.target.value))}
                    className="w-full p-3.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded-2xl text-xs font-bold font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setEditSrvModal(null)}
                  className="w-full py-3 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white font-extrabold text-xs rounded-xl shadow-lg hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATE NEW STAFF MEMBER */}
      {newStaffModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-black text-lg text-slate-900">Add New Specialist</h3>
              <button onClick={() => setNewStaffModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleCreateStaff} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Professional Name</label>
                <input
                  type="text"
                  required
                  value={staffName}
                  onChange={(e) => setStaffName(e.target.value)}
                  placeholder="e.g. Dr. Robert Vance"
                  className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={staffEmail}
                    onChange={(e) => setStaffEmail(e.target.value)}
                    placeholder="specialist@example.com"
                    className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={staffPhone}
                    onChange={(e) => setStaffPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-bold font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Professional Role / Specialty</label>
                <input
                  type="text"
                  required
                  value={staffRole}
                  onChange={(e) => setStaffRole(e.target.value)}
                  placeholder="e.g. Senior Aesthetician"
                  className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Short Bio</label>
                <textarea
                  rows={2}
                  value={staffBio}
                  onChange={(e) => setStaffBio(e.target.value)}
                  placeholder="Years of experience and credentials..."
                  className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-medium outline-hidden"
                ></textarea>
              </div>

              <div className="pt-4 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setNewStaffModal(false)}
                  className="w-full py-3 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white font-extrabold text-xs rounded-xl shadow-lg hover:bg-indigo-700"
                >
                  Save Provider
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
