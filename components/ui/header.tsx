"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileNav } from "@/components/ui/mobile-nav"
import { CarFront, Menu, User, LogOut } from "lucide-react"
import * as AuthService from "@/lib/auth-service"

export function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isVendorUser, setIsVendorUser] = useState(false)
  const [isAdminUser, setIsAdminUser] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Check authentication status
    setIsAuthenticated(AuthService.isAuthenticated())
    setIsVendorUser(AuthService.isVendor())
    setIsAdminUser(AuthService.isAdmin())
    setCurrentUser(AuthService.getCurrentUser())
  }, [pathname])

  const handleLogout = () => {
    AuthService.logout()
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled || pathname !== "/" ? "bg-background/95 backdrop-blur-sm border-b shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <motion.div whileHover={{ rotate: 10 }} whileTap={{ scale: 0.95 }}>
              <CarFront className="h-6 w-6 text-primary" />
            </motion.div>
            <span>CarRental</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/cars"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname?.startsWith("/cars") ? "text-primary" : "text-foreground/80"
              }`}
            >
              Cars
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/about" ? "text-primary" : "text-foreground/80"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/contact" ? "text-primary" : "text-foreground/80"
              }`}
            >
              Contact
            </Link>
            {isVendorUser && (
              <Link
                href="/vendor/dashboard"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname?.startsWith("/vendor") ? "text-primary" : "text-foreground/80"
                }`}
              >
                Vendor Dashboard
              </Link>
            )}
            {isAdminUser && (
              <Link
                href="/admin"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname?.startsWith("/admin") ? "text-primary" : "text-foreground/80"
                }`}
              >
                Admin
              </Link>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="gap-2" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0">
              <MobileNav
                isAuthenticated={isAuthenticated}
                isVendor={isVendorUser}
                isAdmin={isAdminUser}
                onLogout={handleLogout}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
