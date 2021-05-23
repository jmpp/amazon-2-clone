import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        hydrate: (state, action) => {
            return action.payload;
        },
        // Store actions
        addToBasket: (state, action) => {
            state.items = [...state.items, action.payload];
        },
        removeFromBasket: (state, action) => {
            let pos = state.items.findIndex(
                (item) => item.id === action.payload.id
            );
            let newBasket = [...state.items];

            if (pos > -1) {
                newBasket.splice(pos, 1);
            } else {
                console.warn(
                    `Can't remove product (id: ${action.payload.id}) as its not in the basket`
                );
            }

            state.items = newBasket;
        },
        removeGroupedFromBasket: (state, action) => {
            let newBasket = state.items.filter(
                (item) => item.id !== action.payload.id
            );

            state.items = newBasket;
        },
        clearBasket: (state, action) => {
            state.items = [];
        },
    },
});

export const {
    addToBasket,
    removeFromBasket,
    removeGroupedFromBasket,
    hydrate,
    clearBasket,
} = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
    state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;
