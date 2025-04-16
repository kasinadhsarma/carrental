"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, MoreHorizontal, Search, X } from "lucide-react"

// Mock bookings data
const bookings = [
  {
    id: "1",
    user: "John Doe",
    car: "Toyota Camry",
    startDate: "Apr 15, 2023",
    endDate: "Apr 18, 2023",
    totalPrice: 150,
    status: "pending",
  },
  {
    id: "2",
    user: "Jane Smith",
    car: "Honda CR-V",
    startDate: "Apr 20, 2023",
    endDate: "Apr 25, 2023",
    totalPrice: 375,
    status: "approved",
  },
  {
    id: "3",
    user: "Robert Johnson",
    car: "BMW 3 Series",
    startDate: "May 1, 2023",
    endDate: "May 5, 2023",
    totalPrice: 480,
    status: "completed",
  },
  {
    id: "4",
    user: "Emily Davis",
    car: "Ford Mustang",
    startDate: "May 10, 2023",
    endDate: "May 12, 2023",
    totalPrice: 300,
    status: "canceled",
  },
  {
    id: "5",
    user: "Michael Wilson",
    car: "Nissan Altima",
    startDate: "May 15, 2023",
    endDate: "May 20, 2023",
    totalPrice: 225,
    status: "pending",
  },
]

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAssignCarOpen, setIsAssignCarOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<(typeof bookings)[0] | null>(null)

  // Filter bookings based on search term and status
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.car.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.includes(searchTerm)

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleAssignCar = (booking: (typeof bookings)[0]) => {
    setSelectedBooking(booking)
    setIsAssignCarOpen(true)
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "canceled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
        <p className="text-muted-foreground">Manage and track all car bookings</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search bookings..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="canceled">Canceled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Bookings</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4 mt-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Car</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">#{booking.id}</TableCell>
                      <TableCell>{booking.user}</TableCell>
                      <TableCell>{booking.car}</TableCell>
                      <TableCell>
                        {booking.startDate} - {booking.endDate}
                      </TableCell>
                      <TableCell>${booking.totalPrice}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusBadgeClass(booking.status)}`}
                        >
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            {booking.status === "pending" && (
                              <>
                                <DropdownMenuItem onClick={() => handleAssignCar(booking)}>Assign Car</DropdownMenuItem>
                                <DropdownMenuItem className="text-green-600 focus:text-green-600">
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive focus:text-destructive">
                                  Reject
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No bookings found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="pending" className="space-y-4 mt-6">
          {/* Similar table structure for pending bookings */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Car</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.filter((b) => b.status === "pending").length > 0 ? (
                  filteredBookings
                    .filter((b) => b.status === "pending")
                    .map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">#{booking.id}</TableCell>
                        <TableCell>{booking.user}</TableCell>
                        <TableCell>{booking.car}</TableCell>
                        <TableCell>
                          {booking.startDate} - {booking.endDate}
                        </TableCell>
                        <TableCell>${booking.totalPrice}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusBadgeClass(booking.status)}`}
                          >
                            Pending
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="icon" variant="outline" className="h-8 w-8 text-green-600">
                              <Check className="h-4 w-4" />
                              <span className="sr-only">Approve</span>
                            </Button>
                            <Button size="icon" variant="outline" className="h-8 w-8 text-destructive">
                              <X className="h-4 w-4" />
                              <span className="sr-only">Reject</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No pending bookings found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="active" className="space-y-4 mt-6">
          {/* Similar table structure for active bookings */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Car</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.filter((b) => b.status === "approved").length > 0 ? (
                  filteredBookings
                    .filter((b) => b.status === "approved")
                    .map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">#{booking.id}</TableCell>
                        <TableCell>{booking.user}</TableCell>
                        <TableCell>{booking.car}</TableCell>
                        <TableCell>
                          {booking.startDate} - {booking.endDate}
                        </TableCell>
                        <TableCell>${booking.totalPrice}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusBadgeClass(booking.status)}`}
                          >
                            Approved
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            Track
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No active bookings found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="completed" className="space-y-4 mt-6">
          {/* Similar table structure for completed bookings */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Car</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.filter((b) => b.status === "completed").length > 0 ? (
                  filteredBookings
                    .filter((b) => b.status === "completed")
                    .map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">#{booking.id}</TableCell>
                        <TableCell>{booking.user}</TableCell>
                        <TableCell>{booking.car}</TableCell>
                        <TableCell>
                          {booking.startDate} - {booking.endDate}
                        </TableCell>
                        <TableCell>${booking.totalPrice}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusBadgeClass(booking.status)}`}
                          >
                            Completed
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No completed bookings found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Assign Car Dialog */}
      <Dialog open={isAssignCarOpen} onOpenChange={setIsAssignCarOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Car</DialogTitle>
            <DialogDescription>Assign a car to this booking request</DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="py-4">
              <div className="mb-4 p-3 rounded-md border bg-muted/50">
                <p>
                  <strong>Booking ID:</strong> #{selectedBooking.id}
                </p>
                <p>
                  <strong>User:</strong> {selectedBooking.user}
                </p>
                <p>
                  <strong>Dates:</strong> {selectedBooking.startDate} - {selectedBooking.endDate}
                </p>
                <p>
                  <strong>Requested Car:</strong> {selectedBooking.car}
                </p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Car</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a car" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="toyota">Toyota Camry</SelectItem>
                      <SelectItem value="honda">Honda CR-V</SelectItem>
                      <SelectItem value="bmw">BMW 3 Series</SelectItem>
                      <SelectItem value="ford">Ford Mustang</SelectItem>
                      <SelectItem value="nissan">Nissan Altima</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Add Note (Optional)</label>
                  <Input placeholder="Add a note for the user" />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignCarOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Assign & Approve</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
