import React, {FunctionComponent} from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../roomStore';




export const Lobby: FunctionComponent = ( ) => {


    const { timeLimit, maxUsers,roomId, lobbyName } = useSelector((state: RootState) => state.room)
    const { messages } = useSelector((state: RootState) => state.room)

    return (    
        <div className="room-lobby"> 
            <div>LobbyName:{lobbyName}</div>
            <div>TimeLimit:{timeLimit}</div>
            <div>roomId:{roomId}</div>
            <div>MaxUsers:{maxUsers}</div>
            <div>Message:{messages}</div>
            {/* {groupMessages.map(message => message)} */}
        </div>
    );

}