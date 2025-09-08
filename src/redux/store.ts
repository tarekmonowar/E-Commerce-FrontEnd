/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userReducer } from "./reducer/userReducer";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import { otpApi } from "./api/otpApi";
import { productApi } from "./api/productApi";
import { cartReducer } from "./reducer/cartReducer";
import { orderApi } from "./api/orderApi";
import { couponApi } from "./api/couponApi";
import { wishlistReducer } from "./reducer/wishlistReducer";
import { wishlistApi } from "./api/wishlistApi";
import { supportApi } from "./api/supportApi";

export const server = import.meta.env.VITE_SERVER;

const LocalStorageMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action);
  // console.log(store);

  // Save user to localStorage
  if (action.type === "userReducer/setUser") {
    localStorage.setItem("user", JSON.stringify(action.payload));
  }
  if (action.type === "userReducer/clearUser") {
    localStorage.removeItem("user");
  }

  // Save cart to localStorage
  const cartActions = [
    "cartReducer/addToCart",
    "cartReducer/removeCartItem",
    "cartReducer/calculatePrice",
    "cartReducer/discountApply",
    "cartReducer/saveShippingInfo",
    "cartReducer/resetCart",
  ];

  if (cartActions.includes(action.type)) {
    const cartState = store.getState().cartReducer;
    localStorage.setItem("cart", JSON.stringify(cartState));
  }

  // Save wishlist to localStorage
  const wishlistActions = [
    "wishlistReducer/addToWishlist",
    "wishlistReducer/removeFromWishlist",
    "wishlistReducer/resetWishlist",
  ];

  if (wishlistActions.includes(action.type)) {
    const wishlistState = store.getState().wishlistReducer;
    localStorage.setItem("wishlist", JSON.stringify(wishlistState));
  }

  return result;
};

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [otpApi.reducerPath]: otpApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [couponApi.reducerPath]: couponApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
    [supportApi.reducerPath]: supportApi.reducer,
    [userReducer.name]: userReducer.reducer,
    [cartReducer.name]: cartReducer.reducer,
    [wishlistReducer.name]: wishlistReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      otpApi.middleware,
      productApi.middleware,
      orderApi.middleware,
      couponApi.middleware,
      wishlistApi.middleware,
      supportApi.middleware,
      LocalStorageMiddleware,
    ]),
});

setupListeners(store.dispatch);
export default store;

export type RootState = ReturnType<typeof store.getState>;
