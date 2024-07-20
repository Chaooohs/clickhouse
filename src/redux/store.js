import { configureStore } from '@reduxjs/toolkit'

import categories from './categoriesSlice'
import categoryId from './categoryIdSlice'
import singleProduct from './singleProdSlice'
import cart from './cartSlice'
import productsAll from './productsSlice'
import sideBar from './sideBarSlice'
import order from './orderSlice'
import auth from './authSlice'
import search from './searchSlice'


export const store = configureStore ({
	reducer: {
    categories,
    categoryId,
    singleProduct,
    cart,
    productsAll,
    sideBar,
    order,
    auth,
    search,
  }
})