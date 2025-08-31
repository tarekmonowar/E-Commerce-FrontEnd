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
