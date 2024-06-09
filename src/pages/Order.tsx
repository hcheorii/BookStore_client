import { useLocation } from "react-router-dom";
import styled from "styled-components";

function Order() {
    const location = useLocation();

    //Cart.tsx에서 주문하기 버튼을 눌렀을 때 useNavigation으로 보낸 state를 읽어온다.
    const orderDataFromCart = location.state;
    console.log(orderDataFromCart);
    return (
        <OrderStyle>
            <h1>order</h1>
        </OrderStyle>
    );
}

const OrderStyle = styled.div``;

export default Order;
