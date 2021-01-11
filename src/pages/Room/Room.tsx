import React, { FunctionComponent, useEffect } from 'react'
import { RoomName } from './pages/RoomName'
import { Provider } from 'react-redux'
import store from './roomStore'
import { startRoomConnection, stopRoomConnection } from '../Room/roomStore'
import { useHistory } from 'react-router-dom'

export const Room: FunctionComponent = () => {

    // Start connection
    useEffect(() => {
        startRoomConnection()
    })

    // End connection when going back (browser back button)
    const history = useHistory();
    useEffect(() => {
        return history.listen(location => {
            if (history.action === 'POP' && location.pathname === '/') {
                stopRoomConnection()
            }
        })
    })

    return (
        <Provider store={store}>
            <div className="room-page">
                <h2>GameRoom</h2>
                <RoomName />
            </div>
        </Provider>
    );
}