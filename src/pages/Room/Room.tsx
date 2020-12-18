import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { ConnectionMode } from '../../common/constants/status'
import { NameInput } from './components'

export const Room: FunctionComponent = () => {

    // How to get state values
    const { status } = useSelector((state: RootState) => state.room)

    const connection = () => {
        switch (status) {

        case ConnectionMode.Failed:
            return status

        case ConnectionMode.Connecting:
            return status

        case ConnectionMode.Connected:
            return <NameInput/>
        }
    }

    return  (
            <div className="room-page"> 
                <h2>GameRoom</h2>
                {connection()}
            </div>
            );
}

export default Room;
