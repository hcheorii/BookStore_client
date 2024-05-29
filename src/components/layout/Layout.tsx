import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";

interface LayoutProps {
    children: React.ReactNode;
    // 여기서 ReactNode란 리액트로 만들어진 어떤 컴포넌트도 올 수 있다는 뜻.
}

function Layout({ children }: LayoutProps) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}

export default Layout;
