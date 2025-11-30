import type {
  DashboardStats,
  Last12MonthsStat,
  RecentOrder,
} from "@/admin/components/types/types";
import type { ApiResponse } from "@/frontend/types/api-types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const statsApi = createApi({
  reducerPath: "statsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/stats`,
    credentials: "include",
  }),
  tagTypes: ["Stats"],
  endpoints: (builder) => ({
    getDashboardStats: builder.query<ApiResponse<DashboardStats>, void>({
      query: () => ({
        url: "/dashboard",
        method: "GET",
      }),
      providesTags: ["Stats"],
    }),

    getLast12MonthsStats: builder.query<ApiResponse<Last12MonthsStat[]>, void>({
      query: () => "/last12MonthsStats",
      providesTags: ["Stats"],
    }),
    getRecentOrders: builder.query<ApiResponse<RecentOrder[]>, void>({
      query: () => "/recentOrders",
      providesTags: ["Stats"],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetLast12MonthsStatsQuery,
  useGetRecentOrdersQuery,
} = statsApi;
