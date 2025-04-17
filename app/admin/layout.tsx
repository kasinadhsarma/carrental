"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { isAuthenticated, logout } from "@/lib/auth-service"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  BarChart,
  CarFront,
  Clock,
  LogOut,
  Menu,
  Settings,
  ShieldCheck,
  Users,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check admin authentication
    if (!isAuthenticated()) {
      router.replace("/auth/login?redirect=/admin")
      return
    }
  }, [router])

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: BarChart },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Cars", href: "/admin/cars", icon: CarFront },
    { name: "Bookings", href: "/admin/bookings", icon: Clock },
    { name: "Settings", href: "/admin/settings", icon: Settings },
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
            <Link href="/admin" className="flex items-center gap-2 font-bold text-xl">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <span>Admin Panel</span>
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
              href="/admin"
              className={`flex items-center gap-2 font-bold text-xl ${sidebarCollapsed ? "hidden" : ""}`}
            >
              <ShieldCheck className="h-6 w-6 text-primary" />
              <span>Admin Panel</span>
            </Link>
            <ShieldCheck className={`h-6 w-6 text-primary ${sidebarCollapsed ? "mx-auto" : "hidden"}`} />
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
              <Button
                variant="outline"
                className={`w-full ${sidebarCollapsed ? "justify-center" : "justify-start"}`}
                size="sm"
                onClick={logout}
              >
                <LogOut className={`${sidebarCollapsed ? "" : "mr-2"} h-4 w-4`} />
                {!sidebarCollapsed && <span>Logout</span>}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar collapse/expand button for desktop */}
      {sidebarCollapsed && (
        <Button
          variant="outline"
          size="icon"
          className="fixed left-16 top-4 z-40 rounded-full hidden lg:flex"
          onClick={() => setSidebarCollapsed(false)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}

      {/* Main content */}
      <div className={`flex flex-1 flex-col transition-all duration-300 ${sidebarCollapsed ? "lg:pl-20" : "lg:pl-72"}`}>
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <div className="flex flex-1 items-center justify-end">
            <div className="flex items-center gap-4">
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
