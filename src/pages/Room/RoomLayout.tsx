import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux';
import { RoomName } from './pages/RoomName'
import { RootState } from './roomStore';
import { ConnectionStatus } from '../../common/components/'

export const RoomLayout: FunctionComponent = () => {

    const { status } = useSelector((state: RootState) => state.room);

    return (
        <div className="room-layout">
            <h1>GameRoom</h1>
            <RoomName />
            <ConnectionStatus status={status} />
        </div>
    );
}