"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  CarFront,
  Clock,
  LogOut,
  Menu,
  Settings,
  Building,
  Users,
  X,
  ChevronLeft,
  ChevronRight,
  Store,
  CreditCard
} from "lucide-react"
import { isAuthenticated, isVendor, logout } from "@/lib/auth-service"

interface VendorLayoutProps {
  children: React.ReactNode
}

export default function VendorLayout({ children }: VendorLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check vendor authentication
    if (!isAuthenticated() || !isVendor()) {
      router.replace("/auth/login?redirect=/vendor")
      return
    }
  }, [router])

  const navigation = [
    { name: "Dashboard", href: "/vendor", icon: Store },
    { name: "Cars", href: "/vendor/cars", icon: CarFront },
    { name: "Bookings", href: "/vendor/bookings", icon: Clock },
    { name: "Documents", href: "/vendor/documents", icon: Users },
    { name: "Earnings", href: "/vendor/earnings", icon: CreditCard },
    { name: "Settings", href: "/vendor/settings", icon: Settings },
  ]

  if (!mounted) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Mobile sidebar */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          size="icon"
          className="fixed left-4 top-4 z-40 rounded-full"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>

        {sidebarOpen && (
          <div className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        )}

        <div
          className={`fixed inset-y-0 left-0 z-30 w-72 transform bg-background transition-all duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/vendor" className="flex items-center gap-2 font-bold text-xl">
              <Building className="h-6 w-6 text-primary" />
              <span>Vendor Portal</span>
            </Link>
          </div>
          <div className="flex flex-col h-[calc(100%-4rem)]">
            <nav className="flex flex-col gap-1 p-4 flex-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="border-t p-4">
              <Button variant="outline" className="w-full justify-start" size="sm" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div
        className={`hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 transition-all duration-300 ${
          sidebarCollapsed ? "lg:w-20" : "lg:w-72"
        }`}
      >
        <div className="flex flex-col border-r bg-background h-full">
          <div className="flex h-16 items-center border-b px-6 justify-between">
            <Link
              href="/vendor"
              className={`flex items-center gap-2 font-bold text-xl ${sidebarCollapsed ? "hidden" : ""}`}
            >
              <Building className="h-6 w-6 text-primary" />
              <span>Vendor Portal</span>
            </Link>
            <Building className={`h-6 w-6 text-primary ${sidebarCollapsed ? "mx-auto" : "hidden"}`} />
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full ${sidebarCollapsed ? "hidden" : ""}`}
              onClick={() => setSidebarCollapsed(true)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-col h-[calc(100%-4rem)]">
            <nav className="flex flex-1 flex-col gap-1 p-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"
                  } ${sidebarCollapsed ? "justify-center" : ""}`}
                >
                  <item.icon className="h-5 w-5" />
                  {!sidebarCollapsed && <span>{item.name}</span>}
                </Link>
              ))}
            </nav>
            <div className="border-t p-4">
              <Button variant="outline" className="w-full justify-start" size="sm" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div
        className={`flex-1 ${sidebarCollapsed ? "lg:pl-20" : "lg:pl-72"}`}
      >
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <div className="flex flex-1 items-center justify-end">
            <div className="flex items-center gap-4">
              {sidebarCollapsed && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setSidebarCollapsed(false)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
