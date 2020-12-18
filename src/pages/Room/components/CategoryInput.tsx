import React, {FunctionComponent, useState} from 'react'
import Lobby from './Lobby';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../store'

type CategoryInputProps  = {
    name: string
    time: number
}

export const CategoryInput: FunctionComponent <CategoryInputProps>= ( props ) => {

    const {name, time} = props;
    // Next component
    const [next, setNext] = useState(true);
    
    // const [tasks, setTasks] = useState([])
    const { roomId } = useSelector((state: RootState) => state.room)

    const dispatch = useDispatch()

    const categories = [
        "land",
        "yrke",
        "film",
        "mord",
        "dyr"
    ]

    return next ? 
        <div className="room-create"> 
            <h3>{name}</h3>
            {time}
            <div className="Categories"></div>
            <div><button onClick={() => dispatch({type:'createNewRoom'})}>Create Game</button></div>
            <div>roomId:{roomId}</div>
        </div>
        : 
        <div>Next component</div>;
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


export default CategoryInput;
