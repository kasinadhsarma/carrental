# Car Rental Application - Technical Documentation# 🚗 Car Rental Application

A modern car rental platform with:
- React Native mobile application for users
- Next.js web portals for admins and vendors

## 🌟 Features

- **User Management**
  - User registration and authentication
  - Role-based access (User, Admin)
  - Profile management
  - Settings customization

- **Car Management**
  - Comprehensive car listings
  - Advanced search and filtering
  - Detailed car information
  - Real-time availability status

- **Booking System**
  - Streamlined booking process
  - Multiple payment methods
  - Booking management
  - Status tracking

- **Vendor Portal**
  - Vendor registration
  - Car fleet management
  - Booking oversight
  - Document management

- **Admin Dashboard**
  - User management
  - Booking management
  - System settings
  - Analytics and reporting

## 🛠️ Technical Stack

### Mobile App (Users)
- **Frontend**
  - React Native
  - TypeScript
  - React Navigation
  - Native Components
  - Mobile-optimized UI

### Web Portals (Admin & Vendor)
- **Frontend**
  - Next.js 13+ (App Router)
  - TypeScript
  - Tailwind CSS
  - Shadcn UI Components

### Shared Infrastructure
- **State Management**
  - React Context
  - Server Components
  - Client-side Hooks
  - Redux (Mobile)

- **Authentication**
  - JWT-based auth
  - Role-based access control
  - Session management
  - Secure storage

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/car-rental-app.git
cd car-rental-app
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
car-rental-app/
├── app/                    # Next.js 13 app directory
│   ├── admin/             # Admin dashboard pages
│   ├── auth/              # Authentication pages
│   ├── vendor/            # Vendor portal pages
│   └── ...               # Other app routes
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   └── shared/           # Shared components
├── lib/                   # Utility functions and services
├── types/                # TypeScript type definitions
└── styles/               # Global styles
```

## 🔑 Key Features Documentation

### Authentication Flow

The application uses a JWT-based authentication system with the following features:
- Email/Password login
- Phone number + OTP verification
- Session management
- Secure token storage

### Car Management

Cars in the system are managed with the following attributes:
- Comprehensive details (make, model, year)
- Real-time availability status
- Dynamic pricing
- Location tracking
- Feature lists
- Image galleries

### Booking System

The booking system includes:
- Date range selection
- Location specification
- Real-time availability checks
- Price calculation
- Payment processing
- Status tracking

## 🚀 Development Workflow

1. Create a new branch for your feature:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit:
```bash
git commit -m "feat: add your feature"
```

3. Push to your branch:
```bash
git push origin feature/your-feature-name
```

4. Create a Pull Request

## 📚 Documentation

### Core Documentation
- [Technical Documentation](docs/TECHNICAL.md) - API interfaces and data models
- [Backend Architecture](docs/backend/mapping.md) - API endpoints and database schema
- [Frontend Architecture](docs/frontend/architecture.md) - Component structure and UI guidelines
- [Mobile Development](docs/frontend/capacitor.md) - Capacitor integration guide
- [Team Guidelines](docs/teams/readme.md) - Development workflow and best practices
- [References & Resources](docs/REFERENCES.md) - Links to official documentation and learning resources

### Architecture Overview
- **User Mobile App**: Native mobile experience
  - Built with React Native & TypeScript
  - Native device features (GPS, Camera, Push Notifications)
  - Offline support & data sync
  - Real-time booking updates
  - Mobile-optimized UI/UX

- **Admin Portal**: Comprehensive management interface
  - Built with Next.js & Tailwind CSS
  - [Admin Workflows](app/admin/flowchart%20TD.mmd)
  - Real-time dashboard
  - Analytics & reporting
  - User management
  - System settings

- **Vendor Portal**: Fleet management system
  - Built with Next.js & Tailwind CSS
  - Car fleet management
  - Booking oversight
  - Document management
  - Revenue tracking
  - [Backend Integration](docs/backend/mapping.md#api-endpoints-structure)

### Official Documentation References
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Native Documentation](https://reactnative.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

### Development Resources
- [Component Library](docs/frontend/architecture.md#ui-components-library)
- [API Endpoints](docs/TECHNICAL.md#api-endpoints)
- [Database Schema](docs/backend/mapping.md#database-schema-relationships)
- [Testing Guidelines](docs/teams/readme.md#testing)
- [Deployment Process](docs/teams/readme.md#deployment-process)


## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
![alt text](image.png)

## Table of Contents
1. [Data Models](#data-models)
2. [API Endpoints](#api-endpoints)
3. [Authentication](#authentication)
4. [Error Handling](#error-handling)
5. [Type Definitions](#type-definitions)

## Data Models

### User Model
```typescript
interface User {
  id: string
  name: string
  email: string
  phone: string
  address?: string
  status: "active" | "inactive"
  role: "user" | "admin"
  joinDate: string
  profileImage?: string
}
```

### Car Model
```typescript
interface Car {
  id: string
  name: string
  category: string
  price: number
  rating: number
  description: string
  location: string
  image: string
  features: string[]
  status: "available" | "booked" | "maintenance"
  specifications?: CarSpecifications
}

interface CarSpecifications {
  year: number
  make: string
  model: string
  color: string
  transmission: "automatic" | "manual"
  fuelType: "gasoline" | "diesel" | "electric" | "hybrid"
  seats: number
  mileage?: number
  licensePlate?: string
}
```

### Booking Model
```typescript
interface Booking {
  id: string
  userId: string
  carId: string
  startDate: string
  endDate: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  totalPrice: number
  paymentStatus: "pending" | "paid" | "refunded"
  createdAt: string
  updatedAt: string
  pickupLocation: string
  dropoffLocation: string
  car?: Car
  user?: User
}
```

## API Endpoints

### Authentication

#### Login
- **POST** `/api/auth/login`
```typescript
interface LoginRequest {
  email: string
  password: string
}

interface AuthResponse {
  token: string
  user: User
}
```

#### OTP Login
- **POST** `/api/auth/otp/send`
```typescript
interface OtpLoginRequest {
  phone: string
  countryCode: string
}
```

- **POST** `/api/auth/otp/verify`
```typescript
interface OtpVerifyRequest {
  phone: string
  countryCode: string
  otp: string
}
```

### Cars

#### List Cars
- **GET** `/api/cars`
- Query Parameters:
  - page: number
  - limit: number
  - category?: string
  - location?: string
  - minPrice?: number
  - maxPrice?: number
  - availability?: boolean

#### Create Car
- **POST** `/api/cars`
```typescript
interface CarCreateRequest {
  name: string
  category: string
  price: number
  description: string
  location: string
  image: string
  features: string[]
  specifications?: CarSpecifications
}
```

#### Update Car
- **PUT** `/api/cars/:id`
```typescript
interface CarUpdateRequest {
  name?: string
  category?: string
  price?: number
  description?: string
  location?: string
  image?: string
  features?: string[]
  status?: "available" | "booked" | "maintenance"
  specifications?: Partial<CarSpecifications>
}
```

### Bookings

#### Create Booking
- **POST** `/api/bookings`
```typescript
interface BookingCreateRequest {
  carId: string
  startDate: string
  endDate: string
  pickupLocation: string
  dropoffLocation: string
}
```

#### Update Booking
- **PUT** `/api/bookings/:id`
```typescript
interface BookingUpdateRequest {
  startDate?: string
  endDate?: string
  status?: "pending" | "confirmed" | "completed" | "cancelled"
  paymentStatus?: "pending" | "paid" | "refunded"
  pickupLocation?: string
  dropoffLocation?: string
}
```

### Payments

#### Process Payment
- **POST** `/api/payments`
```typescript
interface PaymentCreateRequest {
  bookingId: string
  amount: number
  currency: string
  paymentMethod: "credit_card" | "paypal" | "bank_transfer"
}

interface Payment {
  id: string
  bookingId: string
  userId: string
  amount: number
  currency: string
  status: "pending" | "completed" | "failed" | "refunded"
  paymentMethod: "credit_card" | "paypal" | "bank_transfer"
  transactionId?: string
  createdAt: string
}
```

## Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. **Token Generation**
   - Tokens are generated upon successful login
   - Tokens include user ID and role information
   - Expiration time: 24 hours

2. **Token Usage**
   - Include token in Authorization header
   - Format: `Authorization: Bearer <token>`

3. **Protected Routes**
   - All routes except public endpoints require authentication
   - Role-based access control implemented using middleware

## Error Handling

```typescript
interface ApiError {
  code: string
  message: string
  details?: Record<string, string[]>
}

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
```

### Error Codes
- `AUTH_001`: Authentication failed
- `AUTH_002`: Token expired
- `AUTH_003`: Invalid credentials
- `BOOKING_001`: Invalid booking dates
- `BOOKING_002`: Car unavailable
- `PAYMENT_001`: Payment processing failed

## Type Definitions

### Response Types

```typescript
interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
  error?: string
}

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
```

### Settings Types

```typescript
interface UserSettings {
  id: string
  userId: string
  language: string
  currency: string
  darkMode: boolean
  emailNotifications: boolean
  smsNotifications: boolean
  marketingEmails: boolean
}

interface SystemSettings {
  siteName: string
  siteUrl: string
  adminEmail: string
  supportEmail: string
  defaultLanguage: string
  defaultCurrency: string
  maintenanceMode: boolean
  registrationEnabled: boolean
  bookingEnabled: boolean
  paymentEnabled: boolean
}
```

## Development Guidelines

1. **API Responses**
   - All endpoints must return the standard ApiResponse format
   - Errors should include appropriate error codes
   - Pagination should be implemented for list endpoints

2. **Data Validation**
   - Input validation using TypeScript interfaces
   - Server-side validation for all requests
   - Sanitize user inputs

3. **Error Handling**
   - Use try-catch blocks for async operations
   - Implement global error handler
   - Log errors appropriately

4. **Security**
   - Implement rate limiting
   - Use CORS protection
   - Validate JWT tokens
   - Sanitize user inputs
   - Implement role-based access control
