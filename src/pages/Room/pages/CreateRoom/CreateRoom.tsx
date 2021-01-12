import React, { FunctionComponent, useState } from 'react'
import { Lobby } from '../Lobby'
import { useDispatch } from 'react-redux'
import { roomToServer } from '../../roomReducer'
import { SmartButton } from '../../../../common/components/SmartButton'

type CreateRoomProps = {
    name: string
    time: number
}

export const CreateRoom: FunctionComponent<CreateRoomProps> = (props) => {

    const { name, time } = props;
    // Next component
    const [nextPage, setNext] = useState(true);

    const dispatch = useDispatch()

    return nextPage ?
        <div className="room-create">
            Name: {name}
            <br />
            Time: {time}
            <SmartButton
                onClick={() => {
                    dispatch({ type: roomToServer.CreateRoom, payload: { LobbyName: name, TimeLimit: time } })
                    setNext(false)
                }}
            >
                Create Game
            </SmartButton>
        </div>
        :
        <Lobby />;
}