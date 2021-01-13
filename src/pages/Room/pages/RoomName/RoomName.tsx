import React, {FunctionComponent, useState } from 'react'
import { TimeLimit } from '../TimeLimit'
import { SmartInput } from '../../../../common/components/SmartInput'
import { SubmitInput } from '../../../../common/components/SubmitInput';
import { ConnectionMode } from '../../../../common/constants/status';
import { ConnectionStatus } from '../../../../common/components/ConnectionStatus'
import { useSelector } from 'react-redux';
import { RootState } from '../../roomStore';

export const RoomName: FunctionComponent = () => {
    
    // Set room name
    const [name, setName] = useState('');
    // Next component
    const [nextPage, setNext] = useState(true);

    const { status } = useSelector((state: RootState) => state.room)

    return nextPage ? 
        <div className="room-name"> 
            <form>
                <SmartInput onChange={setName} placeholder={"room name..."} />
                <SubmitInput value="Submit" 
                    onClick={
                        () => {
                            status === ConnectionMode.Connected ? setNext(false) : null
                        }
                    }
                />
            </form>
            <ConnectionStatus status={status} />
        </div>
        : 
        <TimeLimit name={name}/>;
}