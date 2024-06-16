import { BookReviewItem } from "@/models/book.model";
import { requesthandler } from "./http";

export const fetchBookReview = async (bookId: string) => {
    return await requesthandler<BookReviewItem[]>("get", `/reviews/${bookId}`);
};
