import { createSlice } from '@reduxjs/toolkit'
import {
  Board,
  BoardSettings,
  CommonStates,
  initialCommonStates,
  Message,
  Player,
} from '../../common/constants/'

export interface playerState {
  playerName: string
  messages: Array<string>
  roomId: string
  commonStates: CommonStates
  boardSettings: BoardSettings
  playerBoard: Board
  timesUp: boolean
  playerList: Player[]
  receivedResult: boolean
  currentPage: number
  timeLimit: number
  playerMessages: Message[]
}

const initialState: playerState = {
  playerName: '',
  messages: [],
  roomId: '',
  commonStates: initialCommonStates,
  boardSettings: { categories: [''], letters: [''] },
  playerBoard: [['']],
  timesUp: false,
  playerList: [],
  receivedResult: false,
  currentPage: 1,
  timeLimit: 0,
  playerMessages: [],
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
      state.playerName = action.payload
    },
    // Room which the player has joined.
    setRoomId: (state, action) => {
      state.roomId = action.payload
    },
    setTimeElapsed: (state, action) => {
      state.commonStates.elapsedTime = action.payload
    },
    newMessage: (state, action) => {
      const { id, message } = action.payload
      const messageSender = state.playerList.find((p) => {
        return p.userId === id
      })
      messageSender
        ? (state.playerMessages = [
            { player: messageSender, message: message },
            ...state.playerMessages,
          ])
        : (state.messages = [message, ...state.messages])
    },
    setBoard: (state, action) => {
      state.boardSettings = action.payload.boardSettings
      state.roomId = action.payload.roomId
      state.timeLimit = action.payload.timeLimit
      state.commonStates.elapsedTime = action.payload.timeLimit
      const x = action.payload.boardSettings.letters.length
      const y = action.payload.boardSettings.categories.length

      state.playerBoard = [...Array(x)].map(() => [...Array(y)].map(() => ''))
    },
    updateBoard: (state, action) => {
      state.playerBoard = action.payload
    },
    timesUp: (state) => {
      state.commonStates.elapsedTime = 0
      state.timesUp = true
    },
    sendBoard: (state) => {
      // Board is already sent to server by middleware.
      state.timesUp = false
    },
    receiveResults: (state, action) => {
      // PlayerList with results is already sent to server by middleware.
      state.playerList = action.payload
      state.receivedResult = true
    },
    setNextPage: (state) => {
      state.currentPage += 1
    },
    resetState: () => initialState,
  },
})

// send to server
export enum toServer {
  SendMessage = 'SendMessage',
  JoinRoom = 'JoinRoom',
  SendBoard = 'CollectBoard',
}
// receive from server
export enum fromServer {
  receiveMessage = 'ReceiveMessage',
  onTimerElapsed = 'onTimerCount',
  onJoinRoom = 'onJoinRoom',
  onTimesUp = 'onTimerFinished',
  receiveResults = 'ReceiveResults',
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
  timesUp,
  sendBoard,
  setNextPage,
  receiveResults,
} = playerSlice.actions

export default playerSlice.reducer
