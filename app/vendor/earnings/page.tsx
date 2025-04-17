"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageTransition } from "@/components/ui/page-transition"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Download, Filter, Search, CreditCard, CheckCircle, Clock, AlertCircle, Car } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { format } from "date-fns"

export default function VendorEarningsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock earnings data
  const earnings = [
    {
      id: "e1",
      bookingId: "b1",
      carId: "c1",
      carName: "Toyota Camry",
      bookingDate: "2023-05-15",
      amount: 250,
      commission: 25,
      netAmount: 225,
      status: "completed",
      transactionId: "tx123456",
      transactionDate: "2023-05-18",
    },
    {
      id: "e2",
      bookingId: "b2",
      carId: "c2",
      carName: "Honda Civic",
      bookingDate: "2023-05-20",
      amount: 180,
      commission: 18,
      netAmount: 162,
      status: "completed",
      transactionId: "tx123457",
      transactionDate: "2023-05-23",
    },
    {
      id: "e3",
      bookingId: "b3",
      carId: "c3",
      carName: "BMW X5",
      bookingDate: "2023-05-25",
      amount: 600,
      commission: 60,
      netAmount: 540,
      status: "pending",
    },
    {
      id: "e4",
      bookingId: "b4",
      carId: "c4",
      carName: "Mercedes C-Class",
      bookingDate: "2023-06-01",
      amount: 550,
      commission: 55,
      netAmount: 495,
      status: "processing",
    },
    {
      id: "e5",
      bookingId: "b5",
      carId: "c5",
      carName: "Ford Mustang",
      bookingDate: "2023-06-10",
      amount: 285,
      commission: 28.5,
      netAmount: 256.5,
      status: "completed",
      transactionId: "tx123458",
      transactionDate: "2023-06-13",
    },
    {
      id: "e6",
      bookingId: "b6",
      carId: "c6",
      carName: "Audi A4",
      bookingDate: "2023-06-15",
      amount: 300,
      commission: 30,
      netAmount: 270,
      status: "pending",
    },
  ]

  // Filter earnings based on search query and status filter
  const filteredEarnings = earnings.filter((earning) => {
    const matchesSearch =
      earning.carName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      earning.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (earning.transactionId && earning.transactionId.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesStatus = statusFilter === "all" || earning.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Calculate total earnings
  const totalEarnings = earnings.reduce((total, earning) => total + earning.netAmount, 0)
  const pendingEarnings = earnings
    .filter((earning) => earning.status === "pending" || earning.status === "processing")
    .reduce((total, earning) => total + earning.netAmount, 0)
  const completedEarnings = earnings
    .filter((earning) => earning.status === "completed")
    .reduce((total, earning) => total + earning.netAmount, 0)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" /> Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <Clock className="h-3 w-3 mr-1" /> Pending
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Clock className="h-3 w-3 mr-1" /> Processing
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
            <h1 className="text-3xl font-bold tracking-tight">Earnings</h1>
            <p className="text-muted-foreground">Track your earnings and payouts</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="gap-2">
              <CreditCard className="h-4 w-4" />
              Request Payout
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalEarnings.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Lifetime earnings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Earnings</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${pendingEarnings.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">To be processed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available for Payout</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${completedEarnings.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Ready to withdraw</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Earnings Overview</CardTitle>
            <CardDescription>Monthly earnings for the current year</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <div className="h-full w-full rounded-md border bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">Earnings chart will appear here</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Earnings History</CardTitle>
            <CardDescription>View all your earnings from bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by car, booking ID, or transaction ID..."
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
                  <DropdownMenuItem onClick={() => setStatusFilter("completed")}>Completed</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("pending")}>Pending</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("processing")}>Processing</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Tabs defaultValue="all" className="space-y-6">
              <TabsList className="w-full md:w-auto">
                <TabsTrigger value="all" className="flex-1 md:flex-initial">
                  All Earnings
                </TabsTrigger>
                <TabsTrigger value="completed" className="flex-1 md:flex-initial">
                  Completed
                </TabsTrigger>
                <TabsTrigger value="pending" className="flex-1 md:flex-initial">
                  Pending
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="space-y-4">
                  {filteredEarnings.map((earning) => (
                    <div key={earning.id} className="flex flex-col p-4 border rounded-lg">
                      <div className="flex flex-col md:flex-row gap-4 justify-between">
                        <div className="flex items-start gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <Car className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{earning.carName}</h3>
                            <p className="text-sm text-muted-foreground">Booking ID: {earning.bookingId}</p>
                            <p className="text-sm text-muted-foreground">
                              Booking Date: {format(new Date(earning.bookingDate), "MMM dd, yyyy")}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="text-lg font-semibold">${earning.netAmount.toFixed(2)}</div>
                          <div className="text-sm text-muted-foreground">
                            Commission: ${earning.commission.toFixed(2)}
                          </div>
                          {getStatusBadge(earning.status)}
                        </div>
                      </div>
                      {earning.transactionId && (
                        <div className="mt-4 pt-4 border-t text-sm">
                          <p className="text-muted-foreground">
                            Transaction ID: {earning.transactionId} • Processed on{" "}
                            {format(new Date(earning.transactionDate!), "MMM dd, yyyy")}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="completed">
                <div className="space-y-4">
                  {filteredEarnings
                    .filter((earning) => earning.status === "completed")
                    .map((earning) => (
                      <div key={earning.id} className="flex flex-col p-4 border rounded-lg">
                        <div className="flex flex-col md:flex-row gap-4 justify-between">
                          <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                              <Car className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">{earning.carName}</h3>
                              <p className="text-sm text-muted-foreground">Booking ID: {earning.bookingId}</p>
                              <p className="text-sm text-muted-foreground">
                                Booking Date: {format(new Date(earning.bookingDate), "MMM dd, yyyy")}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="text-lg font-semibold">${earning.netAmount.toFixed(2)}</div>
                            <div className="text-sm text-muted-foreground">
                              Commission: ${earning.commission.toFixed(2)}
                            </div>
                            {getStatusBadge(earning.status)}
                          </div>
                        </div>
                        {earning.transactionId && (
                          <div className="mt-4 pt-4 border-t text-sm">
                            <p className="text-muted-foreground">
                              Transaction ID: {earning.transactionId} • Processed on{" "}
                              {format(new Date(earning.transactionDate!), "MMM dd, yyyy")}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="pending">
                <div className="space-y-4">
                  {filteredEarnings
                    .filter((earning) => earning.status === "pending" || earning.status === "processing")
                    .map((earning) => (
                      <div key={earning.id} className="flex flex-col p-4 border rounded-lg">
                        <div className="flex flex-col md:flex-row gap-4 justify-between">
                          <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                              <Car className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">{earning.carName}</h3>
                              <p className="text-sm text-muted-foreground">Booking ID: {earning.bookingId}</p>
                              <p className="text-sm text-muted-foreground">
                                Booking Date: {format(new Date(earning.bookingDate), "MMM dd, yyyy")}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="text-lg font-semibold">${earning.netAmount.toFixed(2)}</div>
                            <div className="text-sm text-muted-foreground">
                              Commission: ${earning.commission.toFixed(2)}
                            </div>
                            {getStatusBadge(earning.status)}
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
