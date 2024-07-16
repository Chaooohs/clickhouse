import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // products: JSON.parse(localStorage.getItem('clickhouse__cart')),
  products: [
    {
      title: "Yamaha HS5",
      price: 159,
      count: 1,
      description: "A description",
      categoryId: 10,
      images: ["https://cdn.mos.cms.futurecdn.net/c6BYbCdoK8RvUhUsXotgFf-970-80.jpg.webp"]
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
      const found = state.products?.find(el => el.id === action.payload.id);
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