import { configureStore } from "@reduxjs/toolkit";
import productsReducer from '../redux/slices/productSlice'
import cartReducer from '../redux/slices/cartSlice'
import wishlistReducer from '../redux/slices/wishlistSlice'

const store=configureStore({
    reducer:{
        products:productsReducer,
        cart:cartReducer,
        wishlist:wishlistReducer
    }
})

export default store