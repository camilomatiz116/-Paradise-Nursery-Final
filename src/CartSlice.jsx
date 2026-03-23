import { createSlice } from '@reduxjs/toolkit';

/**
 * Cart Slice
 * Handles the state of the shopping cart, including adding, removing, and updating items.
 */
export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Array of objects: { name, image, cost, quantity }
  },
  reducers: {
    /**
     * Adds an item to the cart or increments quantity if it already exists.
     */
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    /**
     * Removes an item completely from the cart by name.
     */
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    /**
     * Updates the quantity of a specific item.
     */
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
