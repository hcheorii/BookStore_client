import { httpClient } from "./http";

interface AddCartParams {
    book_id: number;
    quantity: number;
}

export const addCart = async (params: AddCartParams) => {
    const response = await httpClient.post("/carts", params);

    console.log(response.data);
    return response.data;
};
