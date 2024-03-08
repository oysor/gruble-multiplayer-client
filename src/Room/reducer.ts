import { createSlice } from '@reduxjs/toolkit'
import {
  BoardSettings,
  CommonStates,
  initialCommonStates,
  Message,
  Player,
  WordInfoDict,
} from '../common/constants'
import { createBoardDictionary } from './utilities/utilities'

export interface RoomState {
  roomName: string
  roomId: string
  messages: Array<string>
  timeLimit: number
  commonStates: CommonStates
  boardSettings: BoardSettings
  playerList: Player[]
  receivedBoards: boolean
  currentPage: number
  playerMessages: Message[]
  boardDictionary: WordInfoDict[][]
}

const initialState: RoomState = {
  roomName: '',
  roomId: '',
  messages: [],
  timeLimit: 0,
  commonStates: initialCommonStates,
  boardSettings: { categories: [''], letters: [''] },
  playerList: [],
  receivedBoards: false,
  currentPage: 1,
  playerMessages: [],
  boardDictionary: [[]],
}

const roomSlice = createSlice({
  name: 'room',
  initialState,
  // Create methods here to update the store.
  reducers: {
    setStatus: (state, action) => {
      state.commonStates.status = action.payload
    },
    setRoomName: (state, action) => {
      state.roomName = action.payload
    },
    setTimeLimit: (state, action) => {
      state.timeLimit = action.payload
    },
    setRoom: (state, action) => {
      state.roomId = action.payload.roomId
      state.roomName = action.payload.roomName
      state.timeLimit = action.payload.timeLimit
      state.boardSettings = action.payload.boardSettings
    },
    setTimeElapsed: (state, action) => {
      state.commonStates.elapsedTime = action.payload
    },
    timesUp: (state) => {
      state.commonStates.elapsedTime = 0
    },
    receiveBoards: (state, action) => {
      const playerList: Player[] = action.payload
      const boardSettings = state.boardSettings
      state.boardSettings = boardSettings
      state.boardDictionary = createBoardDictionary(playerList, boardSettings)

      // Test data
      // const playerList = test_playerList
      // const boardSettings = test_boardSettings
      // state.boardDictionary = createBoardDictionary(playerList, boardSettings)
      // state.boardSettings = boardSettings

      state.playerList = playerList.map((player) => {
        player.board = player.board
        return player
      })
      state.receivedBoards = true
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
    addPlayer: (state, action: { payload: Player }) => {
      if (!state.playerList.some((player) => player.name === action.payload.name)) {
        return { ...state, playerList: [...state.playerList, action.payload] }
      }
    },
    removePlayer: (state, action) => {
      state.playerList = [...state.playerList].filter((player) => {
        return player.userId !== action.payload.userId
      })
    },
    updateBoardDictionary: (state, action) => {
      const { letter, category } = action.payload.square
      const word = action.payload.word
      state.boardDictionary[letter][category][word].flag = action.payload.flag
    },
    setPlayerResults: (state, action) => {
      state.playerList = action.payload.newPlayerList
    },
    setNextPage: (state) => {
      state.currentPage += 1
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createRoom: (state, action) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    startGame: (state, action) => {},
    resetState: () => initialState,
  },
})

// send to server
export enum toServer {
  CreateRoom = 'CreateRoom',
  StartGame = 'StartGame',
  SendResults = 'SendResults',
}

// receive from server
export enum fromServer {
  onCreateRoom = 'onCreateGame',
  onPlayerJoined = 'onPlayerJoined',
  ReceiveMessage = 'ReceiveMessage',
  onTimerElapsed = 'onTimerCount',
  onPlayerLeft = 'onPlayerLeft',
  onTimesUp = 'onTimerFinished',
  ReceiveBoards = 'ReceiveBoards',
}

// import the actions where you want to dispatch them.
export const {
  setStatus,
  setRoomName,
  setTimeLimit,
  setRoom,
  setTimeElapsed,
  newMessage,
  removePlayer,
  addPlayer,
  resetState,
  timesUp,
  receiveBoards,
  setNextPage,
  setPlayerResults,
  createRoom,
  startGame,
  updateBoardDictionary,
} = roomSlice.actions

export default roomSlice.reducer
