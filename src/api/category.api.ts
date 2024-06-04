import { Category } from "../models/category.model";
import { httpClient } from "./http";

export const fetchCategory = async (): Promise<Category[]> => {
    const response = await httpClient.get<Category[]>("/category");
    return response.data;
};
