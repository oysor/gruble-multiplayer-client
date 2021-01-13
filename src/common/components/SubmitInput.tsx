import React, { FunctionComponent } from 'react';

interface SubmitInputProps {
    onClick: () => void;
    value?: string
}

export const SubmitInput: FunctionComponent<SubmitInputProps> = ({ onClick, value="Submit" }) => {
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
    )
}

export default SubmitInput;