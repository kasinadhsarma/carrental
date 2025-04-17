"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { CarFront, ArrowLeft } from "lucide-react"
import { PageTransition } from "@/components/ui/page-transition"

interface VendorRegisterLayoutProps {
  children: React.ReactNode
}

export default function VendorRegisterLayout({ children }: VendorRegisterLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <motion.div
        className="container flex h-16 items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
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
                <CarFront className="h-8 w-8 text-primary" />
              </motion.div>
              <span>CarRental</span>
            </Link>
            <motion.h1
              className="text-2xl font-bold mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Vendor Registration
            </motion.h1>
            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Join our platform and start growing your car rental business
            </motion.p>
          </motion.div>

          {children}

          <motion.div
            className="text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-primary font-medium hover:text-primary/90 transition-colors hover:underline"
              >
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </PageTransition>

      <motion.div
        className="container py-4 text-center text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        CarRental © {new Date().getFullYear()}
      </motion.div>
    </div>
  )
}
