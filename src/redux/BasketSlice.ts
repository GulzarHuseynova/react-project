import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/product.type";
import { createSlice } from "@reduxjs/toolkit";

interface BasketItem extends Product {
    quantity: number;
}

interface BasketState {
    items: BasketItem[];
}

const initialState: BasketState = {
    items: JSON.parse(localStorage.getItem("basket") || "[]"),
};

const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        addToBasket: (state, action: PayloadAction<Product>) => {
            const existing = state.items.find(p => p.id === action.payload.id);

            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }

            localStorage.setItem("basket", JSON.stringify(state.items));
        },

        removeFromBasket: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(p => p.id !== action.payload);
            localStorage.setItem("basket", JSON.stringify(state.items));
        },
        incrementCartItem: (
            state,
            action: PayloadAction<number>
        ) => {

            const item = state.items.find(
                p => p.id === action.payload
            );

            if (item) {
                item.quantity += 1;
            }

            localStorage.setItem(
                "basket",
                JSON.stringify(state.items)
            );
        },

        decreaseCartItem: (
            state,
            action: PayloadAction<number>
        ) => {

            const item = state.items.find(
                p => p.id === action.payload
            );

            if (item) {

                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    state.items = state.items.filter(
                        p => p.id !== action.payload
                    );
                }
            }

            localStorage.setItem(
                "basket",
                JSON.stringify(state.items)
            );
        },
        clearBasket: (state) => {
            state.items = [];
            localStorage.removeItem("basket");
        },
    },

});

export const { addToBasket, removeFromBasket, clearBasket, incrementCartItem, decreaseCartItem } = basketSlice.actions;
export default basketSlice.reducer;