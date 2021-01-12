import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux'
import { RootState } from '../playerStore'
// import { toServer } from '../playerReducer';

export const Play: FunctionComponent = () => {

    // Set name
    // const [msg, setMessage] = useState('');

    const { name, message, roomId } = useSelector((state: RootState) => state.player)
    // const dispatch = useDispatch()

    return (
        <div className="play">
            {/* <form>
                <input
                    type="text"
                    name="name"
                    placeholder="message..."
                    onChange={
                        (ev: React.ChangeEvent<HTMLInputElement>,): void => setMessage(ev.target.value)
                    }
                />
                <input
                    type="button"
                    value="Send"
                    onClick={
                        () => {
                            dispatch({
                                type: toServer.SendMessage,
                                payload: { user: name, msg: msg, roomId: roomId }

                            })
                        }}
                />
            </form> */}
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