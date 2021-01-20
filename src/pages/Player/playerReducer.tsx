import { createSlice } from '@reduxjs/toolkit'
import { CommonStates, initialCommonStates } from '../../common/constants/'

export interface playerState {
  name: string;
  score: number;
  message: string;
  roomId: string;
  commonStates: CommonStates;
}

const initialState: playerState = {
  name: '',
  score: 0,
  message: '',
  roomId: '',
  commonStates: initialCommonStates
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    newMessage: (state, action) => {
      state.message = action.payload
    },
    setStatus: (state, action) => {
      state.commonStates.status = action.payload
    },
    setPlayerName: (state, action) => {
      state.name = action.payload
    },
    setRoomId: (state, action) => {
      state.roomId = action.payload
    }
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
  setPlayerName,
  setRoomId,
  setStatus,
  newMessage
} = playerSlice.actions

export default playerSlice.reducer


