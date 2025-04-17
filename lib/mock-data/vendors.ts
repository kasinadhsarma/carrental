import type { Vendor } from '@/types/vendor';

export const vendors: Vendor[] = [
  {
    id: "v1",
    name: "Premium Auto Rentals",
    email: "contact@premiumauto.com",
    phone: "+1 (555) 123-4567",
    logo: "/vendors/premium-auto.png",
    businessName: "Premium Auto Rentals Ltd",
    address: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    businessAddress: "123 Main Street, San Francisco, CA 94105",
    description: "Luxury car rentals with premium service and exclusive fleet.",
    rating: 4.8,
    reviewCount: 156,
    carCount: 25,
    status: "active",
    verified: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-04-15T00:00:00Z",
    location: "San Francisco Bay Area",
    documents: [
      {
        type: "business_license",
        url: "/documents/license.pdf",
        verified: true
      }
    ]
  },
  {
    id: "v2",
    name: "City Wheels",
    email: "info@citywheels.com",
    phone: "+1 (555) 234-5678",
    logo: "/vendors/city-wheels.png",
    businessName: "City Wheels Inc",
    address: "456 Market Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94103",
    businessAddress: "456 Market Street, San Francisco, CA 94103",
    description: "Affordable city car rentals for every need.",
    rating: 4.5,
    reviewCount: 89,
    carCount: 15,
    status: "active",
    verified: true,
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-04-15T00:00:00Z",
    location: "San Francisco Downtown",
    documents: [
      {
        type: "business_license",
        url: "/documents/license.pdf",
        verified: true
      }
    ]
  }
];

export const getVendorById = (id: string): Vendor | undefined => {
  return vendors.find(vendor => vendor.id === id);
};

export const getAllVendors = (): Vendor[] => {
  return vendors;
};
