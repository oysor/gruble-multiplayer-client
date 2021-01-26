import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux'
import { RootState } from '../../playerStore'
import { InputBoard } from './components/InputBoard';
import { SendMessage } from '../../common/SendMessage';

export const Play: FunctionComponent = () => {

    const { roomId, boardSettings, playerBoard } = useSelector((state: RootState) => state.player);

    return (
        <div className="play">
            <SendMessage roomId={roomId}/>
            <InputBoard board={playerBoard} boardSettings={boardSettings} />
        </div>
    );
}