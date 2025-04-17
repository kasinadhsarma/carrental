"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CarFront, ArrowLeft, Heart, UserCog, Building } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { PageTransition } from "@/components/ui/page-transition"
import { isAuthenticated } from "@/lib/auth-service"

export default function LoginPage() {
  const router = useRouter()
  const [userRole, setUserRole] = useState("admin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [showLove, setShowLove] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    // Check if user is already logged in
    if (isAuthenticated()) {
      // Redirect based on role
      const userRole = localStorage.getItem("userRole") || "admin"
      redirectBasedOnRole(userRole)
    }
  }, [router])

  const redirectBasedOnRole = (role: string) => {
    switch (role) {
      case "admin":
        router.replace("/admin")
        break
      case "vendor":
        router.replace("/vendor")
        break
      default:
        router.replace("/") // Default to home page as fallback
        break
    }
  }

  const handleLoginWithCredentials = async () => {
    if (!email.trim() || !password.trim()) return

    setIsVerifying(true)
    setError("")

    try {
      if (userRole === "vendor") {
        // Handle vendor login
        const mockVendor = {
          id: "v1",
          name: "John's Car Rental",
          email: email,
          phone: "+1234567890",
          role: "vendor",
          token: "mock-vendor-token",
        }
        localStorage.setItem("token", mockVendor.token)
        localStorage.setItem("user", JSON.stringify(mockVendor))
        localStorage.setItem("userRole", "vendor")
        
        // Use redirect param if provided, otherwise go to vendor dashboard
        const redirect = new URLSearchParams(window.location.search).get("redirect") || "/vendor"
        router.push(redirect)
      } else {
        // Handle admin login
        localStorage.setItem("userRole", "admin")
        router.replace("/admin")
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.")
    } finally {
      setIsVerifying(false)
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
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