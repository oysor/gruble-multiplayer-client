import React, { FunctionComponent, useState } from 'react';
import { useDispatch } from 'react-redux'
import { setPlayerName } from '../playerReducer';
import JoinRoom from './JoinRoom'

export const NameInput: FunctionComponent = () => {


    // Set player name
    const [name, setName] = useState('');

    const dispatch = useDispatch()

    // Next component
    const [next, setNext] = useState(true);

    return next ? 
        <div className="join-room">
            <form>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="player name..." 
                    onChange={
                        (ev: React.ChangeEvent<HTMLInputElement>,): void => setName(ev.target.value)
                    }
                />
            </form>
            <div>
                <button onClick={
                        () => {
                            setNext(false)
                            dispatch(setPlayerName(name))
                        }}
                >
                    Set player name
                </button>
            </div>
        </div>
        :  <JoinRoom/>    
}


export default NameInput;