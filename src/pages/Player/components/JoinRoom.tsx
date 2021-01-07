import React, { FunctionComponent, useState } from 'react';
import { useDispatch } from 'react-redux'
import { toServer } from '../playerReducer';
import Play from './Play'
import { useSelector } from 'react-redux'
import { RootState } from '../playerStore';

export const JoinRoom: FunctionComponent = () => {


    // Set name
    const [roomName, setRoomName] = useState('');

    const dispatch = useDispatch()

    const { name } = useSelector((state: RootState) => state.player)


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
                                type: toServer.JoinRoom, 
                                payload: {roomName: roomName, playerName: name}
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
