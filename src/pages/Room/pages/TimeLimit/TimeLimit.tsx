import React, {FunctionComponent, useState } from 'react'
import { CreateRoom } from '../CreateRoom'
import { SmartNumericInput, SubmitButton } from '../../../../common/components/'

type TimeLimitProps  = {
    name: string
}

export const TimeLimit: FunctionComponent <TimeLimitProps>= ( props ) => {

    // Default value: 10 minutes
    const [time, setTime] = useState(10);
    // Next component
    const [nextPage, setNext] = useState(true);
    const {name} = props;

    return nextPage ? 
        <div className="room-time"> 
            <form>
                <SmartNumericInput onChange={setTime} value={time} />
                <SubmitButton value="Submit" onClick={() => setNext(false)}/>
            </form> 
        </div>
        : 
        <CreateRoom name={name} time={time}/>;
}