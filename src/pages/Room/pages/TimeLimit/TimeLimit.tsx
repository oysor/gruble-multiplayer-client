import React, {FunctionComponent, useState } from 'react'
import { CreateRoom } from '../CreateRoom'
import { SmartNumericInput } from '../../../../common/components/SmartNumericInput'
import { SubmitInput } from '../../../../common/components/SubmitInput'

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
                <SubmitInput value="Submit" onClick={() => setNext(false)}/>
            </form> 
        </div>
        : 
        <CreateRoom name={name} time={time}/>;
}