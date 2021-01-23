import React, {FunctionComponent} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../../../../common/components';
import { RootState } from '../../roomStore';
import { toServer } from '../../roomReducer';

export const Lobby: FunctionComponent = ( ) => {

    const { timeLimit, maxPlayers, roomId, lobbyName, gameBoard } = useSelector((state: RootState) => state.room);
    const dispatch = useDispatch();
    
    return (    
        <div className="room-lobby"> 
            <div>LobbyName: {lobbyName}</div>
            <div>TimeLimit: {timeLimit}</div>
            <div>roomId: {roomId}</div>
            <div>maxPlayers: {maxPlayers}</div>
            <div>GameBoard: {JSON.stringify(gameBoard)}</div>
            <Button
                onClick={()=>{
                    dispatch({ type:toServer.StartGame, payload: roomId })
                }}
            >
                Start Game
            </Button>
        </div>
    );
}