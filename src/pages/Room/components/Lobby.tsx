import React, {FunctionComponent, useState } from 'react'


type LobbyProps  = {
    name: string
    time: number
}

export const Lobby: FunctionComponent <LobbyProps>= ( props ) => {

    const {name, time} = props;
    // Next component
    const [next, setNext] = useState(true);

    return next ? 
        <div className="room-lobby"> 
           <h3>{name}</h3>
           {time}
            
        </div>
        : 
        <div>Next component with props: </div>;
}

export default Lobby;