import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
    baseURL: "https://contact-backend-five.vercel.app/",
    withCredentials: true,
});

export default instance;
