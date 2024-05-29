import "sanitize.css";
import { createGlobalStyle } from "styled-components"; //전역 스타일
import { ThemeName } from "./theme";
interface Props {
    themeName: ThemeName; //light와 dark만 들어와야 하기 떄문에 theme.tsx에 있는 타입을 가져온다.
}

export const GlobalStyle = createGlobalStyle<Props>`
    body {
        margin : 0;
        padding : 0;
        background-color : ${(props) =>
            props.themeName === "light" ? "white" : "black"};
    }
    h1 {
        margin : 0;
    }
    

    *{
        color : ${(props) => (props.themeName === "light" ? "black" : "white")};
    }
`;
//타입이 dark인지 light 인지에 따라 black or white 로 설정
