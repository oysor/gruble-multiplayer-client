import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'


export const Game = (): JSX.Element => {

    const { name } = useSelector((state: RootState) => state.room)

    return (
        <div>
            <div>
                {name}
            </div>
        </div>
    )
}

export default Game;