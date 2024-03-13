import React, { FunctionComponent, useEffect } from 'react'
import { PlayerState } from '../../store'
import { InputBoard } from './InputBoard'
import { sendBoard, setNextPage } from '../../reducer'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { CountDown } from '../../../common/components/Timer'
import { SendMessage } from '../../components/SendMessage'
import { Box_l } from '../../../common/everyLayout'

export const Play: FunctionComponent = () => {
  const { roomId, boardSettings, playerBoard, timesUp, commonStates, timeLimit } =
    useAppSelector((state: PlayerState) => state.player)
  const dispatch = useAppDispatch()
  /**
   *  Go to next component when time is up
   */
  useEffect(() => {
    if (timesUp === true) {
      dispatch(sendBoard({ roomId: roomId, board: playerBoard }))
      dispatch(setNextPage())
    }
  }, [timesUp, dispatch, roomId, playerBoard])

  const gameIsOn =
    commonStates.elapsedTime < timeLimit && commonStates.elapsedTime !== -99

  return (
    <div className="play">
      {gameIsOn ? (
        <div>
          <CountDown timeLeft={commonStates.elapsedTime} timeLimit={timeLimit} />
          <InputBoard board={playerBoard} boardSettings={boardSettings} />
        </div>
      ) : (
        <Box_l>
          <div className="explain-box">
            <div className="rules">
              <b>Rules:</b> <br />
              In the time allotted, each player must attempt to think of and write down,
              in the first column on the board, a word or term that fits each of the{' '}
              {boardSettings.categories.length} categories and starts with the rolled
              letter. Any number of words in the answer is allowed, as long as the first
              word starts with the correct letter.
            </div>
            <br />
            <div className="timelimit">
              &#x231B;&#x2620; Time limit is set to {timeLimit} seconds &#x2620;&#x231B;
            </div>
          </div>
          <SendMessage roomId={roomId} />
        </Box_l>
      )}
    </div>
  )
}
