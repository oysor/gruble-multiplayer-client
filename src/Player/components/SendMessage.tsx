import React, { FunctionComponent, useState } from 'react'
import { SmartInput, SubmitButton } from '../../common/components'
import { sendMessage } from '../reducer'
import { useAppDispatch } from '../hooks'

interface SendMessageProps {
  roomId: string
}

export const SendMessage: FunctionComponent<SendMessageProps> = ({ roomId }) => {
  const [msg, setMessage] = useState('')
  const dispatch = useAppDispatch()

  const validInput = msg.length !== 0

  const dispatchOnClick = () => {
    console.log('kekeKEKEK')
    if (validInput) {
      dispatch(sendMessage({ roomId: roomId, message: msg }))
      setMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      dispatchOnClick()
      e.preventDefault()
    }
  }

  const disable: boolean = roomId === ''

  return !disable ? (
    <div className="send-message">
      <form>
        <SmartInput
          onChange={setMessage}
          onKeyPress={handleKeyPress}
          placeholder={'message'}
          value={msg}
          disabled={disable}
        />
        <SubmitButton
          onClick={() => dispatchOnClick()}
          value={'Send'}
          disabled={disable}
        />
      </form>
    </div>
  ) : null
}
