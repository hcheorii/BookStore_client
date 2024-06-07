//변경된 쿼리스트링을 감지해서 books라는 도서 목록을 계속 갱신하는 역할

import { useLocation } from "react-router-dom";
import { Book } from "../models/book.model";
import { useEffect, useState } from "react";
import { Pagination } from "../models/pagination.model";
import { fetchBooks } from "../api/books.api";
import { QUERYSTRING } from "../constants/querystring";
import { LIMIT } from "../constants/pagination";
export const useBooks = () => {
    //이 훅은 URL의 쿼리 스트링이 변경될 때마다 도서 목록을 갱신하는 역할.
    const location = useLocation(); // 현재 URL 위치 정보를 가져온다.

    const [books, setBooks] = useState<Book[]>([]); //도서 목록 상태 변수

    const [pagination, setPagination] = useState<Pagination>({
        totalCount: 0,
        currentPage: 1,
    }); //페이지네이션 상태 변수

    const [isEmpty, setIsEmpty] = useState(true); //쿼리스트링으로 요구하는 책이 있는지 없는지

    useEffect(() => {
        //현재 URL의 쿼리 스트링을 파싱하여 쉽게 접근할 수 있는 URLSearchParams 객체를 생성하는 코드
        const params = new URLSearchParams(location.search);
        //location.search 는 예를 들어, "?page=2&sort=asc"
        fetchBooks({
            category_id: params.get(QUERYSTRING.CATEGORY_ID)
                ? Number(params.get(QUERYSTRING.CATEGORY_ID))
                : undefined,
            news: params.get(QUERYSTRING.NEWS) ? true : undefined,
            currentPage: params.get(QUERYSTRING.PAGE)
                ? Number(params.get(QUERYSTRING.PAGE))
                : 1,
            limit: LIMIT, //무조건 8
        }).then(({ books, pagination }) => {
            setBooks(books);
            setPagination(pagination);
            //조건에 맞는 books가 없다면 true
            setIsEmpty(books.length === 0);
        });
    }, [location.search]);

    return { books, pagination, isEmpty };
};
