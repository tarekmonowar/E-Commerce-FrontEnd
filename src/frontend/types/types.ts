export type ShippingAddress = {
  name?: string;
  phone?: string;
  address?: string;
  city?: string;
};

export type AuthProvider =
  | { provider: "credentials"; providerId: string }
  | { provider: "google"; providerId: string };

export type User = {
  _id: string;
  name: string;
  email: string;
  picture?: {
    public_id?: string;
    url?: string;
  };
  phone?: string | null;
  shippingAddress?: ShippingAddress | null;
  isVerified: boolean | null;
  isActive: "ACTIVE" | "BLOCKED";
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  auths: AuthProvider[];
};

export interface Product {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  discount: number;
  stock: number;
  category: string;
  brand?: string;
  description: string;
  ratings?: number;
  numOfReviews?: number;
  photos: {
    url: string;
    public_id: string;
  }[];
}

export type CustomError = {
  status: number;
  data: {
    success: false;
    message: string;
    errorSource?: { path: string; message: string }[];
    stack?: string;
  };
};
