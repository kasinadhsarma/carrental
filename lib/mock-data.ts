import type { User, Car, Booking, Review } from "@/types/api"

// Mock Users
export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, USA 12345",
    status: "active",
    role: "user",
    joinDate: "2023-01-15T00:00:00Z",
    profileImage: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    address: "456 Oak Ave, Somewhere, USA 67890",
    status: "active",
    role: "user",
    joinDate: "2023-02-03T00:00:00Z",
    profileImage: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "+1 (555) 456-7890",
    status: "inactive",
    role: "user",
    joinDate: "2023-03-22T00:00:00Z",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 234-5678",
    address: "789 Pine Rd, Elsewhere, USA 54321",
    status: "active",
    role: "user",
    joinDate: "2023-04-10T00:00:00Z",
    profileImage: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "5",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    phone: "+1 (555) 876-5432",
    status: "active",
    role: "user",
    joinDate: "2023-05-05T00:00:00Z",
  },
  {
    id: "6",
    name: "Admin User",
    email: "admin@carrental.com",
    phone: "+1 (555) 111-0000",
    address: "1 Admin Plaza, HQ, USA 00001",
    status: "active",
    role: "admin",
    joinDate: "2023-01-01T00:00:00Z",
    profileImage: "/placeholder.svg?height=200&width=200",
  },
]

// Mock Cars
export const mockCars: Car[] = [
  {
    id: "1",
    name: "Toyota Camry",
    category: "Sedan",
    price: 50,
    rating: 4.5,
    description: "The Toyota Camry is a comfortable and reliable sedan, perfect for city driving and longer trips.",
    location: "123 Main St, Anytown, USA",
    image: "/placeholder.svg?height=300&width=500",
    features: ["Automatic", "4 Seats", "Air Conditioning", "Bluetooth"],
    status: "available",
    specifications: {
      year: 2022,
      make: "Toyota",
      model: "Camry",
      color: "Silver",
      transmission: "automatic",
      fuelType: "gasoline",
      seats: 5,
      mileage: 15000,
      licensePlate: "ABC-1234",
    },
  },
  {
    id: "2",
    name: "Honda CR-V",
    category: "SUV",
    price: 75,
    rating: 4.7,
    description: "The Honda CR-V is a versatile SUV with plenty of space for passengers and cargo.",
    location: "456 Oak Ave, Somewhere, USA",
    image: "/placeholder.svg?height=300&width=500",
    features: ["Automatic", "5 Seats", "Air Conditioning", "GPS"],
    status: "available",
    specifications: {
      year: 2021,
      make: "Honda",
      model: "CR-V",
      color: "Blue",
      transmission: "automatic",
      fuelType: "gasoline",
      seats: 5,
      mileage: 22000,
      licensePlate: "XYZ-5678",
    },
  },
  {
    id: "3",
    name: "BMW 3 Series",
    category: "Luxury",
    price: 120,
    rating: 4.8,
    description: "The BMW 3 Series offers a perfect blend of luxury, performance, and comfort.",
    location: "789 Pine Rd, Elsewhere, USA",
    image: "/placeholder.svg?height=300&width=500",
    features: ["Automatic", "5 Seats", "Leather Seats", "Premium Sound"],
    status: "available",
    specifications: {
      year: 2023,
      make: "BMW",
      model: "3 Series",
      color: "Black",
      transmission: "automatic",
      fuelType: "gasoline",
      seats: 5,
      mileage: 5000,
      licensePlate: "LUX-9012",
    },
  },
  {
    id: "4",
    name: "Ford Mustang",
    category: "Sports",
    price: 150,
    rating: 4.9,
    description: "The Ford Mustang is an iconic American sports car with powerful performance and head-turning style.",
    location: "321 Elm St, Nowhere, USA",
    image: "/placeholder.svg?height=300&width=500",
    features: ["Manual", "2 Seats", "Convertible", "High Performance"],
    status: "available",
    specifications: {
      year: 2022,
      make: "Ford",
      model: "Mustang",
      color: "Red",
      transmission: "manual",
      fuelType: "gasoline",
      seats: 4,
      mileage: 8000,
      licensePlate: "FAST-123",
    },
  },
  {
    id: "5",
    name: "Nissan Altima",
    category: "Sedan",
    price: 45,
    rating: 4.3,
    description: "The Nissan Altima is a fuel-efficient sedan with modern features and a comfortable interior.",
    location: "654 Maple Dr, Anytown, USA",
    image: "/placeholder.svg?height=300&width=500",
    features: ["Automatic", "5 Seats", "Fuel Efficient", "Bluetooth"],
    status: "available",
    specifications: {
      year: 2021,
      make: "Nissan",
      model: "Altima",
      color: "White",
      transmission: "automatic",
      fuelType: "gasoline",
      seats: 5,
      mileage: 18000,
      licensePlate: "ECO-4567",
    },
  },
  {
    id: "6",
    name: "Jeep Wrangler",
    category: "SUV",
    price: 95,
    rating: 4.6,
    description: "The Jeep Wrangler is a rugged SUV perfect for off-road adventures and outdoor enthusiasts.",
    location: "987 Hill Rd, Somewhere, USA",
    image: "/placeholder.svg?height=300&width=500",
    features: ["Manual", "4 Seats", "4x4", "Removable Top"],
    status: "available",
    specifications: {
      year: 2022,
      make: "Jeep",
      model: "Wrangler",
      color: "Green",
      transmission: "manual",
      fuelType: "gasoline",
      seats: 4,
      mileage: 12000,
      licensePlate: "OFF-8901",
    },
  },
  {
    id: "7",
    name: "Tesla Model 3",
    category: "Electric",
    price: 110,
    rating: 4.9,
    description: "The Tesla Model 3 is a high-tech electric car with impressive range and performance.",
    location: "123 Tech Blvd, Future City, USA",
    image: "/placeholder.svg?height=300&width=500",
    features: ["Automatic", "5 Seats", "Autopilot", "Electric"],
    status: "available",
    specifications: {
      year: 2023,
      make: "Tesla",
      model: "Model 3",
      color: "Midnight Silver",
      transmission: "automatic",
      fuelType: "electric",
      seats: 5,
      mileage: 3000,
      licensePlate: "ELEC-001",
    },
  },
  {
    id: "8",
    name: "Toyota Prius",
    category: "Hybrid",
    price: 60,
    rating: 4.4,
    description: "The Toyota Prius is a fuel-efficient hybrid car with eco-friendly features.",
    location: "456 Green St, Ecotown, USA",
    image: "/placeholder.svg?height=300&width=500",
    features: ["Automatic", "5 Seats", "Hybrid", "Fuel Efficient"],
    status: "available",
    specifications: {
      year: 2022,
      make: "Toyota",
      model: "Prius",
      color: "Blue",
      transmission: "automatic",
      fuelType: "hybrid",
      seats: 5,
      mileage: 10000,
      licensePlate: "HYB-2345",
    },
  },
]

// Mock Bookings
export const mockBookings: Booking[] = [
  {
    id: "1",
    userId: "1",
    carId: "1",
    startDate: "2023-07-15T10:00:00Z",
    endDate: "2023-07-15T18:00:00Z",
    status: "confirmed",
    totalPrice: 50,
    paymentStatus: "paid",
    createdAt: "2023-07-10T14:30:00Z",
    updatedAt: "2023-07-10T14:35:00Z",
    pickupLocation: "123 Main St, Anytown, USA",
    dropoffLocation: "123 Main St, Anytown, USA",
  },
  {
    id: "2",
    userId: "1",
    carId: "2",
    startDate: "2023-07-20T09:00:00Z",
    endDate: "2023-07-20T17:00:00Z",
    status: "pending",
    totalPrice: 75,
    paymentStatus: "pending",
    createdAt: "2023-07-12T10:15:00Z",
    updatedAt: "2023-07-12T10:15:00Z",
    pickupLocation: "456 Oak Ave, Somewhere, USA",
    dropoffLocation: "456 Oak Ave, Somewhere, USA",
  },
  {
    id: "3",
    userId: "2",
    carId: "3",
    startDate: "2023-07-05T11:00:00Z",
    endDate: "2023-07-05T19:00:00Z",
    status: "completed",
    totalPrice: 120,
    paymentStatus: "paid",
    createdAt: "2023-06-28T16:45:00Z",
    updatedAt: "2023-07-05T19:30:00Z",
    pickupLocation: "789 Pine Rd, Elsewhere, USA",
    dropoffLocation: "789 Pine Rd, Elsewhere, USA",
  },
  {
    id: "4",
    userId: "3",
    carId: "4",
    startDate: "2023-07-10T08:00:00Z",
    endDate: "2023-07-10T16:00:00Z",
    status: "cancelled",
    totalPrice: 150,
    paymentStatus: "refunded",
    createdAt: "2023-07-01T09:20:00Z",
    updatedAt: "2023-07-08T14:10:00Z",
    pickupLocation: "321 Elm St, Nowhere, USA",
    dropoffLocation: "321 Elm St, Nowhere, USA",
  },
]

// Mock Reviews
export const mockReviews: Review[] = [
  {
    id: "1",
    userId: "1",
    carId: "1",
    bookingId: "1",
    rating: 4,
    comment: "Great car, very clean and comfortable. Would rent again!",
    createdAt: "2023-07-16T10:30:00Z",
  },
  {
    id: "2",
    userId: "2",
    carId: "3",
    bookingId: "3",
    rating: 5,
    comment: "Excellent luxury car! The BMW was in perfect condition and drove beautifully.",
    createdAt: "2023-07-06T14:45:00Z",
  },
  {
    id: "3",
    userId: "3",
    carId: "5",
    bookingId: "5",
    rating: 3,
    comment: "Car was okay, but had some issues with the air conditioning.",
    createdAt: "2023-06-22T09:15:00Z",
  },
  {
    id: "4",
    userId: "4",
    carId: "2",
    bookingId: "6",
    rating: 4,
    comment: "Spacious SUV, perfect for our family trip. Pickup and drop-off were easy.",
    createdAt: "2023-07-03T16:20:00Z",
  },
  {
    id: "5",
    userId: "5",
    carId: "7",
    bookingId: "7",
    rating: 5,
    comment: "The Tesla was amazing! So quiet and smooth to drive. The autopilot feature was impressive.",
    createdAt: "2023-07-18T11:10:00Z",
  },
]

// Function to get user by ID
export function getUserById(id: string): User | undefined {
  return mockUsers.find((user) => user.id === id)
}

// Function to get car by ID
export function getCarById(id: string): Car | undefined {
  return mockCars.find((car) => car.id === id)
}

// Function to get booking by ID
export function getBookingById(id: string): Booking | undefined {
  return mockBookings.find((booking) => booking.id === id)
}

// Function to get review by ID
export function getReviewById(id: string): Review | undefined {
  return mockReviews.find((review) => review.id === id)
}

// Function to get user's bookings
export function getUserBookings(userId: string): Booking[] {
  return mockBookings.filter((booking) => booking.userId === userId)
}

// Function to get car's bookings
export function getCarBookings(carId: string): Booking[] {
  return mockBookings.filter((booking) => booking.carId === carId)
}

// Function to get car's reviews
export function getCarReviews(carId: string): Review[] {
  return mockReviews.filter((review) => review.carId === carId)
}

// Function to get user's reviews
export function getUserReviews(userId: string): Review[] {
  return mockReviews.filter((review) => review.userId === userId)
}
