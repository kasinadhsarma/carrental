"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Filter, Edit, Trash2, Eye, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
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

export default function VendorCarsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock car data
  const cars = [
    {
      id: "c1",
      name: "Toyota Camry",
      make: "Toyota",
      model: "Camry",
      year: 2022,
      price: { perDay: 75 },
      status: "active",
      location: { address: "123 Main St, City" },
      images: ["/placeholder.svg?height=200&width=300"],
      bookings: 12,
      rating: 4.8,
    },
    {
      id: "c2",
      name: "Honda Civic",
      make: "Honda",
      model: "Civic",
      year: 2021,
      price: { perDay: 65 },
      status: "active",
      location: { address: "456 Oak St, City" },
      images: ["/placeholder.svg?height=200&width=300"],
      bookings: 8,
      rating: 4.5,
    },
    {
      id: "c3",
      name: "BMW X5",
      make: "BMW",
      model: "X5",
      year: 2023,
      price: { perDay: 120 },
      status: "maintenance",
      location: { address: "789 Pine St, City" },
      images: ["/placeholder.svg?height=200&width=300"],
      bookings: 5,
      rating: 4.9,
    },
    {
      id: "c4",
      name: "Mercedes C-Class",
      make: "Mercedes",
      model: "C-Class",
      year: 2022,
      price: { perDay: 110 },
      status: "active",
      location: { address: "101 Elm St, City" },
      images: ["/placeholder.svg?height=200&width=300"],
      bookings: 10,
      rating: 4.7,
    },
    {
      id: "c5",
      name: "Ford Mustang",
      make: "Ford",
      model: "Mustang",
      year: 2021,
      price: { perDay: 95 },
      status: "booked",
      location: { address: "202 Maple St, City" },
      images: ["/placeholder.svg?height=200&width=300"],
      bookings: 15,
      rating: 4.6,
    },
    {
      id: "c6",
      name: "Audi A4",
      make: "Audi",
      model: "A4",
      year: 2023,
      price: { perDay: 100 },
      status: "active",
      location: { address: "303 Cedar St, City" },
      images: ["/placeholder.svg?height=200&width=300"],
      bookings: 7,
      rating: 4.8,
    },
  ]

  // Filter cars based on search query and status filter
  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.model.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || car.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" /> Active
          </Badge>
        )
      case "maintenance":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <AlertCircle className="h-3 w-3 mr-1" /> Maintenance
          </Badge>
        )
      case "booked":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <CheckCircle className="h-3 w-3 mr-1" /> Booked
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            <XCircle className="h-3 w-3 mr-1" /> Inactive
          </Badge>
        )
    }
  }

  return (
    <PageTransition>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Cars</h1>
            <p className="text-muted-foreground">Manage your car listings and availability</p>
          </div>
          <div className="flex gap-2">
            <Link href="/vendor/cars/add">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add New Car
              </Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Car Listings</CardTitle>
            <CardDescription>View and manage all your car listings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search cars..."
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
                  <DropdownMenuItem onClick={() => setStatusFilter("active")}>Active</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("maintenance")}>Maintenance</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("booked")}>Booked</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Tabs defaultValue="grid" className="space-y-6">
              <TabsList className="w-full md:w-auto">
                <TabsTrigger value="grid" className="flex-1 md:flex-initial">
                  Grid View
                </TabsTrigger>
                <TabsTrigger value="list" className="flex-1 md:flex-initial">
                  List View
                </TabsTrigger>
              </TabsList>

              <TabsContent value="grid">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredCars.map((car) => (
                    <div key={car.id} className="border rounded-lg overflow-hidden group">
                      <div className="aspect-video bg-muted relative">
                        <img
                          src={car.images[0] || "/placeholder.svg"}
                          alt={car.name}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium">
                          ${car.price.perDay}/day
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">{car.name}</h3>
                          {getStatusBadge(car.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {car.make} • {car.model} • {car.year}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="text-sm">
                            <span className="font-medium">{car.bookings}</span>{" "}
                            <span className="text-muted-foreground">bookings</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="list">
                <div className="space-y-4">
                  {filteredCars.map((car) => (
                    <div key={car.id} className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg">
                      <div className="w-full md:w-48 h-32 bg-muted rounded-md overflow-hidden">
                        <img
                          src={car.images[0] || "/placeholder.svg"}
                          alt={car.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{car.name}</h3>
                          {getStatusBadge(car.status)}
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                              {car.make} • {car.model} • {car.year}
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">${car.price.perDay}</span>{" "}
                              <span className="text-muted-foreground">per day</span>
                            </p>
                            <p className="text-sm text-muted-foreground">{car.location.address}</p>
                          </div>
                          <div className="flex items-center gap-2 mt-4 md:mt-0">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" /> View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-1" /> Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4 mr-1" /> Delete
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
