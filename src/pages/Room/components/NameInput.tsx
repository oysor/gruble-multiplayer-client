import React, {FunctionComponent, useState } from 'react'
import TimeInput from './TimeInput'


export const NameInput: FunctionComponent = () => {
    
    // Set room name
    const [name, setName] = useState('');
    // Next component
    const [next, setNext] = useState(true);

    return next ? 
        <div className="room-name"> 
            <form>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="name" 
                    onChange={
                        (ev: React.ChangeEvent<HTMLInputElement>,): void => setName(ev.target.value)
                    }
                />
                <input type="submit" value="Submit"  onClick={() => setNext(false)} />
            </form> 
        </div>
        : 
        <TimeInput name={name}/>;
}

export default NameInput;
