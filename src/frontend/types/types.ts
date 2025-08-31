export type ShippingAddress = {
  name?: string;
  phone?: string;
  address?: string;
  city?: string;
  pinCode?: number | null;
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

export type CartItem = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
};

export interface CartReducerInitialState {
  loading: boolean;
  cartItems: CartItem[];
  subtotal: number;
  shippingCharges: number;
  discount: number;
  total: number;
  shippingInfo: ShippingAddress;
  coupon: string | undefined;
}

export type orderItem = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  orderItems: orderItem[];
  shippingInfo: ShippingAddress;
  subtotal: number;
  shippingCharges: number;
  discount: number;
  total: number;
  status: OrderStatus;
  transactionId: string;
  user: {
    name: string;
    _id: string;
    email?: string;
  };
  _id: string;
};

export type NewOrderRequest = {
  shippingInfo: ShippingAddress;
  orderItems: CartItem[];
  subtotal: number;
  shippingCharges: number;
  discount: number;
  total: number;
  transactionId: string;
};

export const OrderStatus = {
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export type UpdateOrderRequest = {
  orderId: string;
  status: OrderStatus;
};
