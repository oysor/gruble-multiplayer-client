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
  receivedBoards: number
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
  receivedBoards: 0,
  currentPage: 1,
  boardDictionary: [[]],
  userId: '',
}

const roomSlice = createSlice({
  name: 'room',
  initialState,
  // Create methods here to update the store.
  reducers: {
    setStatus: (state, action) => {
      state.commonStates.status = action.payload
    },
    setRoomStatus: (state, action) => {
      state.roomStatus = action.payload
    },
    setRoomName: (state, action) => {
      state.roomName = action.payload
    },
    setUserId: (state, action) => {
      console.log('userId: ' + action.payload)
      state.userId = action.payload
    },
    setTimeLimit: (state, action) => {
      state.timeLimit = action.payload
    },
    setCategories: (state, action: { payload: { categories: string[] } }) => {
      state.boardSettings.categories = action.payload.categories
    },
    // setRoom: (state, action ) => {
    //   state.roomId = action.payload.roomMasterId;
    //   state.roomId = action.payload.roomId;
    //   state.roomStatus = RoomStatus.gameCreated;
    // },
    setRoomSettings: (state, action: { payload: IncomingGameRoom }) => {
      assertIsRoom(action.payload)
      const { roomMasterId, signalRGroupName, roomName, timeLimit, boardSettings } =
        action.payload
      state.userId = roomMasterId
      state.roomId = signalRGroupName
      state.roomName = roomName
      state.timeLimit = timeLimit
      state.boardSettings = boardSettings
      state.roomStatus = RoomStatus.boardCreated;
    },
    setTimeElapsed: (state, action) => {
      state.commonStates.elapsedTime = action.payload
    },
    setPlayerBoards: (state, action: { payload: { userId: string; board: Board } }) => {
      const { userId, board } = action.payload
      let updatedPlayerList = state.playerList
      updatedPlayerList = updatedPlayerList.map((player) => {
        if (player.userId === userId) {
          player.board = board
          player.hasSubmitted = true
        }
        return player
      })

      state.receivedBoards += 1
      state.playerList = updatedPlayerList
      if (state.receivedBoards === state.playerList.length) {
        state.roomStatus = RoomStatus.boardsReceived;
        state.boardDictionary = createBoardDictionary(
          updatedPlayerList,
          state.boardSettings
        )
      }
      // state.roomStatus = RoomStatus.boardsReceived;
    },
    setMessage: (state, action: { payload: IncomingMessage }) => {
      const { id, message } = action.payload
      const messageSender = state.playerList.find((p) => {
        return p.userId === id
      })

      state.messages = [
        { color: messageSender?.color, name: messageSender?.name, message: message },
        ...state.messages,
      ]
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
    updateBoardDictionary: (state, action) => {
      const { square, word, flag } = action.payload
      const { letter, category } = square
      state.boardDictionary[letter][category][word].flag = flag
    },
    setPlayerResults: (state, action) => {
      const { newPlayerList } = action.payload
      state.playerList = newPlayerList
    },
    setNextPage: (state) => {
      state.currentPage += 1
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createRoom: (state, action) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    startGame: (state, action) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateConnection: (state) => {},
    resetState: () => initialState,
  },
})

// import the actions where you want to dispatch them.
export const {
  setStatus,
  setRoomStatus,
  setRoomName,
  setUserId,
  setTimeLimit,
  setCategories,
  setRoomSettings,
  setTimeElapsed,
  setMessage,
  removePlayer,
  addPlayer,
  resetState,
  setPlayerBoards,
  setNextPage,
  setPlayerResults,
  createRoom,
  startGame,
  updateBoardDictionary,
  updateConnection,
} = roomSlice.actions

export default roomSlice.reducer
