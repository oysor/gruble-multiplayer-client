import React, { FunctionComponent, useEffect } from 'react'
import { RoomLayout } from './RoomLayout'
import { Provider } from 'react-redux'
import store from './roomStore'
import { startRoomConnection, stopRoomConnection } from '../Room/roomStore'
import { useHistory } from 'react-router-dom'

export const Room: FunctionComponent = () => {

    // Start connection
    useEffect(() => {
        startRoomConnection()
    });

    // End connection when going back (browser back button)
    const history = useHistory();
    useEffect(() => {
        return history.listen(location => {
            if (history.action === 'POP' && location.pathname === '/') {
                // reset store
                store.dispatch({ type: "room/reset", payload: "reset" })
                // stop singnalR
                stopRoomConnection()
            }
        })
    });

    return (
        <Provider store={store}>
            <div className="room-page">
                <RoomLayout />
            </div>
        </Provider>
    );
}