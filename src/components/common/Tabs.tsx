import React, { useState } from "react";
import styled from "styled-components";

interface TabProps {
    title: string;
    children: React.ReactNode;
}

function Tab({ children }: TabProps) {
    //여기서 children은 BookDetail에서 보면 Title태그와 EllipsisBox 컴포넌트이다.
    return <>{children}</>;
}

interface TabsProps {
    children: React.ReactNode;
}

function Tabs({ children }: TabsProps) {
    //내가 여러 탭 중에 어떤 탭을 눌렀는지 알 수 있게 해주는 상태.
    const [activeIndex, setActiveIndex] = useState(0);

    const tabs = React.Children.toArray(
        children
    ) as React.ReactElement<TabProps>[];

    return (
        <TabsStyle>
            <div className="tab-header">
                {tabs.map((tab, index) => (
                    <button
                        onClick={() => setActiveIndex(index)}
                        className={activeIndex === index ? "active btn" : "btn"}
                    >
                        {tab.props.title}
                        {/* 상세 설명, 목차, 리뷰 */}
                    </button>
                ))}
            </div>
            <div className="tap-content">{tabs[activeIndex]}</div>
        </TabsStyle>
    );
}

const TabsStyle = styled.div`
    .tab-header {
        display: flex;
        gap: 2px;
        border-bottom: 1px solid #ddd;
    }

    .btn {
        border: none;
        background: #ddd;
        cursor: pointer;
        font-size: 1.25rem;
        font-weight: bold;
        color: ${({ theme }) => theme.color.text};
        border-radius: ${({ theme }) => theme.borderRadius.default}
            ${({ theme }) => theme.borderRadius.default} 0 0;
        padding: 12px 24px;
    }
    .active {
        color: #fff;
        background: ${({ theme }) => theme.color.primary};
    }

    .tab-content {
        padding: 24px 0;
    }
`;

export { Tabs, Tab };
