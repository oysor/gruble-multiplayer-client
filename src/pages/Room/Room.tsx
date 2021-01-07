import React, { FunctionComponent } from 'react'
// import { useSelector } from 'react-redux'
// import { RootState } from '../../store'
// import { ConnectionMode } from '../../common/constants/status'
import { RoomName } from './pages/RoomName'

// import { Provider } from 'react-redux'
import { Provider } from 'react-redux'
import store from './roomStore'



export const Room: FunctionComponent = () => {

    // How to get state values
    // const { status } = useSelector((state: RootState) => state.room)

    // const connection = () => {
    //     switch (status) {

    //     case ConnectionMode.Failed:
    //         return status

    //     case ConnectionMode.Connecting:
    //         return status

    //     case ConnectionMode.Connected:
    //         return <RoomName/>
    //     }
    // }
    // return  (
    //         <div className="room-page"> 
    //             <h2>GameRoom</h2>
    //             {connection()}
    //         </div>
    //         );
    return  (
        
        <Provider store={store}>
            <div className="room-page"> 
                <h2>GameRoom</h2>
                <RoomName/>
            </div>
        </Provider>

        );

}
