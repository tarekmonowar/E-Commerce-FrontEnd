import type {
  CartItem,
  CartReducerInitialState,
  ShippingAddress,
} from "@/frontend/types/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const defaultCartState: CartReducerInitialState = {
  loading: false,
  cartItems: [],
  subtotal: 0,
  shippingCharges: 0,
  discount: 0,
  total: 0,
  shippingInfo: {
    name: "",
    phone: "",
    address: "",
    city: "",
    pinCode: null,
  },
  coupon: "",
};

const getCartFromLocalStorage = (): CartReducerInitialState => {
  const cart = localStorage.getItem("cart");
  if (cart) {
    try {
      return JSON.parse(cart);
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
    }
  }
  return defaultCartState;
};

const initialState: CartReducerInitialState = getCartFromLocalStorage();

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState: initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.loading = true;
      //ak item barbar add howa bondo
      const index = state.cartItems.findIndex(
        (i) => i.productId === action.payload.productId,
      );

      if (index !== -1) {
        state.cartItems[index].quantity = action.payload.quantity;
      } else {
        // If item does not exist, add it
        state.cartItems.push(action.payload);
      }

      state.loading = false;
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.loading = true;
      state.cartItems = state.cartItems.filter(
        (i) => i.productId !== action.payload,
      );
      state.loading = false;
    },
    calculatePrice: (state) => {
      let subtotal = 0;
      for (let i = 0; i < state.cartItems.length; i++) {
        const item = state.cartItems[i];
        subtotal += item.price * item.quantity;
      }
      state.subtotal = subtotal;
      state.shippingCharges = state.subtotal > 500 ? 0 : 20;
      state.total = state.subtotal + state.shippingCharges - state.discount;
    },

    discountApply: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    },

    saveShippingInfo: (state, action: PayloadAction<ShippingAddress>) => {
      state.shippingInfo = action.payload;
    },
    resetCart: () => initialState,
  },
});

export const {
  addToCart,
  removeCartItem,
  calculatePrice,
  discountApply,
  saveShippingInfo,
  resetCart,
} = cartReducer.actions;
