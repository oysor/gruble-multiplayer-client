import React, {FunctionComponent, useState } from 'react'
import { CreateRoom } from '../CreateRoom'


type TimeLimitProps  = {
    name: string
}

export const TimeLimit: FunctionComponent <TimeLimitProps>= ( props ) => {

    // Default value: 10 minutes
    const [time, setTime] = useState(10);
    // Next component
    const [next, setNext] = useState(true);
    const {name} = props;

    return next ? 
        <div className="room-time"> 
            <form>
                <input 
                    type="number" 
                    value={time}
                    step="any"
                    onChange={
                        (ev: React.ChangeEvent<HTMLInputElement>,): void => setTime( parseInt(ev.target.value))
                    }
                />
                <input type="submit" value="Submit"  onClick={() => setNext(false)} />
            </form> 
        </div>
        : 
        <CreateRoom name={name} time={time}/>;
}