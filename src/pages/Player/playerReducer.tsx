import { createSlice } from '@reduxjs/toolkit'
import { ConnectionMode } from '../../common/constants/status'

export interface playerState {
  name: string;
  roomId: string;
  status: ConnectionMode;
  message: string;
}

const initialState: playerState = {
  name: '',
  roomId: '',
  status: ConnectionMode.Connecting,
  message: '',
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  // Create methods here to update the store. 
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload
    },
    setPlayerName: (state, action) => {
      state.name = action.payload
    },
    // Room which the player has joined.
    setRoomId: (state, action) => {
      state.roomId = action.payload
    },
    newMessage: (state, action) => {
      state.message = action.payload
    },
  },
})

// send to server
export enum toServer {
  SendMessage = 'SendMessage',
  JoinRoom = 'JoinRoom'
}
// receive from server
export enum fromServer {
  receiveMessage = 'ReceiveMessage',
  onPlayerJoined = "onPlayerJoined"
}

export const {
  setStatus,
  setPlayerName,
  setRoomId,
  newMessage
} = playerSlice.actions

export default playerSlice.reducer


