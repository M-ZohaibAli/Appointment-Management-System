"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import {
  Calendar,
  UserCheck,
  Briefcase,
  Layers,
  Sparkles,
  ChevronDown,
  Database,
  Sliders,
  ShieldAlert,
  Menu,
  X,
  Bell,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const {
    currentUser,
    switchRole,
    dbMode,
    setDbMode,
    businesses,
    activeBusiness,
    setActiveBusinessId,
    notifications,
  } = useApp();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tenantDropdown, setTenantDropdown] = useState(false);
  const [roleDropdown, setRoleDropdown] = useState(false);
  const [notifDropdown, setNotifDropdown] = useState(false);

  const unreadNotifs = notifications.filter((n) => n.status === "sent");

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Book Appointment", href: "/book" },
    { name: "Customer Portal", href: "/dashboard/customer" },
    { name: "Staff Calendar", href: "/dashboard/staff" },
    { name: "Admin SaaS", href: "/dashboard/admin" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Multi-Tenant Selector */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2 group">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                ⚡
              </span>
              <div>
                <span className="font-extrabold text-xl bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-clip-text text-transparent">
                  AppointPulse
                </span>
                <span className="block text-[10px] font-semibold text-indigo-600 tracking-wider uppercase">
                  Omni Booking SaaS
                </span>
              </div>
            </Link>

            {/* Tenant / Business Switcher */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setTenantDropdown(!tenantDropdown)}
                className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 transition-colors border border-slate-200"
              >
                <span>{activeBusiness.logo}</span>
                <span className="max-w-[140px] truncate">{activeBusiness.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {tenantDropdown && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Switch Business Tenant
                  </div>
                  {businesses.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => {
                        setActiveBusinessId(b.id);
                        setTenantDropdown(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-xs hover:bg-slate-50 transition-colors ${
                        b.id === activeBusiness.id
                          ? "bg-indigo-50/70 font-bold text-indigo-700 border-l-4 border-indigo-600"
                          : "text-slate-700"
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 truncate">
                        <span className="text-base">{b.logo}</span>
                        <div>
                          <div className="truncate">{b.name}</div>
                          <div className="text-[10px] text-slate-500 font-normal">{b.category}</div>
                        </div>
                      </div>
                      {b.id === activeBusiness.id && (
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                      )}
                    </button>
                  ))}
                  <div className="border-t border-slate-100 mt-1 pt-1 px-2">
                    <Link
                      href="/dashboard/admin"
                      onClick={() => setTenantDropdown(false)}
                      className="w-full flex items-center justify-center space-x-1 py-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>+ Add / Manage Tenants</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Bar: Instant Role Switcher & Mode Indicator & Notifications */}
          <div className="flex items-center space-x-3">
            {/* DB Demo Mode Pill */}
            <button
              onClick={() => setDbMode(dbMode === "demo" ? "postgres" : "demo")}
              className={`hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all ${
                dbMode === "demo"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                  : "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100"
              }`}
              title="Click to toggle Database Architecture simulation"
            >
              <Database className="w-3 h-3 animate-pulse" />
              <span>{dbMode === "demo" ? "⚡ Instant Demo Mode" : "🟢 PostgreSQL Mode"}</span>
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdown(!notifDropdown)}
                className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center animate-bounce">
                    {unreadNotifs.length}
                  </span>
                )}
              </button>

              {notifDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800">Live Notifications</span>
                    <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-semibold">
                      {unreadNotifs.length} new
                    </span>
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-400">No recent notifications</div>
                    ) : (
                      notifications.slice(0, 8).map((n) => (
                        <div key={n.id} className="p-3 hover:bg-slate-50 transition-colors text-left">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 bg-slate-100 rounded text-slate-600">
                              {n.type}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {new Date(n.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-xs text-slate-700 line-clamp-2">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Instant Role Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdown(!roleDropdown)}
                className="flex items-center space-x-2 bg-gradient-to-r from-slate-900 to-indigo-900 text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold hover:shadow-lg transition-all"
              >
                <div className="flex flex-col text-right">
                  <span className="text-[10px] text-indigo-300 uppercase tracking-widest font-extrabold">
                    {currentUser.role}
                  </span>
                  <span className="truncate max-w-[100px] sm:max-w-[130px] font-bold">
                    {currentUser.name.split(" ")[0]}
                  </span>
                </div>
                {currentUser.avatar ? (
                  <img src={currentUser.avatar} alt="Avatar" className="w-6 h-6 rounded-full object-cover border border-white" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs">
                    👤
                  </div>
                )}
                <ChevronDown className="w-3.5 h-3.5 text-indigo-300" />
              </button>

              {roleDropdown && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-2 text-[11px] font-bold text-slate-800 border-b border-slate-100 flex items-center justify-between">
                    <span>Instant Client Demo Logins</span>
                    <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-mono">
                      No password required
                    </span>
                  </div>
                  <div className="space-y-1 mt-2">
                    <button
                      onClick={() => {
                        switchRole("admin");
                        setRoleDropdown(false);
                      }}
                      className={`w-full flex items-center space-x-3 p-2.5 rounded-xl text-left transition-all ${
                        currentUser.role === "admin" ? "bg-indigo-600 text-white font-bold" : "hover:bg-slate-100 text-slate-800"
                      }`}
                    >
                      <span className="text-xl">👑</span>
                      <div>
                        <div className="text-xs font-semibold">Admin SaaS Role</div>
                        <div className={`text-[10px] ${currentUser.role === "admin" ? "text-indigo-200" : "text-slate-500"}`}>
                          Manage all tenants, analytics & staff
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        switchRole("staff");
                        setRoleDropdown(false);
                      }}
                      className={`w-full flex items-center space-x-3 p-2.5 rounded-xl text-left transition-all ${
                        currentUser.role === "staff" ? "bg-indigo-600 text-white font-bold" : "hover:bg-slate-100 text-slate-800"
                      }`}
                    >
                      <span className="text-xl">🩺</span>
                      <div>
                        <div className="text-xs font-semibold">Staff Provider Role</div>
                        <div className={`text-[10px] ${currentUser.role === "staff" ? "text-indigo-200" : "text-slate-500"}`}>
                          Dr. Sarah Jenkins - Manage availability
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        switchRole("customer");
                        setRoleDropdown(false);
                      }}
                      className={`w-full flex items-center space-x-3 p-2.5 rounded-xl text-left transition-all ${
                        currentUser.role === "customer" ? "bg-indigo-600 text-white font-bold" : "hover:bg-slate-100 text-slate-800"
                      }`}
                    >
                      <span className="text-xl">🛍️</span>
                      <div>
                        <div className="text-xs font-semibold">Customer Role</div>
                        <div className={`text-[10px] ${currentUser.role === "customer" ? "text-indigo-200" : "text-slate-500"}`}>
                          Michael Chang - Bookings & Invoices
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        switchRole("guest");
                        setRoleDropdown(false);
                      }}
                      className={`w-full flex items-center space-x-3 p-2.5 rounded-xl text-left transition-all ${
                        currentUser.role === "guest" ? "bg-indigo-600 text-white font-bold" : "hover:bg-slate-100 text-slate-800"
                      }`}
                    >
                      <span className="text-xl">🕶️</span>
                      <div>
                        <div className="text-xs font-semibold">Guest Role</div>
                        <div className={`text-[10px] ${currentUser.role === "guest" ? "text-indigo-200" : "text-slate-500"}`}>
                          New visitor exploring platform
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-4">
          <div className="py-2 border-b border-slate-100">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Select Tenant Business
            </span>
            <div className="grid grid-cols-2 gap-2">
              {businesses.map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    setActiveBusinessId(b.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 p-2 rounded-xl text-left border ${
                    b.id === activeBusiness.id
                      ? "border-indigo-600 bg-indigo-50 font-bold text-indigo-700"
                      : "border-slate-200 text-slate-700"
                  }`}
                >
                  <span>{b.logo}</span>
                  <span className="text-xs truncate">{b.name}</span>
                </button>
              ))}
            </div>
          </div>

          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Main Navigation</span>
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`p-3 rounded-xl font-semibold text-sm transition-colors ${
                  pathname === link.href ? "bg-indigo-600 text-white" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => setDbMode(dbMode === "demo" ? "postgres" : "demo")}
              className="w-full flex items-center justify-center space-x-2 p-3 rounded-xl border border-slate-300 bg-slate-50 text-xs font-bold"
            >
              <Database className="w-4 h-4 text-indigo-600" />
              <span>Mode: {dbMode === "demo" ? "⚡ Immediate Demo (LocalStorage)" : "🟢 PostgreSQL Engine"}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
