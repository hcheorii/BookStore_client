import axios, { AxiosRequestConfig } from "axios";
import { getToken, removeToken } from "../store/authStore";
//API 요청의 기본 URL
const BASE_URL = "http://localhost:9960";
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
    //axios 에서는 공통 설정을 적용한 axios 인스턴스를 생성할 수 있다.
    //이 인스턴스를 사용하면 매번 요청할 때마다 공통 설정을 반복하지 않고,
    //간편하게 요청을 보낼 수 있다.
    const axiosInstance = axios.create({
        baseURL: BASE_URL, //모든 요청에 기본으로 사용할 URL을 설정
        timeout: DEFAULT_TIMEOUT, //요청이 시간 초과될 때까지의 시간을 설정
        headers: {
            //JSON 형식의 데이터를 주고받도록
            "Content-type": "application/json",
            Authorization: getToken() ? getToken() : "",
        },
        withCredentials: true, // withCredentials 옵션 설정
        ...config,
    });

    //인터셉터는 HTTP 요청이나 응답을 가로채서
    //추가적인 작업을 수행할 수 있게 해준다.
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response.status === 401) {
                removeToken();
                window.location.href = "/login";
                return;
            }
            Promise.reject(error);
        }
        //어떤 작업에 관한 '상태 정보'를 갖고 있는 객체이다.
    );
    return axiosInstance;
};

export const httpClient = createClient();
