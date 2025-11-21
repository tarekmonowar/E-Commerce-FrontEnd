import { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme-provider";
import { getUser } from "./redux/api/userApi";
import { clearUser, setUser } from "./redux/reducer/userReducer";
import type { RootState } from "./redux/store";

// Import Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Public routes import
import Layout from "./admin/layout/Layout";
import MainLayout from "./frontend/layout/MainLayout";
import ProtectedRoute from "./lib/ProtectedRoute";

//Front end lazy imports
const Home = lazy(() => import("./frontend/pages/Home"));
const BlogDetail = lazy(() => import("./frontend/components/home/BlogDetails"));
const FooterLink = lazy(() => import("./frontend/layout/FooterLink"));
const ProductDetails = lazy(() => import("./frontend/pages/ProductDetails"));
const AllProducts = lazy(() => import("./frontend/pages/AllProducts"));
const CartDetails = lazy(() => import("./frontend/pages/CartDetails"));
const Wishlist = lazy(() => import("./frontend/pages/Wishlist"));
const OrderTracking = lazy(() => import("./frontend/pages/OrderTracking"));
const SignIn = lazy(() => import("./frontend/components/account/SignIn"));
const MyAccount = lazy(() => import("./frontend/pages/MyAccount"));
const MyOrders = lazy(() => import("./frontend/pages/MyOrders"));
const Shipping = lazy(() => import("./frontend/pages/Shipping"));
const CheckOut = lazy(() => import("./frontend/pages/CheckOut"));
const OrderDetails = lazy(() => import("./frontend/pages/orderDetails"));
const ResetPassword = lazy(
  () => import("./frontend/components/account/ResetPassword"),
);

//admin routes lazy import
const Dashboard = lazy(() => import("./admin/pages/Dashboard"));
const Orders = lazy(() => import("./admin/pages/Orders"));
const Products = lazy(() => import("./admin/pages/Products"));
const EditProduct = lazy(() => import("./admin/components/EditProduct"));
const AddProduct = lazy(() => import("./admin/pages/AddProduct"));
const Coupon = lazy(() => import("./admin/pages/Coupon"));
const Stock = lazy(() => import("./admin/pages/Stock"));
const Analytics_Charts = lazy(() => import("./admin/pages/Analytics_Charts"));
const RevenueChart = lazy(() => import("./admin/pages/RevenueChart"));
const VerifiedAdmin = lazy(() => import("./admin/pages/VerifiedAdmin"));
const AllUsers = lazy(() => import("./admin/pages/All-users"));
const TopCustomers = lazy(() => import("./admin/pages/TopCustomers"));
const Settings = lazy(() => import("./admin/pages/Settings"));

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
          path="/cart"
          element={
            <MainLayout>
              <CartDetails />
            </MainLayout>
          }
        />
        <Route
          path="/wishlist"
          element={
            <MainLayout>
              <Wishlist />
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
        <Route
          path="/my-account"
          element={
            <MainLayout>
              <MyAccount />
            </MainLayout>
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
            path="/shipping"
            element={
              <MainLayout>
                <Shipping />
              </MainLayout>
            }
          />
          <Route
            path="/pay"
            element={
              <MainLayout>
                <CheckOut />
              </MainLayout>
            }
          />
          <Route
            path="/order-details/:id"
            element={
              <MainLayout>
                <OrderDetails />
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
          <Route path="product/:id" element={<EditProduct />} />
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
        position="bottom-center"
        autoClose={3000}
        stacked
        hideProgressBar
      />
    </BrowserRouter>
  );
}
