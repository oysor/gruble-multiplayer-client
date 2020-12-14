import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { LoadingMode } from '../../constants/status'


export const Game: FunctionComponent = () => {

    const { message } = useSelector((state: RootState) => state.room)
    const { status } = useSelector((state: RootState) => state.room)

    const mode = (): string => {
        switch (status) {
            case LoadingMode.Loading:
                return status

            case LoadingMode.Loaded:
                return message
            }
        }

    return <div className="center-screen"> {mode()} </div>
}

export default Game;