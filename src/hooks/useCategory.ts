import { useEffect, useState } from "react";
import { fetchCategory } from "../api/category.api";
import { Category } from "../models/category.model";
import { useLocation } from "react-router-dom";

export const useCategory = () => {
    const [category, setCategory] = useState<Category[]>([]);

    const location = useLocation(); //url의 쿼리스트링을 가져옴

    const setActive = () => {
        const params = new URLSearchParams(location.search);
        if (params.get("category_id")) {
            setCategory((prev) => {
                //버튼 아이템을 돌면서 아이디가 같은 것이 쿼리스트링에 있다면 활성화.
                return prev.map((item) => {
                    return {
                        ...item,
                        isActive:
                            item.category_id ===
                            Number(params.get("category_id")),
                    };
                });
            });
        } else {
            setCategory((prev) => {
                //전체를 클릭했을 때
                return prev.map((item) => {
                    return {
                        ...item,
                        isActive: false,
                    };
                });
            });
        }
    };
    useEffect(() => {
        fetchCategory().then((category) => {
            if (!category) return;
            const categoryWithAll = [
                { category_id: null, category_name: "전체" },
                ...category,
            ];
            setCategory(categoryWithAll);
            setActive();
        });
    }, []);
    useEffect(() => {
        setActive();
    }, [location.search]);
    return { category };
};
