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
  serverMessage: string
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
  serverMessage: '',
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  // Create methods here to update the store.
  reducers: {
    setStatus: (state, action) => {
      state.commonStates.status = action.payload
    },
    setNextPage: (state) => {
      state.currentPage += 1
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
    newServerMessage: (state, action) => {
      state.serverMessage = action.payload
    },
    setBoard: (state, action) => {
      state.playerName = action.payload.playerName
      state.boardSettings = action.payload.boardSettings
      state.roomId = action.payload.roomId
      state.timeLimit = action.payload.timeLimit
      state.commonStates.elapsedTime = action.payload.timeLimit
      state.playerList = action.payload.players
      const x = action.payload.boardSettings.letters.length
      const y = action.payload.boardSettings.categories.length

      state.playerBoard = [...Array(x)].map(() => [...Array(y)].map(() => ''))
    },
    updateBoard: (state, action) => {
      state.playerBoard = action.payload
    },
    setTimeElapsed: (state, action) => {
      state.commonStates.elapsedTime = action.payload
    },
    timesUp: (state) => {
      state.commonStates.elapsedTime = 0
      state.timesUp = true
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sendBoard: (state, action) => {
      state.timesUp = false
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sendMessage: (state, action) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    joinRoom: (state, action) => {},
    receiveResults: (state, action) => {
      // PlayerList with results is already sent to server by middleware.
      state.playerList = action.payload
      state.receivedResult = true
    },
    addPlayer: (state, action) => {
      state.playerList = [...state.playerList, action.payload]
    },
    removePlayer: (state, action) => {
      state.playerList = [...state.playerList].filter((player) => {
        return player.userId !== action.payload.userId
      })
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
  onPlayerJoined = 'onPlayerJoined',
  onPlayerLeft = 'onPlayerLeft',
}

export const {
  setStatus,
  setTimeElapsed,
  newMessage,
  joinRoom,
  sendMessage,
  setBoard,
  updateBoard,
  resetState,
  timesUp,
  sendBoard,
  setNextPage,
  receiveResults,
  addPlayer,
  removePlayer,
  newServerMessage,
} = playerSlice.actions

export default playerSlice.reducer
