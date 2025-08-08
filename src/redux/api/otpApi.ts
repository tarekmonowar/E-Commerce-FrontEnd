import type { ApiResponse } from "@/frontend/types/api-types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const otpApi = createApi({
  reducerPath: "otpApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/otp`,
    credentials: "include",
  }),
  tagTypes: ["otp"],
  endpoints: (builder) => ({
    sendOtp: builder.mutation<
      ApiResponse<null>,
      { name: string; email: string }
    >({
      query: ({ name, email }) => ({
        url: "/send",
        method: "POST",
        body: { name, email },
      }),
      invalidatesTags: ["otp"],
    }),

    verifyOtp: builder.mutation<
      ApiResponse<null>,
      { email: string; otp: string }
    >({
      query: ({ email, otp }) => ({
        url: "/verify",
        method: "POST",
        body: { email, otp },
      }),
      invalidatesTags: ["otp"],
    }),
  }),
});

export const { useSendOtpMutation, useVerifyOtpMutation } = otpApi;
