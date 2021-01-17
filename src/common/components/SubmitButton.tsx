import React, { FunctionComponent } from 'react';

interface SubmitButtonProps {
    onClick: () => void;
    value?: string;
}

export const SubmitButton: FunctionComponent<SubmitButtonProps> = ({ onClick, value="Submit" }) => {
    return (
            <input
                className="submit-input"
                type="button"
                value={value}
                onClick={
                    onClick
                }
            />
    );
}