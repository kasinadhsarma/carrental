import type { Car } from './car';
import type { Booking } from './booking';

export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  logo: string;
  businessName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  businessAddress: string;
  description: string;
  rating: number;
  reviewCount: number;
  carCount: number;
  status: 'active' | 'inactive' | 'pending';
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  cars?: Car[];
  bookings?: Booking[];
  location: string;
  documents?: {
    type: string;
    url: string;
    verified: boolean;
  }[];
}
