import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux';
import { PlayerInput } from './pages/PlayerInput'
import { RootState } from './playerStore';
import { ConnectionStatus } from '../../common/components/'

export const PlayerLayout: FunctionComponent = () => {

    const { status } = useSelector((state: RootState) => state.player)

    return (
        <div className="player-layout">
            <h1>PlayerRoom</h1>
            <PlayerInput />
            <ConnectionStatus status={status} />
        </div>
    );
}