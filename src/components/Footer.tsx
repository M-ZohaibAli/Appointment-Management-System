"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Calendar, Shield, Database, Heart, Cpu, Code } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-12 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand & Overview */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-2.5">
              <span className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-base">
                ⚡
              </span>
              <span className="font-extrabold text-lg text-white tracking-tight">
                AppointPulse
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              The ultimate multi-tenant appointment & booking platform built to demonstrate institutional-grade scheduling logic, PostgreSQL architecture, and real business SaaS value.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-3 py-1.5 rounded-lg w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-mono">Ready for custom deployment</span>
            </div>
          </div>

          {/* Core Platform Use Cases */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-white tracking-wider uppercase block">
              Supported Use Cases
            </span>
            <ul className="space-y-2">
              <li><span className="hover:text-indigo-400 transition-colors cursor-pointer">🩺 Clinics & Medical Doctors</span></li>
              <li><span className="hover:text-indigo-400 transition-colors cursor-pointer">✨ Luxury Salons & Barbers</span></li>
              <li><span className="hover:text-indigo-400 transition-colors cursor-pointer">⚡ Fitness Coaches & Trainers</span></li>
              <li><span className="hover:text-indigo-400 transition-colors cursor-pointer">💼 Executive Consultants & Agencies</span></li>
              <li><span className="hover:text-indigo-400 transition-colors cursor-pointer">📚 Academic Tutors & Mentors</span></li>
            </ul>
          </div>

          {/* Quick Portfolio Feature Highlights */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-white tracking-wider uppercase block">
              Portfolio Highlights
            </span>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                <span>Smart Time Slot Engine</span>
              </li>
              <li className="flex items-center space-x-2">
                <Database className="w-3.5 h-3.5 text-indigo-400" />
                <span>Drizzle PostgreSQL / Hybrid Demo</span>
              </li>
              <li className="flex items-center space-x-2">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                <span>Google Calendar Day/Week/Month Sync</span>
              </li>
              <li className="flex items-center space-x-2">
                <Shield className="w-3.5 h-3.5 text-indigo-400" />
                <span>Multi-Tenant & White Label Ready</span>
              </li>
            </ul>
          </div>

          {/* Switch Roles / Portals */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-white tracking-wider uppercase block">
              Direct Portal Access
            </span>
            <ul className="space-y-2 font-medium">
              <li>
                <Link href="/book" className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center space-x-1">
                  <span>Interactive 7-Step Booking</span>
                  <span>→</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/customer" className="hover:text-white transition-colors block">
                  Customer Self-Service Portal
                </Link>
              </li>
              <li>
                <Link href="/dashboard/staff" className="hover:text-white transition-colors block">
                  Staff Availability & QR Scanner
                </Link>
              </li>
              <li>
                <Link href="/dashboard/admin" className="hover:text-white transition-colors block">
                  Admin Analytics & Multi-Biz Manager
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} AppointPulse SaaS Inc. All rights reserved. Built with Next.js App Router & Tailwind CSS.
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0 font-mono">
            <span>Production Mode Ready</span>
            <span>•</span>
            <span>Local DB Active</span>
            <span>•</span>
            <span>Zero-Config Demo Safe</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
