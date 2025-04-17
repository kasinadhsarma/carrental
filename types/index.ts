// Request Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface PhoneLoginRequest {
  phone: string;
}

export interface OtpVerificationRequest {
  phone: string;
  otp: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  phone?: string;
  role?: "admin" | "vendor";
}

export interface ResetPasswordRequest {
  email: string;
}

export interface NewPasswordRequest {
  token: string;
  password: string;
}

// Response Types
export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: "admin" | "vendor";
    status: "active" | "inactive";
    createdAt: string;
    isVerified: boolean;
    businessName?: string;
    businessAddress?: string;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
