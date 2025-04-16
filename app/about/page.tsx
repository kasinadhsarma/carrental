import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Car, Users, Clock, Shield, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block">
                  <Badge variant="outline" className="rounded-full px-4 py-1 text-sm">
                    About Us
                  </Badge>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Driving Excellence Since <span className="text-primary">2010</span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                  We're more than just a car rental service. We're your partner in creating memorable journeys with
                  premium vehicles and exceptional service.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-[500px] aspect-video rounded-xl overflow-hidden shadow-xl">
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="Our team"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Story</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  From humble beginnings to becoming a leading car rental service
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Our Beginning</h3>
                <p className="text-muted-foreground">
                  Founded in 2010 with just 5 cars, we started with a simple mission: to provide quality vehicles with
                  exceptional service.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Car className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Growth & Expansion</h3>
                <p className="text-muted-foreground">
                  By 2015, our fleet had grown to over 100 vehicles, and we expanded to multiple locations across the
                  country.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Today</h3>
                <p className="text-muted-foreground">
                  Now with over 500 premium vehicles and 20 locations, we're proud to be the top-rated car rental
                  service in the region.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="w-full py-12 md:py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Values</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  The principles that guide everything we do
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Shield className="h-10 w-10 text-primary" />,
                  title: "Safety",
                  description: "Your safety is our top priority. All our vehicles undergo rigorous safety inspections.",
                },
                {
                  icon: <Award className="h-10 w-10 text-primary" />,
                  title: "Quality",
                  description: "We offer only premium vehicles that are meticulously maintained to high standards.",
                },
                {
                  icon: <Users className="h-10 w-10 text-primary" />,
                  title: "Customer Focus",
                  description: "We're dedicated to providing exceptional service that exceeds your expectations.",
                },
                {
                  icon: <Clock className="h-10 w-10 text-primary" />,
                  title: "Reliability",
                  description: "Count on us for punctual service and vehicles that perform flawlessly.",
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-6 space-y-4 rounded-xl bg-background shadow-sm"
                >
                  <div className="p-2 rounded-full bg-primary/10">{value.icon}</div>
                  <h3 className="text-xl font-bold">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Meet Our Team</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  The dedicated professionals behind our success
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Alex Johnson",
                  role: "CEO & Founder",
                  image: "/placeholder.svg?height=300&width=300",
                },
                {
                  name: "Sarah Williams",
                  role: "Operations Director",
                  image: "/placeholder.svg?height=300&width=300",
                },
                {
                  name: "Michael Chen",
                  role: "Fleet Manager",
                  image: "/placeholder.svg?height=300&width=300",
                },
                {
                  name: "Emily Rodriguez",
                  role: "Customer Experience Lead",
                  image: "/placeholder.svg?height=300&width=300",
                },
              ].map((member, index) => (
                <div key={index} className="flex flex-col items-center text-center space-y-4">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Experience the Difference?</h2>
                <p className="max-w-[900px] md:text-xl/relaxed">
                  Join thousands of satisfied customers who trust us for their car rental needs
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/cars">
                  <Button size="lg" variant="secondary" className="rounded-full">
                    Browse Cars
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
