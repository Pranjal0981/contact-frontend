import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define types for user state
interface UserState {
    user: any; // Define the type according to your user data structure
    isAuth: boolean;
    contacts: any[]; // Define the type of contacts array according to your data structure

}

// Define initial state
const initialState: UserState = {
    user: null,
    isAuth: false,
    contacts:[]
}

// Create user slice
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // Define action to save user data
        saveUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
            state.isAuth = true;
        },
        // Define action to remove user data
        removeUser: (state) => {
            state.user = null;
            state.isAuth = false;
        }
    },
});

// Export action creators
export const { saveUser, removeUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
