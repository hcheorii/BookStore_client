import styled from "styled-components";
import { useCategory } from "../../hooks/useCategory";
import Button from "../common/Button";
import { useSearchParams } from "react-router-dom"; //쿼리스트링을 다루기 위해 사용
import { QUERYSTRING } from "../../constants/querystring";

function BooksFilter() {
    const { category } = useCategory(); //카테고리가 뭐뭐 있는지 useCategory를 사용해서 불러온다.
    const [searchParams, setSearchParams] = useSearchParams();

    const handleCategory = (id: number | null) => {
        const newSearchParams = new URLSearchParams(searchParams);

        if (id === null) {
            //전체를 클릭했을 경우
            newSearchParams.delete(QUERYSTRING.CATEGORY_ID);
        } else {
            //url에 추가..
            newSearchParams.set(QUERYSTRING.CATEGORY_ID, id.toString());
        }
        //url 변경
        setSearchParams(newSearchParams);
    };

    const handleNews = () => {
        const newSearchParams = new URLSearchParams(searchParams);
        if (newSearchParams.get(QUERYSTRING.NEWS)) {
            newSearchParams.delete(QUERYSTRING.NEWS);
        } else {
            newSearchParams.set(QUERYSTRING.NEWS, "true");
        }
        //url 변경
        setSearchParams(newSearchParams);
    };
    return (
        <BooksFilterStyle>
            <div className="category">
                {category.map((item) => (
                    <Button
                        onClick={() => handleCategory(item.category_id)}
                        size="medium"
                        scheme={item.isActive ? "primary" : "normal"}
                        key={item.category_id}
                    >
                        {item.category_name}
                    </Button>
                ))}
            </div>
            <div className="new">
                <Button
                    size="medium"
                    scheme={
                        searchParams.get(QUERYSTRING.NEWS)
                            ? "primary"
                            : "normal"
                    }
                    onClick={() => handleNews()}
                >
                    신간
                </Button>
            </div>
        </BooksFilterStyle>
    );
}

const BooksFilterStyle = styled.div`
    display: flex;
    gap: 24px;

    .category {
        display: flex;
        gap: 8px;
    }
`;

export default BooksFilter;
