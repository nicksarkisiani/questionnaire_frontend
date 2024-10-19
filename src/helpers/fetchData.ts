import {toast} from "react-toastify";
import {CustomAxiosError} from "../types/axios.ts";

export default async function fetchData<T>(callback: () => Promise<T>): Promise<T | void> {
    try {
        return await callback();
    } catch (e) {
        const error = e as CustomAxiosError;
        if (error) toast.error(error?.response?.data?.message);
    }
}