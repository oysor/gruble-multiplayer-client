
import React, { FunctionComponent } from 'react'

type ShowRoomInputProps = {
    name: string;
    time: number;
    categories: string[];
}

export const ShowRoomInput: FunctionComponent <ShowRoomInputProps> = ( { name, time , categories}) => {

    return (
        <div className="show-room-input">
            Name: {name}
            <br />
            Time: {time}
            <br />
            Categories: {JSON.stringify(categories)}
        </div>
    );
}