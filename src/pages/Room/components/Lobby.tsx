import React, {FunctionComponent} from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store';


type LobbyProps  = {
    name: string
    time: number
    roomId: string
}

export const Lobby: FunctionComponent <LobbyProps>= ( props ) => {

    const {name, time, roomId} = props;

    const { groupMessages } = useSelector((state: RootState) => state.room)

    return (    
        <div className="room-lobby"> 
            <div>Room:{name}</div>
            <div>Time:{time}</div>
            <div>Id:{roomId}</div>
            <div>Message:{groupMessages}</div>
            {/* {groupMessages.map(message => message)} */}
        </div>
    );

}

export default Lobby;