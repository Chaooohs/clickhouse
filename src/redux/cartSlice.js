import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      "id": 4,
      "title": "Handmade Fresh Table",
      "price": 687,
      "count": 4,
      "images": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCTqK_roLKR8VoiI-FXCdlUdAsUEPldtE7vkWmOn5vtWOloq7G01vw65RNauqp8l2ZCr4&usqp=CAU",
    },
    {
      "id": 5,
      "title": "Handmade Fresh Table",
      "price": 500,
      "count": 3,
      "images": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFB_nDgwnQCjDba2Riea6k5WbnGIwhx098PIJQgn19afrVMFjnbYCJYU1U9KhCfmwRKyM&usqp=CAU"
    },
    {
      "id": 2,
      "title": "Handmade Fresh Table",
      "price": 800,
      "count": 1,
      "images": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtLlqORWBON3KQhytSkAQ9CL2Qmf1fSKR8GAQis49GQalqciL0lW7own-apBWCewZ4K_M&usqp=CAU"
    },
  ],
  status: 'idle',
  counter: 0,
  totalPrice: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const found = state.products.find(el => el.id === action.payload.id);
      if (!found) {
        return {
          ...state,
          products: [...state.products, action.payload],
        };
      }
    },
    setIncrement: (state, action) => {
      state.products.map((el) => {
        return el.id === action.payload
          ? {
            ...el,
            count: el.count++,
          }
          : el;
      });
    },
    setDecrement: (state, action) => {
      state.products.map((el) => {
        return el.id === action.payload
          ? {
            ...el,
            count: el.count > 1 ? el.count-- : 1,
          }
          : el;
      });
    },
    setCartCounter: (state, action) => {
      state.counter = action.payload
    },
    setDeleteCartProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
    setClearCart: (state) => {
      state.products = [];
    },
    getTotalPrice: (state, action) => {
      state.totalPrice = action.payload
    }
  },
})

export const { addToCart, setCartCounter, setIncrement, setDecrement, setDeleteCartProduct, setClearCart, getTotalPrice } = cartSlice.actions
export default cartSlice.reducer;