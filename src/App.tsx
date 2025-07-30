import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme-provider";

// Import Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Public routes import
import Home from "./frontend/pages/Home";
import { getUser } from "./redux/api/userApi";

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
import BlogDetail from "./frontend/components/home/BlogDetails";
import FooterLink from "./frontend/layout/FooterLink";
import MainLayout from "./frontend/layout/MainLayout";
import AllProducts from "./frontend/pages/AllProducts";
import MyOrders from "./frontend/pages/MyOrders";
import OrderTracking from "./frontend/pages/OrderTracking";
import ProductDetails from "./frontend/pages/ProductDetails";
import Wishlisht from "./frontend/pages/Wishlisht";
import { clearUser, setUser } from "./redux/reducer/userReducer";
import ResetPassword from "./frontend/components/account/ResetPassword";
import ProtectedRoute from "./lib/ProtectedRoute";
import type { RootState } from "./redux/store";

export default function App() {
  const Dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userReducer.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        if (user) {
          Dispatch(setUser(user));
        } else {
          Dispatch(clearUser());
        }
      } catch (err) {
        console.log(err);
        Dispatch(clearUser());
      }
    };

    fetchUser();
  }, [Dispatch]);

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

        <Route
          path="/sign-in"
          element={
            <ProtectedRoute isAuthenticated={user ? false : true}>
              <MainLayout>
                <SignIn />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reset-password"
          element={
            <ProtectedRoute isAuthenticated={user ? false : true}>
              <MainLayout>
                <ResetPassword />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Frontend login routes */}

        <Route
          element={<ProtectedRoute isAuthenticated={user ? true : false} />}
        >
          <Route
            path="/my-orders"
            element={
              <MainLayout>
                <MyOrders />
              </MainLayout>
            }
          />
          <Route
            path="/wishlist"
            element={
              <MainLayout>
                <Wishlisht />
              </MainLayout>
            }
          />
        </Route>

        {/* Admin protected routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              isAuthenticated={user ? true : false}
              adminOnly={true}
              isAdmin={user?.role === "ADMIN" || user?.role === "SUPER_ADMIN"}
              redirectPath="/"
            >
              <ThemeProvider storageKey="theme">
                <Layout />
              </ThemeProvider>
            </ProtectedRoute>
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
        stacked
        hideProgressBar
        toastClassName={() =>
          "flex items-center  gap-3 bg-gray-200 shadow-lg px-5 py-2 rounded-[3px] text-black text-lg text-center font-semibold  min-h-[70px] max-w-[25vw] w-fit"
        }
        style={{
          width: "25vw",
          top: "30px",
        }}
      />
    </BrowserRouter>
  );
}
