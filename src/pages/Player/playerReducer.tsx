import { createSlice } from '@reduxjs/toolkit'
import { CommonStates, initialCommonStates } from '../../common/constants/'

export interface playerState {
  name: string;
  messages: Array<string>;
  roomId: string;
  commonStates: CommonStates;
  gameBoard: {
    categories: string[],
    letters: string[]
  }
}

const initialState: playerState = {
  name: '',
  messages: [],
  roomId: '',
  commonStates: initialCommonStates,
  gameBoard: { categories: [""], letters: [''] }
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  // Create methods here to update the store. 
  reducers: {
    setStatus: (state, action) => {
      state.commonStates.status = action.payload
    },
    setPlayerName: (state, action) => {
      state.name = action.payload
    },
    // Room which the player has joined.
    setRoomId: (state, action) => {
      state.roomId = action.payload
    },
    setTimeElapsed: (state, action) => {
      state.commonStates.elapsedTime = action.payload
    },
    newMessage: (state, action) => {
      state.messages = [...state.messages, action.payload]
    },
    setBoard: (state, action) => {
      state.gameBoard = action.payload
    },
    reset: () => initialState
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
  onTimerElapsed = "onTimerCount",
  onJoinRoom = "onJoinRoom"
}

export const {
  setStatus,
  setPlayerName,
  setRoomId,
  setTimeElapsed,
  newMessage,
  setBoard
} = playerSlice.actions

export default playerSlice.reducer


