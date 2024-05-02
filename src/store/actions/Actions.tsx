import { saveUser } from "../reducers/slice";
import axios from "../../config";
import { Dispatch } from "@reduxjs/toolkit";
export const createContact = (formData: any) => async (dispatch: Dispatch) => {
    try {
        const response = await axios.post('/user/create', formData);
        dispatch(saveUser(response.data.user)); // Dispatch an action to save user data
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const asyncViewContact = () => async (dispatch: Dispatch) => {
    try {
        const response = await axios.get('/user/viewcontacts');
        dispatch(saveUser(response.data.user));
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};



export const asyncUpdateContact = (data: any, id: any) => async (dispatch: Dispatch) => {
    try {
        const response = await axios.put(`/user/updatecontact/${id}`, data);
        dispatch(saveUser(response.data.user));
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export const asyncDeleteContact = (id: any) => async (dispatch: Dispatch) => {
    try {
        const response = await axios.delete(`/user/deletecontact/${id}`);
        dispatch(asyncViewContact())
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


