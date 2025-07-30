import type { User } from "@/frontend/types/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UserReducerInitialState {
  user: User | null;
  loading: boolean;
}

const storedUser = localStorage.getItem("user");

const initialState: UserReducerInitialState = {
  loading: false,
  user: storedUser ? JSON.parse(storedUser) : null,
};

export const userReducer = createSlice({
  name: "userReducer",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.loading = false;
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userReducer.actions;
