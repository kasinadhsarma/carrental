import type { Booking, BookingCreateRequest, BookingUpdateRequest, ApiResponse, PaginatedResponse } from "@/types/api"

// Base API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.carrental.com"

// Get all bookings with pagination (admin only)
export async function getBookings(
  page = 1,
  limit = 10,
  filters?: {
    status?: string
    userId?: string
    carId?: string
    startDate?: string
    endDate?: string
  },
): Promise<PaginatedResponse<Booking>> {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  })

  if (filters) {
    if (filters.status) queryParams.append("status", filters.status)
    if (filters.userId) queryParams.append("userId", filters.userId)
    if (filters.carId) queryParams.append("carId", filters.carId)
    if (filters.startDate) queryParams.append("startDate", filters.startDate)
    if (filters.endDate) queryParams.append("endDate", filters.endDate)
  }

  const response = await fetch(`${API_URL}/bookings?${queryParams.toString()}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to fetch bookings")
  }

  return response.json()
}

// Get user's bookings
export async function getUserBookings(page = 1, limit = 10, status?: string): Promise<PaginatedResponse<Booking>> {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  })

  if (status) queryParams.append("status", status)

  const response = await fetch(`${API_URL}/bookings/user?${queryParams.toString()}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to fetch user bookings")
  }

  return response.json()
}

// Get booking by ID
export async function getBookingById(id: string): Promise<ApiResponse<Booking>> {
  const response = await fetch(`${API_URL}/bookings/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to fetch booking")
  }

  return response.json()
}

// Create a new booking
export async function createBooking(bookingData: BookingCreateRequest): Promise<ApiResponse<Booking>> {
  const response = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(bookingData),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to create booking")
  }

  return response.json()
}

// Update an existing booking
export async function updateBooking(id: string, bookingData: BookingUpdateRequest): Promise<ApiResponse<Booking>> {
  const response = await fetch(`${API_URL}/bookings/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(bookingData),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to update booking")
  }

  return response.json()
}

// Cancel a booking
export async function cancelBooking(id: string, reason?: string): Promise<ApiResponse<Booking>> {
  const response = await fetch(`${API_URL}/bookings/${id}/cancel`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ reason }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to cancel booking")
  }

  return response.json()
}

// Check car availability for a date range
export async function checkCarAvailability(
  carId: string,
  startDate: string,
  endDate: string,
): Promise<ApiResponse<{ available: boolean }>> {
  const queryParams = new URLSearchParams({
    carId,
    startDate,
    endDate,
  })

  const response = await fetch(`${API_URL}/bookings/check-availability?${queryParams.toString()}`)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to check availability")
  }

  return response.json()
}
