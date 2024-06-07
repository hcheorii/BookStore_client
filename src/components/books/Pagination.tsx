import styled from "styled-components";
import { Pagination as IPagination } from "../../models/pagination.model";
import { LIMIT } from "../../constants/pagination";
import Button from "../common/Button";
import { useSearchParams } from "react-router-dom";
import { QUERYSTRING } from "../../constants/querystring";
interface Props {
    pagination: IPagination;
}
function Pagination({ pagination }: Props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const { totalCount, currentPage } = pagination;
    const pages = Math.ceil(totalCount / LIMIT); //총 페이지 수

    const handleClickPage = (page: number) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set(QUERYSTRING.PAGE, pages.toString());

        setSearchParams(newSearchParams);
    };
    return (
        <PaginationStyle>
            {pages > 0 && (
                <ol>
                    {Array(pages)
                        .fill(0)
                        .map((_, index) => (
                            <li>
                                <Button
                                    size="small"
                                    scheme={
                                        index + 1 === currentPage
                                            ? "primary"
                                            : "normal"
                                    }
                                    key={index}
                                    onClick={() => handleClickPage(index + 1)}
                                >
                                    {index + 1}
                                    {/* 배열의 숫자로 버튼을 표현 */}
                                </Button>
                            </li>
                        ))}
                </ol>
            )}
        </PaginationStyle>
    );
}

const PaginationStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 24px 0;

    ol {
        list-style: none;
        display: flex;
        gap: 8px;
        padding: 0;
        margin: 0;
    }
`;

export default Pagination;
