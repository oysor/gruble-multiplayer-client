import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux';
import { RoomName } from './pages/RoomName'
import { RootState } from './roomStore';
import { ConnectionStatus, Timer } from '../../common/components/'

export const RoomLayout: FunctionComponent = ()  => {

    const { commonstates } = useSelector((state: RootState) => state.room);

    return (
        <div className="room-layout">
            <h1>GameRoom</h1>
            <RoomName />
            <ConnectionStatus status={commonstates.status} />
            <Timer elapsedTime={commonstates.elapsedTime} ></Timer>
        </div>
    );
}