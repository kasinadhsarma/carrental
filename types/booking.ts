export interface Booking {
  id: string;
  carId: string;
  userId: string;
  vendorId: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: string;
  updatedAt: string;
  pickupLocation: string;
  dropoffLocation: string;
  specialRequests?: string;
}
