import  React, { FunctionComponent, useState } from "react";
import { useDispatch } from "react-redux";
import { SmartInput, SubmitButton } from "../../../common/components";
import { toServer } from "../playerReducer";

interface SendMessageProps {
    roomId: string;
}

export const SendMessage: FunctionComponent <SendMessageProps> = ( {roomId} ) => {

    const [msg, setMessage] = useState('');
    const dispatch = useDispatch();

    return (
        <div className="send-message">
            <form>
                <SmartInput onChange={setMessage} placeholder={"message"} />
                <SubmitButton
                    onClick={
                        () => {
                            dispatch({
                                type: toServer.SendMessage,
                                payload: { roomId: roomId, message: msg }
                            })
                        }}
                    value={"Send"}
                />
            </form>
        </div>
    );
}