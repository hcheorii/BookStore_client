import { styled } from "styled-components";

function Header() {
    return (
        <HeaderStyle>
            <h1>book store</h1>
        </HeaderStyle>
    );
}

//$ 이걸로 시작하는 문장은 provider가 주는 theme을 받아오는 것.
const HeaderStyle = styled.header`
    background-color: ${({ theme }) => theme.color.background};
    h1 {
        color: ${({ theme }) => theme.color.primary};
    }
`;

export default Header;
