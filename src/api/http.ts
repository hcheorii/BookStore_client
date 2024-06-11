import axios, { AxiosRequestConfig } from "axios";
import { getToken, removeToken } from "../store/authStore";

// API 요청의 기본 URL
const BASE_URL = "http://localhost:9960";
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        timeout: DEFAULT_TIMEOUT,
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
        ...config,
    });

    // 요청 인터셉터 설정
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = getToken();
            if (token) {
                config.headers.Authorization = token;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // 응답 인터셉터 설정
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                removeToken();
                window.location.href = "/login";
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export const httpClient = createClient();

//공통 요청 부분

type RequestMethod = "get" | "post" | "put" | "delete";
export const requesthandler = async <T>(
    method: RequestMethod,
    url: string,
    payload?: T //요청마다 다르기때문에 이렇게 작성
) => {
    let response;
    switch (method) {
        case "post":
            response = await httpClient.post(url, payload);
            break;
        case "get":
            response = await httpClient.get(url);
            break;
        case "put":
            response = await httpClient.put(url, payload);
            break;
        case "delete":
            response = await httpClient.delete(url);
            break;
    }
    return response.data;
};
