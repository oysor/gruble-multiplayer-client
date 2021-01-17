import React, { FunctionComponent } from 'react'

type ShowPlayerInputProps = {
    name: string;
    roomId: string;
}

export const ShowPlayerInput: FunctionComponent <ShowPlayerInputProps> = ( { name, roomId }) => {

    return (
        <div className="show-player-input">
            Player name: {name}
            <br />
            Room Id: {roomId}
        </div>
    );
}