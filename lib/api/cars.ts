import type { Car, CarCreateRequest, CarUpdateRequest, ApiResponse, PaginatedResponse } from "@/types/api"

// Base API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.carrental.com"

// Get all cars with pagination and filtering
export async function getCars(
  page = 1,
  limit = 10,
  filters?: {
    category?: string
    minPrice?: number
    maxPrice?: number
    features?: string[]
    search?: string
  },
): Promise<PaginatedResponse<Car>> {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  })

  if (filters) {
    if (filters.category) queryParams.append("category", filters.category)
    if (filters.minPrice) queryParams.append("minPrice", filters.minPrice.toString())
    if (filters.maxPrice) queryParams.append("maxPrice", filters.maxPrice.toString())
    if (filters.search) queryParams.append("search", filters.search)
    if (filters.features && filters.features.length > 0) {
      filters.features.forEach((feature) => {
        queryParams.append("features", feature)
      })
    }
  }

  const response = await fetch(`${API_URL}/cars?${queryParams.toString()}`)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to fetch cars")
  }

  return response.json()
}

// Get car by ID
export async function getCarById(id: string): Promise<ApiResponse<Car>> {
  const response = await fetch(`${API_URL}/cars/${id}`)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to fetch car")
  }

  return response.json()
}

// Create a new car (admin only)
export async function createCar(carData: CarCreateRequest): Promise<ApiResponse<Car>> {
  const response = await fetch(`${API_URL}/cars`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(carData),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to create car")
  }

  return response.json()
}

// Update an existing car (admin only)
export async function updateCar(id: string, carData: CarUpdateRequest): Promise<ApiResponse<Car>> {
  const response = await fetch(`${API_URL}/cars/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(carData),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to update car")
  }

  return response.json()
}

// Delete a car (admin only)
export async function deleteCar(id: string): Promise<ApiResponse<null>> {
  const response = await fetch(`${API_URL}/cars/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to delete car")
  }

  return response.json()
}

// Upload car image
export async function uploadCarImage(file: File): Promise<ApiResponse<{ imageUrl: string }>> {
  const formData = new FormData()
  formData.append("image", file)

  const response = await fetch(`${API_URL}/cars/upload-image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to upload car image")
  }

  return response.json()
}

// Get car categories
export async function getCarCategories(): Promise<ApiResponse<string[]>> {
  const response = await fetch(`${API_URL}/cars/categories`)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to fetch car categories")
  }

  return response.json()
}

// Get car features
export async function getCarFeatures(): Promise<ApiResponse<string[]>> {
  const response = await fetch(`${API_URL}/cars/features`)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to fetch car features")
  }

  return response.json()
}
