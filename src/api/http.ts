import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = "http://localhost:9999";
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        timeout: DEFAULT_TIMEOUT,
        headers: {
            "Content-type": "application/json",
        },
        withCredentials: true, // withCredentials 옵션 설정
        ...config,
    });

    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => Promise.reject(error)
    );
    return axiosInstance;
};

export const httpClient = createClient();
