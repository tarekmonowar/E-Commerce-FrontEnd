/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "@/frontend/types/types";
import type { ApiResponse } from "@/frontend/types/api-types";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product`,
    credentials: "include",
  }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    createProduct: builder.mutation<ApiResponse<Product>, FormData>({
      query: (formData) => ({
        url: `/new`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "products", id: "LIST" }],
    }),

    updateProduct: builder.mutation<
      ApiResponse<Product>,
      {
        formData: FormData;
        productId: string;
      }
    >({
      query: ({ formData, productId }) => ({
        url: `/${productId}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (_result, _error, { productId }) => [
        { type: "products", id: productId },
        { type: "products", id: "LIST" },
      ],
    }),

    deleteProduct: builder.mutation<ApiResponse<Product>, string>({
      query: (productId) => ({
        url: `/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "products", id },
        { type: "products", id: "LIST" },
      ],
    }),

    getAllProducts: builder.query<
      ApiResponse<Product[]>,
      Record<string, string | number>
    >({
      query: (params) => {
        const queryString = new URLSearchParams(params as any).toString();
        return `/all?${queryString}`;
      },
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map((product) => ({
                type: "products" as const,
                id: product._id,
              })),
              { type: "products" as const, id: "LIST" },
            ]
          : [{ type: "products" as const, id: "LIST" }],
    }),

    productDetails: builder.query<ApiResponse<Product>, string>({
      query: (id) => `/${id}`,
      providesTags: (_result, _error, id) => [
        { type: "products" as const, id },
      ],
    }),

    productPriceRange: builder.query<
      ApiResponse<{ minPrice: number; maxPrice: number }>,
      void
    >({
      query: () => "/price-range",
      providesTags: [{ type: "products", id: "PRICE_RANGE" }],
    }),

    productsCategories: builder.query<ApiResponse<string[]>, void>({
      query: () => "/categories",
      providesTags: [{ type: "products", id: "PRICE_RANGE" }],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useProductDetailsQuery,
  useProductPriceRangeQuery,
  useProductsCategoriesQuery,
} = productApi;
