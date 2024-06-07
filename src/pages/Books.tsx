import styled from "styled-components";
import Title from "../components/common/Title";
import BooksFilter from "../components/books/BooksFilter";
import BooksList from "../components/books/BooksList";
import BooksEmpty from "../components/books/BooksEmpty";
import Pagination from "../components/books/Pagination";
import BooksViewSwitcher from "../components/books/BooksViewSwitcher";
import { useBooks } from "../hooks/useBooks";
function Books() {
    //서버에 요청해서 받아온 데이터들
    //useBooks를 사용해서 쿼리스트링에 있는 변수들의 조건에 맞는
    //Book의 배열을 반환받는다.

    const { books, pagination, isEmpty } = useBooks();

    return (
        <>
            <Title size="large">도서 검색 결과</Title>
            <BooksStyle>
                <div className="filter">
                    <BooksFilter />
                    <BooksViewSwitcher />
                </div>
                {!isEmpty && <BooksList books={books} />}
                {isEmpty && <BooksEmpty />}
                {!isEmpty && <Pagination pagination={pagination} />}
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
