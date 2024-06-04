import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import styled from "styled-components";

interface LayoutProps {
    children: React.ReactNode;
    // 여기서 ReactNode란 리액트로 만들어진 어떤 컴포넌트도 올 수 있다는 뜻.
}

function Layout({ children }: LayoutProps) {
    return (
        <>
            <Header />
            <LayoutStyle>{children}</LayoutStyle>
            <Footer />
        </>
    );
}

const LayoutStyle = styled.main`
    width: 100%;
    margin: 0 auto;
    max-width: ${({ theme }) => theme.layout.width.large};

    padding: 20px 0;
`;

export default Layout;
