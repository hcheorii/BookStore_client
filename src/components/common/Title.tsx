import { styled } from "styled-components";
import { HeadingSize } from "../../style/theme";
import { ColorKey } from "../../style/theme";

interface Props {
    children: React.ReactNode;
    size: HeadingSize; //"large" | "medium" | "small"
    color?: ColorKey;
}

function Title({ children, size, color }: Props) {
    return (
        <TitleStyle size={size} color={color}>
            {children}
        </TitleStyle>
    );
}

//Omit을 사용해 children은 제외..
const TitleStyle = styled.h1<Omit<Props, "children">>`
    font-size: ${({ theme, size }) => theme.heading[size].fontSize};
    color: ${({ theme, color }) =>
        color ? theme.color[color] : theme.color.primary};
`;

export default Title;
