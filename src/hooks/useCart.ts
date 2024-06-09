import { useEffect, useState } from "react";
import { deleteCart, fetchCart } from "../api/carts.api";
import { Cart } from "../models/cart.model";

export const useCart = () => {
    const [carts, setCarts] = useState<Cart[]>([]);

    //정보를 가져왔는데 가져온 것이 없을 때
    const [isEmpty, setIsEmpty] = useState(true);

    const deleteCartItem = (id: number) => {
        deleteCart(id).then((res) => {
            setCarts(carts.filter((cart) => cart.id !== id));
        });
    };

    //fetchCart를 이용해서 장바구니에 담긴 책들 정보 가져오기
    useEffect(() => {
        fetchCart().then((carts) => {
            setCarts(carts);
            //가져온 장바구니 정보가 비었다면 true
            setIsEmpty(carts.length === 0);
        });
    }, []);

    return { carts, isEmpty, deleteCartItem };
};
