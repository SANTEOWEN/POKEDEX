import { createSlice } from "@reduxjs/toolkit";
import { ApplyInitialState } from "../../utils/Types";

const initialState:ApplyInitialState = {};

export const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {},
})