"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { CarFront, Filter, Search, Star } from "lucide-react"

// Mock data for cars
const cars = [
  {
    id: 1,
    name: "Toyota Camry",
    category: "Sedan",
    price: 50,
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300",
    features: ["Automatic", "4 Seats", "Air Conditioning", "Bluetooth"],
  },
  {
    id: 2,
    name: "Honda CR-V",
    category: "SUV",
    price: 75,
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300",
    features: ["Automatic", "5 Seats", "Air Conditioning", "GPS"],
  },
  {
    id: 3,
    name: "BMW 3 Series",
    category: "Luxury",
    price: 120,
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
    features: ["Automatic", "5 Seats", "Leather Seats", "Premium Sound"],
  },
  {
    id: 4,
    name: "Ford Mustang",
    category: "Sports",
    price: 150,
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300",
    features: ["Manual", "2 Seats", "Convertible", "High Performance"],
  },
  {
    id: 5,
    name: "Nissan Altima",
    category: "Sedan",
    price: 45,
    rating: 4.3,
    image: "/placeholder.svg?height=200&width=300",
    features: ["Automatic", "5 Seats", "Fuel Efficient", "Bluetooth"],
  },
  {
    id: 6,
    name: "Jeep Wrangler",
    category: "SUV",
    price: 95,
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300",
    features: ["Manual", "4 Seats", "4x4", "Removable Top"],
  },
]

export default function CarsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 200])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  // All available features from cars
  const allFeatures = Array.from(new Set(cars.flatMap((car) => car.features)))

  // Filter cars based on search, price, category, and features
  const filteredCars = cars.filter((car) => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1]
    const matchesCategory = selectedCategory === "" || car.category === selectedCategory
    const matchesFeatures =
      selectedFeatures.length === 0 || selectedFeatures.every((feature) => car.features.includes(feature))

    return matchesSearch && matchesPrice && matchesCategory && matchesFeatures
  })

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <CarFront className="h-6 w-6" />
            <span>CarRental</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                Dashboard
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="sm">Login</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container py-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <h1 className="text-3xl font-bold">Available Cars</h1>
          <div className="flex w-full md:w-auto gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search cars..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Cars</SheetTitle>
                  <SheetDescription>Adjust filters to find your perfect car</SheetDescription>
                </SheetHeader>
                <div className="space-y-6 py-4">
                  <div className="space-y-2">
                    <Label>Price Range ($/day)</Label>
                    <div className="pt-4">
                      <Slider
                        defaultValue={[0, 200]}
                        max={200}
                        step={5}
                        value={priceRange}
                        onValueChange={setPriceRange}
                      />
                      <div className="flex justify-between mt-2">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Sedan">Sedan</SelectItem>
                        <SelectItem value="SUV">SUV</SelectItem>
                        <SelectItem value="Luxury">Luxury</SelectItem>
                        <SelectItem value="Sports">Sports</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Features</Label>
                    <div className="space-y-2">
                      {allFeatures.map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <Checkbox
                            id={`feature-${feature}`}
                            checked={selectedFeatures.includes(feature)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedFeatures([...selectedFeatures, feature])
                              } else {
                                setSelectedFeatures(selectedFeatures.filter((f) => f !== feature))
                              }
                            }}
                          />
                          <label
                            htmlFor={`feature-${feature}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {feature}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => {
                      setPriceRange([0, 200])
                      setSelectedCategory("")
                      setSelectedFeatures([])
                    }}
                    variant="outline"
                  >
                    Reset Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <div
                key={car.id}
                className="group rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all"
              >
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={car.image || "/placeholder.svg"}
                    alt={car.name}
                    className="object-cover w-full h-full transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium flex items-center">
                    <Star className="h-3 w-3 fill-primary text-primary mr-1" />
                    {car.rating}
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{car.name}</h3>
                      <p className="text-sm text-muted-foreground">{car.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${car.price}</p>
                      <p className="text-xs text-muted-foreground">per day</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {car.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                      >
                        {feature}
                      </span>
                    ))}
                    {car.features.length > 3 && (
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                        +{car.features.length - 3} more
                      </span>
                    )}
                  </div>
                  <Link href={`/cars/${car.id}`}>
                    <Button className="w-full mt-2">View Details</Button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-lg font-medium">No cars found</h3>
              <p className="text-muted-foreground">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
