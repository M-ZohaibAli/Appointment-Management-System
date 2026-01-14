import { pgTable, text, timestamp, integer, boolean, numeric, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(), // UUID or string id
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("customer"), // 'guest', 'customer', 'staff', 'admin'
  avatar: text("avatar"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const businesses = pgTable("businesses", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  logo: text("logo"),
  brandColor: text("brand_color").default("#3b82f6"), // Hex color
  domain: text("domain"),
  address: text("address"),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const staff = pgTable("staff", {
  id: text("id").primaryKey(),
  businessId: text("business_id").references(() => businesses.id, { onDelete: "cascade" }).notNull(),
  userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  role: text("role").default("Specialist"), // e.g., Master Barber, Senior Dentist, Elite Coach
  avatar: text("avatar"),
  bio: text("bio"),
  rating: numeric("rating", { precision: 3, scale: 1 }).default("5.0"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const services = pgTable("services", {
  id: text("id").primaryKey(),
  businessId: text("business_id").references(() => businesses.id, { onDelete: "cascade" }).notNull(),
  name: text("name").notNull(),
  description: text("description"),
  duration: integer("duration").notNull(), // in minutes
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  category: text("category").notNull(),
  color: text("color").default("#3b82f6"),
  bufferTime: integer("buffer_time").default(15).notNull(), // in minutes
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const availability = pgTable("availability", {
  id: text("id").primaryKey(),
  staffId: text("staff_id").references(() => staff.id, { onDelete: "cascade" }).notNull(),
  dayOfWeek: text("day_of_week").notNull(), // 'Monday', 'Tuesday', ...
  startTime: text("start_time").notNull(), // '09:00'
  endTime: text("end_time").notNull(), // '17:00'
  breakStart: text("break_start"), // '13:00'
  breakEnd: text("break_end"), // '14:00'
  active: boolean("active").default(true).notNull(),
});

export const bookings = pgTable("bookings", {
  id: text("id").primaryKey(),
  businessId: text("business_id").references(() => businesses.id, { onDelete: "cascade" }).notNull(),
  serviceId: text("service_id").references(() => services.id, { onDelete: "cascade" }).notNull(),
  staffId: text("staff_id").references(() => staff.id, { onDelete: "cascade" }).notNull(),
  customerId: text("customer_id").references(() => users.id, { onDelete: "set null" }),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  bookingDate: text("booking_date").notNull(), // 'YYYY-MM-DD'
  startTime: text("start_time").notNull(), // '10:00'
  endTime: text("end_time").notNull(), // '10:30'
  status: text("status").default("confirmed").notNull(), // 'pending', 'confirmed', 'completed', 'cancelled', 'no_show', 'refunded'
  groupSize: integer("group_size").default(1).notNull(),
  recurringPattern: text("recurring_pattern").default("none"), // 'none', 'weekly', 'monthly'
  couponCode: text("coupon_code"),
  discountAmount: numeric("discount_amount", { precision: 10, scale: 2 }).default("0"),
  totalPrice: numeric("total_price", { precision: 10, scale: 2 }).notNull(),
  waitlist: boolean("waitlist").default(false).notNull(),
  qrCodeToken: text("qr_code_token"),
  videoMeetingUrl: text("video_meeting_url"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const payments = pgTable("payments", {
  id: text("id").primaryKey(),
  bookingId: text("booking_id").references(() => bookings.id, { onDelete: "cascade" }).notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("USD").notNull(),
  provider: text("provider").default("stripe").notNull(), // 'stripe', 'paypal', 'jazzcash', 'easypaisa', 'cash'
  status: text("status").default("paid").notNull(), // 'pending', 'paid', 'refunded', 'failed'
  receiptUrl: text("receipt_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const reviews = pgTable("reviews", {
  id: text("id").primaryKey(),
  bookingId: text("booking_id").references(() => bookings.id, { onDelete: "cascade" }).notNull(),
  rating: integer("rating").notNull(), // 1 - 5
  comment: text("comment"),
  customerName: text("customer_name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const notifications = pgTable("notifications", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  bookingId: text("booking_id").references(() => bookings.id, { onDelete: "cascade" }),
  type: text("type").notNull(), // 'email', 'sms', 'push', 'reminder'
  message: text("message").notNull(),
  status: text("status").default("sent").notNull(),
  sentAt: timestamp("sent_at").defaultNow().notNull(),
});
