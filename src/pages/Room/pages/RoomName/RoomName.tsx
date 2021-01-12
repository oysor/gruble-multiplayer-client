import React, {FunctionComponent, useState } from 'react'
import { TimeLimit } from '../TimeLimit'
import { SmartInput } from '../../../../common/components/SmartInput'

export const RoomName: FunctionComponent = () => {
    
    // Set room name
    const [name, setName] = useState('');
    // Next component
    const [nextPage, setNext] = useState(true);

    return nextPage ? 
        <div className="room-name"> 
            <form>
                <SmartInput onChange={setName} placeholder={"room name..."} />
                <input type="submit" value="Submit"  onClick={() => setNext(false)} />
            </form> 
        </div>
        : 
        <TimeLimit name={name}/>;
}