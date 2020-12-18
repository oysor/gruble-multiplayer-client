import React, { FunctionComponent, useState } from 'react';
import { useDispatch } from 'react-redux'
import { playerToServer } from '../playerSlice';
import Play from './Play'

export const JoinRoom: FunctionComponent = () => {


    // Set name
    const [roomName, setRoomName] = useState('');

    const dispatch = useDispatch()

    // Next component
    const [next, setNext] = useState(true);

    return next ? 
        <div className="join-room">
            <form>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="room id..." 
                    onChange={
                        (ev: React.ChangeEvent<HTMLInputElement>,): void => setRoomName(ev.target.value)
                    }
                />
            </form>
            <div>
                <button onClick={
                        () => {
                            setNext(false)
                            dispatch({
                                type: playerToServer.JoinRoom, 
                                payload: roomName
                            })
                        }}
                >
                    Join Room
                </button>
            </div>
        </div>
        :  <Play/>    
}


export default JoinRoom;
