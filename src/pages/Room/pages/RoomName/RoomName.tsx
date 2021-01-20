import React, { FunctionComponent, useState } from 'react'
import { TimeLimit } from '../TimeLimit'
import { SmartInput, SubmitButton } from '../../../../common/components/'

export const RoomName: FunctionComponent = () => {

    // Set room name
    const [name, setName] = useState('');
    // Next component
    const [nextPage, setNext] = useState(true);

    return nextPage ?
        <div className="room-name">
            <form>
                <SmartInput onChange={setName} placeholder={"room name..."} />
                <SubmitButton value="Submit" onClick={() => setNext(false)} />
            </form>
        </div>
        :
        <TimeLimit name={name} />;
}