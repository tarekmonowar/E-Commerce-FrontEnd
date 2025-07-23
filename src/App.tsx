import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme-provider";

// Import Toastify
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Public routes import
import Home from "./frontend/pages/Home";

//Authenticate routes import

//admin routes import
import Layout from "./admin/layout/Layout";
import AddProduct from "./admin/pages/AddProduct";
import AllUsers from "./admin/pages/All-users";
import Analytics_Charts from "./admin/pages/Analytics_Charts";
import Coupon from "./admin/pages/Coupon";
import Dashboard from "./admin/pages/Dashboard";
import Orders from "./admin/pages/Orders";
import Products from "./admin/pages/Products";
import RevenueChart from "./admin/pages/RevenueChart";
import Settings from "./admin/pages/Settings";
import Stock from "./admin/pages/Stock";
import TopCustomers from "./admin/pages/TopCustomers";
import VerifiedAdmin from "./admin/pages/VerifiedAdmin";
import SignIn from "./frontend/components/account/SignIn";
import MainLayout from "./frontend/layout/MainLayout";
import BlogDetail from "./frontend/components/home/BlogDetails";
import FooterLink from "./frontend/layout/FooterLink";
import ProductDetails from "./frontend/pages/ProductDetails";
import AllProducts from "./frontend/pages/AllProducts";
import OrderTracking from "./frontend/pages/OrderTracking";
import MyOrders from "./frontend/pages/MyOrders";

export default function App() {
  // Layout wrapper for pages with navbar and footer
  // const MainLayout = ({ children }: MainLayoutProps) => (
  //   <main className="bg-white font-custom">
  //     <Navbar />
  //     {children}
  //     <Footer />
  //   </main>
  // );

  return (
    <BrowserRouter>
      {/* header components */}
      <Routes>
        {/* Frontend public routes */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <MainLayout>
              <SignIn />
            </MainLayout>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <MainLayout>
              <BlogDetail />
            </MainLayout>
          }
        />
        <Route
          path="/footerLink/:id"
          element={
            <MainLayout>
              <FooterLink />
            </MainLayout>
          }
        />
        <Route
          path="/product/:id"
          element={
            <MainLayout>
              <ProductDetails />
            </MainLayout>
          }
        />
        <Route
          path="/all-products"
          element={
            <MainLayout>
              <AllProducts />
            </MainLayout>
          }
        />
        <Route
          path="/order-tracking"
          element={
            <MainLayout>
              <OrderTracking />
            </MainLayout>
          }
        />
        {/* Frontend login routes */}

        <Route
          path="/my-orders"
          element={
            <MainLayout>
              <MyOrders />
            </MainLayout>
          }
        />

        {/* Admin protected routes */}
        <Route
          path="/admin"
          element={
            <ThemeProvider storageKey="theme">
              <Layout />
            </ThemeProvider>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="product/new" element={<AddProduct />} />
          <Route path="coupon" element={<Coupon />} />
          <Route path="stocks" element={<Stock />} />
          <Route path="analytics-charts" element={<Analytics_Charts />} />
          <Route path="revenue" element={<RevenueChart />} />
          <Route path="verified-admin" element={<VerifiedAdmin />} />
          <Route path="all-users" element={<AllUsers />} />
          <Route path="top-customer" element={<TopCustomers />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
        transition={Bounce}
        style={{ top: "60px" }}
      />
    </BrowserRouter>
  );
}
