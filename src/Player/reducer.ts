import { createSlice } from '@reduxjs/toolkit'
import {
  Board,
  BoardSettings,
  CommonStates,
  IncomingMessage,
  IncomingPlayer,
  initialCommonStates,
  MessageItem,
  Player,
  PlayerStatus,
  WordInfoDict,
} from '../common/constants'
import { mapPlayerFromAPI } from '../common/mapping'
import { createEmptyBoard } from '../common/utilities'

export interface playerState {
  playerStatus: number
  playerName: string
  roomId: string
  roomName: string
  messages: MessageItem[]
  serverMessage: string
  commonStates: CommonStates
  boardSettings: BoardSettings
  playerBoard: Board
  timesUp: boolean
  playerList: Player[]
  currentPage: number
  timeLimit: number
  boardDictionary: WordInfoDict[][]
  gameClosed: boolean
  userId: string
}

const initialState: playerState = {
  playerStatus: 0,
  playerName: '',
  roomId: '',
  roomName: 'unknown',
  messages: [],
  serverMessage: '',
  commonStates: initialCommonStates,
  boardSettings: { categories: [''], letters: [''] },
  playerBoard: [['']],
  timesUp: false,
  playerList: [],
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
    updateConnectionStatus: (state, action) => {
      state.commonStates.status = action.payload
    },
    updatePlayerStatus: (state, action) => {
      state.playerStatus = action.payload
    },
    setNextPage: (state) => {
      state.currentPage += 1
    },
    addMessage: (state, action: { payload: IncomingMessage }) => {
      const { id, message } = action.payload
      const messageSender = state.playerList.find((p) => {
        return p.userId === id
      })

      state.messages = [
        { color: messageSender?.color, name: messageSender?.name, message: message },
        ...state.messages,
      ]
    },
    serverMessage: (state, action: { payload: { message: string } }) => {
      const { message } = action.payload
      state.serverMessage = message
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    joinRoom: (state, action) => {
      const { playerName } = action.payload
      state.playerName = playerName
    },
    joinedRoom: (state, action) => {
      const { room, userId } = action.payload
      const { roomName, signalRGroupName, timeLimit, boardSettings, players } = room
      state.roomName = roomName;
      state.userId = userId;
      state.roomId = signalRGroupName
      state.timeLimit = timeLimit
      state.boardSettings = boardSettings
      state.playerList = players.map(
        (player: IncomingPlayer): Player => mapPlayerFromAPI(player)
      )

      if (boardSettings?.categories !== undefined) {
        state.playerBoard = createEmptyBoard(boardSettings)
      }

      state.playerStatus = PlayerStatus.receivedRoom
    },
    roomUpdated: (state, action) => {
      const { timeLimit, boardSettings } = action.payload
      state.timeLimit = timeLimit
      state.boardSettings = boardSettings

      if (boardSettings?.categories !== undefined) {
        state.playerBoard = createEmptyBoard(boardSettings)
      }
    },
    updatePlayerBoard: (state, action) => {
      state.playerBoard = action.payload
    },
    updateTimer: (state, action) => {
      state.commonStates.elapsedTime = action.payload
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sendBoard: (state) => {
      state.playerStatus = PlayerStatus.boardSent
    },
    receivedResults: (state, action) => {
      const { newPlayerList, boardDictionary } = action.payload

      state.playerList = newPlayerList
      state.boardDictionary = boardDictionary
      state.playerStatus = PlayerStatus.receivedResult
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
    gameClosed: (state) => {
      state.gameClosed = true
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sendMessage: (state, action) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateConnection: (state) => {},
    resetState: () => initialState,
  },
})
// import the actions where you want to dispatch them.
export const {
  // updatePlayerName,
  updateConnectionStatus,
  updateTimer,
  addMessage,
  joinRoom,
  roomUpdated,
  sendMessage,
  joinedRoom,
  updatePlayerBoard,
  resetState,
  sendBoard,
  setNextPage,
  receivedResults,
  addPlayer,
  removePlayer,
  serverMessage,
  gameClosed,
  updateConnection,
  updatePlayerStatus,
} = playerSlice.actions

export default playerSlice.reducer
