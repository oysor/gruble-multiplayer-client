import { createSlice } from '@reduxjs/toolkit'
import { ConnectionMode } from '../../common/constants/status'

export interface RoomState {
  lobbyName: string;
  roomId: string;
  status: ConnectionMode;
  maxUsers: number;
  playerCount: number;
  timeLimit: number;
  elapsedTime: number;
  messages: string;
}

const initialState: RoomState = {
  lobbyName: '',
  roomId: '',
  status: ConnectionMode.Connecting,
  maxUsers: 0,
  playerCount: 0,
  timeLimit: 0,
  elapsedTime: 0,
  messages: '',
}

const roomSlice = createSlice({
  name: 'room',
  initialState,
  // Create methods here to update the store. 
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload
    },
    setRoomName: (state, action) => {
      state.lobbyName = action.payload
    },
    roomCreated: (state, action) => {
      state.roomId = action.payload.roomName
      state.lobbyName = action.payload.lobbyName
      state.timeLimit = action.payload.timeLimit
      state.maxUsers = action.payload.maxUsers
    },
    setTimeElapsed: (state, action) => {
      state.elapsedTime = action.payload
    },
    newMessage: (state, action) => {
      state.messages = action.payload
    },
  },
})


// send to server
export enum toServer {
  CreateRoom = 'CreateRoom',
}

// receive from server
export enum fromServer {
  onCreateRoom = "onCreateGame",
  onPlayerJoined = "onPlayerJoined",
  ReceiveMessage = "ReceiveMessage"
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


