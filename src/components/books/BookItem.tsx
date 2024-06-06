import styled from "styled-components";
import { Book } from "../../models/book.model";
import { getImgSrc } from "../../utils/images";
import { formatNumber } from "../../utils/format";
import { FaHeart } from "react-icons/fa"; //리액트 아이콘에 있는 하트 이미지

interface Props {
    book: Book;
}

function BookItem({ book }: Props) {
    return (
        <BookItemStyle>
            <div className="img">
                <img
                    //일종의 더미 이미지를 가져오는 것
                    //뒤에는 가로 세로 길이
                    src={getImgSrc(book.id)}
                    alt={book.title}
                />
            </div>
            <div className="content">
                <h2 className="title">{book.title}</h2>
                <p className="summary">{book.summary}</p>
                <p className="author">{book.author}</p>
                <p className="price">{formatNumber(book.price)}원</p>
                <div className="likes">
                    <FaHeart />
                    <span>{book.likes}</span>
                </div>
            </div>
        </BookItemStyle>
    );
}

const BookItemStyle = styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    .img {
        border-radius: ${({ theme }) => theme.borderRadius.default};
        overflow: hidden;
        img {
            max-width: 100%;
        }
    }

    .content {
        padding: 16px;
        position: relative;
        .title {
            font-size: 1.25rem;
            font-weight: 700;
            margin: 0 0 12px 0;
        }
        .summary {
            font-size: 0.875rem;
            color: ${({ theme }) => theme.color.secondary};
            margin: 0 0 4px 0;
        }
        .author {
            font-size: 0.875rem;
            color: ${({ theme }) => theme.color.secondary};
            margin: 0 0 4px 0;
        }
        .price {
            font-size: 1rem;
            color: ${({ theme }) => theme.color.secondary};
            margin: 0 0 4px 0;
            font-weight: 700;
        }
        .likes {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            font-size: 0.875rem;
            color: ${({ theme }) => theme.color.primary};
            margin: 0 0 4px 0;
            font-weight: 700;
            border-radius: ${({ theme }) => theme.borderRadius.default};
            border: 1px solid ${({ theme }) => theme.color.border};
            padding: 4px 12px;
            position: absolute;
            bottom: 16px;
            right: 16px;

            svg {
                color: ${({ theme }) => theme.color.primary};
            }
        }
    }
`;

export default BookItem;
