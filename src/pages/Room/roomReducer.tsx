import { createSlice } from '@reduxjs/toolkit'
import { CommonStates, initialCommonStates } from '../../common/constants/'

export interface RoomState {
  lobbyName: string;
  roomId: string;
  maxPlayers: number;
  messages: Array <string>;
  timeLimit: number;
  commonStates: CommonStates;
}

const initialState: RoomState = {
  lobbyName: '',
  roomId: '',
  maxPlayers: 0,
  messages: [],
  timeLimit: 0,
  commonStates: initialCommonStates
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
    roomCreated: (state, action) => {
      state.roomId = action.payload.roomId
      state.lobbyName = action.payload.lobbyName
      state.timeLimit = action.payload.timeLimit
      state.maxPlayers = action.payload.maxPlayers
    },
    setTimeElapsed: (state, action) => {
      state.commonStates.elapsedTime = action.payload
    },
    newMessage: (state, action) => {
      state.messages = [...state.messages, action.payload]
    },
  },
})

// send to server
export enum toServer {
  CreateRoom = 'CreateRoom',
  StartGame = 'StartGame',
}

// receive from server
export enum fromServer {
  onCreateRoom = "onCreateGame",
  onPlayerJoined = "onPlayerJoined",
  ReceiveMessage = "ReceiveMessage",
  onTimerElapsed = "onTimerCount",
}

// import the actions where you want to dispatch them.
export const {
  setStatus,
  setRoomName,
  roomCreated,
  setTimeElapsed,
  newMessage,
} = roomSlice.actions

export default roomSlice.reducer


