import type { ICoupon } from "@/admin/components/types/types";
import type { ApiResponse } from "@/frontend/types/api-types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const couponApi = createApi({
  reducerPath: "couponApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/coupon`,
    credentials: "include",
  }),
  tagTypes: ["coupons"],
  endpoints: (builder) => ({
    createCoupon: builder.mutation<
      ApiResponse<ICoupon>,
      { code: string; amount: number }
    >({
      query: ({ code, amount }) => ({
        url: "/create",
        method: "POST",
        body: { code, amount },
      }),
      invalidatesTags: ["coupons"],
    }),

    allCoupons: builder.query<ApiResponse<ICoupon[]>, void>({
      query: () => `/all`,
      providesTags: ["coupons"],
    }),
    deleteCoupon: builder.mutation<ApiResponse<ICoupon>, string>({
      query: (id) => ({
        url: `/${id}`, // matches your backend route
        method: "DELETE",
      }),
      invalidatesTags: ["coupons"],
    }),
    updateCouponStatus: builder.mutation<
      ApiResponse<ICoupon>,
      { id: string; isActive: boolean }
    >({
      query: ({ id, isActive }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: { isActive },
      }),
      invalidatesTags: ["coupons"],
    }),
  }),
});

export const {
  useCreateCouponMutation,
  useAllCouponsQuery,
  useDeleteCouponMutation,
  useUpdateCouponStatusMutation,
} = couponApi;
