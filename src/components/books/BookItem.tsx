import styled from "styled-components";
import { Book } from "../../models/book.model";

interface Props {
    book: Book;
}

function BookItem({ book }: Props) {
    return (
        <BookItemStyle>
            <div className="img">
                <img
                    //일종의 더미 이미지를 가져오는 것
                    src={`https://picsum.photos/id/${book.id}/600/600`}
                    alt={book.title}
                />
            </div>
        </BookItemStyle>
    );
}

const BookItemStyle = styled.div``;

export default BookItem;
