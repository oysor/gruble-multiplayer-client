import React, { FunctionComponent, useEffect } from 'react';
import { NameInput } from './components/NameInput';
import { useHistory } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './playerStore'
import { startPlayerConnection, stopPlayerConnection } from '../Player/playerStore'

export const Player: FunctionComponent = () => {

    // Start connection
    useEffect(() => {
        startPlayerConnection()
    })

    const history = useHistory();
    // End connection when going back (browser back button)
    useEffect(() => {
        return history.listen(location => {
            if (history.action === 'POP' && location.pathname === '/') {
                stopPlayerConnection()
            }
        })
    })

    return (
        <Provider store={store}>
            <div className="player-page">
                <h2>PlayerRoom</h2>
                <NameInput />
            </div>
        </Provider>
    );
}

export default Player;