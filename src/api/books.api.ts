import { Book } from "../models/book.model";
import { Pagination } from "../models/pagination.model";
import { httpClient } from "./http";

interface FetchBooksParams {
    //요청 형식 (request)
    category_id?: number;
    news?: boolean;
    currentPage?: number;
    limit: number;
}

interface FetchBooksResponse {
    //응답 형식 (response)
    books: Book[];
    pagination: Pagination;
}

export const fetchBooks = async (params: FetchBooksParams) => {
    //백엔드 코드에서 category_id, news, currentPage, limit의 조건에 맞는 book들을 반환해준다.
    try {
        const response = await httpClient.get<FetchBooksResponse>("/books", {
            params: params, //조건들 전달
        });

        return response.data;
    } catch (error) {
        //조건에 맞는 것이 없을 때 리턴하는 값.
        return {
            books: [],
            pagination: {
                totalCount: 0,
                currentPage: 1,
            },
        };
    }
};
