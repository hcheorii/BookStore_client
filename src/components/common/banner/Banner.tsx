import { Banner as IBanner } from "@/models/banner.model";
import styled from "styled-components";
import BannerItem from "./BannerItem";
import { useMemo, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface Props {
    banners: IBanner[];
}

function Banner({ banners }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        if (currentIndex === 0) return;
        setCurrentIndex(currentIndex - 1);
    };

    const handleNext = () => {
        if (currentIndex === banners.length - 1) return;
        setCurrentIndex(currentIndex + 1);
    };

    const transFormValue = useMemo(() => {
        return currentIndex * -100;
    }, [currentIndex]);

    const handleInticator = (index: number) => {
        setCurrentIndex(index);
    };
    return (
        <BannerStyle>
            <BannerContainerStyle $transFormValue={transFormValue}>
                {banners.map((item, index) => (
                    <BannerItem banner={item} key={index} />
                ))}
            </BannerContainerStyle>
            <BannerButtonStyle>
                <button onClick={handlePrev} className="prev">
                    <FaAngleLeft />
                </button>
                <button onClick={handleNext} className="next">
                    <FaAngleRight />
                </button>
            </BannerButtonStyle>
            <BannerIndicatorStyle>
                {banners.map((_, index) => (
                    <span
                        onClick={() => handleInticator(index)}
                        className={index === currentIndex ? "active" : ""}
                    ></span>
                ))}
            </BannerIndicatorStyle>
        </BannerStyle>
    );
}

const BannerStyle = styled.div`
    overflow: hidden;
    position: relative;
`;
interface BannerContainerStyleProps {
    $transFormValue: number;
}
const BannerContainerStyle = styled.div<BannerContainerStyleProps>`
    display: flex;
    transform: translateX(${(props) => props.$transFormValue}%);
    transition: transform 0.5s ease-in-out;
`;
const BannerButtonStyle = styled.div`
    button {
        border: 0;
        width: 40px;
        height: 40px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 500px;
        font-size: 2rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

        svg {
            fill: #fff;
        }

        &.prev {
            left: 10px;
        }

        &.next {
            right: 10px;
        }
    }
`;

const BannerIndicatorStyle = styled.div`
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    span {
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: 100px;
        background: #fff;
        margin: 0 4px;
        cursor: pointer;

        &.active {
            background: ${({ theme }) => theme.color.primary};
        }
    }
`;
export default Banner;
