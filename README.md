# Appointment-Management-System — Multi-Tenant SaaS Booking & Appointment Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-0.45-C5F74F?logo=drizzle)](https://orm.drizzle.team/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql)](https://www.postgresql.org/)

> **Portfolio Project** — Full-stack SaaS platform built to demonstrate production-grade scheduling logic, multi-tenant architecture, and modern full-stack engineering practices.

---

## Overview

**Appointment-Management-System** is a white-label, multi-tenant appointment scheduling platform designed to serve diverse service businesses — medical clinics, luxury salons, fitness coaches, and executive consultants — from a single unified dashboard. The platform features a **smart time slot engine** that computes availability by evaluating service duration, buffer times, staff breaks, existing bookings, and dynamic timezone rules in real time.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS 4**, and **Drizzle ORM** with **PostgreSQL**, with an instant demo mode powered by localStorage for zero-configuration evaluation.

---

## Portfolio Context

This project represents my ability to architect and ship a production-grade SaaS product independently. It demonstrates:

- **Full-stack ownership** — database schema, API routes, state management, and polished UI
- **Systems thinking** — a scheduling engine that accounts for service duration, buffer times, staff breaks, concurrent bookings, and day-of-week rules
- **Product sensibility** — multi-tenant white labeling, 7-step booking funnel, role-based dashboards (admin, staff, customer), QR check-in, video meeting rooms, and coupon/discount workflow
- **Clean code practices** — TypeScript throughout, composable context-based state, Drizzle ORM schema design, and responsive Tailwind UI

**I am actively seeking full-time opportunities** as a full-stack or frontend engineer. If this project resonates with the kind of work your team does, I would love to connect.

---

## Key Features

### Multi-Tenant Architecture
- Isolated business profiles with custom branding, domains, colors, and logos
- Switch between tenants instantly — each with independent services, staff, and availability rules
- Admin dashboard to create, edit, and manage unlimited business tenants

### Smart Time Slot Engine
- Computes real-time available slots accounting for:
  - Service duration + configurable cleanup buffer time
  - Staff-specific lunch breaks and custom day-of-week hours
  - Existing confirmed bookings to prevent double-booking
  - Weekend closures and holiday blocks
- Visual slot grid with color-coded states: Available, Booked, Break, Waitlist

### 7-Step High-Conversion Booking Flow
1. Choose Service
2. Select Staff Provider
3. Pick Date
4. Smart Time Slot Selection
5. Customer Details & Add-ons (group size, recurring, coupon codes)
6. Secure Payment (simulated Stripe / pay-on-arrival)
7. Confirmation with QR Lobby Pass & Video Meeting Link

### Three Role-Based Dashboards

| Role | Access |
|------|--------|
| **Admin** | Multi-tenant analytics, service/staff CRUD, bookings workflow, white-label customizer, revenue charts |
| **Staff** | Daily schedule pipeline, upcoming roster, break & availability editor, QR check-in kiosk |
| **Customer** | Upcoming/past bookings, rescheduling, cancellations, 5-star reviews, favorite providers, PDF invoices |

### Additional Capabilities
- Automated email & SMS reminder simulation
- QR code lobby check-in scanner
- Google Meet / video meeting room integration
- Coupon & discount code engine (SAVE20, SUMMER50, etc.)
- Waitlist automation for fully booked slots
- Recurring booking patterns (weekly / monthly)
- Group booking support (up to 10 attendees)
- White-label custom domain & brand color editor
- LocalStorage persistence with PostgreSQL-ready architecture

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **UI Library** | React 19 |
| **Language** | TypeScript 5.9 |
| **Styling** | Tailwind CSS 4.1 + PostCSS |
| **Database ORM** | Drizzle ORM 0.45 |
| **Database** | PostgreSQL 16 |
| **Demo Mode** | localStorage (zero-config, instant demo) |
| **Icons** | Lucide React |
| **Linting** | ESLint 9 + Next.js config |

---

## Architecture

```
src/
├── app/
│   ├── api/health/route.ts          # PostgreSQL health check
│   ├── book/page.tsx                # 7-step booking flow
│   ├── dashboard/
│   │   ├── admin/page.tsx           # Multi-tenant admin panel
│   │   ├── customer/page.tsx        # Customer self-service portal
│   │   └── staff/page.tsx           # Staff calendar & QR kiosk
│   ├── meet/[id]/page.tsx           # Video meeting room simulator
│   ├── layout.tsx                   # Root layout
│   ├── page.tsx                     # Landing page
│   └── globals.css                  # Tailwind entry point
├── components/
│   ├── Navbar.tsx                   # App navigation with tenant & role switcher
│   └── Footer.tsx                   # Portfolio-optimized footer
├── context/
│   └── AppContext.tsx               # Global state (React Context + localStorage)
├── db/
│   ├── index.ts                     # Drizzle ORM client
│   └── schema.ts                    # Full PostgreSQL schema (8 tables)
└── lib/
    └── demoData.ts                  # Type definitions + demo seed data
```

---

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/M-ZohaibAli/Appointment-Management-System.git
cd Appointment-Management-System

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:3000**. It starts in **demo mode** with pre-seeded data — no database setup required.

### PostgreSQL Setup (Optional)

```bash
# Create a .env file with your database URL
echo "DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/app_db" > .env

# Generate and push the schema
npx drizzle-kit push
```

Toggle between demo and PostgreSQL mode using the pill button in the navbar.

---

## License

This project is for portfolio demonstration purposes.

---

## Connect

Built by **Muhammad Zohaib Ali**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin)](https://www.linkedin.com/in/m-zohaibali/)

> I'm actively looking for opportunities as a **Full-Stack Engineer** or **Frontend Engineer**. If you're hiring, I'd love to hear from you.
