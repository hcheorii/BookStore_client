import { Book } from "../models/book.model";
import { Pagination } from "../models/pagination.model";
import { httpClient } from "./http";

interface FetchBooksParams {
    //요청 형식
    category_id?: number;
    news?: boolean;
    currentPage?: number;
    limit: number;
}

interface FetchBooksResponse {
    //응답 형식
    books: Book[];
    pagination: Pagination;
}

export const fetchBooks = async (params: FetchBooksParams) => {
    try {
        const response = await httpClient.get<FetchBooksResponse>("/books", {
            params: params,
        });

        return response.data;
    } catch (error) {
        return {
            books: [],
            pagination: {
                totalCount: 0,
                currentPage: 1,
            },
        };
    }
};
