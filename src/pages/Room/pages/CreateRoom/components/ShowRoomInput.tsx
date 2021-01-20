
import React, { FunctionComponent } from 'react'

type ShowRoomInputProps = {
    name: string;
    time: number;
}

export const ShowRoomInput: FunctionComponent <ShowRoomInputProps> = ( { name, time }) => {

    return (
        <div className="show-room-input">
            Name: {name}
            <br />
            Time: {time}
        </div>
    );
}