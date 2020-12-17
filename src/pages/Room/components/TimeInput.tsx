import React, {FunctionComponent, useState } from 'react'


type TimeInputProps  = {
    name: string
}

export const TimeInput: FunctionComponent <TimeInputProps>= ( props ) => {

    // Default value: 10 minutes
    const [time, setTime] = useState(10);
    const [hidden, setHidden] = useState(true);
    const {name} = props;

    return hidden ? 
        <div className="room-name"> 
            <form>
                <input 
                    type="number" 
                    value={time}
                    step="any"
                    onChange={
                        (ev: React.ChangeEvent<HTMLInputElement>,): void => setTime( parseInt(ev.target.value))
                    }
                />
                <input type="submit" value="Submit"  onClick={() => setHidden(false)} />
            </form> 
        </div>
        : 
        <div>Next component with props: {name} {time}</div>;
}

export default TimeInput;