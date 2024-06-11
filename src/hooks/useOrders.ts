import { useEffect, useState } from "react";
import { OrderListItem } from "../models/order.model";
import { fetchOrder, fetchOrders } from "../api/order.api";

export const useOrders = () => {
    const [orders, setOrders] = useState<OrderListItem[]>();
    const [selectedItemId, setSelectedItemId] = useState<number | null>();

    useEffect(() => {
        fetchOrders().then((orders) => {
            setOrders(orders);
        });
    }, []);

    const selectOrderItem = (orderId: number) => {
        //이미 한번 자세히를 눌러서 Detail정보를 가져왔었다면
        //또 fetch할 필요는 없다.
        if (orders?.filter((item) => item.id === orderId)[0].detail) {
            setSelectedItemId(orderId);
            return;
        }
        fetchOrder(orderId).then((orderDetail) => {
            setSelectedItemId(orderId);
            setOrders(
                orders?.map((item) => {
                    if (item.id === orderId) {
                        return {
                            ...item,
                            detail: orderDetail,
                        };
                    }
                    return item;
                })
            );
        });
    };

    return { orders, selectedItemId, selectOrderItem };
};
