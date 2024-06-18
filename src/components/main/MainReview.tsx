import { BookReviewItem as IBookReviewItem } from "@/models/book.model";
import styled from "styled-components";
import BookReviewItem from "../book/BookReviewItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
interface Props {
    reviews: IBookReviewItem[];
}
function MainReview({ reviews }: Props) {
    const sliderSettings = {
        dots: true, //하단에 페이지네이션처럼 점
        infinite: true, //오른쪽으로 계속 넘어가게
        speed: 500, //속도
        slidesToShow: 3, //한번에 몇개 보여지는지
        slidesToScroll: 3, //넘길때 몇개씩?
        gap: 16,
    };
    return (
        <MainReviewStyle>
            <Slider {...sliderSettings}>
                {reviews.map((review) => (
                    <BookReviewItem key={review.id} review={review} />
                ))}
            </Slider>
        </MainReviewStyle>
    );
}

const MainReviewStyle = styled.div`
    padding: 0 0 24px 0;
    .slick-track {
        padding: 12px 0;
    }

    .slick-slide > div {
        margin: 0 12px;
    }

    .slick-prev:before,
    .slick-next:before {
        color: #000;
    }
`;
export default MainReview;
