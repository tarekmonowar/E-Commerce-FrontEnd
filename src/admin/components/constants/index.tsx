import {
  ChartColumn,
  NotepadText,
  Package,
  PackagePlus,
  Settings,
  ShoppingBag,
  TicketSlash,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { RiDashboardFill } from "react-icons/ri";

import ProductImage from "@/assets/admin/product-image.jpg";
import products2 from "@/assets/admin/product2.jpeg";
import products3 from "/products3.png";
import products4 from "/products4.jpg";

export const navbarLinks = [
  {
    title: "Dashboard",
    links: [
      { label: "Dashboard", icon: RiDashboardFill, path: "/admin" },
      { label: "Orders", icon: NotepadText, path: "/admin/orders" },
      { label: "Products", icon: ShoppingBag, path: "/admin/products" },
      { label: "Add product", icon: PackagePlus, path: "/admin/product/new" },
    ],
  },
  {
    title: "Management & Insights",
    links: [
      { label: "Coupon", icon: TicketSlash, path: "/admin/coupon" },
      { label: "Stocks", icon: Package, path: "/admin/stocks" },
      {
        label: "Analytics Charts",
        icon: ChartColumn,
        path: "/admin/analytics-charts",
      },
      { label: "Revenue", icon: FaMoneyBillTrendUp, path: "/admin/revenue" },
    ],
  },
  {
    title: "Users",
    links: [
      {
        label: "Verified Admin",
        icon: UserCheck,
        path: "/admin/verified-admin",
      },
      { label: "All Users", icon: Users, path: "/admin/all-users" },
      { label: "Top customer", icon: UserPlus, path: "/admin/top-customer" },
    ],
  },
  {
    title: "Settings",
    links: [{ label: "Settings", icon: Settings, path: "/admin/settings" }],
  },
];

export const overviewData = [
  { name: "Jan", revenue: 1700, orders: 80 },
  { name: "Feb", revenue: 2000, orders: 120 },
  { name: "Mar", revenue: 1000, orders: 65 },
  { name: "Apr", revenue: 2000, orders: 90 },
  { name: "May", revenue: 2000, orders: 95 },
  { name: "Jun", revenue: 5900, orders: 60 },
  { name: "Jul", revenue: 4000, orders: 40 },
  { name: "Aug", revenue: 2500, orders: 100 },
  { name: "Sep", revenue: 2000, orders: 180 },
  { name: "Oct", revenue: 4000, orders: 85 },
  { name: "Nov", revenue: 3500, orders: 100 },
  { name: "Dec", revenue: 2500, orders: 110 },
];

export const resentSales = [
  { id: "#10294", amount: "$8000", quantity: 8, status: "processing" },
  { id: "#10300", amount: "$11000", quantity: 11, status: "delivered" },
  { id: "#10283", amount: "$5100", quantity: 2, status: "cancel" },
  { id: "#10296", amount: "$11000", quantity: 11, status: "shipped" },
  { id: "#10288", amount: "$3000", quantity: 3, status: "processing" },
  { id: "#10287", amount: "$12000", quantity: 10, status: "shipped" },
  { id: "#10289", amount: "$4500", quantity: 6, status: "delivered" },
  { id: "#10290", amount: "$8000", quantity: 8, status: "cancel" },
  { id: "#10291", amount: "$9500", quantity: 7, status: "shipped" },
  { id: "#10292", amount: "$11000", quantity: 11, status: "delivered" },
  { id: "#10293", amount: "$2500", quantity: 2, status: "delivered" },
  { id: "#10295", amount: "$9500", quantity: 7, status: "delivered" },
  { id: "#10296", amount: "$7000", quantity: 5, status: "cancel" },
  { id: "#10297", amount: "$2500", quantity: 2, status: "processing" },
  { id: "#10298", amount: "$8000", quantity: 8, status: "shipped" },
  { id: "#10299", amount: "$9500", quantity: 7, status: "cancel" },
  { id: "#10300", amount: "$11000", quantity: 11, status: "delivered" },
  { id: "#10301", amount: "$2500", quantity: 2, status: "processing" },
  { id: "#10302", amount: "$2300", quantity: 4, status: "delivered" },
  { id: "#10303", amount: "$13000", quantity: 9, status: "shipped" },
  { id: "#10304", amount: "$7000", quantity: 5, status: "cancel" },
  { id: "#10305", amount: "$4000", quantity: 4, status: "processing" },
];

export const topProducts = [
  {
    number: "#1",
    name: "Wireless Headphones",
    image: products3,
    description:
      "High-quality noise-canceling wireless headphones. bdfb  grfg rgfd dfggdgd        dgd fdfg dfg dgd dg dgd d lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: "990 K",
    stock: 212,
    rating: 4.5,
  },
  {
    number: "#2",
    name: "Smartphone",
    image: products2,
    description: "Latest 5G smartphone with excellent camera features.",
    price: "799 K",
    stock: 11,
    rating: 4.7,
  },
  {
    number: "#3",
    name: "Gaming Laptop",
    image: products4,
    description: "Powerful gaming laptop with high-end graphics.",
    price: "12.99 K",
    stock: 0,
    rating: 4.8,
  },
  {
    number: "#4",
    name: "Smartwatch",
    image: products3,
    description: "Stylish smartwatch with fitness tracking features.",
    price: "9 K",
    stock: 1000,
    rating: 4.4,
  },
  {
    number: "#5",
    name: "Bluetooth Speaker",
    image: ProductImage,
    description: "Portable Bluetooth speaker with deep bass sound.",
    price: 59.99,
    stock: 0,
    rating: 4.3,
  },
  {
    number: "#6",
    name: "4K Monitor",
    image: products2,
    description: "Ultra HD 4K monitor with stunning color accuracy.",
    price: 399.99,
    stock: 0,
    rating: 4.6,
  },
  {
    number: "#7",
    name: "Mechanical Keyboard",
    image: ProductImage,
    description: "Mechanical keyboard with customizable RGB lighting.",
    price: 89.99,
    stock: 23,
    rating: 4.7,
  },
  {
    number: "#8",
    name: "Wireless Mouse",
    image: products4,
    description: "Ergonomic wireless mouse with precision tracking.",
    price: 49.99,
    stock: 1,
    rating: 4.5,
  },
  {
    number: "#9",
    name: "Action Camera",
    image: products3,
    description: "Waterproof action camera with 4K video recording.",
    price: 249.99,
    stock: 0,
    rating: 4.8,
  },
  {
    number: "#10",
    name: "External Hard Drive",
    image: ProductImage,
    description: "Portable 2TB external hard drive for data storage.",
    price: 79.99,
    stock: 0,
    rating: 4.5,
  },
];
