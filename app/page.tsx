"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CarFront, ChevronRight, Users, BarChart3, Settings, Calendar, FileText } from "lucide-react"
import { PageTransition } from "@/components/ui/page-transition"

export default function Home() {
  // Define the reveal variants for animations
  const revealVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="w-full py-20 md:py-32 relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent blur-3xl opacity-20" />
            <div className="container px-4 md:px-6 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                    Car Rental Management{" "}
                    <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                      Platform
                    </span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl/relaxed">
                    A powerful platform for car rental businesses. Manage your fleet, bookings, and customers with ease.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/auth/login">
                      <Button
                        size="lg"
                        className="rounded-lg px-8 h-12 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/20 transition-all w-full sm:w-auto"
                      >
                        Login Now <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/demo">
                      <Button
                        size="lg"
                        variant="outline"
                        className="rounded-lg px-8 h-12 border-primary/20 hover:bg-primary/5 transition-all w-full sm:w-auto"
                      >
                        View Demo <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/5 blur-2xl rounded-3xl opacity-50"></div>
                  <div className="relative rounded-xl overflow-hidden shadow-2xl border border-primary/10">
                    <img
                      src="/placeholder.svg?height=600&width=800"
                      alt="Car rental management dashboard"
                      className="w-full h-auto"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Admin & Vendor Features */}
          <motion.section
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full py-20 bg-muted/30"
          >
            <div className="container px-4 md:px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                  Powerful Management Tools
                </h2>
                <p className="max-w-[800px] mx-auto text-muted-foreground text-lg">
                  Everything you need to run your car rental business efficiently
                </p>
              </div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  {
                    title: "Admin Dashboard",
                    description:
                      "Comprehensive overview of your entire business with real-time analytics and reporting.",
                    icon: <BarChart3 className="h-10 w-10 text-primary" />,
                    link: "/admin",
                  },
                  {
                    title: "Vendor Management",
                    description: "Easily manage vendors, their listings, and performance metrics in one place.",
                    icon: <Users className="h-10 w-10 text-primary" />,
                    link: "/admin/vendors",
                  },
                  {
                    title: "Vendor Portal",
                    description: "Dedicated portal for vendors to manage their listings, bookings, and earnings.",
                    icon: <CarFront className="h-10 w-10 text-primary" />,
                    link: "/vendor",
                  },
                  {
                    title: "Booking Management",
                    description: "Track and manage all bookings with detailed information and status updates.",
                    icon: <Calendar className="h-10 w-10 text-primary" />,
                    link: "/admin/bookings",
                  },
                  {
                    title: "Document Verification",
                    description: "Secure document upload and verification system for vendors and customers.",
                    icon: <FileText className="h-10 w-10 text-primary" />,
                    link: "/vendor/documents",
                  },
                  {
                    title: "System Settings",
                    description: "Customize the platform according to your business needs and preferences.",
                    icon: <Settings className="h-10 w-10 text-primary" />,
                    link: "/admin/settings",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-background rounded-xl p-6 shadow-sm border border-border/50 hover:shadow-md hover:border-primary/20 hover:translate-y-[-5px] transition-all duration-300"
                  >
                    <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <Link href={feature.link}>
                      <Button variant="outline" className="w-full justify-between group">
                        Explore
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>

          {/* CTA */}
          <motion.section
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full py-20 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),rgba(0,0,0,0))] opacity-70"></div>
            <div className="container px-4 md:px-6 relative z-10">
              <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary-foreground">
                  Ready to Get Started?
                </h2>
                <p className="text-primary-foreground/90 md:text-xl/relaxed">
                  Login to your admin or vendor account to manage your car rental business.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mt-4">
                  <Link href="/login" className="w-full">
                    <Button
                      size="lg"
                      className="w-full rounded-lg bg-background text-primary hover:bg-background/90 transition-all duration-300 shadow-lg shadow-primary-foreground/10"
                    >
                      Login Now
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/contact" className="w-full">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full rounded-lg bg-transparent text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10 transition-all duration-300"
                    >
                      Contact Us
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>
        </main>
        <Footer />
      </div>
    </PageTransition>
  )
}
