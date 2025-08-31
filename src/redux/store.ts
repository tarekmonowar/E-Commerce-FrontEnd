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
    [userReducer.name]: userReducer.reducer,
    [cartReducer.name]: cartReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      otpApi.middleware,
      productApi.middleware,
      orderApi.middleware,
      couponApi.middleware,
      LocalStorageMiddleware,
    ]),
});

setupListeners(store.dispatch);
export default store;

export type RootState = ReturnType<typeof store.getState>;
