import React, { FunctionComponent } from 'react';

interface ButtonProps {
    onClick?: () => void;
}

export const Button: FunctionComponent<ButtonProps> = ({ onClick, children }) => {
    return (
        <button className="button" type="button" onClick={onClick}>
            {children}
        </button>
    );
}