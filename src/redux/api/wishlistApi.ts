import type { ApiResponse } from "@/frontend/types/api-types";
import type { Product } from "@/frontend/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product`,
    credentials: "include",
  }),
  tagTypes: ["WishlistProducts"],
  endpoints: (builder) => ({
    getWishlistProducts: builder.query<
      ApiResponse<Product[]>,
      { ids: string[] }
    >({
      query: ({ ids }) => ({
        url: "/some",
        method: "GET",
        params: {
          ids: ids.join(","),
        },
      }),
      providesTags: ["WishlistProducts"],
    }),
  }),
});

export const { useGetWishlistProductsQuery } = wishlistApi;
