import styled from "styled-components";
import Title from "../components/common/Title";
import CartItem from "../components/cart/CartItem";
import { useCart } from "../hooks/useCart";
import { useMemo, useState } from "react";
import Empty from "../components/common/Empty";
import { FaShoppingCart } from "react-icons/fa";
import CartSummary from "../components/cart/CartSummary";
import Button from "../components/common/Button";
import { useAlert } from "../hooks/useAlert";
import { Order, OrderSheet } from "../models/order.model";
import { useNavigate } from "react-router-dom";

function Cart() {
    const { carts, deleteCartItem, isEmpty } = useCart();
    const { showAlert, showConfirm } = useAlert();
    const navigate = useNavigate();

    //체크된 아이템의 목록
    const [checkedItems, setCheckedItem] = useState<number[]>([]);

    const handleCheckItem = (id: number) => {
        if (checkedItems.includes(id)) {
            //언체크
            setCheckedItem(checkedItems.filter((item) => item !== id));
        } else {
            //체크
            setCheckedItem([...checkedItems, id]);
        }
    };

    const handleItemDelete = (id: number) => {
        deleteCartItem(id);
    };

    const totalQuantity = useMemo(() => {
        return carts.reduce((acc, cart) => {
            if (checkedItems.includes(cart.id)) {
                return acc + cart.quantity;
            }
            return acc;
        }, 0);
    }, [carts, checkedItems]);

    const totalPrice = useMemo(() => {
        //acc는 누적값... 0부터 시작
        return carts.reduce((acc, cart) => {
            if (checkedItems.includes(cart.id)) {
                return acc + cart.price * cart.quantity;
            }
            return acc;
        }, 0);
    }, [carts, checkedItems]);

    const handleOrder = () => {
        if (checkedItems.length === 0) {
            showAlert("주문할 상품을 선택해주세요.");
            return;
        }
        //주문 액션 => 주문서 작성으로 데이터를 전달해야함.
        //배송정보는 주문페이지에서 작성할 것이므로 지금 가지고있는 것만 넘겨주면 된다.
        const orderData: Omit<OrderSheet, "delivery"> = {
            items: checkedItems,
            totalPrice,
            totalQuantity,
            firstBookTitle: carts[0].title,
        };
        //order페이지에 state를 전달

        showConfirm("주문하시겠습니까?", () => {
            navigate("/order", { state: orderData });
        });
    };
    return (
        <>
            <Title size="large">장바구니</Title>
            <CartStyle>
                {!isEmpty && (
                    <>
                        <div className="content">
                            {carts.map((item) => (
                                <CartItem
                                    key={item.id}
                                    cart={item}
                                    checkedItem={checkedItems}
                                    onCheck={handleCheckItem}
                                    onDelete={handleItemDelete}
                                />
                            ))}
                        </div>
                        <div className="summary">
                            <CartSummary
                                totalPrice={totalPrice}
                                totalQuantity={totalQuantity}
                            />
                            <Button
                                onClick={handleOrder}
                                size="large"
                                scheme="primary"
                            >
                                주문하기
                            </Button>
                        </div>
                    </>
                )}
                {isEmpty && (
                    <Empty
                        title="장바구니가 비었습니다."
                        icon={<FaShoppingCart />}
                        description={<>장바구니를 채워보세요.</>}
                    />
                )}
            </CartStyle>
        </>
    );
}

const CartStyle = styled.div`
    display: flex;
    gap: 24px;
    justify-content: space-between;
    padding: 240x 0 0 0;
    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    .summary {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }
`;
export default Cart;
