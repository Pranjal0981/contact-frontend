import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/slice";
export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});