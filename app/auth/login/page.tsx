"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CarFront, ArrowLeft, ChevronLeft, Heart, UserCog, Building } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { PageTransition } from "@/components/ui/page-transition"
import { loginWithOTP, loginAsVendor, isAuthenticated } from "@/lib/auth-service"

// Country codes data
const countryCodes = [
  { code: "+1", country: "US", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+91", country: "IN", flag: "🇮🇳" },
  { code: "+61", country: "AU", flag: "🇦🇺" },
  { code: "+86", country: "CN", flag: "🇨🇳" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+81", country: "JP", flag: "🇯🇵" },
  { code: "+7", country: "RU", flag: "🇷🇺" },
  { code: "+55", country: "BR", flag: "🇧🇷" },
]

export default function LoginPage() {
  const router = useRouter()
  const [userRole, setUserRole] = useState("admin")
  const [countryCode, setCountryCode] = useState("+1")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [showLove, setShowLove] = useState(false)
  const [error, setError] = useState("")
  const [loginMethod, setLoginMethod] = useState("email") // "phone" or "email"

  useEffect(() => {
    // Check if user is already logged in
    if (isAuthenticated()) {
      // Redirect based on role
      const userRole = localStorage.getItem("userRole") || "admin"
      redirectBasedOnRole(userRole)
    }
  }, [router])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  const redirectBasedOnRole = (role: string) => {
    switch (role) {
      case "admin":
        router.replace("/admin")
        break
      case "vendor":
        router.replace("/vendor/dashboard")
        break
      default:
        router.replace("/") // Default to home page as fallback
        break
    }
  }

  const handleSendOtp = () => {
    if (!phoneNumber.trim()) return

    setIsLoading(true)
    setError("")

    // Simulate API call
    setTimeout(() => {
      setOtpSent(true)
      setIsLoading(false)
      setCountdown(30) // 30 seconds countdown for resend
    }, 1500)
  }

  const handleResendOtp = () => {
    setCountdown(30)
    // In a real app, this would call an API to resend OTP
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1)
    }

    const newOtpValues = [...otpValues]
    newOtpValues[index] = value
    setOtpValues(newOtpValues)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement
      if (nextInput) nextInput.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement
      if (prevInput) prevInput.focus()
    }
  }

  const handleLoginWithCredentials = async () => {
    if (!email.trim() || !password.trim()) return

    setIsVerifying(true)
    setError("")

    try {
      // Simulate API call to check credentials
      // In a real app, you would call your authentication API
      setTimeout(() => {
        // Simulating a successful login
        localStorage.setItem("userRole", userRole)
        redirectBasedOnRole(userRole)
      }, 1500)
    } catch (err) {
      setError("Invalid email or password. Please try again.")
      setIsVerifying(false)
    }
  }

  const handleVerifyOtp = async () => {
    const otp = otpValues.join("")
    if (otp.length !== 6) return

    setIsVerifying(true)
    setError("")

    try {
      // Get the redirect URL from query params
      const params = new URLSearchParams(window.location.search)
      const redirectPath = params.get('redirect') || (userRole === 'vendor' ? '/vendor/dashboard' : '/admin')

      // Call appropriate login service based on role
      const result = userRole === 'vendor'
        ? await loginAsVendor(`${countryCode}${phoneNumber}`, otp)
        : await loginWithOTP(`${countryCode}${phoneNumber}`, otp)

      if (result.success) {
        localStorage.setItem("userRole", userRole)
        router.replace(redirectPath)
      } else {
        setError(result.error || "Verification failed. Please try again.")
        setIsVerifying(false)
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("An unexpected error occurred. Please try again.")
      setIsVerifying(false)
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text")
    if (pastedData.length <= 6 && /^\d+$/.test(pastedData)) {
      const newOtpValues = [...otpValues]
      for (let i = 0; i < Math.min(pastedData.length, 6); i++) {
        newOtpValues[i] = pastedData[i]
      }
      setOtpValues(newOtpValues)

      // Focus the next empty input or the last one
      const nextEmptyIndex = newOtpValues.findIndex((val) => !val)
      const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex
      const inputToFocus = document.getElementById(`otp-${focusIndex}`) as HTMLInputElement
      if (inputToFocus) inputToFocus.focus()
    }
  }

  const handleVendorLogin = async () => {
    if (process.env.NEXT_PUBLIC_MOCK_VENDOR === "true") {
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
      
      const redirect = new URLSearchParams(window.location.search).get("redirect") || "/vendor/dashboard"
      router.push(redirect)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 transition-colors duration-500">
      <motion.div
        className="container flex h-16 items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors dark:text-slate-400 dark:hover:text-blue-400"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
        <ThemeToggle />
      </motion.div>

      <PageTransition className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <motion.div
            className="flex flex-col items-center text-center space-y-2 mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/" className="flex items-center gap-2 font-bold text-2xl group">
              <motion.div className="relative" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <CarFront className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                <motion.div className="absolute -top-1 -right-1" initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}>
                  <Heart
                    className="h-4 w-4 text-blue-500 dark:text-blue-400 animate-pulse"
                    fill="currentColor"
                    onClick={() => setShowLove(!showLove)}
                  />
                </motion.div>
              </motion.div>
              <span className="text-slate-900 dark:text-white transition-colors duration-500">CarRental</span>
            </Link>
            <motion.h1
              className="text-2xl font-bold mt-6 text-slate-800 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Admin & Vendor Portal
            </motion.h1>
            <motion.p
              className="text-slate-600 dark:text-slate-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Sign in to manage your account
            </motion.p>
          </motion.div>

          {error && (
            <motion.div
              className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          <Card className="border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800 shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800">
              <Tabs defaultValue={userRole} onValueChange={setUserRole} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="admin" className="flex items-center gap-2">
                    <UserCog className="h-4 w-4" />
                    Admin
                  </TabsTrigger>
                  <TabsTrigger value="vendor" className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Vendor
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="p-4 border-b border-slate-200 dark:border-slate-800">
              <Tabs defaultValue={loginMethod} onValueChange={setLoginMethod} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="phone">Phone</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <AnimatePresence mode="wait">
              {loginMethod === "phone" ? (
                <motion.div
                  key={otpSent ? "otp" : "phone"}
                  initial={{ opacity: 0, x: otpSent ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: otpSent ? -50 : 50 }}
                  transition={{ duration: 0.3 }}
                  className="p-6"
                >
                  {!otpSent ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="phone"
                          className="text-slate-700 dark:text-slate-300 transition-colors duration-300"
                        >
                          Phone Number
                        </Label>
                        <div className="flex gap-2">
                          <Select value={countryCode} onValueChange={setCountryCode}>
                            <SelectTrigger className="w-[110px] bg-white dark:bg-slate-900 transition-colors duration-300 hover:border-blue-500 dark:hover:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500">
                              <SelectValue placeholder="Code" />
                            </SelectTrigger>
                            <SelectContent>
                              {countryCodes.map((country) => (
                                <SelectItem
                                  key={country.code}
                                  value={country.code}
                                  className="transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/50"
                                >
                                  <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                    <span>{country.flag}</span>
                                    <span>{country.code}</span>
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="Phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                            className="flex-1 transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-500 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-500"
                          />
                        </div>
                      </div>
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                        onClick={handleSendOtp}
                        disabled={!phoneNumber.trim() || isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                            <span>Sending...</span>
                          </div>
                        ) : (
                          "Send OTP"
                        )}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label
                            htmlFor="otp"
                            className="text-slate-700 dark:text-slate-300 transition-colors duration-300"
                          >
                            Enter OTP
                          </Label>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors duration-300"
                            onClick={() => setOtpSent(false)}
                          >
                            <ChevronLeft className="h-3 w-3 mr-1" />
                            Change number
                          </Button>
                        </div>
                        <div className="flex justify-center gap-2" onPaste={handlePaste}>
                          {otpValues.map((value, i) => (
                            <Input
                              key={i}
                              id={`otp-${i}`}
                              className="w-12 h-12 text-center text-lg transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-500 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-500"
                              maxLength={1}
                              value={value}
                              onChange={(e) => handleOtpChange(i, e.target.value)}
                              onKeyDown={(e) => handleKeyDown(i, e)}
                              inputMode="numeric"
                              pattern="[0-9]*"
                            />
                          ))}
                        </div>
                        <p className="text-sm text-slate-400 mt-2 text-center transition-colors duration-300">
                          OTP sent to {countryCode} {phoneNumber}
                        </p>
                        <div className="text-center mt-2">
                          {countdown > 0 ? (
                            <p className="text-xs text-slate-400 transition-colors duration-300">
                              Resend OTP in{" "}
                              <span className="font-medium text-blue-400 dark:text-blue-400">{countdown}s</span>
                            </p>
                          ) : (
                            <Button
                              variant="link"
                              className="p-0 h-auto text-xs text-blue-400 hover:text-blue-300 transition-colors duration-300"
                              onClick={handleResendOtp}
                            >
                              Resend OTP
                            </Button>
                          )}
                        </div>
                      </div>
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                        onClick={handleVerifyOtp}
                        disabled={otpValues.join("").length !== 6 || isVerifying}
                      >
                        {isVerifying ? (
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                            <span>Verifying...</span>
                          </div>
                        ) : (
                          `Login as ${userRole === "vendor" ? "Vendor" : "Admin"}`
                        )}
                      </Button>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="email-login"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6"
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-slate-700 dark:text-slate-300 transition-colors duration-300"
                      >
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-500 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label
                          htmlFor="password"
                          className="text-slate-700 dark:text-slate-300 transition-colors duration-300"
                        >
                          Password
                        </Label>
                        <Link
                          href="/auth/forgot-password"
                          className="text-xs text-blue-400 hover:text-blue-300 transition-colors duration-300"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-500 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-500"
                      />
                    </div>
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                      onClick={handleLoginWithCredentials}
                      disabled={!email.trim() || !password.trim() || isVerifying}
                    >
                      {isVerifying ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                          <span>Logging in...</span>
                        </div>
                      ) : (
                        `Login as ${userRole === "vendor" ? "Vendor" : "Admin"}`
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          <motion.div
            className="text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {userRole === "vendor" && (
              <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-300">
                For vendor access issues, please contact your account administrator.
              </p>
            )}
            {userRole === "admin" && (
              <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-300">
                Admin access is restricted. Please contact system administrator for assistance.
              </p>
            )}
          </motion.div>
        </div>
      </PageTransition>

      <motion.div
        className="container py-4 text-center text-xs text-slate-500 dark:text-slate-400 transition-colors duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        CarRental Management System © {new Date().getFullYear()}
      </motion.div>
    </div>
  )
}