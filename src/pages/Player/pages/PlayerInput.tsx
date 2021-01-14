import React, { FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setPlayerName, setRoomId, toServer } from '../playerReducer';
import { SmartInput, SubmitButton, ConnectionStatus } from '../../../common/components/'
import { ConnectionMode } from '../../../common/constants/status';
import { Play } from './Play';
import { RootState } from '../playerStore';

export const PlayerInput: FunctionComponent = () => {

    const [name, setName] = useState('');
    const [roomId, setId] = useState('');
    const dispatch = useDispatch()


    // Next component
    const [nextPage, setNext] = useState(true);

    const { status } = useSelector((state: RootState) => state.player)

    return nextPage ? 
        <div className="join-room">
            <form>
                <SmartInput onChange={ setName } placeholder={"player name.."} />
                <SmartInput onChange={ setId } placeholder={"RoomId.."} />
                <SubmitButton 
                    onClick={() => {
                        if(status === ConnectionMode.Connected){
                            dispatch(setPlayerName(name))
                            dispatch({type: setRoomId, payload: roomId})
                            dispatch({
                                type: toServer.JoinRoom, 
                                payload: {roomName: roomId, playerName: name}
                            })
                            setNext(false)
                        }
                    }}
                    value={"Submit"}
                />
            </form>
            <ConnectionStatus status={status}/>
        </div>
        :  <Play/>
}

export default PlayerInput;