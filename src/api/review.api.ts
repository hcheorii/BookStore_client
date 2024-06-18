import { BookReviewItem, BookReviewItemWrite } from "@/models/book.model";
import { requesthandler } from "./http";

export const fetchBookReview = async (bookId: string) => {
    return await requesthandler<BookReviewItem[]>("get", `/reviews/${bookId}`);
};

interface AddBookReviewResponse {
    message: string;
}

export const addBookReview = async (
    bookId: string,
    data: BookReviewItemWrite
) => {
    return await requesthandler<AddBookReviewResponse>(
        "post",
        `/reviews/${bookId}`
    );
};

export const fetchReviewAll = async () => {
    return await requesthandler<BookReviewItem[]>("get", "/reviews");
};
