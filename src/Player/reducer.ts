import { createSlice } from '@reduxjs/toolkit'
import {
  Board,
  BoardSettings,
  CommonStates,
  IncomingMessage,
  IncomingPlayer,
  initialCommonStates,
  Message,
  MessageItem,
  Player,
  WordInfoDict,
} from '../common/constants'
import { mapPlayerFromAPI } from '../common/mapping'

export interface playerState {
  playerName: string
  roomId: string
  messages: MessageItem[]
  serverMessage: string
  commonStates: CommonStates
  boardSettings: BoardSettings
  playerBoard: Board
  timesUp: boolean
  playerList: Player[]
  receivedResult: boolean
  currentPage: number
  timeLimit: number
  boardDictionary: WordInfoDict[][]
  gameClosed: boolean
  userId: string
}

const initialState: playerState = {
  playerName: '',
  roomId: '',
  messages: [],
  serverMessage: '',
  commonStates: initialCommonStates,
  boardSettings: { categories: [''], letters: [''] },
  playerBoard: [['']],
  timesUp: false,
  playerList: [],
  receivedResult: false,
  currentPage: 1,
  timeLimit: 0,
  boardDictionary: [[]],
  gameClosed: false,
  userId: '',
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
      const { playerName } = action.payload
      state.playerName = playerName
    },
    setUserId: (state, action) => {
      state.userId = action.payload
    },
    setNextPage: (state) => {
      state.currentPage += 1
    },
    newMessage: (state, action: { payload: IncomingMessage }) => {
      const { id, message } = action.payload
      const messageSender = state.playerList.find((p) => {
        return p.userId === id
      })

      state.messages = [
        { color: messageSender?.color, name: messageSender?.name, message: message },
        ...state.messages,
      ]
    },
    newServerMessage: (state, action: { payload: { message: string } }) => {
      const { message } = action.payload
      state.serverMessage = message
    },
    addGameRoom: (state, action) => {
      const { signalRGroupName, timeLimit, boardSettings, players } = action.payload
      state.boardSettings = boardSettings
      state.roomId = signalRGroupName
      state.timeLimit = timeLimit
      state.playerList = players.map(
        (player: IncomingPlayer): Player => mapPlayerFromAPI(player)
      )

      const x = boardSettings.letters.length
      const y = boardSettings.categories.length

      state.playerBoard = [...Array(x)].map(() => [...Array(y)].map(() => ''))
    },
    gameClosed: (state) => {
      state.gameClosed = true
    },
    updateBoard: (state, action) => {
      state.playerBoard = action.payload
    },
    setRoundIsOn: (state) => {
      state.commonStates.roundIsOn = true
    },
    setTimeElapsed: (state, action) => {
      state.commonStates.elapsedTime = action.payload
    },
    timesUp: (state) => {
      state.timesUp = true
      state.commonStates.roundIsOn = false
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sendBoard: (state, action) => {
      state.timesUp = false
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sendMessage: (state, action) => {
      return state
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    joinRoom: (state, action) => {},
    receiveResults: (state, action) => {
      const { newPlayerList, boardDictionary } = action.payload

      state.playerList = newPlayerList
      state.boardDictionary = boardDictionary
      state.receivedResult = true
    },
    addPlayer: (state, action: { payload: IncomingPlayer }) => {
      const { payload } = action
      const newPlayer: Player = mapPlayerFromAPI(payload)
      
      // add only if player does not exist.
      if (!state.playerList.some((player) => player.name === newPlayer.name)) {
        return { ...state, playerList: [...state.playerList, newPlayer] }
      }
    },
    removePlayer: (state, action) => {
      const { userId } = action.payload
      state.playerList = [...state.playerList].filter((player) => {
        return player.userId !== userId
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateConnection: (state) => {},
    resetState: () => initialState,
  },
})

// import the actions where you want to dispatch them.
export const {
  setPlayerName,
  setUserId,
  setStatus,
  setTimeElapsed,
  newMessage,
  joinRoom,
  sendMessage,
  addGameRoom,
  updateBoard,
  resetState,
  setRoundIsOn,
  timesUp,
  sendBoard,
  setNextPage,
  receiveResults,
  addPlayer,
  removePlayer,
  newServerMessage,
  gameClosed,
  updateConnection
} = playerSlice.actions

export default playerSlice.reducer
