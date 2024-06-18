import styled from "styled-components";
import Title from "../components/common/Title";
import BooksFilter from "../components/books/BooksFilter";
import BooksList from "../components/books/BooksList";
import BooksEmpty from "../components/books/BooksEmpty";
import BooksViewSwitcher from "../components/books/BooksViewSwitcher";
import Loading from "@/components/common/Loading";
import { useBooksInfinite } from "@/hooks/useBooksInfinite";
import Button from "@/components/common/Button";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
function Books() {
    //서버에 요청해서 받아온 데이터들
    //useBooks를 사용해서 쿼리스트링에 있는 변수들의 조건에 맞는
    //Book의 배열을 반환받는다.

    const {
        books,
        pagination,
        isEmpty,
        isBooksLoading,
        fetchNextPage,
        hasNextPage,
    } = useBooksInfinite();

    // const moreRef = useRef(null);

    // useEffect(() => {
    //     const observer = new IntersectionObserver((entries) => {
    //         entries.forEach((entry) => {
    //             if (entry.isIntersecting) {
    //                 loadMore();
    //                 observer.unobserve(entry.target);
    //             }
    //         });
    //     });

    //     if (moreRef.current) {
    //         observer.observe(moreRef.current);
    //     }
    //     return () => observer.disconnect();
    // }, [books, moreRef]);

    const moreRef = useIntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            loadMore();
        }
    });

    const loadMore = () => {
        if (!hasNextPage) {
            return;
        }
        fetchNextPage();
    };
    if (isEmpty) {
        return <BooksEmpty />;
    }

    if (!books || !pagination || isBooksLoading) {
        return <Loading />;
    }
    return (
        <>
            <Title size="large">도서 검색 결과</Title>
            <BooksStyle>
                <div className="filter">
                    <BooksFilter />
                    <BooksViewSwitcher />
                </div>
                <BooksList books={books} />
                {/* <Pagination pagination={pagination} /> */}
                <div className="more" ref={moreRef}>
                    <Button
                        size="medium"
                        scheme="normal"
                        onClick={() => fetchNextPage()} //다음페이지 가져오기
                        disabled={!hasNextPage}
                    >
                        {hasNextPage ? "더보기" : "마지막 페이지"}
                    </Button>
                </div>
            </BooksStyle>
        </>
    );
}

const BooksStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 24px;

    .filter {
        display: flex;
        justify-content: space-between;
        padding: 20px 0;
        align-items: center;
    }
`;

export default Books;
