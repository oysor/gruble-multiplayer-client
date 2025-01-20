import { createSlice } from '@reduxjs/toolkit'
import {
  APIPlayer,
  Board,
  BoardSettings,
  CommonStates,
  GameStatus,
  IncomingGameRoom,
  IncomingMessage,
  IncomingPlayerRoom,
  IncomingResults,
  initialCommonStates,
  JoinRoom,
  MessageItem,
  Player,
  PlayerPage,
  SendMessage,
  WordInfoDict,
} from '../common/constants'
import { mapPlayerFromAPI } from '../common/mapping'
import { createEmptyBoard } from '../common/utilities'

export interface playerState {
  gameStatus: number
  playerName: string
  roomId: string
  roomName: string
  messages: MessageItem[]
  serverMessage: string[]
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
  gameStatus: 0,
  playerName: '',
  roomId: '',
  roomName: 'unknown',
  messages: [],
  serverMessage: [],
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
    serverMessage: (state, action: { payload: string }) => {
      const message = action.payload
      state.serverMessage = [...state.serverMessage, message]
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    joinRoom: (state, action: { payload: JoinRoom }) => {
      const { playerName } = action.payload
      state.playerName = playerName
    },
    joinedRoom: (state, action: { payload: IncomingPlayerRoom }) => {
      const { room, userId } = action.payload
      const { roomName, signalRGroupName, timeLimit, boardSettings, players } = room
      state.roomName = roomName
      state.userId = userId
      state.roomId = signalRGroupName
      state.timeLimit = timeLimit
      state.boardSettings = boardSettings
      state.playerList = players.map(
        (player: APIPlayer): Player => mapPlayerFromAPI(player)
      )

      state.gameStatus = GameStatus.GameCreated
    },
    roomUpdated: (state, action: { payload: IncomingGameRoom }) => {
      const { timeLimit, boardSettings } = action.payload
      state.timeLimit = timeLimit
      state.boardSettings = boardSettings
    },
    addPlayer: (state, action: { payload: APIPlayer }) => {
      const { payload } = action
      const newPlayer: Player = mapPlayerFromAPI(payload)

      // add only if player does not exist.
      if (!state.playerList.some((player) => player.name === newPlayer.name)) {
        return { ...state, playerList: [...state.playerList, newPlayer] }
      }
    },
    removePlayer: (state, action: { payload: string }) => {
      const userId = action.payload
      state.playerList = [...state.playerList].filter((player) => {
        return player.userId !== userId
      })
    },
    startRound: (state) => {
      state.playerBoard = createEmptyBoard(state.boardSettings)
      state.gameStatus = GameStatus.RoundStarted
      state.currentPage = PlayerPage.play
    },
    updateTimer: (state, action: { payload: number }) => {
      state.commonStates.elapsedTime = action.payload
    },
    updatePlayerBoard: (state, action: { payload: Board }) => {
      state.playerBoard = action.payload
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dispatchBoard: (state) => {
      state.gameStatus = GameStatus.RoundEnded
      state.currentPage = PlayerPage.results
    },
    receivedResults: (state, action: { payload: IncomingResults }) => {
      const { players, boardDictionary } = action.payload

      state.playerList = players.map((p) => mapPlayerFromAPI(p))
      state.boardDictionary = boardDictionary
      state.gameStatus = GameStatus.ResultsReceived
    },
    gameClosed: (state) => {
      state.gameClosed = true
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sendMessage: (state, action: { payload: SendMessage }) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateConnection: (state) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    checkRoom: (state, action: { payload: { roomId: string } }) => {},
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
  dispatchBoard,
  receivedResults,
  addPlayer,
  removePlayer,
  serverMessage,
  checkRoom,
  gameClosed,
  updateConnection,
  startRound,
} = playerSlice.actions

export default playerSlice.reducer
