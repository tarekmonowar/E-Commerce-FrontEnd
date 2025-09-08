import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface WishlistState {
  loading: boolean;
  wishlistItems: string[];
}

const defaultWishlistState: WishlistState = {
  loading: false,
  wishlistItems: [],
};

const getWishlistFromLocalStorage = (): WishlistState => {
  try {
    const wishlist = localStorage.getItem("wishlist");
    if (wishlist) {
      const parsed = JSON.parse(wishlist);
      if (parsed && Array.isArray(parsed.wishlistItems)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error("Failed to parse wishlist from localStorage", error);
  }
  return defaultWishlistState;
};

const initialState: WishlistState = getWishlistFromLocalStorage();

export const wishlistReducer = createSlice({
  name: "wishlistReducer",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<string>) => {
      state.loading = true;

      if (!state.wishlistItems.includes(action.payload)) {
        state.wishlistItems.push(action.payload);
      }

      state.loading = false;
    },

    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.wishlistItems = state.wishlistItems.filter(
        (id) => id !== action.payload,
      );
      state.loading = false;
    },

    resetWishlist: (state) => {
      state.loading = false;
      state.wishlistItems = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, resetWishlist } =
  wishlistReducer.actions;
