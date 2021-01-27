import React, {FunctionComponent} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../../../../common/components';
import { RootState } from '../../roomStore';
import { toServer } from '../../roomReducer';
import { ShowRoomInput } from '../../components';

export const Lobby: FunctionComponent = ( ) => {

    const { roomId } = useSelector((state: RootState) => state.room);
    const dispatch = useDispatch();
    
    return (    
        <div className="room-lobby"> 
            <ShowRoomInput/>
            <Button
                onClick={()=>{
                    dispatch({ type:toServer.StartGame, payload: roomId })
                }}
            >
                Start Game
            </Button>
        </div>
    );
}