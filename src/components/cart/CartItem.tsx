import styled from "styled-components";
import { Cart } from "../../models/cart.model";
import Button from "../common/Button";
import Title from "../common/Title";
import { formatNumber } from "../../utils/format";
import CheckItemButton from "./CheckItemButton";
import { useMemo } from "react";
import { useAlert } from "../../hooks/useAlert";

interface Props {
    cart: Cart;
    checkedItem: number[];
    onCheck: (id: number) => void;
    onDelete: (id: number) => void;
}

//props는 Cart.tsx에서 넘겨준다.
function CartItem({ cart, checkedItem, onCheck, onDelete }: Props) {
    //checkedItem은 이미 체크된 애들의 배열
    const { showConfirm } = useAlert();
    const isChecked = useMemo(() => {
        //만약 체크된 애들 배열에 이 cartItem의 id가 있다면 true
        return checkedItem.includes(cart.id);
    }, [checkedItem, cart.id]);

    const handleCheck = () => {
        onCheck(cart.id);
    };

    const handleDelete = () => {
        showConfirm("정말 삭제하시겠습니까 ?", () => {
            onDelete(cart.id);
        });
    };

    return (
        <CartItemStyle>
            <div className="info">
                <div>
                    <div className="check">
                        <CheckItemButton
                            isChecked={isChecked}
                            onCheck={handleCheck}
                        />
                    </div>
                </div>
                <div>
                    <Title size="medium" color="text">
                        {cart.title}
                    </Title>
                    <p className="summary">{cart.summary}</p>
                    <p className="price">{formatNumber(cart.price)} 원</p>
                    <p className="quantity">{cart.quantity} 권</p>
                </div>
            </div>
            <Button size="medium" scheme="normal" onClick={handleDelete}>
                장바구니 삭제
            </Button>
        </CartItemStyle>
    );
}

const CartItemStyle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: start;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 12px;

    .check {
        width: 40px;
        flex-shrink: 0;
    }
    .info {
        display: flex;
        align-items: start;
        flex: 1;

        p {
            padding: 0 0 8px 0;
            margin: 0;
        }
    }
`;

export default CartItem;
