import { createSlice } from '@reduxjs/toolkit'
import {
  Board,
  BoardSettings,
  CommonStates,
  initialCommonStates,
  Player,
  WordFrequencies,
} from '../../common/constants/'
import { calculateWordFrequencies, updatePlayerScores } from './computation/calculation'
import { test_boardSettings, test_playerList } from './testData'

export interface RoomState {
  roomName: string
  roomId: string
  messages: Array<string>
  timeLimit: number
  commonStates: CommonStates
  boardSettings: BoardSettings
  board: Board
  playerList: Player[]
  wordFrequencies: WordFrequencies
  receivedBoards: boolean
  currentPage: number
}

const initialState: RoomState = {
  roomName: '',
  roomId: '',
  messages: [],
  timeLimit: 0,
  commonStates: initialCommonStates,
  boardSettings: { categories: [''], letters: [''] },
  board: [['']],
  playerList: [],
  wordFrequencies: {},
  receivedBoards: false,
  currentPage: 1,
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
      // const playerList = action.payload
      // const wordFrequencies = calculateWordFrequencies(playerList, state.boardSettings)
      // state.wordFrequencies = wordFrequencies
      // state.playerList = updatePlayerScores(
      //   playerList,
      //   state.boardSettings,
      //   wordFrequencies
      // )

      const playerList = test_playerList
      const boardSettings = test_boardSettings
      const wordFrequencies = calculateWordFrequencies(playerList, boardSettings)
      state.boardSettings = boardSettings
      state.wordFrequencies = wordFrequencies
      state.playerList = updatePlayerScores(playerList, boardSettings, wordFrequencies)
      state.receivedBoards = true
    },
    newMessage: (state, action) => {
      state.messages = [...state.messages, action.payload]
    },
    removePlayer: (state, action) => {
      const newList = [...state.playerList]
      state.playerList = newList.filter((player) => {
        return player.id !== action.payload
      })
    },
    addPlayer: (state, action) => {
      state.playerList = [...state.playerList, action.payload]
    },
    updatePlayerScoreBoard: (state, action) => {
      const { letter, category } = action.payload.square

      state.playerList = state.playerList.map((player) => {
        if (player.name === action.payload.player.name) {
          player.scoreBoard[letter][category] = action.payload.scoreCard
        }
        return player
      })
    },
    setPlayerResults: (state, action) => {
      state.playerList = action.payload
    },
    setNextPage: (state) => {
      state.currentPage += 1
    },
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
  updatePlayerScoreBoard,
  setNextPage,
  setPlayerResults,
} = roomSlice.actions

export default roomSlice.reducer
