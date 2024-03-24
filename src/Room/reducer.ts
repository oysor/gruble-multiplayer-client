import { createSlice } from '@reduxjs/toolkit'
import {
  Board,
  BoardSettings,
  CommonStates,
  IncomingMessage,
  IncomingPlayer,
  initialCommonStates,
  Message,
  Player,
  WordInfoDict,
} from '../common/constants'
import { createBoardDictionary } from './utilities/utilities'
import { mapPlayerFromAPI } from '../common/mapping'

export interface RoomState {
  roomName: string
  roomId: string
  messages: Array<string>
  timeLimit: number
  commonStates: CommonStates
  boardSettings: BoardSettings
  playerList: Player[]
  receivedBoards: number
  allBoardsReceived: boolean
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
  receivedBoards: 0,
  allBoardsReceived: false,
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
    addGameRoom: (state, action) => {
      const { signalRGroupName, roomName, timeLimit, boardSettings } = action.payload
      state.roomId = signalRGroupName
      state.roomName = roomName
      state.timeLimit = timeLimit
      state.boardSettings = boardSettings
    },
    setTimeElapsed: (state, action) => {
      console.log('time elapsed ' + action.payload)
      state.commonStates.elapsedTime = action.payload
    },
    timesUp: (state) => {
      // state.commonStates.elapsedTime = 0
    },
    receiveBoards: (state, action: { payload: { userId: string; board: Board } }) => {
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
        state.allBoardsReceived = true
        state.boardDictionary = createBoardDictionary(
          updatedPlayerList,
          state.boardSettings
        )
      }
    },
    newMessage: (state, action: { payload: IncomingMessage }) => {
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
    addPlayer: (state, action: { payload: IncomingPlayer }) => {
      const { payload } = action
      const newPlayer: Player = mapPlayerFromAPI(payload)

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
      state.playerList = newPlayerList.map(
        (player: IncomingPlayer): Player => mapPlayerFromAPI(player)
      )
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

// import the actions where you want to dispatch them.
export const {
  setStatus,
  setRoomName,
  setTimeLimit,
  addGameRoom,
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
