import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../Store';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
    addCartItem(state, action: PayloadAction<CartItem>) {
      const { id, name, price, image } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === id);

      if (existingItemIndex !== -1) {

        state.items[existingItemIndex].quantity += 1;
      } else {
       
        state.items.push(action.payload);
      }
    },
    updateCartItem(state, action: PayloadAction<CartItem>) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
    removeCartItem(state, action: PayloadAction<string>) {
      const idToRemove = action.payload;
      state.items = state.items.filter(item => item.id !== idToRemove);
    },
  },
});

export const { setCartItems, addCartItem, updateCartItem, removeCartItem } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotalQuantity = (state: RootState) => state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotalPrice = (state: RootState) => state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

export default cartSlice.reducer;
