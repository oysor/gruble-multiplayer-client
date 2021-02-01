import { createSlice } from '@reduxjs/toolkit'
import {
  Board,
  boardSettings,
  CommonStates,
  initialCommonStates,
  Player,
} from '../../common/constants/'

export interface RoomState {
  lobbyName: string
  roomId: string
  maxPlayers: number
  messages: Array<string>
  timeLimit: number
  commonStates: CommonStates
  boardSettings: boardSettings
  playerBoard: Board
  playerList: Player[]
}

const initialState: RoomState = {
  lobbyName: '',
  roomId: '',
  maxPlayers: 0,
  messages: [],
  timeLimit: 0,
  commonStates: initialCommonStates,
  boardSettings: { categories: [''], letters: [''] },
  playerBoard: [['']],
  playerList: [],
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
      state.lobbyName = action.payload
    },
    setRoom: (state, action) => {
      state.roomId = action.payload.roomId
      state.lobbyName = action.payload.lobbyName
      state.timeLimit = action.payload.timeLimit
      state.maxPlayers = action.payload.maxPlayers
      state.boardSettings = action.payload.boardSettings
    },
    setTimeElapsed: (state, action) => {
      state.commonStates.elapsedTime = action.payload
    },
    timesUp: (state) => {
      state.commonStates.elapsedTime = 0
    },
    newMessage: (state, action) => {
      state.messages = [...state.messages, action.payload]
    },
    removePlayer: (state, action) => {
      const newList = [...state.playerList]
      state.playerList = newList.filter((player) => {
        return player.playerId !== action.payload
      })
    },
    addPlayer: (state, action) => {
      state.playerList = [...state.playerList, action.payload]
    },
    resetState: () => initialState,
  },
})

// send to server
export enum toServer {
  CreateRoom = 'CreateRoom',
  StartGame = 'StartGame',
}

// receive from server
export enum fromServer {
  onCreateRoom = 'onCreateGame',
  onPlayerJoined = 'onPlayerJoined',
  ReceiveMessage = 'ReceiveMessage',
  onTimerElapsed = 'onTimerCount',
  onPlayerLeft = 'onPlayerLeft',
  onTimesUp = 'onTimerFinished',
}

// import the actions where you want to dispatch them.
export const {
  setStatus,
  setRoomName,
  setRoom,
  setTimeElapsed,
  newMessage,
  removePlayer,
  addPlayer,
  resetState,
  timesUp,
} = roomSlice.actions

export default roomSlice.reducer
