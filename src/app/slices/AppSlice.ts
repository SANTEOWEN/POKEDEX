import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApplyInitialState } from "../../utils/Types";

const initialState: ApplyInitialState = {
    toasts: [],
};

export const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {

        /*
        1. setToast: - This is the name of the reducer function. It will be used to create an action creator with the same name.

        2. (state, action: PayloadAction<string>) => { ... } - This is the reducer function itself. It takes two parameters:
        state: The current state of this slice of the Redux store.
        action: The action object dispatched to this reducer. It's typed as PayloadAction<string>, meaning it expects a string payload.

        3.const toasts = [...state.toasts]; - This creates a new array by spreading the elements of the current state.toasts array into it. 
        This is done to avoid directly mutating the state, which is a fundamental principle in Redux.

        4.toasts.push(action.payload); - This adds the new toast message (which is the payload of the action) to the end of the toasts array.

        5.state.toasts = toasts - This assigns the new toasts array back to state.toasts. In Redux Toolkit, 
        this direct assignment is allowed because it uses Immer under the hood, which takes care of producing a new state object immutably.   
        */

        setToast: (state, action: PayloadAction<string>) => {
            const toasts = [...state.toasts];
            toasts.push(action.payload);
            state.toasts = toasts
        },

        //This clears out the toast Array so theres no many toast actions that will be executed.
        clearToasts: (state) => {
            state.toasts = [];
        }
    },
})

export const { setToast, clearToasts } = AppSlice.actions;
