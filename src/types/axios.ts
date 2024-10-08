import {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from "axios";


interface CustomErrorResponse extends AxiosResponse {
    data: {
        message: string;
    }
}


export interface CustomAxiosError extends AxiosError {
    response : CustomErrorResponse
}

export interface CustomConfig extends InternalAxiosRequestConfig<any> {
    _retry?: boolean;
}
