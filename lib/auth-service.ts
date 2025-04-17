const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.carrental.com"

// Local check for token in the browser
export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false
  return !!localStorage.getItem("token")
}

export const logout = (): void => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  localStorage.removeItem("userRole")
  window.location.href = "/auth/login"
}
export const isVendor = (): boolean => {
  if (typeof window === "undefined") return false
  return localStorage.getItem("userRole") === "vendor"
}
