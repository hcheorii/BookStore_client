import useToastStore, { ToastItem } from "@/store/toastStore";
import styled from "styled-components";
import { FaBan, FaPlus, FaInfoCircle } from "react-icons/fa";
import { useState } from "react";
import useTimeout from "@/hooks/useTimeout";

// 토스트가 제거되기 전 대기 시간(밀리초 단위)
export const TOAST_REMOVE_DELAY = 3000;

// Toast 컴포넌트 정의
function Toast({ id, message, type }: ToastItem) {
    const removeToast = useToastStore((state) => state.removeToast); // Zustand 스토어에서 removeToast 함수 가져오기
    const [isFadingOut, setIsFadingOut] = useState(false); // 페이드 아웃 상태 관리

    // 토스트 제거 핸들러
    const handleRemoveToast = () => {
        setIsFadingOut(true); // 페이드 아웃 시작
    };

    // 애니메이션이 끝날 때 호출되는 핸들러
    const handleAnimationEnd = () => {
        if (isFadingOut) {
            removeToast(id); // 페이드 아웃이 완료되면 토스트 제거
        }
    };

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         handleRemoveToast();
    //     }, TOAST_REMOVE_DELAY);

    //     return () => clearTimeout(timer);
    // }, []);
    // useTimeout 훅을 사용하여 TOAST_REMOVE_DELAY 이후에 페이드 아웃 시작
    useTimeout(() => setIsFadingOut(true), TOAST_REMOVE_DELAY);

    return (
        <ToastStyle
            className={isFadingOut ? "fade-out" : "fade-in"} // 페이드 아웃 또는 페이드 인 클래스 설정
            onAnimationEnd={handleAnimationEnd} // 애니메이션 종료 시 호출될 핸들러
        >
            <p>
                {type === "info" && <FaInfoCircle />}
                {type === "error" && <FaBan />}
                {message}
            </p>
            <button onClick={handleRemoveToast}>
                <FaPlus /> {/* 플러스 아이콘 버튼 (삭제 기능) */}
            </button>
        </ToastStyle>
    );
}

// Toast 스타일 정의
const ToastStyle = styled.div`
    @keyframes fade-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    @keyframes fade-out {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }

    &.fade-in {
        animation: fade-in 0.3s ease-in-out forwards;
    }
    &.fade-out {
        animation: fade-out 0.3s ease-in-out forwards;
    }

    background-color: ${({ theme }) => theme.color.background};
    padding: 12px;
    border-radius: ${({ theme }) => theme.borderRadius.default};

    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 24px;
    opacity: 0;
    transition: all 0.3s ease-in-out;
    p {
        color: ${({ theme }) => theme.color.text};
        margin: 0;
        line-height: 1;
        flex: 1;

        display: flex;
        align-items: end;
        gap: 4px;
    }

    button {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
        margin: 0;

        svg {
            transform: rotate(45deg);
        }
    }
`;

export default Toast;
