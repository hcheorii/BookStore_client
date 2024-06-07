import styled from "styled-components";
import Button from "../common/Button";
import { FaList, FaTh } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { QUERYSTRING } from "../../constants/querystring";
import { useEffect } from "react";

const viewOptions = [
    {
        value: "List",
        icon: <FaList />,
    },
    {
        value: "grid",
        icon: <FaTh />,
    },
];

export type viewMode = "grid" | "list";

function BooksViewSwitcher() {
    const [searchParams, setSearchParams] = useSearchParams();
    const handleSwitch = (value: viewMode) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set(QUERYSTRING.VIEW, value);
        setSearchParams(newSearchParams);
    };

    useEffect(() => {
        //화면이 처음 켜졌을 때 디폴트 값
        if (!searchParams.get(QUERYSTRING.VIEW)) {
            handleSwitch("grid");
        }
    }, []);

    return (
        <BooksViewSwitcherStyle>
            {viewOptions.map((option) => (
                <Button
                    key={option.value}
                    size="medium"
                    scheme={
                        searchParams.get(QUERYSTRING.VIEW) === option.value
                            ? "primary"
                            : "normal"
                    }
                    onClick={() => handleSwitch(option.value as viewMode)}
                >
                    {option.icon}
                </Button>
            ))}
        </BooksViewSwitcherStyle>
    );
}

const BooksViewSwitcherStyle = styled.div`
    display: flex;
    gap: 8px;
    svg {
        fill: #fff;
    }
`;

export default BooksViewSwitcher;
