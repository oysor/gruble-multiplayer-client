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
    setPlayerName: (state, action) => {
      state.name = action.payload
    },
    receiveMessagePlayer: (state, action) => {
      state.message = action.payload
    },
    setRoomId: (state, action) => {
      state.roomId = action.payload
    }
  },
})

// communication to server
export enum playerToServer {
  SendMessage = 'SendMessage',
  JoinRoom = 'JoinRoom'
}

export const {
  setPlayerName,
  receiveMessagePlayer,
  setRoomId
} = playerSlice.actions

export default playerSlice.reducer


