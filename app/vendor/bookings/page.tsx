"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  User,
  MapPin,
  DollarSign,
  AlertCircle,
  Phone,
  Eye,
} from "lucide-react"
import { PageTransition } from "@/components/ui/page-transition"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export default function VendorBookingsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock booking data
  const bookings = [
    {
      id: "b1",
      carId: "c1",
      carName: "Toyota Camry",
      carImage: "/placeholder.svg?height=200&width=300",
      customerId: "u1",
      customerName: "John Doe",
      customerPhone: "+1234567890",
      startDate: "2023-05-15",
      endDate: "2023-05-18",
      pickupLocation: "123 Main St, City",
      dropoffLocation: "123 Main St, City",
      status: "confirmed",
      paymentStatus: "paid",
      totalAmount: 250,
      createdAt: "2023-05-10",
    },
    {
      id: "b2",
      carId: "c2",
      carName: "Honda Civic",
      carImage: "/placeholder.svg?height=200&width=300",
      customerId: "u2",
      customerName: "Jane Smith",
      customerPhone: "+1987654321",
      startDate: "2023-05-20",
      endDate: "2023-05-22",
      pickupLocation: "456 Oak St, City",
      dropoffLocation: "456 Oak St, City",
      status: "pending",
      paymentStatus: "pending",
      totalAmount: 180,
      createdAt: "2023-05-12",
    },
    {
      id: "b3",
      carId: "c3",
      carName: "BMW X5",
      carImage: "/placeholder.svg?height=200&width=300",
      customerId: "u3",
      customerName: "Robert Johnson",
      customerPhone: "+1122334455",
      startDate: "2023-05-25",
      endDate: "2023-05-30",
      pickupLocation: "789 Pine St, City",
      dropoffLocation: "789 Pine St, City",
      status: "completed",
      paymentStatus: "paid",
      totalAmount: 600,
      createdAt: "2023-05-15",
    },
    {
      id: "b4",
      carId: "c4",
      carName: "Mercedes C-Class",
      carImage: "/placeholder.svg?height=200&width=300",
      customerId: "u4",
      customerName: "Emily Davis",
      customerPhone: "+1555666777",
      startDate: "2023-06-01",
      endDate: "2023-06-05",
      pickupLocation: "101 Elm St, City",
      dropoffLocation: "101 Elm St, City",
      status: "cancelled",
      paymentStatus: "refunded",
      totalAmount: 550,
      createdAt: "2023-05-20",
    },
    {
      id: "b5",
      carId: "c5",
      carName: "Ford Mustang",
      carImage: "/placeholder.svg?height=200&width=300",
      customerId: "u5",
      customerName: "Michael Wilson",
      customerPhone: "+1999888777",
      startDate: "2023-06-10",
      endDate: "2023-06-12",
      pickupLocation: "202 Maple St, City",
      dropoffLocation: "202 Maple St, City",
      status: "confirmed",
      paymentStatus: "paid",
      totalAmount: 285,
      createdAt: "2023-05-25",
    },
    {
      id: "b6",
      carId: "c6",
      carName: "Audi A4",
      carImage: "/placeholder.svg?height=200&width=300",
      customerId: "u6",
      customerName: "Sarah Brown",
      customerPhone: "+1444333222",
      startDate: "2023-06-15",
      endDate: "2023-06-18",
      pickupLocation: "303 Cedar St, City",
      dropoffLocation: "303 Cedar St, City",
      status: "pending",
      paymentStatus: "pending",
      totalAmount: 300,
      createdAt: "2023-05-30",
    },
  ]

  // Filter bookings based on search query and status filter
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.carName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" /> Confirmed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <Clock className="h-3 w-3 mr-1" /> Pending
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <CheckCircle className="h-3 w-3 mr-1" /> Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="h-3 w-3 mr-1" /> Cancelled
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            <AlertCircle className="h-3 w-3 mr-1" /> Unknown
          </Badge>
        )
    }
  }

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <DollarSign className="h-3 w-3 mr-1" /> Paid
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <Clock className="h-3 w-3 mr-1" /> Pending
          </Badge>
        )
      case "refunded":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <DollarSign className="h-3 w-3 mr-1" /> Refunded
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            <AlertCircle className="h-3 w-3 mr-1" /> Unknown
          </Badge>
        )
    }
  }

  return (
    <PageTransition>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
            <p className="text-muted-foreground">Manage your car bookings and reservations</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Bookings</CardTitle>
            <CardDescription>View and manage all your car bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search bookings..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>All</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("pending")}>Pending</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("confirmed")}>Confirmed</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("completed")}>Completed</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("cancelled")}>Cancelled</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Tabs defaultValue="all" className="space-y-6">
              <TabsList className="w-full md:w-auto">
                <TabsTrigger value="all" className="flex-1 md:flex-initial">
                  All
                </TabsTrigger>
                <TabsTrigger value="upcoming" className="flex-1 md:flex-initial">
                  Upcoming
                </TabsTrigger>
                <TabsTrigger value="past" className="flex-1 md:flex-initial">
                  Past
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="space-y-4">
                  {filteredBookings.map((booking) => (
                    <div key={booking.id} className="flex flex-col p-4 border rounded-lg">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-48 h-32 bg-muted rounded-md overflow-hidden">
                          <img
                            src={booking.carImage || "/placeholder.svg"}
                            alt={booking.carName}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                            <h3 className="font-semibold text-lg">{booking.carName}</h3>
                            <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                              {getStatusBadge(booking.status)}
                              {getPaymentStatusBadge(booking.paymentStatus)}
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center text-sm">
                                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>
                                  {booking.startDate} to {booking.endDate}
                                </span>
                              </div>
                              <div className="flex items-center text-sm">
                                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{booking.pickupLocation}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>${booking.totalAmount}</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center text-sm">
                                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{booking.customerName}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{booking.customerPhone}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>Booked on {booking.createdAt}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {booking.status === "pending" && (
                              <>
                                <Button size="sm" className="gap-1">
                                  <CheckCircle className="h-4 w-4" /> Accept
                                </Button>
                                <Button size="sm" variant="outline" className="gap-1 text-red-500">
                                  <XCircle className="h-4 w-4" /> Decline
                                </Button>
                              </>
                            )}
                            <Button size="sm" variant="outline" className="gap-1">
                              <Eye className="h-4 w-4" /> View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="upcoming">
                <div className="space-y-4">
                  {filteredBookings
                    .filter((booking) => booking.status === "confirmed" || booking.status === "pending")
                    .map((booking) => (
                      <div key={booking.id} className="flex flex-col p-4 border rounded-lg">
                        {/* Same content as above */}
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="w-full md:w-48 h-32 bg-muted rounded-md overflow-hidden">
                            <img
                              src={booking.carImage || "/placeholder.svg"}
                              alt={booking.carName}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                              <h3 className="font-semibold text-lg">{booking.carName}</h3>
                              <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                                {getStatusBadge(booking.status)}
                                {getPaymentStatusBadge(booking.paymentStatus)}
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center text-sm">
                                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>
                                    {booking.startDate} to {booking.endDate}
                                  </span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>{booking.pickupLocation}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>${booking.totalAmount}</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center text-sm">
                                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>{booking.customerName}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>{booking.customerPhone}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>Booked on {booking.createdAt}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-4">
                              {booking.status === "pending" && (
                                <>
                                  <Button size="sm" className="gap-1">
                                    <CheckCircle className="h-4 w-4" /> Accept
                                  </Button>
                                  <Button size="sm" variant="outline" className="gap-1 text-red-500">
                                    <XCircle className="h-4 w-4" /> Decline
                                  </Button>
                                </>
                              )}
                              <Button size="sm" variant="outline" className="gap-1">
                                <Eye className="h-4 w-4" /> View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="past">
                <div className="space-y-4">
                  {filteredBookings
                    .filter((booking) => booking.status === "completed" || booking.status === "cancelled")
                    .map((booking) => (
                      <div key={booking.id} className="flex flex-col p-4 border rounded-lg">
                        {/* Same content as above */}
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="w-full md:w-48 h-32 bg-muted rounded-md overflow-hidden">
                            <img
                              src={booking.carImage || "/placeholder.svg"}
                              alt={booking.carName}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                              <h3 className="font-semibold text-lg">{booking.carName}</h3>
                              <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                                {getStatusBadge(booking.status)}
                                {getPaymentStatusBadge(booking.paymentStatus)}
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center text-sm">
                                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>
                                    {booking.startDate} to {booking.endDate}
                                  </span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>{booking.pickupLocation}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>${booking.totalAmount}</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center text-sm">
                                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>{booking.customerName}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>{booking.customerPhone}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>Booked on {booking.createdAt}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-4">
                              {booking.status === "pending" && (
                                <>
                                  <Button size="sm" className="gap-1">
                                    <CheckCircle className="h-4 w-4" /> Accept
                                  </Button>
                                  <Button size="sm" variant="outline" className="gap-1 text-red-500">
                                    <XCircle className="h-4 w-4" /> Decline
                                  </Button>
                                </>
                              )}
                              <Button size="sm" variant="outline" className="gap-1">
                                <Eye className="h-4 w-4" /> View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  )
}
