import type { ApiResponse, RegisterPayload } from "@/frontend/types/api-types";
import type { User } from "@/frontend/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user`,
  }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    register: builder.mutation<ApiResponse<User>, RegisterPayload>({
      query: (user) => ({
        url: "/register",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const { useRegisterMutation } = userApi;

export const getUser = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/v1/user/me`,
      { withCredentials: true },
    );
    return res.data?.data || null;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
};
