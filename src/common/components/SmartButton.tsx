import React, { FunctionComponent } from 'react';

interface SmartButtonProps {
    onClick: () => void;
}

export const SmartButton: FunctionComponent<SmartButtonProps> = ({ onClick, children }) => {
    return (
        <div className="smart-button" > 
           <button onClick={onClick} type="button">
                {children}
            </button>
        </div>
    );
}