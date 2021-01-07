import { createSlice } from '@reduxjs/toolkit'
import { ConnectionMode } from '../../common/constants/status'

export interface playerState {
  name: string;
  status : ConnectionMode
  score: number
  message: string;
  roomId: string
}

const initialState: playerState = {
  name: '',
  status: ConnectionMode.Connecting,
  score: 0,
  message: '',
  roomId: ''
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    newMessage: (state, action) => {
      state.message = action.payload
    },
    setStatus: (state, action) => {
      state.status = action.payload
    },
    setPlayerName: (state, action) => {
      state.name = action.payload
    },
    setRoomId: (state, action) => {
      state.roomId = action.payload
    }
  },
})

// communication to server
export enum toServer {
  SendMessage = 'SendMessage',
  JoinRoom = 'JoinRoom'
}

export enum fromServer {
  receiveMessage = 'ReceiveMessage',
  onPlayerJoined = "onPlayerJoined"
}

export const {
  setPlayerName,
  setRoomId,
  setStatus,
  newMessage
} = playerSlice.actions

export default playerSlice.reducer


