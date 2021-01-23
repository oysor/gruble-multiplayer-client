import React, { FunctionComponent } from 'react'

type ShowPlayerInputProps = {
    name: string;
    roomId: string;
    board: {
        categories: string[],
        letters: string[]
      }
}

export const ShowPlayerInput: FunctionComponent <ShowPlayerInputProps> = ( { name, roomId, board }) => {

    return (
        <div className="show-player-input">
            Player name: {name}
            <br />
            Room Id: {roomId}
            <br />
            {JSON.stringify(board)}
        </div>
    );
}