import { createSlice } from "@reduxjs/toolkit";
import { shoppingCartModel } from "../../Interfaces";

const initialState : shoppingCartModel = {
    cartItems : [],
}

export const shoppingCartSlice = createSlice({
    name: 'CartItems',
    initialState: initialState,
    reducers: {
        setShoppingCart: (state, action) => {
            state.cartItems = action.payload;
        },
        updateQuantity: (state, action) => {
            // payload  - cartItem that needs to be updated with new quantity
            state.cartItems = state.cartItems?.map((item) => {
                if(item.id === action.payload.cartItem.id){
                    item.quantity = action.payload.quantity
                }
                return item; // if condition is met then update the quantity else return the same item (do not touch the existing ites)
            })
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems?.filter((item)=> {
                if(item.id === action.payload.cartItem.id){
                    return null;
                }
                return item; // if condition is met then returning null (removing the item).
            })
        }
    }
});

export const {setShoppingCart, updateQuantity, removeFromCart} = shoppingCartSlice.actions;
export const shoppingCartReducer = shoppingCartSlice.reducer;