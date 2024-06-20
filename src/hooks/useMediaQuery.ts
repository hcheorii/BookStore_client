import { getTheme } from "@/style/theme";
import { useEffect, useState } from "react";

export const useMediaQuery = () => {
    //지금 현재 width 값이 768px보다 작은지 boolean으로 리턴
    const [isMobile, setIsMobile] = useState(
        window.matchMedia(getTheme("light").mediaQuery.mobile).matches
    );

    useEffect(() => {
        const isMobileQuery = window.matchMedia(
            getTheme("light").mediaQuery.mobile
        );

        setIsMobile(isMobileQuery.matches);
    }, []);

    return { isMobile };
};
