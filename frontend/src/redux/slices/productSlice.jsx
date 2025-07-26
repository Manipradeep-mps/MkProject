import { createSlice } from "@reduxjs/toolkit";

const initial={
    products:[]
}

const productSlice=createSlice({
    name:'products',
    initialState:initial,
    reducers:{
        setProducts:(state,action)=>{
            state.products=action.payload

        }
    }

})

export const {setProducts}=productSlice.actions

export default productSlice.reducer