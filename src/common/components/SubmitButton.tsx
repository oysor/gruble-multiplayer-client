import React, { FunctionComponent } from 'react';

interface SubmitButtonProps {
    onClick: () => void;
    value?: string;
}

export const SubmitButton: FunctionComponent<SubmitButtonProps> = ({ onClick, value="Submit" }) => {
    return (
        <div className="submit-input">
            <input
                type="button"
                value={value}
                onClick={
                    onClick
                }
            />
        </div>
    );
}