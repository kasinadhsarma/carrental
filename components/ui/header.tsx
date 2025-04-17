import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { CarFront, LogIn } from "lucide-react"
import { MobileNav } from "@/components/ui/mobile-nav"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <CarFront className="h-6 w-6 text-primary" />
          <span>CarRental</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/auth/login" className="hidden md:block">
            <Button>
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
