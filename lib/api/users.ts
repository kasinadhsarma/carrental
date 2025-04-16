import type { User, UserCreateRequest, UserUpdateRequest, ApiResponse, PaginatedResponse } from "@/types/api"

// Base API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.carrental.com"

// Get all users with pagination
export async function getUsers(page = 1, limit = 10, search?: string): Promise<PaginatedResponse<User>> {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  })

  if (search) {
    queryParams.append("search", search)
  }

  const response = await fetch(`${API_URL}/users?${queryParams.toString()}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to fetch users")
  }

  return response.json()
}

// Get user by ID
export async function getUserById(id: string): Promise<ApiResponse<User>> {
  const response = await fetch(`${API_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to fetch user")
  }

  return response.json()
}

// Create a new user
export async function createUser(userData: UserCreateRequest): Promise<ApiResponse<User>> {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to create user")
  }

  return response.json()
}

// Update an existing user
export async function updateUser(id: string, userData: UserUpdateRequest): Promise<ApiResponse<User>> {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to update user")
  }

  return response.json()
}

// Delete a user
export async function deleteUser(id: string): Promise<ApiResponse<null>> {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to delete user")
  }

  return response.json()
}

// Get current user profile
export async function getCurrentUser(): Promise<ApiResponse<User>> {
  const response = await fetch(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to fetch current user")
  }

  return response.json()
}

// Update user profile image
export async function updateProfileImage(file: File): Promise<ApiResponse<{ imageUrl: string }>> {
  const formData = new FormData()
  formData.append("image", file)

  const response = await fetch(`${API_URL}/users/profile-image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to update profile image")
  }

  return response.json()
}
