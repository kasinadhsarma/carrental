"use client"

import * as React from "react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, X, Car, Info, PhoneCall, LogIn, ChevronRight } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"

const menuItems = [
  { href: "/about", icon: Info, label: "About Us" },
  { href: "/contact", icon: PhoneCall, label: "Contact" },
] as const

// Move animations outside component
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      duration: 0.4,
      ease: "easeOut"
    }
  }
}

const itemAnimation = {
  hidden: { x: -30, opacity: 0 },
  show: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
}

export const MobileNav = React.memo(function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false)
  const animationStateRef = React.useRef({ removed: false })

  // Reset animation state when menu opens
  React.useEffect(() => {
    if (isOpen) {
      animationStateRef.current.removed = false;
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex flex-col w-80 p-0 bg-background/95 backdrop-blur-sm"
        onPointerDownOutside={(e) => {
          e.preventDefault();
          handleClose();
        }}
        onEscapeKeyDown={handleClose}
        hideCloseButton={true}
      >
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <div className="flex items-center justify-between p-6 border-b">
          <Link href="/" className="flex items-center gap-2">
            <Car className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">RentACar</span>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover:bg-accent"
            aria-label="Close navigation menu"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-4">
            <motion.nav
              variants={container}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex flex-col gap-2"
            >
              {menuItems.map((item) => (              <motion.div key={item.href} variants={itemAnimation}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-accent transition-all duration-300 ease-in-out"
                  >
                    <item.icon className="h-5 w-5 text-muted-foreground" />
                    {item.label}
                    <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground" />
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </div>
        </div>

        <div className="border-t">
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Theme</span>
              <ThemeToggle />
            </div>
            <Separator className="my-4" />
            <div className="grid gap-4">
              {/* Updated Sign In button to match OTP style */}
              <Link href="/auth/login" className="w-full">
                <Button 
                  variant="outline" 
                  className="w-full py-3 flex items-center justify-center rounded-lg text-base font-medium border border-gray-300 hover:bg-accent/50"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
              
              {/* Updated Book Now button to match OTP style */}
              <Link href="/auth/signup" className="w-full">
                <Button 
                  className="w-full py-3 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-base font-medium shadow-sm"
                >
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
})

MobileNav.displayName = 'MobileNav'