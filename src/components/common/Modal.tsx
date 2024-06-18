import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaPlus } from "react-icons/fa";
import { styled } from "styled-components";

interface Props {
    children: React.ReactNode; // Modal 안에 들어갈 자식 요소들
    isOpen: boolean; // Modal이 열려 있는지 여부
    onClose: () => void; // Modal을 닫는 함수
}

function Modal({ children, isOpen, onClose }: Props) {
    const [isFadingOut, setIsFadingOut] = useState(false); // 페이드 아웃 상태를 관리하는 상태 변수
    const modalRef = useRef<HTMLDivElement | null>(null); // Modal 요소를 참조하기 위한 useRef 훅

    // Modal을 닫는 함수
    const handleClose = () => {
        setIsFadingOut(true); // 페이드 아웃 상태로 변경
    };

    // 오버레이 클릭 처리 함수
    const handleOverlayClick = (e: React.MouseEvent) => {
        // modalRef가 존재하고 클릭된 요소가 Modal 밖에 있는 경우 handleClose 호출
        if (modalRef.current && !modalRef.current?.contains(e.target as Node)) {
            handleClose();
        }
    };

    // 키보드 입력 처리 함수
    const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            handleClose(); // ESC 키가 눌리면 handleClose 호출
        }
    };

    // 페이드 아웃 애니메이션 종료 후 onClose 호출하는 함수
    const handleAnimationEnd = () => {
        if (isFadingOut) {
            onClose(); // 페이드 아웃 애니메이션이 끝나면 onClose 호출하여 Modal 닫기
            setIsFadingOut(false); // 페이드 아웃 상태 초기화
        }
    };

    useEffect(() => {
        // Modal이 열려 있을 때만 keydown 이벤트 리스너를 추가
        if (isOpen) {
            window.addEventListener("keydown", handleKeydown);
        } else {
            // Modal이 닫혀 있으면 keydown 이벤트 리스너를 제거
            window.removeEventListener("keydown", handleKeydown);
        }

        // useEffect 클린업 함수에서 keydown 이벤트 리스너 제거
        return () => {
            window.removeEventListener("keydown", handleKeydown);
        };
    }, [isOpen]); // isOpen 상태가 변경될 때마다 useEffect 재실행

    // Modal이 열려 있지 않으면 null 반환하여 렌더링되지 않음
    if (!isOpen) {
        return null;
    }

    // Modal을 createPortal로 body에 렌더링
    return createPortal(
        <ModalStyle
            className={isFadingOut ? "fade-out" : "fade-in"} // 페이드 아웃/인 클래스 조건부 설정
            onClick={handleOverlayClick} // 오버레이 클릭 이벤트 핸들러
            onAnimationEnd={handleAnimationEnd} // 애니메이션 종료 이벤트 핸들러
        >
            <div className="modal-body" ref={modalRef}>
                {" "}
                {/* Modal 본문 */}
                <div className="modal-contents">{children}</div>{" "}
                {/* Modal 내용 */}
                <button className="modal-close" onClick={handleClose}>
                    {" "}
                    {/* Modal 닫기 버튼 */}
                    <FaPlus /> {/* 닫기 아이콘 */}
                </button>
            </div>
        </ModalStyle>,
        document.body // Modal을 body에 렌더링
    );
}

// Modal 스타일 정의
const ModalStyle = styled.div`
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

    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.6);

    .modal-body {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 56px 32px 32px;
        border-radius: ${({ theme }) => theme.borderRadius.default};
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        background-color: #fff;
        max-width: 80%;
    }

    .modal-close {
        border: none;
        background-color: transparent;
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 0;
        padding: 12px;

        svg {
            width: 20px;
            height: 20px;
            transform: rotate(45deg);
        }
    }
`;

export default Modal; // Modal 컴포넌트 기본 내보내기
