//변경된 쿼리스트링을 감지해서 books라는 도서 목록을 계속 갱신하는 역할
import { useLocation } from "react-router-dom";
import { fetchBooks } from "../api/books.api";
import { QUERYSTRING } from "../constants/querystring";
import { LIMIT } from "../constants/pagination";
import { useInfiniteQuery } from "react-query";
export const useBooksInfinite = () => {
    //이 훅은 URL의 쿼리 스트링이 변경될 때마다 도서 목록을 갱신하는 역할.
    const location = useLocation(); // 현재 URL 위치 정보를 가져온다.

    //pageParams는 현재 가져와야 할 페이지에 대한 정보
    const getBooks = ({ pageParam }: { pageParam: number }) => {
        const params = new URLSearchParams(location.search);
        const category_id = params.get(QUERYSTRING.CATEGORY_ID)
            ? Number(params.get(QUERYSTRING.CATEGORY_ID))
            : undefined;
        const news = params.get(QUERYSTRING.NEWS) ? true : undefined;
        const currentPage = pageParam;
        const limit = LIMIT;

        return fetchBooks({
            category_id,
            news,
            limit,
            currentPage,
        });
    };

    const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
        ["books", location.search], //쿼리키
        ({ pageParam = 1 }) => getBooks({ pageParam }), //쿼리 함수
        {
            getNextPageParam: (lastPage) => {
                //전체 페이지 개수가 현재 페이지 숫자가 같다면 마지막 페이지..
                const isLastPage =
                    Math.ceil(lastPage.pagination.totalCount / LIMIT) ===
                    lastPage.pagination.currentPage;
                return isLastPage ? null : lastPage.pagination.currentPage + 1;
            },
        }
    );

    //data의 구조
    // {
    //     pages: [
    //         { books: [{...}, {...}, ...], pagination: {...} },
    //         { books: [{...}, {...}, ...], pagination: {...} },
    //         // 다른 페이지들...
    //     ],
    // }
    const books = data ? data.pages.flatMap((page) => page.books) : [];
    const pagination = data ? data.pages[data.pages.length - 1].pagination : {};
    const isEmpty = books.length === 0;

    return {
        books,
        pagination,
        isEmpty,
        isBooksLoading: isFetching,
        fetchNextPage,
        hasNextPage,
    };
};
