"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  CarFront,
  Home,
  Car,
  Info,
  Phone,
  User,
  LogIn,
  LogOut,
  Settings,
  Calendar,
  Map,
  Clock,
  LayoutDashboard,
  Users,
  FileText,
  Store,
} from "lucide-react"

interface MobileNavProps {
  isAuthenticated: boolean
  isVendor: boolean
  isAdmin: boolean
  onLogout: () => void
}

export function MobileNav({ isAuthenticated, isVendor, isAdmin, onLogout }: MobileNavProps) {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="flex h-16 items-center justify-between border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <CarFront className="h-6 w-6 text-primary" />
          <span>CarRental</span>
        </Link>
        <ThemeToggle />
      </div>
      <ScrollArea className="flex-1 px-2 py-4">
        <div className="flex flex-col gap-2">
          {isAdmin && (
            <>
              <div className="mt-4 mb-2 px-2 text-xs font-semibold text-muted-foreground">Admin</div>
              <Link href="/admin">
                <Button variant={pathname === "/admin" ? "default" : "ghost"} className="w-full justify-start gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/admin/users">
                <Button variant={pathname === "/admin/users" ? "default" : "ghost"} className="w-full justify-start gap-2">
                  <Users className="h-4 w-4" />
                  Users
                </Button>
              </Link>
              <Link href="/admin/cars">
                <Button variant={pathname === "/admin/cars" ? "default" : "ghost"} className="w-full justify-start gap-2">
                  <Car className="h-4 w-4" />
                  Cars
                </Button>
              </Link>
              <Link href="/admin/settings">
                <Button variant={pathname === "/admin/settings" ? "default" : "ghost"} className="w-full justify-start gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
              </Link>
            </>
          )}

          {isVendor && (
            <>
              <div className="mt-4 mb-2 px-2 text-xs font-semibold text-muted-foreground">Vendor</div>
              <Link href="/vendor/dashboard">
                <Button variant={pathname === "/vendor/dashboard" ? "default" : "ghost"} className="w-full justify-start gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/vendor/cars">
                <Button variant={pathname === "/vendor/cars" ? "default" : "ghost"} className="w-full justify-start gap-2">
                  <Car className="h-4 w-4" />
                  Cars
                </Button>
              </Link>
              <Link href="/vendor/profile">
                <Button variant={pathname === "/vendor/profile" ? "default" : "ghost"} className="w-full justify-start gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </Button>
              </Link>
            </>
          )}

          {!isAuthenticated ? (
            <>
              <div className="mt-4 mb-2 px-2 text-xs font-semibold text-muted-foreground">Account</div>
              <Link href="/auth/login">
                <Button variant={pathname === "/auth/login" ? "default" : "ghost"} className="w-full justify-start gap-2">
                  <LogIn className="h-4 w-4" />
                  Admin/Vendor Login
                </Button>
              </Link>
              <Link href="/vendor/register">
                <Button variant={pathname === "/vendor/register" ? "default" : "ghost"} className="w-full justify-start gap-2">
                  <FileText className="h-4 w-4" />
                  Register as Vendor
                </Button>
              </Link>
            </>
          ) : (
            <Button variant="ghost" className="w-full justify-start gap-2 mt-4" onClick={onLogout}>
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
