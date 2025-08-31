import type { ApiResponse } from "@/frontend/types/api-types";
import type {
  NewOrderRequest,
  Order,
  UpdateOrderRequest,
} from "@/frontend/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/order`,
    credentials: "include",
  }),
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    newOrder: builder.mutation<ApiResponse<Order>, NewOrderRequest>({
      query: (order) => ({
        url: "/new",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["orders"],
    }),

    myOrders: builder.query<ApiResponse<Order[]>, void>({
      query: () => `/my`,
      providesTags: ["orders"],
    }),
    allOrders: builder.query<ApiResponse<Order[]>, void>({
      query: () => `/all`,
      providesTags: ["orders"],
    }),
    OrderDetails: builder.query<ApiResponse<Order>, string>({
      query: (id) => id,
      providesTags: ["orders"],
    }),

    updateOrder: builder.mutation<ApiResponse<Order>, UpdateOrderRequest>({
      query: ({ orderId, status }) => ({
        url: `/${orderId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const {
  useNewOrderMutation,
  useMyOrdersQuery,
  useAllOrdersQuery,
  useOrderDetailsQuery,
  useLazyOrderDetailsQuery,
  useUpdateOrderMutation,
} = orderApi;
