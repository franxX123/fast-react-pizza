import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart: [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action) {
            // NOTE: payload is an item. This object must have the same attributes
            // indicated in the initialstate
            // TODO: make sure the item doesn't exist. If it does, increase the quantity by 1
            const itemIdx = state.cart.findIndex((item) => item.pizzaId === action.payload.pizzaId)

            if(itemIdx < 0) {
                state.cart.push(action.payload)
            } else {
                state.cart[itemIdx].quantity += 1
                state.cart[itemIdx].totalPrice = state.cart[itemIdx].quantity * state.cart[itemIdx].unitPrice
            }

            // state.cart.push(action.payload)

        },
        deleteItem(state, action) {
            // NOTE: payload is the id of pizza to delete
            state.cart = state.cart.filter(item => item.pizzaId !== action.payload);
        },
        increaseItemQuantity(state, action) {
            // NOTE: payload is the name of the item to increase the quantity of
            const item = state.cart.find(item => item.pizzaId === action.payload)
            item.quantity += 1
            item.totalPrice = item.quantity * item.unitPrice
        },
        decreaseItemQuantity(state, action) {
            // NOTE: payload is the name of the item to decrease the quantity of
            const item = state.cart.find(item => item.pizzaId === action.payload)
            
            // Complete Code
            if(item.quantity === 1) {
                // NOTE: Here we delete the item since there is only one left
                state.cart = state.cart.filter(item => item.pizzaId !== action.payload);
            } else {

                item.quantity -= 1
                item.totalPrice = item.quantity * item.unitPrice

            }

            // item.quantity -= 1
            // item.totalPrice = item.quantity * item.unitPrice
        },
        clear(state) {
            state.cart = [];
        },

    }
})

export const {increaseItemQuantity, decreaseItemQuantity, addItem, deleteItem, clear} = cartSlice.actions;

export default cartSlice.reducer;

// NOTE: these are not action creator functions. These are functions for useSelector to extract a slice
export const getCart = (state) => state.cart.cart

export const getTotalCartQuantity = (state) => state.cart.cart.reduce((acc, item) => acc + item.quantity, 0)

export const getTotalCartPrice = (state) => state.cart.cart.reduce((acc, item) => acc + item.totalPrice, 0)

export const checkPizzaIdInCart = (id) => {return (state) => state.cart.cart.find((pizza) => pizza.pizzaId === id)}