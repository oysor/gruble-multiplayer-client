import { createSlice } from '@reduxjs/toolkit'
import {
  Board,
  BoardSettings,
  CommonStates,
  IncomingGameRoom,
  IncomingMessage,
  IncomingPlayer,
  initialCommonStates,
  Message,
  MessageItem,
  Player,
  RoomStatus,
  WordInfoDict,
} from '../common/constants'
import { createBoardDictionary } from './utilities/utilities'
import { mapPlayerFromAPI } from '../common/mapping'
import { assertIsRoom } from '../common/assert'

export interface RoomState {
  roomStatus: number
  roomName: string
  roomId: string
  messages: MessageItem[]
  timeLimit: number
  commonStates: CommonStates
  boardSettings: BoardSettings
  playerList: Player[]
  currentPage: number
  boardDictionary: WordInfoDict[][]
  userId: String
}

const initialState: RoomState = {
  roomStatus: 0,
  roomName: '',
  roomId: '',
  messages: [],
  timeLimit: 0,
  commonStates: initialCommonStates,
  boardSettings: { categories: [], letters: [] },
  playerList: [],
  currentPage: 1,
  boardDictionary: [[]],
  userId: '',
}

const roomSlice = createSlice({
  name: 'room',
  initialState,
  // Create methods here to update the store.
  reducers: {
    updateConnectionStatus: (state, action) => {
      state.commonStates.status = action.payload
    },
    updateRoomStatus: (state, action) => {
      state.roomStatus = action.payload
    },
    updateRoomName: (state, action) => {
      state.roomName = action.payload
    },
    updateTimeLimit: (state, action: { payload: { timeLimit: number } }) => {
      const { timeLimit } = action.payload
      state.timeLimit = timeLimit
    },
    updateBoardSettings: (state, action: { payload: { categories: string[], letters: string[] } }) => {
      const { categories, letters } = action.payload
      state.boardSettings.categories = categories
      state.boardSettings.letters = letters
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createRoom: (state, action) => {},
    roomCreated: (state, action: { payload: IncomingGameRoom }) => {
      const { roomMasterId, signalRGroupName, roomName } = action.payload
      state.userId = roomMasterId
      state.roomId = signalRGroupName
      state.roomName = roomName
      state.roomStatus = RoomStatus.roomCreated
    },
    roomUpdated: (state, action: { payload: IncomingGameRoom }) => {
      assertIsRoom(action.payload)
      const { timeLimit, boardSettings } = action.payload

      state.timeLimit = timeLimit
      state.boardSettings = boardSettings
      state.roomStatus = RoomStatus.gameCreated
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
    receivePlayerBoard: (state, action: { payload: { userId: string; board: Board } }) => {
      const { userId, board } = action.payload
      const playerList = state.playerList.map((player) => {
        if (player.userId === userId) {
          player.board = board
          player.hasSubmitted = true
        }
        return player
      })

      state.playerList = playerList

      const numberOfBoards = playerList.length
      const receivedBoards = playerList.filter((p) => p.hasSubmitted === true).length
      if (numberOfBoards === receivedBoards) {
        state.roomStatus = RoomStatus.boardsReceived
        state.boardDictionary = createBoardDictionary(playerList, state.boardSettings)
        state.currentPage += 1
      }
    },
    updateBoardDictionary: (state, action) => {
      const { square, word, flag } = action.payload
      const { letter, category } = square
      state.boardDictionary[letter][category][word].flag = flag
    },
    showResults: (state, action) => {
      const { newPlayerList } = action.payload
      state.playerList = newPlayerList
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
    updateTimeElapsed: (state, action) => {
      state.commonStates.elapsedTime = action.payload
    },
    setNextPage: (state) => {
      state.currentPage += 1
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    startGame: () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateConnection: (state) => {},
    resetState: () => initialState,
  },
})

// import the actions where you want to dispatch them.
export const {
  updateConnectionStatus,
  updateRoomStatus,
  updateRoomName,
  updateTimeLimit,
  updateBoardSettings,
  roomUpdated,
  roomCreated,
  updateTimeElapsed,
  addMessage,
  removePlayer,
  addPlayer,
  resetState,
  receivePlayerBoard,
  setNextPage,
  showResults,
  createRoom,
  startGame,
  updateBoardDictionary,
  updateConnection,
} = roomSlice.actions

export default roomSlice.reducer
