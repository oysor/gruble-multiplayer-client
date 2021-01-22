import React, { FunctionComponent, useState } from 'react'
import { Lobby } from '../Lobby'
import { useDispatch } from 'react-redux'
import { toServer } from '../../roomReducer'
import { Button } from '../../../../common/components/'

import { ShowRoomInput } from './components/ShowRoomInput'
import { InputCategories } from './components/InputCategories'

type CreateRoomProps = {
    name: string;
    time: number;
}

export const CreateRoom: FunctionComponent<CreateRoomProps> = (props) => {

    const { name, time } = props;
    // Next component
    const [nextPage, setNext] = useState(true);

    // input categories
    const [categoryList, setCategoryList] = useState([""]);

    const dispatch = useDispatch();

    return nextPage ?
        <div className="room-create">
            <InputCategories inputList={categoryList} setInputList={setCategoryList} />
            <ShowRoomInput name={name} time={time} categories={categoryList}/>
            <Button
                onClick={() => {
                    dispatch({ type: toServer.CreateRoom, payload: { LobbyName: name, TimeLimit: time, Categories: categoryList } })
                    setNext(false)
                }}
            >
                Create Room
            </Button>
        </div>
        :
        <Lobby />;
}