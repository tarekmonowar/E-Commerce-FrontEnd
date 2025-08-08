/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  ApiResponse,
  RegisterPayload,
  updateUserPayload,
} from "@/frontend/types/api-types";
import type { User } from "@/frontend/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user`,
    credentials: "include",
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

    updateUser: builder.mutation<
      ApiResponse<User>,
      { id: string; data: updateUserPayload }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    updateUserImage: builder.mutation<
      ApiResponse<User>,
      { id: string; image: File }
    >({
      query: ({ id, image }) => {
        const formData = new FormData();
        formData.append("picture", image);

        return {
          url: `/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["users"],
    }),

    getAllUsers: builder.query<
      ApiResponse<User[]>,
      Record<string, string | number>
    >({
      query: (params) => {
        const queryString = new URLSearchParams(params as any).toString();
        return `/all-users?${queryString}`;
      },
      providesTags: ["users"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useUpdateUserMutation,
  useUpdateUserImageMutation,
  useGetAllUsersQuery,
} = userApi;

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
