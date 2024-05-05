import { saveUser } from "../reducers/slice";
import axios from "../../config";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store"; // Adjust the path as needed
import { Action } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
// Define the thunk type for async action creators
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const createContact = (formData: any): AppThunk => async (dispatch) => {
    try {
        const response = await axios.post('/user/create', formData);
        dispatch(saveUser(response.data.user)); // Dispatch an action to save user data
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const asyncViewContact = (): AppThunk => async (dispatch) => {
    try {
        const response = await axios.get('/user/viewcontacts');
        console.log(response)
        dispatch(saveUser(response.data.data));
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const asyncUpdateContact = (data: any, id: any): AppThunk => async (dispatch) => {
    try {
        console.log(data)
        const response = await axios.put(`/user/updatecontact/${id}`, data);
        dispatch(saveUser(response.data.user));
        toast.success("Contact Updated")
    } catch (error) {
        console.log(error);
        toast.error("Error updating contacts")
        throw error;
    }
};

export const asyncDeleteContact = (id: any): AppThunk => async (dispatch) => {
    try {
        await axios.delete(`/user/deletecontact/${id}`);
        dispatch(asyncViewContact()); // Dispatch asyncViewContact without passing any data
    } catch (error) {
        console.log(error);
        toast.error("Error deleting contact")

        throw error;
    }
};
