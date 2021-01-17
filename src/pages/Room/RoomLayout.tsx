import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux';
import { RoomName } from './pages/RoomName'
import { RootState } from './roomStore';
import { ConnectionStatus } from '../../common/components/'
import { Timer } from'../../common/components/Timer'

export const RoomLayout: FunctionComponent = (): JSX.Element => {

    const { status, elapsedTime } = useSelector((state: RootState) => state.room);

    return (
        <div className="room-layout">
            <h1>GameRoom</h1>
            <RoomName />
            <ConnectionStatus status={status} />
            <Timer elapsedTime={elapsedTime} ></Timer>
        </div>
    );
}