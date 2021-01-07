import React, { FunctionComponent } from 'react';
// import { useSelector } from 'react-redux'
// import { RootState } from '../../store'
// import { ConnectionMode } from '../../common/constants/status'
import { NameInput } from './components/NameInput';

import { Provider } from 'react-redux'
import store from './playerStore'

export const Player: FunctionComponent = () => {

    // const { status } = useSelector((state: RootState) => state.room)

    // const connection = () => {
    //     switch (status) {
    //     case ConnectionMode.Connecting:
    //         return status

    //     case ConnectionMode.Connected:
    //         return <NameInput/>
    //     }
    // }

    // return  (
    //         <div className="player-page"> 
    //             <h2>PlayerRoom</h2>
    //             {connection()}
    //         </div>
    //     );

    return  (
            <Provider store={store}>
                <div className="player-page"> 
                    <h2>PlayerRoom</h2>
                    <NameInput/>
                </div>
            </Provider>
            );
}

export default Player;


