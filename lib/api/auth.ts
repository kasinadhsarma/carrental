import type {
  AuthResponse,
  LoginRequest,
  OtpLoginRequest,
  OtpVerifyRequest,
  RegisterRequest,
  ApiResponse,
} from "@/types/api"

// Base API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.carrental.com"

// Login with email and password
export async function login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Login failed")
  }

  const data = await response.json()

  // Store token in localStorage
  if (data.data?.token) {
    localStorage.setItem("token", data.data.token)
  }

  return data
}

// Register a new user
export async function register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Registration failed")
  }

  const data = await response.json()

  // Store token in localStorage
  if (data.data?.token) {
    localStorage.setItem("token", data.data.token)
  }

  return data
}

// Logout
export function logout(): void {
  localStorage.removeItem("token")
  // Redirect to login page or home page
  window.location.href = "/auth/login"
}

// Send OTP for phone login
export async function sendOtp(data: OtpLoginRequest): Promise<ApiResponse<{ otpSent: boolean }>> {
  const response = await fetch(`${API_URL}/auth/send-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to send OTP")
  }

  return response.json()
}

// Verify OTP and login
export async function verifyOtp(data: OtpVerifyRequest): Promise<ApiResponse<AuthResponse>> {
  const response = await fetch(`${API_URL}/auth/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "OTP verification failed")
  }

  const responseData = await response.json()

  // Store token in localStorage
  if (responseData.data?.token) {
    localStorage.setItem("token", responseData.data.token)
  }

  return responseData
}

// Vendor login
export async function loginAsVendor(phone: string, otp: string): Promise<ApiResponse<AuthResponse>> {
  const response = await fetch(`${API_URL}/auth/vendor/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone, otp }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Vendor login failed")
  }

  const data = await response.json()

  if (data.success && data.data?.token) {
    localStorage.setItem("token", data.data.token)
    localStorage.setItem("user", JSON.stringify({ ...data.data.user, role: "vendor" }))
  }

  return data
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return !!localStorage.getItem("token")
}

// Get authentication token
export function getToken(): string | null {
  return localStorage.getItem("token")
}
