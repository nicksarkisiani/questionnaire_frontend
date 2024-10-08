import axios, {AxiosError} from "axios";
import {CustomConfig} from "../types/axios.ts";

export const $api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true,

})

$api.defaults.withCredentials = true

$api.interceptors.response.use(
    (response) => {
        return response
    }, async (error: AxiosError) => {
        const config: CustomConfig | undefined = error.config;
        if (config && error.response?.status === 401 && !config._retry) {
            config._retry = true;
            try {
                await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/verify`, {}, {withCredentials: true});

                return $api(config);
            } catch (e) {
                return Promise.reject(e);
            }
        }

        return Promise.reject(error);
    }
)

