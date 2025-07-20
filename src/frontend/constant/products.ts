import type { ProductType } from "./type";

export const Products: ProductType[] = [
  {
    _id: "1",
    category: "Fashion",
    name: "Men Opaque Casual Shirt",
    brand: "CLAFOUTIS",
    price: 1650, // originalPrice renamed to price
    discount: 10,
    discountPrice: 1650 * (1 - 10 / 100), // calculated discountPrice
    stock: 0, // you can fill this as needed
    description: "", // no description given, fill as needed
    ratings: 4.2,
    numOfReviews: 0, // no data provided
    photos: [
      {
        url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        public_id: "",
      },
      {
        url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        public_id: "",
      },
    ],
  },
  {
    _id: "2",
    category: "Fashion",
    name: "Men Comfort Cuban Collar",
    brand: "Campus Sutra",
    price: 2200,
    discount: 14,
    discountPrice: 2200 * (1 - 14 / 100),
    stock: 0,
    description: "",
    ratings: 4.5,
    numOfReviews: 0,
    photos: [
      {
        url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        public_id: "",
      },
      {
        url: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        public_id: "",
      },
    ],
  },
  {
    _id: "3",
    category: "Fashion",
    name: "Men Pure  Casual Shirt",
    brand: "Allen Solly",
    price: 2250,
    discount: 10,
    discountPrice: 2250 * (1 - 10 / 100),
    stock: 0,
    description:
      "This quantity selector component features increment and decrement buttons with a clean, responsive design using Tailwind CSS. It ensures consistent vertical alignment with equal padding and highlights buttons on hover. Ideal for e-commerce carts or product pages, it enhances user experience with intuitive controls and smooth, modern styling.",
    ratings: 4.3,
    numOfReviews: 0,
    photos: [
      {
        url: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        public_id: "",
      },
      {
        url: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        public_id: "",
      },
    ],
  },
  {
    _id: "4",
    category: "Fashion",
    name: "Embroidered Satin Saree",
    brand: "all about you",
    price: 5500,
    discount: 13,
    discountPrice: 5500 * (1 - 13 / 100),
    stock: 0,
    description: "",
    ratings: 4.7,
    numOfReviews: 0,
    photos: [
      {
        url: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        public_id: "",
      },
      {
        url: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        public_id: "",
      },
    ],
  },
  {
    _id: "5",
    category: "Fashion",
    name: "Embroidered Saree",
    brand: "kasee",
    price: 1999,
    discount: 12,
    discountPrice: 1999 * (1 - 12 / 100),
    stock: 0,
    description: "",
    ratings: 4.4,
    numOfReviews: 0,
    photos: [
      {
        url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        public_id: "",
      },
      {
        url: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        public_id: "",
      },
    ],
  },
  {
    _id: "6",
    category: "Bags",
    name: "Premium Leather Handbag",
    brand: "LuxeBag",
    price: 3000,
    discount: 15,
    discountPrice: 3000 * (1 - 15 / 100),
    stock: 0,
    description: "",
    ratings: 4.6,
    numOfReviews: 0,
    photos: [
      {
        url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        public_id: "",
      },
      {
        url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        public_id: "",
      },
    ],
  },
  {
    _id: "7",
    category: "Electronics",
    name: "Wireless  Headphones",
    brand: "TechSound",
    price: 4000,
    discount: 12,
    discountPrice: 4000 * (1 - 12 / 100),
    stock: 0,
    description: "",
    ratings: 4.5,
    numOfReviews: 0,
    photos: [
      {
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        public_id: "",
      },
      {
        url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        public_id: "",
      },
    ],
  },
  {
    _id: "8",
    category: "Electronics",
    name: "Smart Watch Pro",
    brand: "TechWear",
    price: 10000,
    discount: 10,
    discountPrice: 10000 * (1 - 10 / 100),
    stock: 0,
    description: "",
    ratings: 4.8,
    numOfReviews: 0,
    photos: [
      {
        url: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        public_id: "",
      },
      {
        url: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        public_id: "",
      },
    ],
  },
];
