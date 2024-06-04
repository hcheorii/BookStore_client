import React, { ForwardedRef } from "react";
import styled from "styled-components";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    //input의 onchange등의 attribute들을 모두 사용가능

    placeholder?: string;
    inputType?: "text" | "password" | "email" | "number";
}

const InputText = React.forwardRef(
    (
        { placeholder, inputType, onChange, ...props }: Props,
        ref: ForwardedRef<HTMLInputElement>
    ) => {
        return (
            <InputTextStyle
                placeholder={placeholder}
                ref={ref}
                type={inputType}
                onChange={onChange}
                {...props}
            />
        );
    }
);

const InputTextStyle = styled.input`
    padding: 0.25rem 0.75rem;
    border: 1px solid;
    border-radius: ${({ theme }) => theme.borderRadius.default};
    font-size: 1rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.color.text};
`;

export default InputText;
