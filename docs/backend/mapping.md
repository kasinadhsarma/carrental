# Backend API Architecture & Database Mapping

## Database Schema Relationships

```mermaid
erDiagram
    User ||--o{ Booking : makes
    User ||--o{ Review : writes
    User ||--o{ UserSettings : has
    Car ||--o{ Booking : involves
    Car ||--o{ Review : receives
    Booking ||--|| Payment : has
    Car }|--|| Vendor : owns

    User {
        string id PK
        string name
        string email
        string phone
        string address
        string status
        string role
        string joinDate
        string profileImage
    }

    Car {
        string id PK
        string name
        string category
        float price
        float rating
        string description
        string location
        string image
        string[] features
        string status
        object specifications
        string vendorId FK
    }

    Booking {
        string id PK
        string userId FK
        string carId FK
        string vendorId FK
        string startDate
        string endDate
        string status
        float totalAmount
        string paymentStatus
        string pickupLocation
        string dropoffLocation
        string specialRequests
    }

    Payment {
        string id PK
        string bookingId FK
        string userId FK
        float amount
        string currency
        string status
        string paymentMethod
        string transactionId
        string createdAt
    }

    Review {
        string id PK
        string userId FK
        string carId FK
        string bookingId FK
        integer rating
        string comment
        string createdAt
    }

    UserSettings {
        string id PK
        string userId FK
        string language
        string currency
        boolean darkMode
        boolean emailNotifications
        boolean smsNotifications
        boolean marketingEmails
    }

    Vendor {
        string id PK
        string name
        string email
        string phone
        string address
        string status
        string[] documents
        string createdAt
    }
```

## API Endpoints Structure

### Authentication Routes
```
POST /api/auth/login
├── Validates credentials
└── Returns JWT token + user data

POST /api/auth/register
├── Creates new user
└── Returns user data

POST /api/auth/otp/send
├── Sends OTP to phone
└── Returns verification ID

POST /api/auth/otp/verify
├── Verifies OTP
└── Returns JWT token + user data
```

### User Routes
```
GET /api/users/me
├── Returns current user data
└── Includes settings

PUT /api/users/me
├── Updates user profile
└── Returns updated data

GET /api/users/:id
├── Returns user data
└── Requires admin role

PUT /api/users/:id/status
├── Updates user status
└── Requires admin role
```

### Car Routes
```
GET /api/cars
├── Lists all cars
├── Supports filtering & pagination
└── Optional: includes vendor details

POST /api/cars
├── Creates new car listing
├── Requires vendor role
└── Validates specifications

GET /api/cars/:id
├── Returns car details
├── Includes availability
└── Includes reviews

PUT /api/cars/:id
├── Updates car details
└── Requires owner/admin

DELETE /api/cars/:id
├── Soft deletes car
└── Requires owner/admin
```

### Booking Routes
```
GET /api/bookings
├── Lists user bookings
└── Supports filtering & pagination

POST /api/bookings
├── Creates booking
├── Validates availability
└── Initiates payment

GET /api/bookings/:id
├── Returns booking details
├── Includes car & user
└── Includes payment status

PUT /api/bookings/:id/status
├── Updates booking status
└── Triggers notifications
```

### Payment Routes
```
POST /api/payments
├── Processes payment
├── Updates booking status
└── Sends confirmation

GET /api/payments/:id
├── Returns payment details
└── Includes transaction data

POST /api/payments/:id/refund
├── Processes refund
├── Updates booking status
└── Sends notification
```

### Vendor Routes
```
POST /api/vendors/register
├── Creates vendor account
└── Validates documents

GET /api/vendors/:id/cars
├── Lists vendor's cars
└── Includes booking stats

GET /api/vendors/:id/bookings
├── Lists vendor's bookings
└── Includes payment status

PUT /api/vendors/:id/documents
├── Updates vendor documents
└── Validates file types
```

## Security Implementation

### Authentication Flow
```mermaid
sequenceDiagram
    participant C as Client
    participant A as Auth API
    participant D as Database
    participant J as JWT Service

    C->>A: Login Request
    A->>D: Validate Credentials
    D-->>A: User Data
    A->>J: Generate Token
    J-->>A: JWT Token
    A-->>C: Token + User Data
```

### Request Authorization
```mermaid
sequenceDiagram
    participant C as Client
    participant M as Middleware
    participant A as API
    participant J as JWT Service

    C->>M: Request + JWT
    M->>J: Validate Token
    J-->>M: Token Data
    M->>M: Check Permissions
    M->>A: Authorized Request
    A-->>C: Response
```

## Data Flow Architecture

### Booking Process
```mermaid
sequenceDiagram
    participant U as User
    participant B as Booking API
    participant C as Car Service
    participant P as Payment API
    participant N as Notification Service

    U->>B: Create Booking
    B->>C: Check Availability
    C-->>B: Availability Status
    B->>P: Initialize Payment
    P-->>B: Payment Status
    B->>N: Send Confirmation
    N-->>U: Booking Confirmation
```

## System Architecture

### High-Level Overview
```mermaid
graph TD
    Client[Client Applications] --> API[API Gateway]
    API --> Auth[Auth Service]
    API --> Cars[Car Service]
    API --> Book[Booking Service]
    API --> Pay[Payment Service]
    API --> Notif[Notification Service]
    
    Auth --> DB[(Database)]
    Cars --> DB
    Book --> DB
    Pay --> DB
    
    Pay --> External[Payment Gateway]
    Notif --> Email[Email Service]
    Notif --> SMS[SMS Service]
