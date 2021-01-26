import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './playerStore';
import { ConnectionStatus, MessageBox, Timer } from '../../common/components/'
import { JoinGame } from './pages/JoinGame';
import { ShowPlayerInput } from './common';
import { toServer } from './playerReducer';

export const PlayerLayout: FunctionComponent = () => {

    const { commonStates, messages, playerBoard, sendBoard } = useSelector((state: RootState) => state.player);

    const dispatch = useDispatch()

    if(sendBoard === true){
        dispatch({type: toServer.CollectBoard, payload: playerBoard})
    }

    return (
        <div className="player-layout">
            <h1>PlayerRoom</h1>
            <JoinGame />
            <ShowPlayerInput />
            <MessageBox messages={messages} />
            <ConnectionStatus status={commonStates.status} />
            <Timer elapsedTime={commonStates.elapsedTime} ></Timer>
        </div>
    );
}