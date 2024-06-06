import Title from "../components/common/Title";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../api/auth.api";
import { useAlert } from "../hooks/useAlert";
import { SignupStyle } from "./Signup";
import { useAuthStore } from "../store/authStore";
export interface SignupProps {
    //회원가입할때 받을 데이터의 타입 정의
    email: string;
    password: string;
}

function Login() {
    //전역 상태에서 가져온다.
    const { isloggedIn, storeLogin, storeLogout } = useAuthStore();

    const nav = useNavigate(); //페이지 이동을 위한 것
    const showAlert = useAlert(); //string을 받아서 alert를 띄워주는 것
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupProps>();

    const onSubmit = (data: SignupProps) => {
        login(data).then(
            (res) => {
                //상태 변화
                storeLogin(res.token);
                showAlert("로그인이 성공했습니다.");
                nav("/");
            },
            (error) => {
                console.log(error);
                showAlert("로그인이 실패했습니다.");
            }
        );
    };

    return (
        <>
            <Title size="large">로그인</Title>
            <SignupStyle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>
                        <InputText
                            placeholder="이메일"
                            inputType="email"
                            {...register("email", { required: true })}
                        />
                        {/* 에러 객체는 아래와 같이 생김
                        {
                            email: {
                                type: "required",
                                message: "이메일을 입력해주세요."
                            },
                            password: {
                                type: "required",
                                message: "비밀번호를 입력해주세요."
                            }
                        } */}
                        {errors.email && (
                            <p className="error-text">이메일을 입력해주세요.</p>
                        )}
                    </fieldset>
                    <fieldset>
                        <InputText
                            placeholder="비밀번호"
                            inputType="password"
                            {...register("password", { required: true })}
                        />
                        {errors.password && (
                            <p className="error-text">
                                비밀번호를 입력해주세요.
                            </p>
                        )}
                    </fieldset>

                    <fieldset>
                        <Button type="submit" size="medium" scheme="primary">
                            로그인
                        </Button>
                    </fieldset>
                    <div className="info">
                        <Link to="/reset">비밀번호 초기화</Link>
                    </div>
                </form>
            </SignupStyle>
        </>
    );
}

export default Login;
