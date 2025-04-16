// User Types
export interface User {
  id: string
  name: string
  email: string
  phone: string
  address?: string
  status: "active" | "inactive"
  role: "user" | "admin"
  joinDate: string
  profileImage?: string
}

export interface UserCreateRequest {
  name: string
  email: string
  phone: string
  password: string
  address?: string
}

export interface UserUpdateRequest {
  name?: string
  email?: string
  phone?: string
  address?: string
  status?: "active" | "inactive"
}

// Car Types
export interface Car {
  id: string
  name: string
  category: string
  price: number
  rating: number
  description: string
  location: string
  image: string
  features: string[]
  status: "available" | "booked" | "maintenance"
  specifications?: CarSpecifications
}

export interface CarSpecifications {
  year: number
  make: string
  model: string
  color: string
  transmission: "automatic" | "manual"
  fuelType: "gasoline" | "diesel" | "electric" | "hybrid"
  seats: number
  mileage?: number
  licensePlate?: string
}

export interface CarCreateRequest {
  name: string
  category: string
  price: number
  description: string
  location: string
  image: string
  features: string[]
  specifications?: CarSpecifications
}

export interface CarUpdateRequest {
  name?: string
  category?: string
  price?: number
  description?: string
  location?: string
  image?: string
  features?: string[]
  status?: "available" | "booked" | "maintenance"
  specifications?: Partial<CarSpecifications>
}

// Booking Types
export interface Booking {
  id: string
  userId: string
  carId: string
  startDate: string
  endDate: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  totalPrice: number
  paymentStatus: "pending" | "paid" | "refunded"
  createdAt: string
  updatedAt: string
  pickupLocation: string
  dropoffLocation: string
  car?: Car
  user?: User
}

export interface BookingCreateRequest {
  carId: string
  startDate: string
  endDate: string
  pickupLocation: string
  dropoffLocation: string
}

export interface BookingUpdateRequest {
  startDate?: string
  endDate?: string
  status?: "pending" | "confirmed" | "completed" | "cancelled"
  paymentStatus?: "pending" | "paid" | "refunded"
  pickupLocation?: string
  dropoffLocation?: string
}

// Payment Types
export interface Payment {
  id: string
  bookingId: string
  userId: string
  amount: number
  currency: string
  status: "pending" | "completed" | "failed" | "refunded"
  paymentMethod: "credit_card" | "paypal" | "bank_transfer"
  transactionId?: string
  createdAt: string
}

export interface PaymentCreateRequest {
  bookingId: string
  amount: number
  currency: string
  paymentMethod: "credit_card" | "paypal" | "bank_transfer"
}

// Review Types
export interface Review {
  id: string
  userId: string
  carId: string
  bookingId: string
  rating: number
  comment: string
  createdAt: string
  user?: User
}

export interface ReviewCreateRequest {
  carId: string
  bookingId: string
  rating: number
  comment: string
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
  error?: string
}

// Auth Types
export interface AuthResponse {
  token: string
  user: User
}

export interface LoginRequest {
  email: string
  password: string
}

export interface OtpLoginRequest {
  phone: string
  countryCode: string
}

export interface OtpVerifyRequest {
  phone: string
  countryCode: string
  otp: string
}

export interface RegisterRequest {
  name: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

// Settings Types
export interface UserSettings {
  id: string
  userId: string
  language: string
  currency: string
  darkMode: boolean
  emailNotifications: boolean
  smsNotifications: boolean
  marketingEmails: boolean
}

export interface UserSettingsUpdateRequest {
  language?: string
  currency?: string
  darkMode?: boolean
  emailNotifications?: boolean
  smsNotifications?: boolean
  marketingEmails?: boolean
}

// System Settings Types
export interface SystemSettings {
  siteName: string
  siteUrl: string
  adminEmail: string
  supportEmail: string
  defaultLanguage: string
  defaultCurrency: string
  maintenanceMode: boolean
  registrationEnabled: boolean
  bookingEnabled: boolean
  paymentEnabled: boolean
}

// Notification Types
export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  createdAt: string
}

// Error Types
export interface ApiError {
  code: string
  message: string
  details?: Record<string, string[]>
}

// Vendor Types
export interface VendorStats {
  totalCars: number
  activeCars: number
  totalBookings: number
  activeBookings: number
  completedBookings: number
  cancelledBookings: number
  totalEarnings: number
  pendingEarnings: number
  averageRating: number
}

export interface VendorBooking {
  id: string
  userId: string
  carId: string
  vendorId: string
  startDate: string
  endDate: string
  status: "pending" | "approved" | "ongoing" | "completed" | "cancelled"
  paymentStatus: "pending" | "complete"
  totalPrice: number
  earnings: number
  commission: number
  createdAt: string
  updatedAt: string
  pickupLocation: string
  dropoffLocation: string
}

export interface VendorCar extends Car {
  vendorId: string
  availabilityCalendar: Array<{
    startDate: string
    endDate: string
    status: "available" | "booked" | "maintenance"
  }>
  documents: Array<{
    type: string
    url: string
    verified: boolean
  }>
  earnings: number
  totalBookings: number
  activeBookings: number
}

// Vendor Types
export interface Vendor {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  businessName: string;
  businessType: 'individual' | 'company';
  registrationNumber: string;
  taxId: string;
  status: "pending" | "approved" | "suspended" | "rejected";
  joinDate: string;
  profileImage?: string;
  verified: boolean;
  rating: number;
  totalRatings: number;
  description: string;
  websiteUrl?: string;
  bankDetails?: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    routingNumber: string;
    swiftCode?: string;
  };
  documents: Array<{
    id: string;
    type: 'id' | 'business_license' | 'insurance' | 'tax_document' | 'other';
    name: string;
    url: string;
    verified: boolean;
    uploadDate: string;
    expiryDate?: string;
  }>;
  stats?: {
    totalBookings: number;
    totalEarnings: number;
    activeBookings: number;
    completedBookings: number;
    cancelledBookings: number;
  };
}

export interface VendorEarnings {
  id: string
  vendorId: string
  period: string // e.g., "2023-05" for monthly earnings
  totalEarnings: number
  totalBookings: number
  totalCommission: number
  pendingPayout: number
  paidOut: number
  paymentStatus: "pending" | "processing" | "completed"
  breakdown: Array<{
    bookingId: string
    carId: string
    amount: number
    commission: number
    netEarnings: number
    date: string
  }>
  createdAt: string
  updatedAt: string
}

export interface VendorCreateRequest {
  businessName: string
  businessAddress: string
  businessPhone: string
  businessEmail: string
  taxId: string
  description?: string
  websiteUrl?: string
  bankDetails?: {
    accountName: string
    accountNumber: string
    bankName: string
    routingNumber?: string
    swiftCode?: string
  }
}

export interface VendorUpdateRequest {
  businessName?: string
  businessAddress?: string
  businessPhone?: string
  businessEmail?: string
  taxId?: string
  description?: string
  websiteUrl?: string
  status?: "pending" | "approved" | "suspended" | "rejected"
  commissionRate?: number
  bankDetails?: {
    accountName: string
    accountNumber: string
    bankName: string
    routingNumber?: string
    swiftCode?: string
  }
}