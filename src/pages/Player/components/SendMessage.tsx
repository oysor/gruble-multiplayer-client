import React, { FunctionComponent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { SmartInput, SubmitButton } from '../../../common/components'
import { toServer } from '../playerReducer'

interface SendMessageProps {
  roomId: string
}

export const SendMessage: FunctionComponent<SendMessageProps> = ({ roomId }) => {
  const [msg, setMessage] = useState('')
  const dispatch = useDispatch()

  const validInput = msg.length !== 0

  const dispatchOnClick = () => {
    if (validInput) {
      dispatch({
        type: toServer.SendMessage,
        payload: { roomId: roomId, message: msg },
      })
      setMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      dispatchOnClick()
      e.preventDefault()
    }
  }

  return (
    <div className="send-message">
      <form>
        <SmartInput
          onChange={setMessage}
          onKeyPress={handleKeyPress}
          placeholder={'message'}
          value={msg}
          disabled={roomId === ''}
        />
        <SubmitButton onClick={dispatchOnClick} value={'Send'} disabled={roomId === ''} />
      </form>
    </div>
  )
}
