import { useEffect, useState } from "react";
import {
    BookDetail,
    BookReviewItem,
    BookReviewItemWrite,
} from "../models/book.model";
import { fetchBook, likeBook, unlikeBook } from "../api/books.api";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";
import { addCart } from "../api/carts.api";
import { addBookReview, fetchBookReview } from "@/api/review.api";
import { useToast } from "../hooks/useToast";

export const useBook = (bookId: string | undefined) => {
    const [book, setBook] = useState<BookDetail | null>(null);

    //해당 도서에 대한 리뷰들
    const [reviews, setReviews] = useState<BookReviewItem[]>([]);

    const [cartAdded, setCartAdded] = useState(false);

    const { isloggedIn } = useAuthStore();
    const { showAlert } = useAlert();
    const { showToast } = useToast();

    const likeToggle = () => {
        if (!isloggedIn) {
            showAlert("로그인이 필요합니다.");
            return;
        }
        if (!book) {
            return;
        }

        if (book.liked) {
            //이미 좋아요가 눌려있다면
            unlikeBook(book.id).then(() => {
                setBook({
                    ...book,
                    liked: false,
                    likes: book.likes - 1,
                });
                showToast("좋아요를 취소했습니다.");
            });
        } else {
            //좋아요를 누른 적이 없다면
            likeBook(book.id).then(() => {
                setBook({
                    ...book,
                    liked: true,
                    likes: book.likes + 1,
                });
                showToast("좋아요를 눌렀습니다.");
            });
        }
    };

    const addToCart = (quantity: number) => {
        if (!book) {
            return;
        }
        addCart({
            book_id: book.id,
            quantity: quantity,
        }).then(() => {
            // showAlert("장바구니에 추가되었습니다.");
            setCartAdded(true);
            setTimeout(() => {
                setCartAdded(false);
            }, 3000);
        });
    };
    useEffect(() => {
        if (!bookId) {
            return;
        }
        fetchBook(bookId).then((book) => {
            setBook(book);
        });
        //리뷰 불러오기
        fetchBookReview(bookId).then((reviews) => setReviews(reviews));
    }, [bookId]);

    const addReview = (data: BookReviewItemWrite) => {
        if (!book) return;
        addBookReview(book.id.toString(), data).then((res) => {
            // fetchBookReview(book.id.toString()).then((reviews) =>
            //     setReviews(reviews)
            // );
            showAlert(res.message);
        });
    };

    return { book, likeToggle, addToCart, cartAdded, reviews, addReview };
};
