// Base API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.carrental.com"

// Check if user is authenticated
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return !!localStorage.getItem("token")
}

// Enhanced isVendor check with mock support
export function isVendor(): boolean {
  if (typeof window === "undefined") return false
  if (process.env.NEXT_PUBLIC_MOCK_VENDOR === "true") {
    // Set up mock vendor data if not exists
    if (!localStorage.getItem("user")) {
      const mockVendor = {
        id: "v1",
        name: "John's Car Rental",
        email: "john@carrental.com",
        phone: "+1234567890",
        role: "vendor",
        token: "mock-vendor-token",
      }
      localStorage.setItem("token", mockVendor.token)
      localStorage.setItem("user", JSON.stringify(mockVendor))
    }
    return true
  }
  
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    return user.role === "vendor" && !isTokenExpired()
  } catch (error) {
    console.error("Error checking vendor status:", error)
    return false
  }
}

// Check if user is an admin
export function isAdmin(): boolean {
  if (typeof window === "undefined") return false
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    return user.role === "admin"
  } catch (error) {
    return false
  }
}

// Get current user
export function getCurrentUser() {
  if (typeof window === "undefined") return null
  try {
    return JSON.parse(localStorage.getItem("user") || "{}")
  } catch (error) {
    return null
  }
}

// Check token expiration
export function isTokenExpired(): boolean {
  try {
    const token = localStorage.getItem("token")
    if (!token) return true

    // Get expiration from token if it exists (assuming JWT)
    const payload = JSON.parse(atob(token.split(".")[1]))
    if (!payload.exp) return false

    return payload.exp * 1000 < Date.now()
  } catch {
    return true
  }
}

// Refresh token if needed
export async function refreshTokenIfNeeded(): Promise<boolean> {
  if (!isTokenExpired()) return true

  try {
    const token = localStorage.getItem("token")
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Token refresh failed")
    }

    const data = await response.json()
    if (data.success && data.data?.token) {
      localStorage.setItem("token", data.data.token)
      return true
    }
    return false
  } catch {
    return false
  }
}

// Login with OTP
export async function loginWithOTP(phone: string, otp: string) {
  try {
    // In a real app, this would call the API
    // For demo purposes, we'll simulate a successful login
    const mockUser = {
      id: "u1",
      name: "John Doe",
      email: "john@example.com",
      phone: phone,
      role: "user",
      token: "mock-token-" + Math.random().toString(36).substring(2),
    }

    localStorage.setItem("token", mockUser.token)
    localStorage.setItem("user", JSON.stringify(mockUser))

    return { success: true, data: mockUser }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, error: "Failed to login. Please try again." }
  }
}

// Login as vendor
export async function loginAsVendor(phone: string, otp: string) {
  try {
    // In a real app, this would call the vendor API endpoint
    // For demo purposes, we'll simulate a successful vendor login
    const mockVendor = {
      id: "v1",
      name: "John's Car Rental",
      email: "john@carrental.com",
      phone: phone,
      role: "vendor",
      token: "vendor-token-" + Math.random().toString(36).substring(2),
    }

    localStorage.setItem("token", mockVendor.token)
    localStorage.setItem("user", JSON.stringify(mockVendor))

    return { success: true, data: mockVendor }
  } catch (error) {
    console.error("Vendor login error:", error)
    return { success: false, error: "Failed to login as vendor. Please try again." }
  }
}

// Logout
export function logout(): void {
  if (typeof window === "undefined") return

  localStorage.removeItem("token")
  localStorage.removeItem("user")

  // Redirect to home page
  window.location.href = "/"
}

export const withVendorProtection = (fn: () => Promise<void>) => {
  return async () => {
    if (!isVendor() && typeof window !== "undefined") {
      window.location.href = `/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`
      return
    }
    return fn()
  }
}
