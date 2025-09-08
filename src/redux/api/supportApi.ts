import type { ApiResponse } from "@/frontend/types/api-types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const supportApi = createApi({
  reducerPath: "supportApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/support`,
    credentials: "include",
  }),
  tagTypes: ["support"],
  endpoints: (builder) => ({
    subscribeNewsletter: builder.mutation<ApiResponse<null>, { email: string }>(
      {
        query: ({ email }) => ({
          url: "/newsletter",
          method: "POST",
          body: { email },
        }),
        invalidatesTags: ["support"],
      },
    ),
  }),
});

export const { useSubscribeNewsletterMutation } = supportApi;
