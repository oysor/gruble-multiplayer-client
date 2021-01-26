
import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../roomStore';

export const ShowRoomInput: FunctionComponent = () => {

    const { roomId, maxPlayers, lobbyName, timeLimit, boardSettings, playerList } = useSelector((state: RootState) => state.room);

    return (
        <div className="show-room-input">
            <div>LobbyName: {lobbyName}</div>
            <div>TimeLimit: {timeLimit}</div>
            <div>roomId:<b>{roomId}</b></div>
            <div>maxPlayers: {maxPlayers}</div>
            <div>Time: {timeLimit}</div>
            <div>GameBoard: {JSON.stringify(boardSettings)}</div>
            <div>Players: {JSON.stringify(playerList)}</div>
        </div>
    );
}