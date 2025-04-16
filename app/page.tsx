"use client"

import { motion, useAnimation } from "framer-motion"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Search,
  Calendar,
  CarFront,
  Star,
  MapPin,
  ChevronRight,
  CheckCircle,
  Sparkles,
  Shield,
  Clock,
  Zap,
  Filter,
} from "lucide-react"
import { PageTransition } from "@/components/ui/page-transition"
import { useEffect, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  const howItWorksRef = useRef(null)
  const controls = useAnimation()
  const [location, setLocation] = useState("")
  const [pickupDate, setPickupDate] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const [carType, setCarType] = useState("all")

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100")
            entry.target.classList.remove("opacity-0")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
    )

    const section = howItWorksRef.current
    if (section) {
      observer.observe(section)
    }

    return () => {
      if (section) {
        observer.unobserve(section)
      }
    }
  }, [])

  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1">
          {/* Hero Section - With 3D element */}
          <section className="w-full h-[85vh] relative overflow-hidden bg-gradient-to-br from-primary/5 via-primary/10 to-background">
            <div className="absolute inset-0 bg-grid-white/10" />
            <div className="container px-4 md:px-6 relative z-30 h-full flex items-center">
              <div className="max-w-lg space-y-6">
                <div className="inline-block animate-fade-in">
                  <Badge
                    variant="outline"
                    className="rounded-full px-4 py-1 text-sm bg-background/80 backdrop-blur-sm border-primary/20"
                  >
                    <Sparkles className="h-3.5 w-3.5 mr-1 text-primary" />
                    Premium Car Rental Service
                  </Badge>
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none animate-fade-in-up">
                  Drive Your Dreams{" "}
                  <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                    Today
                  </span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl/relaxed animate-fade-in-up opacity-90">
                  Choose from our curated selection of premium vehicles for any occasion. Easy booking, flexible pickup,
                  and competitive rates with no hidden fees.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up">
                  <Link href="/cars">
                    <Button
                      size="lg"
                      className="rounded-full px-8 h-12 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/20 transition-all w-full sm:w-auto"
                    >
                      Browse Cars <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/auth/signup" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full px-8 h-12 border-primary/20 hover:bg-primary/5 w-full bg-white/90 text-primary font-medium shadow-sm"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </div>
              {/* 3D Car Model */}
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2 hidden lg:block w-1/3 h-2/3">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-l-3xl blur-2xl" />
                  <div className="absolute inset-0 bg-grid-white/10" />
                  <div className="absolute inset-0 rounded-l-3xl overflow-hidden">
                    <Canvas>
                      <ambientLight intensity={0.5} />
                      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
                      <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={1}
                        minPolarAngle={Math.PI / 2.5}
                        maxPolarAngle={Math.PI / 2.5}
                      />
                      <Environment preset="studio" />
                    </Canvas>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Enhanced Search Section */}
          <motion.section
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="w-full py-8 md:py-12 -mt-20 relative z-20"
          >
            <div className="container px-4 md:px-6">
              <div className="mx-auto max-w-5xl">
                <Card className="rounded-2xl border bg-card p-6 md:p-8 shadow-xl border-primary/10">
                  <CardContent className="p-0">
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold">Find Your Perfect Ride</h3>
                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium flex items-center" htmlFor="pickup-location">
                            <MapPin className="h-3.5 w-3.5 mr-1.5 text-primary" />
                            Pick-up Location
                          </label>
                          <div className="relative">
                            <input
                              id="pickup-location"
                              type="text"
                              placeholder="City, Airport, or Address"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium flex items-center" htmlFor="pickup-date">
                            <Calendar className="h-3.5 w-3.5 mr-1.5 text-primary" />
                            Pick-up Date
                          </label>
                          <div className="relative">
                            <input
                              id="pickup-date"
                              type="date"
                              placeholder="Pick-up date"
                              value={pickupDate}
                              onChange={(e) => setPickupDate(e.target.value)}
                              min={new Date().toISOString().split("T")[0]}
                              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium flex items-center" htmlFor="return-date">
                            <Calendar className="h-3.5 w-3.5 mr-1.5 text-primary" />
                            Return Date
                          </label>
                          <div className="relative">
                            <input
                              id="return-date"
                              type="date"
                              placeholder="Return date"
                              value={returnDate}
                              onChange={(e) => setReturnDate(e.target.value)}
                              min={pickupDate || new Date().toISOString().split("T")[0]}
                              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium flex items-center" htmlFor="car-type">
                            <CarFront className="h-3.5 w-3.5 mr-1.5 text-primary" />
                            Car Type
                          </label>
                          <div className="relative">
                            <select
                              id="car-type"
                              value={carType}
                              onChange={(e) => setCarType(e.target.value)}
                              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            >
                              <option value="all">All Types</option>
                              <option value="economy">Economy</option>
                              <option value="suv">SUV</option>
                              <option value="luxury">Luxury</option>
                              <option value="sports">Sports</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Filter className="h-4 w-4" />
                          More Filters
                        </Button>
                        <Button
                          className="px-8 py-3 rounded-lg bg-primary shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/20 transition-all"
                          onClick={() => {
                            if (location && pickupDate && returnDate) {
                              // Navigate to cars page with query parameters
                              window.location.href = `/cars?location=${encodeURIComponent(
                                location,
                              )}&pickup=${encodeURIComponent(pickupDate)}&return=${encodeURIComponent(
                                returnDate,
                              )}&type=${encodeURIComponent(carType)}`
                            }
                          }}
                          disabled={!location || !pickupDate || !returnDate}
                        >
                          <Search className="mr-2 h-4 w-4" />
                          Search Cars
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.section>

          {/* Car Categories - Enhanced with better visuals */}
          <motion.section
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full py-16 md:py-24 bg-muted/30"
          >
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
                <div className="space-y-2 max-w-3xl">
                  <Badge
                    variant="outline"
                    className="rounded-full px-4 py-1 text-sm bg-background/80 backdrop-blur-sm border-primary/20 mb-4"
                  >
                    <CarFront className="h-3.5 w-3.5 mr-1.5 text-primary" />
                    Our Fleet
                  </Badge>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Explore Our Categories
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                    Find the perfect car for your needs, from efficient economy to luxurious premium options
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: "Economy", icon: "🚗", description: "Fuel-efficient and budget-friendly options" },
                  { name: "SUV", icon: "🚙", description: "Spacious vehicles perfect for families and groups" },
                  { name: "Luxury", icon: "✨", description: "Premium vehicles with exceptional comfort" },
                  { name: "Sports", icon: "🏎️", description: "High-performance cars for thrill-seekers" },
                ].map((category, index) => (
                  <Link
                    href={`/cars?category=${category.name.toLowerCase()}`}
                    key={category.name}
                    className="group relative overflow-hidden rounded-xl border bg-card card-hover transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src="/placeholder.svg?height=300&width=400"
                        alt={category.name}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold">{category.name}</h3>
                        <span className="text-2xl">{category.icon}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                      <div className="flex items-center text-sm text-primary font-medium">
                        View vehicles <ChevronRight className="ml-1 h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.section>
          {/* Featured Cars - Enhanced with improved card design */}
          <motion.section
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full py-16 md:py-24"
          >
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
                <Badge
                  variant="outline"
                  className="rounded-full px-4 py-1 text-sm bg-background/80 backdrop-blur-sm border-primary/20 mb-4"
                >
                  <Sparkles className="h-3.5 w-3.5 mr-1.5 text-primary" />
                  Top Picks
                </Badge>
                <div className="space-y-2 max-w-3xl">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Vehicles</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                    Our most popular and highly rated vehicles, perfect for any journey
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {[
                  {
                    name: "BMW i8",
                    category: "Electric",
                    price: 180,
                    rating: 4.9,
                    specs: ["Electric", "Range: 330mi", "0-60: 4.2s"],
                    image: "/placeholder.svg?height=300&width=400",
                  },
                  {
                    name: "BMW X5",
                    category: "SUV",
                    price: 150,
                    rating: 4.8,
                    specs: ["V6 Engine", "All-wheel drive", "7 seats"],
                    image: "/placeholder.svg?height=300&width=400",
                  },
                  {
                    name: "Mercedes C-Class",
                    category: "Luxury",
                    price: 135,
                    rating: 4.7,
                    specs: ["Premium audio", "Leather seats", "Advanced safety"],
                    image: "/placeholder.svg?height=300&width=400",
                  },
                ].map((car, index) => (
                  <div
                    key={car.name}
                    className="group rounded-xl border bg-card text-card-foreground shadow-lg card-hover overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20"
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                      <img
                        src={car.image || "/placeholder.svg"}
                        alt={car.name}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-md rounded-full px-3 py-1 text-xs font-medium flex items-center shadow-md">
                        <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500 mr-1" />
                        {car.rating}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background/90 to-transparent"></div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{car.name}</h3>
                          <Badge variant="secondary" className="mt-1">
                            {car.category}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-xl text-primary">${car.price}</p>
                          <p className="text-xs text-muted-foreground">per day</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {car.specs.map((spec, idx) => (
                          <span key={idx} className="text-xs bg-muted px-2 py-1 rounded-md font-medium">
                            {spec}
                          </span>
                        ))}
                      </div>
                      <Link href={`/cars/${car.name.toLowerCase().replace(/\s+/g, "-")}`}>
                        <Button className="w-full mt-2 rounded-lg bg-primary shadow-sm shadow-primary/10 hover:shadow-md hover:shadow-primary/20 transition-all">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-12">
                <Link href="/cars">
                  <Button variant="outline" className="rounded-full px-8 border-primary/20 hover:bg-primary/5">
                    View All Cars <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.section>

          {/* Testimonials - With improved card design */}
          <motion.section
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full py-16 md:py-24"
          >
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <Badge
                  variant="outline"
                  className="rounded-full px-4 py-1 text-sm bg-background/80 backdrop-blur-sm border-primary/20 mb-4"
                >
                  <Star className="h-3.5 w-3.5 mr-1.5 text-primary" />
                  Testimonials
                </Badge>
                <div className="space-y-2 max-w-3xl">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    What Our Customers Say
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                    Read genuine reviews from our happy customers
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                {[
                  {
                    name: "Sarah Johnson",
                    role: "Business Traveler",
                    quote:
                      "The service was exceptional! The car was immaculate, well-maintained, and the pickup process was seamless. I'll definitely be coming back for my next business trip.",
                    rating: 5,
                    image: "/placeholder.svg?height=100&width=100",
                  },
                  {
                    name: "Michael Chen",
                    role: "Tourist",
                    quote:
                      "I rented a car for my vacation and it was the best decision. The staff was friendly, the rates were competitive, and the vehicle performed flawlessly throughout my trip.",
                    rating: 5,
                    image: "/placeholder.svg?height=100&width=100",
                  },
                  {
                    name: "Emily Rodriguez",
                    role: "Local Resident",
                    quote:
                      "I needed a car while mine was in the shop, and this service made it so easy. The online booking was quick, and they even delivered the car to my workplace! Will definitely use again.",
                    rating: 4,
                    image: "/placeholder.svg?height=100&width=100",
                  },
                ].map((testimonial, index) => (
                  <div
                    key={testimonial.name}
                    className="rounded-xl border bg-card p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-full overflow-hidden bg-muted">
                          <img
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < testimonial.rating ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="rounded-xl bg-muted/50 p-4 italic text-muted-foreground">
                        <span className="text-3xl text-primary/20">"</span>
                        <p className="text-sm">{testimonial.quote}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Features - With improved layout and visuals */}
          <motion.section
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full py-16 md:py-24 bg-muted/30"
          >
            <div className="container px-4 md:px-6">
              <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                <div className="space-y-6">
                  <Badge
                    variant="outline"
                    className="rounded-full px-4 py-1 text-sm bg-background/80 backdrop-blur-sm border-primary/20"
                  >
                    <CheckCircle className="h-3.5 w-3.5 mr-1.5 text-primary" />
                    Why Choose Us
                  </Badge>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Premium Service,{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
                      Exceptional Experience
                    </span>
                  </h2>
                  <p className="text-muted-foreground text-lg md:text-xl/relaxed">
                    We pride ourselves on offering the best car rental experience with premium vehicles and exceptional
                    customer service.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        icon: <Shield className="h-6 w-6 text-primary" />,
                        title: "Fully Insured",
                        desc: "All our vehicles come with comprehensive insurance coverage",
                      },
                      {
                        icon: <Clock className="h-6 w-6 text-primary" />,
                        title: "24/7 Support",
                        desc: "Our dedicated customer service team is always available to help",
                      },
                      {
                        icon: <Zap className="h-6 w-6 text-primary" />,
                        title: "Fast Booking",
                        desc: "Book your car in minutes with our streamlined process",
                      },
                      {
                        icon: <MapPin className="h-6 w-6 text-primary" />,
                        title: "Multiple Locations",
                        desc: "Convenient pickup and drop-off points across the city",
                      },
                    ].map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-background hover:shadow-sm"
                      >
                        <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center relative">
                  <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>

                  <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
                  <div className="relative w-full max-w-[600px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-primary/10">
                    <img
                      src="/placeholder.svg?height=600&width=800"
                      alt="Premium car service"
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-md rounded-full px-4 py-2 flex items-center shadow-lg">
                      <span className="flex h-3 w-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                      <p className="text-sm font-medium">100% Customer Satisfaction</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* CTA */}
          <motion.section
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full py-16 md:py-24 bg-primary relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),rgba(0,0,0,0))] opacity-70"></div>
            <div className="container px-4 md:px-6 relative z-10">
              <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto">
                <Badge
                  variant="outline"
                  className="rounded-full px-4 py-1 text-sm bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground border-primary-foreground/20"
                >
                  <Sparkles className="h-3.5 w-3.5 mr-1.5 text-primary-foreground" />
                  Limited Time Offer
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary-foreground">
                  Ready to Hit the Road?
                </h2>
                <p className="max-w-[900px] text-primary-foreground/90 md:text-xl/relaxed">
                  Book your perfect car today and get 10% off your first rental. Use code{" "}
                  <span className="font-bold">NEWDRIVER</span> at checkout.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mt-4">
                  <Link href="/cars" className="w-full">
                    <Button
                      size="lg"
                      className="w-full rounded-full bg-background text-primary hover:bg-background/90 transition-all duration-300 shadow-lg shadow-primary-foreground/10"
                    >
                      Browse Cars
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/auth/signup" className="w-full">
                    <Button
                      size="lg"
                      className="w-full rounded-full bg-white text-primary hover:bg-white/90 transition-all duration-300 shadow-lg shadow-primary-foreground/10 font-medium"
                    >
                      Sign Up Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Newsletter Section */}
          <motion.section
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full py-16 md:py-24"
          >
            <div className="container px-4 md:px-6">
              <div className="rounded-2xl bg-muted/50 border border-primary/10 p-8 md:p-12 shadow-xl">
                <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                  <div className="space-y-4">
                    <Badge
                      variant="outline"
                      className="rounded-full px-4 py-1 text-sm bg-background/80 backdrop-blur-sm border-primary/20"
                    >
                      <Sparkles className="h-3.5 w-3.5 mr-1.5 text-primary" />
                      Stay Updated
                    </Badge>
                    <h3 className="text-2xl font-bold sm:text-3xl">Subscribe to Our Newsletter</h3>
                    <p className="text-muted-foreground">
                      Get exclusive offers, new car alerts, and travel tips delivered straight to your inbox.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        aria-label="Email address"
                        className="flex-1 rounded-full px-4 py-2 bg-background border border-input text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      />
                      <Button className="rounded-full bg-primary shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                        Subscribe
                        <Zap className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute -top-8 -right-8 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { icon: Shield, label: "Secure Payments" },
                        { icon: Clock, label: "24/7 Support" },
                        { icon: CarFront, label: "Regular Updates" },
                        { icon: Star, label: "VIP Benefits" },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-primary/10 hover:bg-background/80 transition-all duration-300"
                          style={{ transitionDelay: `${index * 100}ms` }}
                        >
                          <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <item.icon className="h-5 w-5 text-primary" />
                          </div>
                          <p className="text-sm font-medium">{item.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
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
