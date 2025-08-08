/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userReducer } from "./reducer/userReducer";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import { otpApi } from "./api/otpApi";
import { productApi } from "./api/productApi";

export const server = import.meta.env.VITE_SERVER;

const userLocalStorageMiddleware =
  (store: any) => (next: any) => (action: any) => {
    const result = next(action);
    console.log(store);
    if (action.type === "userReducer/setUser") {
      localStorage.setItem("user", JSON.stringify(action.payload));
    }
    if (action.type === "userReducer/clearUser") {
      localStorage.removeItem("user");
    }
    return result;
  };

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [otpApi.reducerPath]: otpApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [userReducer.name]: userReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      otpApi.middleware,
      productApi.middleware,
      userLocalStorageMiddleware,
    ]),
});

setupListeners(store.dispatch);
export default store;

export type RootState = ReturnType<typeof store.getState>;
