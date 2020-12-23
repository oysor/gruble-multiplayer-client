import React, {FunctionComponent, useState} from 'react'
// import Lobby from '../Lobby';
import { Lobby } from '../Lobby'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../../store'
import { roomToServer } from '../../roomSlice'

type CreateRoomProps  = {
    name: string
    time: number
}

export const CreateRoom: FunctionComponent <CreateRoomProps>= ( props ) => {

    const {name, time} = props;
    // Next component
    const [next, setNext] = useState(true);
    
    // const [tasks, setTasks] = useState([])
    const { roomId } = useSelector((state: RootState) => state.room)

    const dispatch = useDispatch()

    // TODO: input for categories
    // const categories = [
    //     "land",
    //     "yrke",
    //     "film",
    //     "mord",
    //     "dyr"
    // ]

    return next ? 
        <div className="room-create"> 
            <h3>{name}</h3>
            {time}
            <div className="Categories"></div>
            
            <div>
                <button onClick={() => {dispatch({type: roomToServer.CreateNewRoom})}}>
                    Generate Id
                </button>
            </div>
            <div>
                roomId:{roomId}
            </div>            
            <div>
                <button onClick={() => {setNext(false)}}>
                    Create Game
                </button>
            </div>
        </div>
        : 
        <Lobby name={name} time={time} roomId={roomId} />;
}




// const Category = (id:number) => {

//     // Set room name
//     const [name, setName] = useState('');

//     return( 
//     <form>
//         <input 
//             type="text" 
//             name="category" 
//             placeholder="category" 
//             onChange={
//                 (ev: React.ChangeEvent<HTMLInputElement>,): void => setName(ev.target.value)
//             }
//         />
//     </form> 
//     );

// }
