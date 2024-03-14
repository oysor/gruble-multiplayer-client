import React, { FunctionComponent, useEffect } from 'react'
import { PlayerState } from '../../store'
import { InputBoard } from './InputBoard'
import { sendBoard, setNextPage } from '../../reducer'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { CountDown } from '../../../common/components/Timer'
import { SendMessage } from '../../components/SendMessage'
import { Box_l, Stack_l } from '../../../common/everyLayout'

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
          <Stack_l space="0.3rem">
            <div className="text-base">Rules:</div>
            <Stack_l space="0.5rem" className="text-sm">
              <div>
                Ok, you will receive a board to fill out with words within the timit.
              </div>
              <div>
                Each word must be within their category and start with the correct letter.
              </div>
              <div>
                You will get an extra point if you write down a word that no one else
                wrote down.
              </div>
              <div>You will figure it out.</div>
            </Stack_l>
          </Stack_l>
          <br />
          <Box_l padding="1rem" className="text-center mb-[2rem]">
            &#x231B;&#x2620; Time limit is set to {timeLimit} seconds &#x2620;&#x231B;
          </Box_l>
          <SendMessage roomId={roomId} />
        </Box_l>
      )}
    </div>
  )
}
