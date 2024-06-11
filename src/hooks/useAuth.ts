import { login, resetPassword, resetRequest, signup } from "@/api/auth.api";
import { LoginProps } from "@/pages/Login";
import { useAuthStore } from "@/store/authStore";
import { useAlert } from "./useAlert";
import { useNavigate } from "react-router-dom";
import { SignupProps } from "@/pages/Signup";
import { useState } from "react";

export const useAuth = () => {
    const { storeLogin, storeLogout, isloggedIn } = useAuthStore();
    const { showAlert } = useAlert();
    const nav = useNavigate();

    const userLogin = (data: LoginProps) => {
        login(data).then(
            (res) => {
                //상태 변화
                storeLogin(res.token);
                console.log(res.token);
                showAlert("로그인이 성공했습니다.");
                nav("/");
            },
            (error) => {
                console.log(error);
                showAlert("로그인이 실패했습니다.");
            }
        );
    };

    const userSignup = (data: SignupProps) => {
        //auth.api.ts에 있는 signup을 가져온 것.
        signup(data).then((res) => {
            //성공
            showAlert("회원가입이 완료되었습니다.");
            nav("/login");
        });
    };

    const userResetPassword = (data: SignupProps) => {
        resetPassword(data).then(() => {
            showAlert("비밀번호가 초기화되었습니다.");
            nav("/login");
        });
    };
    const [resetRequested, setResetRequested] = useState(false);

    const userResetRequest = (data: SignupProps) => {
        resetRequest(data).then(() => {
            setResetRequested(true);
        });
    };
    return {
        userLogin,
        userSignup,
        userResetPassword,
        userResetRequest,
        resetRequested,
    };
};
