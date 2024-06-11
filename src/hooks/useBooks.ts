//변경된 쿼리스트링을 감지해서 books라는 도서 목록을 계속 갱신하는 역할

import { useLocation } from "react-router-dom";
import { fetchBooks } from "../api/books.api";
import { QUERYSTRING } from "../constants/querystring";
import { LIMIT } from "../constants/pagination";
import { useQuery } from "react-query";
export const useBooks = () => {
    //이 훅은 URL의 쿼리 스트링이 변경될 때마다 도서 목록을 갱신하는 역할.
    const location = useLocation(); // 현재 URL 위치 정보를 가져온다.
    const params = new URLSearchParams(location.search);

    const { data: booksData, isLoading: isBooksLoading } = useQuery(
        ["books", location.search],
        () =>
            fetchBooks({
                category_id: params.get(QUERYSTRING.CATEGORY_ID)
                    ? Number(params.get(QUERYSTRING.CATEGORY_ID))
                    : undefined,
                news: params.get(QUERYSTRING.NEWS) ? true : undefined,
                currentPage: params.get(QUERYSTRING.PAGE)
                    ? Number(params.get(QUERYSTRING.PAGE))
                    : 1,
                limit: LIMIT, //무조건 8
            })
    );

    return {
        books: booksData?.books,
        pagination: booksData?.pagination,
        isEmpty: booksData?.books.length === 0,
        isBooksLoading,
    };
};
