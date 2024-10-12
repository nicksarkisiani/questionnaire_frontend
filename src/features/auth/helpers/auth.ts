import {CustomAxiosError} from "../../../types/axios.ts";
import {toast} from "react-toastify";
import {AxiosResponse} from "axios";

export const auth = async <T>(authFunc: () => Promise<AxiosResponse<T>>) => {
    try {
        await authFunc();
        return true;
    } catch (e: unknown) {
        const error = e as CustomAxiosError;
        if (error) toast.error(error?.response?.data?.message)
        return false;
    }
}