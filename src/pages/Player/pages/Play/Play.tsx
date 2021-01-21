import React, { FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../playerStore'
import { toServer } from '../../playerReducer'
import { SmartInput, SubmitButton } from '../../../../common/components/'
import { ShowPlayerInput } from './components/ShowPlayerInput'

export const Play: FunctionComponent = () => {

    // Set name
    const [msg, setMessage] = useState('');

    const { name, roomId } = useSelector((state: RootState) => state.player);
    const dispatch = useDispatch();

    return (
        <div className="play">
            <form>
                <SmartInput onChange={setMessage} placeholder={"message"} />
                <SubmitButton
                    onClick={
                        () => {
                            dispatch({
                                type: toServer.SendMessage,
                                payload: { user: name, msg: msg, roomId: roomId }

                            })
                        }}
                    value={"Send"}
                />
            </form>
            <ShowPlayerInput name={name} roomId={roomId} />
        </div>
    );
}