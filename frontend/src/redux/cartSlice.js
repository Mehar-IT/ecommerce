import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  shippingInfo: {},
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartItem: (state, action) => {
      const item = action.payload;

      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );
      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) =>
          i.product === isItemExist.product ? item : i
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    },
    removeToCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (i) => i.product !== action.payload
      );
    },

    saveShipingInfo: (state, action) => {
      state.shippingInfo = action.payload;
    },
  },
});

export const { addToCartItem, removeToCartItem, saveShipingInfo } =
  cartSlice.actions;
export default cartSlice.reducer;
