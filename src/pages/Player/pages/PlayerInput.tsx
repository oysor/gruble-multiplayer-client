import React, { FunctionComponent, useState } from 'react';
import { useDispatch } from 'react-redux'
import { setPlayerName, setRoomId, toServer } from '../playerReducer';
import { SmartInput, SubmitButton } from '../../../common/components/'
import { Play } from './Play';

export const PlayerInput: FunctionComponent = () => {

    const [name, setName] = useState('');
    const [roomId, setId] = useState('');
    const dispatch = useDispatch()

    // Next component
    const [nextPage, setNext] = useState(true);

    return nextPage ? 
        <div className="join-room">
            <form>
                <SmartInput onChange={ setName } placeholder={"player name.."} />
                <SmartInput onChange={ setId } placeholder={"RoomId.."} />
                <SubmitButton 
                    onClick={
                        () => {
                            dispatch(setPlayerName(name))
                            dispatch({type: setRoomId, payload: roomId})
                            dispatch({
                                type: toServer.JoinRoom, 
                                payload: {roomName: roomId, playerName: name}
                            })
                            setNext(false)
                        }
                    }
                    value={"Submit"}
                />
            </form>
        </div>
        :  <Play/>
}

export default PlayerInput;