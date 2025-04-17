export interface Car {
  id: string;
  name: string;
  model: string;
  year: number;
  transmission: 'manual' | 'automatic';
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  seats: number;
  price: number;
  images: string[];
  available: boolean;
  features: string[];
  description: string;
  vendorId: string;
  category: string;
  location: string;
  rating?: number;
}
