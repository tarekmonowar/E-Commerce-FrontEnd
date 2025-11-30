export interface ProductFormData {
  id?: string;
  name: string;
  price: string;
  stock: string;
  category: string;
  brand?: string;
  discount: string;
  description: string;
  photos: { file?: File; preview: string; id?: string }[];
}

export interface FormErrors {
  name?: string;
  price?: string;
  stock?: string;
  brand?: string;
  discount?: string;
  category?: string;
  description?: string;
  photos?: string;
}

export interface ICoupon {
  _id: string;
  code: string;
  amount: number;
  isActive?: boolean;
}

export interface StatsCount {
  totalRevenue: number;
  todayTransaction: number;
  runningOrders: number;
  totalProductsSales: number;
}

export interface StatsChangePercent {
  revenue: number;
  transactionPercentage: number;
  ordersPercentage: number;
  productsPercentage: number;
}

export interface DashboardStats {
  count: StatsCount;
  changePercent: StatsChangePercent;
}

export interface Last12MonthsStat {
  name: string;
  revenue: number;
  orders: number;
}

export interface RecentOrder {
  id: string;
  amount: string;
  quantity: number;
  status: string;
}
