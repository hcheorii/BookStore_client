import styled from "styled-components";
import { Book } from "../../models/book.model";
import BookItem from "./BookItem";
import { useEffect, useState } from "react";
import { QUERYSTRING } from "../../constants/querystring";
import { useLocation } from "react-router-dom";
import { viewMode } from "./BooksViewSwitcher";
interface Props {
    books: Book[];
}

function BooksList({ books }: Props) {
    const [view, setView] = useState<viewMode>("grid");
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get(QUERYSTRING.VIEW)) {
            setView(params.get(QUERYSTRING.VIEW) as viewMode);
        }
    }, [location.search]);
    return (
        <BooksListStyle view={view}>
            {books?.map((item) => (
                <BookItem view={view} key={item.id} book={item} />
            ))}
        </BooksListStyle>
    );
}

interface BooksListStyleProps {
    view: viewMode;
}

const BooksListStyle = styled.div<BooksListStyleProps>`
    display: grid;
    grid-template-columns: ${({ view }) =>
        view === "grid" ? "repeat(4, 1fr);" : "repeat(1, 1fr);"}
    gap: 24px;
`;

export default BooksList;
