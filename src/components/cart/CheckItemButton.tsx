import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import styled from "styled-components";

interface Props {
    isChecked: boolean;
    onCheck: () => void;
}

function CheckItemButton({ isChecked, onCheck }: Props) {
    //헷갈리지말자 자식의 함수로 부모의 상태를 변경할 수 있다.
    return (
        <CheckItemButtonStyle onClick={onCheck}>
            {isChecked ? <FaRegCheckCircle /> : <FaRegCircle />}
        </CheckItemButtonStyle>
    );
}

const CheckItemButtonStyle = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    svg {
        width: 24px;
        height: 24px;
    }
`;

export default CheckItemButton;
