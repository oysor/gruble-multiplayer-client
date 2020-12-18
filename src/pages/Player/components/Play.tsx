import React, { FunctionComponent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../store'
import { playerToServer } from '../playerSlice';


export const Play: FunctionComponent = () => {


    // Set name
    const [msg, setMessage] = useState('');

    const { name } = useSelector((state: RootState) => state.player)
    const { message } = useSelector((state: RootState) => state.player)
    const { roomId } = useSelector((state: RootState) => state.player)
    const dispatch = useDispatch()


    return ( 
        <div className="play">
            <form>
                <input 
                    type="text" 
                    name="message" 
                    placeholder="message..." 
                    onChange={
                        (ev: React.ChangeEvent<HTMLInputElement>,): void => setMessage(ev.target.value)
                    }
                />
            </form>
            <div>
                <button onClick={
                        () => {dispatch({
                                type: playerToServer.SendMessage, 
                                payload: {user:name, msg:msg, roomId:roomId}
                                
                            })
                        }}
                >
                    Send message
                </button>
            </div>
            <div>
                Player name: {name}
            </div>
            <div> 
                Room Id: {roomId}
            </div>

            <div>
                Message: {message}
            </div>
        </div>

    )
}


export default Play;
