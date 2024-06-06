import { SignupProps } from "../pages/Signup";
import { httpClient } from "./http";

export const signup = async (userData: SignupProps) => {
    const response = await httpClient.post("/users/join", userData);
    console.log(response.data);
};

export const resetRequest = async (data: SignupProps) => {
    const response = await httpClient.post("/users/reset", data);
    console.log(response.data);
};

export const resetPassword = async (data: SignupProps) => {
    const response = await httpClient.put("/users/reset", data);
    console.log(response.data);
};

interface LoginResponse {
    token: string; //로그인할때 만든 토큰
}

export const login = async (data: SignupProps) => {
    const response = await httpClient.post<LoginResponse>("/users/login", data);
    console.log(response.data);
    return response.data; //리턴 꼭 해줘야함.
};
