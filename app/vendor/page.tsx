"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CarFront, TrendingUp, Users, Clock, Calendar } from "lucide-react"

export default function VendorDashboardPage() {
  const [totalCars] = useState(5)
  const [activeBookings] = useState(3)
  const [totalEarnings] = useState(1250)
  const [totalCustomers] = useState(8)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Vendor Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to your vendor portal</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cars</CardTitle>
            <CarFront className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCars}</div>
            <p className="text-xs text-muted-foreground">Active listings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeBookings}</div>
            <p className="text-xs text-muted-foreground">Currently rented</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalEarnings}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">Unique renters</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Latest customer bookings for your vehicles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((booking) => (
                <div key={booking} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Toyota Camry</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>John Doe</span>
                      <span className="mx-1">•</span>
                      <span>Apr 15 - Apr 18</span>
                    </div>
                  </div>
                  <div className="text-xs">
                    <span className="rounded-full bg-green-100 px-2 py-1 text-green-800">Active</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm">View All Bookings</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Cars</CardTitle>
            <CardDescription>Overview of your listed vehicles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((car) => (
                <div key={car} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <CarFront className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Toyota Camry {car}</p>
                    <p className="text-xs text-muted-foreground">$50/day • Available</p>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm">Manage Cars</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
