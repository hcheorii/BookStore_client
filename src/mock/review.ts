import { BookReviewItem } from "@/models/book.model";
import { HttpResponse, http } from "msw";
import { fakerKO as faker } from "@faker-js/faker";
// const mockReviewsData: BookReviewItem[] = [
//     {
//         id: 1,
//         userName: "Bop",
//         content: "감사합니다",
//         createdAt: "2024-01-01",
//         score: 5,
//     },
//     {
//         id: 2,
//         userName: "Bop2",
//         content: "감사합니다2",
//         createdAt: "2024-01-01",
//         score: 3,
//     },
// ];
const mockReviewsData: BookReviewItem[] = Array.from({ length: 8 }).map(
    (_, index) => ({
        id: index,
        userName: `${faker.person.lastName()}${faker.person.firstName()}`,
        content: faker.lorem.paragraph(),
        createdAt: faker.date.past().toISOString(),
        score: faker.number.int({ min: 1, max: 5 }),
    })
);

export const reviewsById = http.get(
    "http://localhost:9960/reviews/:bookId",
    () => {
        return HttpResponse.json(mockReviewsData, {
            status: 200,
        });
    }
);

export const addReview = http.post(
    "http://localhost:9960/reviews/:bookId",
    () => {
        return HttpResponse.json(
            {
                message: "리뷰가 등록되었습니다.",
            },
            {
                status: 200,
            }
        );
    }
);
