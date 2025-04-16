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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreHorizontal, PlusCircle, Search, Star } from "lucide-react"

// Mock cars data
const cars = [
  {
    id: "1",
    name: "Toyota Camry",
    category: "Sedan",
    price: 50,
    owner: "John Doe",
    status: "available",
    rating: 4.5,
    bookings: 12,
  },
  {
    id: "2",
    name: "Honda CR-V",
    category: "SUV",
    price: 75,
    owner: "Jane Smith",
    status: "available",
    rating: 4.7,
    bookings: 8,
  },
  {
    id: "3",
    name: "BMW 3 Series",
    category: "Luxury",
    price: 120,
    owner: "Robert Johnson",
    status: "booked",
    rating: 4.8,
    bookings: 15,
  },
  {
    id: "4",
    name: "Ford Mustang",
    category: "Sports",
    price: 150,
    owner: "Emily Davis",
    status: "maintenance",
    rating: 4.9,
    bookings: 7,
  },
  {
    id: "5",
    name: "Nissan Altima",
    category: "Sedan",
    price: 45,
    owner: "Michael Wilson",
    status: "available",
    rating: 4.3,
    bookings: 10,
  },
]

export default function CarsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddCarOpen, setIsAddCarOpen] = useState(false)

  // Filter cars based on search term
  const filteredCars = cars.filter(
    (car) =>
      car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.owner.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cars</h1>
          <p className="text-muted-foreground">Manage cars available for rental</p>
        </div>
        <Button onClick={() => setIsAddCarOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Car
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search cars..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Car</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price/Day</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Bookings</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => (
                <TableRow key={car.id}>
                  <TableCell className="font-medium">{car.name}</TableCell>
                  <TableCell>{car.category}</TableCell>
                  <TableCell>${car.price}</TableCell>
                  <TableCell>{car.owner}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        car.status === "available"
                          ? "bg-green-100 text-green-800"
                          : car.status === "booked"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {car.status === "available" ? "Available" : car.status === "booked" ? "Booked" : "Maintenance"}
                    </span>
                  </TableCell>
                  <TableCell className="flex items-center">
                    <Star className="h-3 w-3 fill-primary text-primary mr-1" />
                    {car.rating}
                  </TableCell>
                  <TableCell>{car.bookings}</TableCell>
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
                        <DropdownMenuItem>Edit Car</DropdownMenuItem>
                        <DropdownMenuItem>Change Status</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          Remove Car
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No cars found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Car Dialog */}
      <Dialog open={isAddCarOpen} onOpenChange={setIsAddCarOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Car</DialogTitle>
            <DialogDescription>Add a new car to the rental platform</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="car-name">Car Name</Label>
              <Input id="car-name" placeholder="e.g. Toyota Camry" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedan">Sedan</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price per Day ($)</Label>
                <Input id="price" type="number" min="0" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="owner">Owner</Label>
              <Select>
                <SelectTrigger id="owner">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john">John Doe</SelectItem>
                  <SelectItem value="jane">Jane Smith</SelectItem>
                  <SelectItem value="robert">Robert Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter car details..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="car-image">Upload Image</Label>
              <Input id="car-image" type="file" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCarOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Car</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
