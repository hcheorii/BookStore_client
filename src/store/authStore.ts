import { create } from "zustand";

interface StoreState {
    isloggedIn: boolean;
    storeLogin: (token: string) => void;
    storeLogout: () => void;
}

export const getToken = () => {
    const token = localStorage.getItem("token");
    return token;
};
export const setToken = (token: string) => {
    localStorage.setItem("token", token);
};

export const removeToken = () => {
    localStorage.removeItem("token");
};

export const useAuthStore = create<StoreState>((set) => ({
    //로그인해서 토큰이 있다면 true, 없으면 false
    isloggedIn: getToken() ? true : false, //초기값
    storeLogin: (token: string) => {
        set({ isloggedIn: true });
        setToken(token);
    },
    storeLogout: () => {
        set({ isloggedIn: false });
        removeToken();
    },
}));
