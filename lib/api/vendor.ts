import type {
  Vendor,
  VendorCar,
  VendorBooking,
  VendorEarnings,
  VendorStats,
  ApiResponse,
  PaginatedResponse,
} from "@/types/api";
// Corrected import path
import { refreshTokenIfNeeded } from "@/lib/auth-service";

// Base API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.carrental.com";

// Get vendor profile
export async function getVendorProfile(): Promise<ApiResponse<Vendor>> {
  const response = await authFetch(`${API_URL}/vendor/profile`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch vendor profile");
  }

  return response.json();
}

// Update vendor profile
export async function updateVendorProfile(data: Partial<Vendor>): Promise<ApiResponse<Vendor>> {
  const response = await authFetch(`${API_URL}/vendor/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update vendor profile");
  }

  return response.json();
}

// Upload vendor document
export async function uploadVendorDocument(
  type: string,
  name: string,
  file: File,
  expiryDate?: string,
): Promise<ApiResponse<{ documentId: string; url: string }>> {
  const formData = new FormData();
  formData.append("type", type);
  formData.append("name", name);
  formData.append("document", file);
  if (expiryDate) {
    formData.append("expiryDate", expiryDate);
  }

  const response = await authFetch(`${API_URL}/vendor/documents/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to upload document");
  }

  return response.json();
}

// Get vendor stats
export async function getVendorStats(period: "daily" | "weekly" | "monthly" | "yearly"): Promise<ApiResponse<VendorStats>> {
  const response = await authFetch(`${API_URL}/vendor/stats?period=${period}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch vendor stats");
  }

  return response.json();
}

// Get vendor bookings
export async function getVendorBookings(page: number, limit: number): Promise<PaginatedResponse<VendorBooking>> {
  const response = await authFetch(`${API_URL}/vendor/bookings?page=${page}&limit=${limit}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch vendor bookings");
  }

  return response.json();
}

// Get vendor cars
export async function getVendorCars(page: number, limit: number, filters?: Record<string, any>): Promise<PaginatedResponse<VendorCar>> {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(filters || {})
  });

  const response = await authFetch(`${API_URL}/vendor/cars?${queryParams}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch vendor cars");
  }

  return response.json();
}

// Add new car
export async function addVendorCar(carData: Partial<VendorCar>): Promise<ApiResponse<VendorCar>> {
  const response = await authFetch(`${API_URL}/vendor/cars`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(carData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to add car");
  }

  return response.json();
}

// Update car
export async function updateVendorCar(carId: string, carData: Partial<VendorCar>): Promise<ApiResponse<VendorCar>> {
  const response = await authFetch(`${API_URL}/vendor/cars/${carId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(carData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update car");
  }

  return response.json();
}

// Delete car
export async function deleteVendorCar(carId: string): Promise<ApiResponse<null>> {
  const response = await authFetch(`${API_URL}/vendor/cars/${carId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete car");
  }

  return response.json();
}

// Upload car image
export async function uploadCarImage(carId: string, file: File): Promise<ApiResponse<{ imageUrl: string }>> {
  const formData = new FormData();
  formData.append("image", file);

  const response = await authFetch(`${API_URL}/vendor/cars/${carId}/upload-image`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to upload car image");
  }

  return response.json();
}

// Update car availability
export async function updateCarAvailability(
  carId: string,
  availabilityData: any,
): Promise<ApiResponse<{ success: boolean }>> {
  const response = await authFetch(`${API_URL}/vendor/cars/${carId}/availability`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(availabilityData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update car availability");
  }

  return response.json();
}

// Get vendor earnings
export async function getVendorEarnings(
  page = 1,
  limit = 10,
  filters?: {
    startDate?: string
    endDate?: string
    status?: string
  },
): Promise<PaginatedResponse<VendorEarnings>> {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (filters) {
    if (filters.startDate) queryParams.append("startDate", filters.startDate);
    if (filters.endDate) queryParams.append("endDate", filters.endDate);
    if (filters.status) queryParams.append("status", filters.status);
  }

  const response = await authFetch(`${API_URL}/vendor/earnings?${queryParams.toString()}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch vendor earnings");
  }

  return response.json();
}

// Request payout
export async function requestPayout(amount: number): Promise<ApiResponse<{ requestId: string }>> {
  const response = await authFetch(`${API_URL}/vendor/earnings/payout-request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to request payout");
  }

  return response.json();
}

// Get vendor reviews
export async function getVendorReviews(
  page = 1,
  limit = 10,
): Promise<PaginatedResponse<{ id: string; userId: string; rating: number; review: string; createdAt: string }>> {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  const response = await authFetch(`${API_URL}/vendor/reviews?${queryParams.toString()}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch vendor reviews");
  }

  return response.json();
}

// Respond to review
export async function respondToReview(reviewId: string, response: string): Promise<ApiResponse<{ success: boolean }>> {
  const responseData = await authFetch(`${API_URL}/vendor/reviews/${reviewId}/respond`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ response }),
  });

  if (!responseData.ok) {
    const error = await responseData.json();
    throw new Error(error.message || "Failed to respond to review");
  }

  return responseData.json();
}

// Update car tracking info
export async function updateCarTracking(
  carId: string,
  trackingData: { latitude: number; longitude: number },
): Promise<ApiResponse<{ success: boolean }>> {
  const response = await authFetch(`${API_URL}/vendor/cars/${carId}/tracking`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trackingData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update car tracking");
  }

  return response.json();
}

// Auth-aware fetch wrapper
async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  // Try to refresh token if needed
  if (await refreshTokenIfNeeded()) {
    const token = localStorage.getItem("token");
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  const response = await fetch(url, options);

  if (response.status === 401) {
    // Token is invalid, redirect to login
    window.location.href = `/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`;
  }

  return response;
}
