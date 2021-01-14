import React, { FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../playerStore'
import { toServer } from '../playerReducer'
import { SmartInput, SmartButton } from '../../../common/components/'

export const Play: FunctionComponent = () => {

    // Set name
    const [msg, setMessage] = useState('');

    const { name, message, roomId } = useSelector((state: RootState) => state.player)
    const dispatch = useDispatch()

    return (
        <div className="play">
            <form>
                <SmartInput onChange={setMessage} placeholder={"message"} />
                <SmartButton
                    onClick={
                        (): void  => {
                            dispatch({
                                type: toServer.SendMessage,
                                payload: { user: name, msg: msg, roomId: roomId }

                            })
                        }}
                >
                    Send
                </SmartButton>
            </form>
            <div>
                Player name: {name}
            </div>
            <div>
                Room id: {roomId}
            </div>
            <div>
                Message: {message}
            </div>
        </div>
    )
}

export default Play;