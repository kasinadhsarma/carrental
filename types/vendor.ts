import type { Car } from "./car"
import type { Booking } from "./booking"

export interface Vendor {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  businessName: string
  businessType: "individual" | "company"
  registrationNumber?: string
  taxId?: string
  verified: boolean
  rating: number
  totalRatings: number
  joinDate: string
  profileImage?: string
  coverImage?: string
  description?: string
  documents: VendorDocument[]
  bankDetails?: BankDetails
}

export interface VendorDocument {
  id: string
  type: "drivingLicense" | "carRegistration" | "insurance" | "businessLicense" | "identityProof" | "other"
  name: string
  url: string
  verified: boolean
  uploadDate: string
  expiryDate?: string
}

export interface BankDetails {
  accountName: string
  accountNumber: string
  bankName: string
  ifscCode?: string
  swiftCode?: string
  routingNumber?: string
}

export interface VendorCar extends Car {
  vendorId: string
  availabilityCalendar: AvailabilityCalendar[]
  documents: CarDocument[]
  earnings: number
  totalBookings: number
  activeBookings: number
}

export interface AvailabilityCalendar {
  date: string
  available: boolean
  timeSlots?: {
    startTime: string
    endTime: string
    available: boolean
  }[]
}

export interface CarDocument {
  id: string
  type: "registration" | "insurance" | "permit" | "other"
  name: string
  url: string
  verified: boolean
  uploadDate: string
  expiryDate?: string
}

export interface VendorBooking extends Booking {
  vendorId: string
  status: "pending" | "approved" | "rejected" | "ongoing" | "completed" | "cancelled"
  paymentStatus: "pending" | "partial" | "complete" | "refunded"
  earnings: number
  commission: number
  rating?: number
  review?: string
}

export interface VendorEarnings {
  id: string
  vendorId: string
  bookingId: string
  amount: number
  commission: number
  netAmount: number
  status: "pending" | "processing" | "completed"
  transactionId?: string
  transactionDate?: string
  bookingDate: string
  carId: string
  carName: string
}

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
