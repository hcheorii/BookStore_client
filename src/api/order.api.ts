import { Order, OrderDetailItem, OrderSheet } from "../models/order.model";
import { requesthandler } from "./http";

export const order = async (orderData: OrderSheet) => {
    return await requesthandler<OrderSheet>("post", "/orders", orderData);
};

export const fetchOrders = async () => {
    return await requesthandler<Order[]>("get", "/orders");
};

export const fetchOrder = async (orderId: number) => {
    return await requesthandler<OrderDetailItem[]>("get", `/orders/${orderId}`);
};
