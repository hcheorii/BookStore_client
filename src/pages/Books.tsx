import styled from "styled-components";
import Title from "../components/common/Title";
import BooksFilter from "../components/books/BooksFilter";
import BooksList from "../components/books/BooksList";
import BooksEmpty from "../components/books/BooksEmpty";
import Pagination from "../components/books/Pagination";
import BooksViewSwitcher from "../components/books/BooksViewSwitcher";
import { useBooks } from "../hooks/useBooks";
function Books() {
    const { books, pagination, isEmpty } = useBooks();

    return (
        <>
            <Title size="large">도서 검색 결과</Title>
            <BooksStyle>
                <BooksFilter />
                <BooksViewSwitcher />
                {!isEmpty && <BooksList books={books} />}
                {isEmpty && <BooksEmpty />}
                {!isEmpty && <Pagination />}
            </BooksStyle>
        </>
    );
}

const BooksStyle = styled.div``;

export default Books;
