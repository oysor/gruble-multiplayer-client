import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { ConnectionMode } from '../../common/constants/status'


export const Player: FunctionComponent = () => {

    const { status } = useSelector((state: RootState) => state.room)

    const connection = () => {
        switch (status) {
        case ConnectionMode.Connecting:
            return status

        case ConnectionMode.Connected:
            return <h2>PlayerRoom</h2>
        }
    }


    return  (
            <div className="player-page"> 
                {connection()}
            </div>
            );
}

export default Player;