import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCartAction: (state, action) => {
      const index = state.cartItems.findIndex(
        (p) => p.pid === action.payload.pid
      );
      if (index === -1) {
        state.cartItems.push(action.payload);
      }
    },

    incrementQuantityAction: (state, action) => {
      const index = state.cartItems.findIndex(
        (p) => p.pid === action.payload
      );
      state.cartItems[index].quantity += 1;
    },

    decrementQuantityAction: (state, action) => {
      const index = state.cartItems.findIndex(
        (p) => p.pid === action.payload
      );
      if (state.cartItems[index].quantity === 1) {
        state.cartItems.splice(index, 1);
      } else {
        state.cartItems[index].quantity -= 1;
      }
    },

    clearCartAction: (state) => {
       state.cartItems = [];
    },
  },
});

export const {addToCartAction,incrementQuantityAction,decrementQuantityAction,clearCartAction,} = cartSlice.actions;

export default cartSlice.reducer;   
