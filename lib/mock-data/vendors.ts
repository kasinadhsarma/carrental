import type { Vendor } from "@/types/vendor"

export const vendors: Vendor[] = [
  {
    id: "v1",
    name: "Premium Auto Rentals",
    email: "info@premiumautorentals.com",
    phone: "+1234567890",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    logo: "/placeholder.svg?height=100&width=100",
    description:
      "Premium Auto Rentals offers luxury and exotic car rentals for those who want to experience the best in automotive engineering and design.",
    rating: 4.8,
    reviewCount: 156,
    verified: true,
    createdAt: "2021-05-15T10:00:00Z",
    carCount: 25,
  },
  {
    id: "v2",
    name: "EcoDrive Rentals",
    email: "contact@ecodriverentals.com",
    phone: "+1987654321",
    address: "456 Green Avenue",
    city: "San Francisco",
    state: "CA",
    zipCode: "94107",
    logo: "/placeholder.svg?height=100&width=100",
    description:
      "EcoDrive specializes in electric and hybrid vehicle rentals, helping you reduce your carbon footprint while enjoying your journey.",
    rating: 4.6,
    reviewCount: 98,
    verified: true,
    createdAt: "2022-01-10T14:30:00Z",
    carCount: 18,
  },
  {
    id: "v3",
    name: "Family Wheels",
    email: "support@familywheels.com",
    phone: "+1555555555",
    address: "789 Comfort Lane",
    city: "Chicago",
    state: "IL",
    zipCode: "60601",
    logo: "/placeholder.svg?height=100&width=100",
    description:
      "Family Wheels provides spacious and comfortable vehicles perfect for family trips and group travel at affordable rates.",
    rating: 4.5,
    reviewCount: 124,
    verified: true,
    createdAt: "2021-08-22T09:15:00Z",
    carCount: 30,
  },
  {
    id: "v4",
    name: "Adventure Motors",
    email: "hello@adventuremotors.com",
    phone: "+1444444444",
    address: "321 Mountain Road",
    city: "Denver",
    state: "CO",
    zipCode: "80202",
    logo: "/placeholder.svg?height=100&width=100",
    description:
      "Adventure Motors specializes in 4x4s, SUVs, and off-road vehicles for those looking to explore the great outdoors.",
    rating: 4.7,
    reviewCount: 87,
    verified: true,
    createdAt: "2022-03-05T11:45:00Z",
    carCount: 22,
  },
  {
    id: "v5",
    name: "Budget Rides",
    email: "info@budgetrides.com",
    phone: "+1333333333",
    address: "555 Economy Street",
    city: "Dallas",
    state: "TX",
    zipCode: "75201",
    logo: "/placeholder.svg?height=100&width=100",
    description: "Budget Rides offers affordable car rental options without compromising on quality or service.",
    rating: 4.3,
    reviewCount: 210,
    verified: true,
    createdAt: "2021-11-18T08:30:00Z",
    carCount: 45,
  },
  {
    id: "v6",
    name: "Classic Car Collection",
    email: "vintage@classiccarrentals.com",
    phone: "+1222222222",
    address: "888 Vintage Boulevard",
    city: "Miami",
    state: "FL",
    zipCode: "33101",
    logo: "/placeholder.svg?height=100&width=100",
    description:
      "Classic Car Collection offers vintage and classic automobiles for special events, photoshoots, and nostalgic drives.",
    rating: 4.9,
    reviewCount: 65,
    verified: true,
    createdAt: "2022-02-14T15:20:00Z",
    carCount: 15,
  },
]

export const getVendorById = (id: string): Vendor | undefined => {
  return vendors.find((vendor) => vendor.id === id)
}

export const getVendorCars = (vendorId: string) => {
  // This would fetch cars from a specific vendor
  // For now, we'll return a subset of mock cars
  return []
}
