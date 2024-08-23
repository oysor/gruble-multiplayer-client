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

export interface playerState {
  playerStatus: number
  playerName: string
  roomId: string
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
    setStatus: (state, action) => {
      state.commonStates.status = action.payload
    },
    setPlayerStatus: (state, action) => {
      state.playerStatus = action.payload
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
    setServerMessage: (state, action: { payload: { message: string } }) => {
      const { message } = action.payload
      state.serverMessage = message
    },
    // setRoom: (state, action: { payload: { signalRGroupName: string } }) => {
    //   state.roomId = action.payload.signalRGroupName;
    //   state.playerStatus = PlayerStatus.joinedGame;
    // },
    setRoomSettings: (state, action) => {
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

      state.playerStatus = PlayerStatus.receivedRoom;
    },
    setGameClosed: (state) => {
      state.gameClosed = true
    },
    updatePlayerBoard: (state, action) => {
      state.playerBoard = action.payload
    },
    setTimeElapsed: (state, action) => {
      state.commonStates.elapsedTime = action.payload
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sendBoard: (state) => {
      state.playerStatus = PlayerStatus.boardSent;
    },
    setResults: (state, action) => {
      const { newPlayerList, boardDictionary } = action.payload

      state.playerList = newPlayerList
      state.boardDictionary = boardDictionary
      state.playerStatus = PlayerStatus.receivedResult;
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
    sendMessage: (state, action) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    joinRoom: (state, action) => {},
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
  addMessage,
  joinRoom,
  sendMessage,
  setRoomSettings,
  updatePlayerBoard,
  resetState,
  sendBoard,
  setNextPage,
  setResults,
  addPlayer,
  removePlayer,
  setServerMessage,
  setGameClosed,
  updateConnection,
  setPlayerStatus
} = playerSlice.actions

export default playerSlice.reducer
