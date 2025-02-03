import { createSlice } from '@reduxjs/toolkit'
import {
  APIPlayer,
  BoardSettings,
  CommonStates,
  DispatchResults,
  IncomingDisconnctedPlayer,
  IncomingGameRoom,
  IncomingMessage,
  IncomingPlayerBoard,
  initialCommonStates,
  MessageItem,
  Player,
  RemovePlayer,
  RoomPage,
  RoomStatus,
  UpdateBoardSettings,
  UpdateDictionary,
  WordInfoDict,
} from '../common/constants'
import {
  addPlayerSubmitToList,
  allBoardsReceived,
  createBoardDictionary,
} from './utilities'
import { mapPlayerFromAPI } from '../common/mapping'
import { assertIsRoom } from '../common/assert'

export interface RoomState {
  gameState: number
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
  userId: string
  gameClosed: boolean
  gameClosedMessage: string
}

const initialState: RoomState = {
  gameState: 0,
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
  gameClosed: false,
  gameClosedMessage: '',
}

const roomSlice = createSlice({
  name: 'room',
  initialState,
  // Create methods here to update the store.
  reducers: {
    updateConnectionStatus: (state, action) => {
      state.commonStates.status = action.payload
    },
    updateRoomName: (state, action: { payload: string }) => {
      state.roomName = action.payload
    },
    updateTimeLimit: (state, action: { payload: UpdateBoardSettings }) => {
      const { timeLimit } = action.payload
      state.timeLimit = timeLimit
    },
    updateBoardSettings: (state, action: { payload: UpdateBoardSettings }) => {
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
    },
    roomUpdated: (state, action: { payload: IncomingGameRoom }) => {
      assertIsRoom(action.payload)
      const { timeLimit, boardSettings } = action.payload

      state.timeLimit = timeLimit
      state.boardSettings = boardSettings
    },
    playerDisconnected: (state, action: { payload: IncomingDisconnctedPlayer }) => {
      const { userId, disconnected } = action.payload

      state.playerList = [...state.playerList].map((player) => {
        if (player.userId === userId) {
          player.isDisconnected = disconnected
        }
        return player
      })
    },
    playerDropout: (state, action: { payload: { userId: string } }) => {
      const { userId } = action.payload

      state.playerList = [...state.playerList].map((player) => {
        if (player.userId === userId) {
          player.dropOut = true
        }
        return player
      })
    },
    addPlayer: (state, action: { payload: APIPlayer }) => {
      const { payload } = action
      const newPlayer: Player = mapPlayerFromAPI(payload)

      // add only if player does not exist.
      if (!state.playerList.some((player) => player.name === newPlayer.name)) {
        return { ...state, playerList: [...state.playerList, newPlayer] }
      }
    },
    removePlayer: (state, action: { payload: RemovePlayer }) => {
      const { userId } = action.payload

      const newPlayerList = [...state.playerList].filter((player) => {
        return player.userId !== userId
      })

      const stillWatingOnBoards = state.roomStatus === RoomStatus.roundEnded

      if (stillWatingOnBoards && newPlayerList.length === 0) {
        state.gameClosedMessage = 'All payers gone..'
        state.gameClosed = true
        return
      }

      if (stillWatingOnBoards && allBoardsReceived(newPlayerList)) {
        state.roomStatus = RoomStatus.boardsReceived
        state.boardDictionary = createBoardDictionary(newPlayerList, state.boardSettings)
        state.currentPage = RoomPage.answers
      }
      state.playerList = newPlayerList
    },
    receivePlayerBoard: (state, action: { payload: IncomingPlayerBoard }) => {
      const { userId, board } = action.payload

      const valid = state.playerList.some((p) => p.userId == userId && !p.hasSubmitted)

      if (!valid) {
        console.log('??? Received board though all players submitted ???')
      }

      const playerList = addPlayerSubmitToList(state.playerList, userId, board)

      if (allBoardsReceived(playerList)) {
        state.roomStatus = RoomStatus.boardsReceived
        state.boardDictionary = createBoardDictionary(playerList, state.boardSettings)
        state.currentPage = RoomPage.answers
      }
      state.playerList = playerList
    },
    updateBoardDictionary: (state, action: { payload: UpdateDictionary }) => {
      const { square, word, flag } = action.payload
      const { letter, category } = square
      state.boardDictionary[letter][category][word].flag = flag
    },
    dispatchResults: (state, action: { payload: DispatchResults }) => {
      const { playerList } = action.payload
      state.playerList = playerList
      state.currentPage = RoomPage.results
      state.roomStatus = RoomStatus.dispatchedResults
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
    updateTimeElapsed: (state, action: { payload: number }) => {
      state.commonStates.elapsedTime = action.payload
    },
    roundStarted: (state) => {
      state.roomStatus = RoomStatus.roundStarted
      state.currentPage = RoomPage.play
    },
    roundEnded: (state) => {
      state.roomStatus = RoomStatus.roundEnded
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
  dispatchResults,
  createRoom,
  startGame,
  roundStarted,
  roundEnded,
  updateBoardDictionary,
  updateConnection,
  playerDisconnected,
  playerDropout,
} = roomSlice.actions

export default roomSlice.reducer
