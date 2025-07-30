import type { ApiResponse, LoginPayload } from "@/frontend/types/api-types";
import type { User } from "@/frontend/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/auth`,
    credentials: "include",
  }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<User>, LoginPayload>({
      query: (user) => ({
        url: "/login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["users"],
    }),

    logout: builder.mutation<ApiResponse<null>, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    forgotPassword: builder.mutation<ApiResponse<null>, string>({
      query: (email) => ({
        url: "/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation<
      ApiResponse<null>,
      { password: string; userId: string; token: string }
    >({
      query: ({ password, userId, token }) => ({
        url: "/reset-password",
        method: "POST",
        body: { newPassword: password, id: userId },
        headers: {
          Authorization: token,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
