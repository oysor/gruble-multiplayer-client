import { createSlice } from '@reduxjs/toolkit'
import { CommonStates, initialCommonStates } from '../../common/constants/'

export interface playerState {
  name: string;
  messages: Array<string>;
  roomId: string;
  commonStates: CommonStates;
  boardSettings: {
    categories: string[],
    letters: string[]
  }
  playerBoard: string[][];
  sendBoard: boolean;
}

const initialState: playerState = {
  name: '',
  messages: [],
  roomId: '',
  commonStates: initialCommonStates,
  boardSettings: { categories: [""], letters: [''] },
  playerBoard: [['']],
  sendBoard: false,
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
      // console.log("REDUCER",action.payload)

      state.boardSettings = action.payload.boardSettings
      const x = action.payload.boardSettings.letters.length
      const y = action.payload.boardSettings.categories.length

      const arr = [...Array(x)].map(() => [...Array(y)].map(() => ''))

      state.playerBoard  = arr;
    },
    updateBoard: (state, action) => {
      state.playerBoard = action.payload
    },
    sendBoard: (state ) => {
      state.sendBoard = true
    },
    CollectBoard: (state) => {
      state.sendBoard = false
    },
    resetState: () => initialState
  },
})

// send to server
export enum toServer {
  SendMessage = 'SendMessage',
  JoinRoom = 'JoinRoom',
  CollectBoard = 'CollectBoard'
}
// receive from server
export enum fromServer {
  receiveMessage = 'ReceiveMessage',
  onTimerElapsed = "onTimerCount",
  onJoinRoom = "onJoinRoom",
  onTimerFinished = "onTimerFinished",
}

export const {
  setStatus,
  setPlayerName,
  setRoomId,
  setTimeElapsed,
  newMessage,
  setBoard,
  updateBoard,
  resetState,
  sendBoard,
} = playerSlice.actions

export default playerSlice.reducer


