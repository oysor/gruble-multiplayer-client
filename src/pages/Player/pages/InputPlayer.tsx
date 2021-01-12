import React, { FunctionComponent, useState } from 'react';
import { useDispatch } from 'react-redux'
import { setPlayerName, setRoomId, toServer } from '../playerReducer';
import { SmartInput } from '../../../common/components/SmartInput'
import { Play } from './Play';

export const InputPlayer: FunctionComponent = () => {

    const [name, setName] = useState('');
    const [roomId, setId] = useState('');
    const dispatch = useDispatch()

    // Next component
    const [next, setNext] = useState(true);

    return next ? 
        <div className="join-room">
            <form>
                <SmartInput onChange={ setName } placeholder={"player name.."} />
                <SmartInput onChange={ setId } placeholder={"RoomId.."} />
                <input
                    type="submit"
                    value="Submit"
                    onClick={
                        () => {
                            setNext(false)
                            dispatch(setPlayerName(name))
                            dispatch({type: setRoomId, payload: roomId})
                            dispatch({
                                type: toServer.JoinRoom, 
                                payload: {roomName: roomId, playerName: name}
                            })
                        }}
                />
            </form>
        </div>
        :  <Play/>    
}

export default InputPlayer;