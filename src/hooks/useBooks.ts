//변경된 쿼리스트링을 감지해서 books라는 도서 목록을 계속 갱신하는 역할

import { useLocation } from "react-router-dom";
import { Book } from "../models/book.model";
import { useEffect, useState } from "react";
import { Pagination } from "../models/pagination.model";
import { fetchBooks } from "../api/books.api";
import { QUERYSTRING } from "../constants/querystring";
import { LIMIT } from "../constants/pagination";
export const useBooks = () => {
    const location = useLocation();

    const [books, setBooks] = useState<Book[]>([]);

    const [pagination, setPagination] = useState<Pagination>({
        totalCount: 0,
        currentPage: 1,
    });

    const [isEmpty, setIsEmpty] = useState(true); //쿼리스트링으로 요구하는 책이 있는지 없는지

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        fetchBooks({
            category_id: params.get(QUERYSTRING.CATEGORY_ID)
                ? Number(params.get(QUERYSTRING.CATEGORY_ID))
                : undefined,
            news: params.get(QUERYSTRING.NEWS) ? true : undefined,
            currentPage: params.get(QUERYSTRING.CURRENT_PAGE)
                ? Number(params.get(QUERYSTRING.CURRENT_PAGE))
                : 1,
            limit: LIMIT, //무조건 8
        }).then(({ books, pagination }) => {
            setBooks(books);
            setPagination(pagination);
            setIsEmpty(books.length === 0);
        });
    }, [location.search]);

    return { books, pagination, isEmpty };
};
