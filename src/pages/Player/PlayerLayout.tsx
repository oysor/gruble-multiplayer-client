import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux';
import { PlayerInput } from './pages/PlayerInput'
import { RootState } from './playerStore';
import { ConnectionStatus, MessageBox, Timer } from '../../common/components/'

export const PlayerLayout: FunctionComponent = () => {

    const { commonStates, messages } = useSelector((state: RootState) => state.player);

    return (
        <div className="player-layout">
            <h1>PlayerRoom</h1>
            <PlayerInput />
            <MessageBox messages={messages} />
            <ConnectionStatus status={ commonStates.status } />
            <Timer elapsedTime={ commonStates.elapsedTime } ></Timer>
        </div>
    );
}