import React, { FunctionComponent, useState } from 'react'
import { Lobby } from '../Lobby'
import { useDispatch } from 'react-redux'
import { toServer } from '../../roomReducer'
import { Button } from '../../../../common/components/'

import { ShowRoomInput } from './components/ShowRoomInput'

type CreateRoomProps = {
    name: string;
    time: number;
}

export const CreateRoom: FunctionComponent<CreateRoomProps> = (props) => {

    const { name, time } = props;
    // Next component
    const [nextPage, setNext] = useState(true);

    const dispatch = useDispatch();

    return nextPage ?
        <div className="room-create">
            <ShowRoomInput name={name} time={time}/>
            <Button
                onClick={() => {
                    dispatch({ type: toServer.CreateRoom, payload: { LobbyName: name, TimeLimit: time } })
                    setNext(false)
                }}
            >
                Create Room
            </Button>
        </div>
        :
        <Lobby />;
}